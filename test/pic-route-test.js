'use strict';

const debug = require('debug');
const request = require('superagent');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const Pic = require('../model/pics.js');
const Album = require('../model/album.js');
const User = require('../model/user.js');
const serverToggle = require('./lib/serverToggle.js');

mongoose.Promise = Promise;

const server = require('../server.js');

const url = `http://localhost:${process.env.PORT}/api/album`;

const testUser = {
  username: 'test-User',
  password: '1234',
  email: 'test-user@cf.com'
};
const testAlbum = {
  name: 'testName',
  desc: 'destDesc'
};
const testPic = {
  name: 'test name',
  desc: 'test pic description',
  image: `${__dirname}/./data/image.png`
};
describe('PIC ROUTE: test', function(){
  debug('pic route');
  before( done => {
    var user = new User(testUser);
    user.generatePasswordHash(testUser.password)
    .then( () => user.save())
    .then( () => {
      this.testUser = user;
      testAlbum.userID = user._id.toString();
      return user.generateToken();
    })
    .then( token => {
      this.token = token;
      done();
    })
    .catch(done);
  });
  before( done => {
    Album(testAlbum).save()
    .then( album => {
      this.testAlbum = album;
      done();
    })
    .catch(done);
  });
  after( done => {
    Album.remove({})
    .then( () => {
      User.remove({})
      .then( () => done());
    })
    .catch(done);
  });
  describe('POST ROUTE TEST FOR PIC', () => {
    debug('POST ROUTE');
    describe('POST PIC WITH VALID REQUEST AND VALID BODY', () => {
      debug('VALID REQUEST AND VALID BODY');
      it('should post valid pic with valid request', done => {
        request.post(`${url}/${this.testAlbum._id}/pic`)
        .set({Authorization: `Bearer ${this.token}`})
        .field('name', testPic.name)
        .field('desc', testPic.desc)
        .attach('image', testPic.image)
        .end( (err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });
});
