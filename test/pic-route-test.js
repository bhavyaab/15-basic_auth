'use strict';

const debug = require('debug');
const request = require('superagent');
const chai = require('chai').expect;

const Pic = require('../model/pics.js');
const Album = require('../model/album.js');
const User = require('../model/user.js');
const serverToggle = require('./lib/serverToggle.js');

mongoose.Promise = Promise;

const server = require('../server.js');

const url = `user://localhost:${process.env.PORT}/api/album`;

const testUser = {
  username: 'testUser',
  password: '1234',
  email: 'testuser@cf.com'
};
const testAlbum ={
  name: 'testName',
  desc: 'destDesc'
};
 const testPic = {
   name: 'test name',
   desc: 'test pic description',
 };

 describe( 'POST: /api/album/:albumID/pic', function(){
  describe( 'with a valid token and a valid data', function(){
     before( done => {
        var user = new User(testUser)
       user.generatePasswordHash(testUser.password)
       .then( () => user.save())
       .then( () => user.generateToken())
       .then( token => {
         this.token = token;
         done();
       })
       .catch(done);
     });
    after( done => {
      delete testUser.userID;
      done();
    });

    it('should return a pic', done => {
      request.post(`${url}/:albumID/pic`)
      .set({
        Authorization: `Bearer ${this.token}`
      })
      .field({name: 'test name'})
      .field({desc: 'test pic description'})
      .attach({file : `${__dirname}/./data/image.png` })
      .end( (err, res) => {
        if(err) return done(err);

        expect(res.status).to.equal(200);
        done();
      });
    });
  });
 });
