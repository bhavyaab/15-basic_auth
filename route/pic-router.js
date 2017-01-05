'use strict';

const debug = require('debug')('cfgraam:picRouter');
const fs = require('fs');
const path = require('path');
const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer');
const Router = require('express').Router;
const createError = require('http-errors');

const Pic = require('../model/pics.js');
const Album = require('../model/album.js');
const User = require('../model/user.js');

const bearAuth = required('../lib/bearer-auth-middleware.js');

AWS.config.setPromisesDependency(require('bluebird'));

const s3 = new AWS.S3();
const dataDir = `${__dirname}/../data`;
const upload = multer({ dest: dataDir });
const picRouter = module.exports = Router();

function s3uploadProm(param){
  debug('s3uploadProm');

  return new Promise((resolve, reject){
    s3.upload( params, (err, s3date) =>{
      if(err) return reject(err);
       resolve(s3data);
     });
  });
};

picRouter.post('/api/album/:albumID/pic', bearAuth, upload.single('image'), furnction(req, res, next){
  debug('POST');

  if(!req.file){
    return next(createError(400, 'file not found'));
  }

  if(!req.file.path){
    return next(createError(500, 'file not saved'));
  }
  let ext = path.extname(req.file.originalname);
  let params = {
    ACL: 'public-read',
    BUCKET: process.env.AWS_BUCKET,
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  }

  Album.findById(req.params.albumID)
  .then( () => {
    s3uploadProm(params);
  })
  .then( s3data => {
    del([`${dataDir}/*`]);
    let picDate = {
      name : req.body.name,
      desc : req.body.description,
      objectKey : s3data.Key,
      imageURI : s3data.Location,
      userID : req.user._id,
      albumID : req.params.albumID,
    }
    return new Pic(picDate).save();
  })
  .then( pic => res.json(pic))
  .catch( err => next(err));
});
