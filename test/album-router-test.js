// 'use strict';
//
// const expect = require('chai').expect;
// const request = require('superagent');
// const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const debug = require('debug')('cfgram:album-router-test');
//
// const Album = require('../model/album.js');
// const User = require('../model/user.js');
// const serverToggle = require('./lib/serverToggle.js');
//
// mongoose.Promise = Promise;
//
// const server = require('../server.js');
//
// const url = `http://localhost:${process.env.PORT}/api/album`;
//
// const testUser = {
//   username: 'testUser',
//   password: '1234',
//   email: 'testuser@cf.com'
// };
// const testAlbum ={
//   name: 'testName',
//   desc: 'destDesc'
// };
//
//
// describe('Album Route', function(){
//   debug('album-router-test');
//   beforeEach( done => {
//     serverToggle.serverOn(server, done);
//   });
//   afterEach( done => {
//     serverToggle.serverOff(server, done);
//   });
//   before( done => {
//     var user = new User(testUser);
//     user.generatePasswordHash(testUser.password)
//     .then( () => user.save())
//     .then( () => {
//       this.testUser = user;
//       testAlbum.userID = user._id.toString();
//       return user.generateToken();
//     })
//     .then( token => {
//       this.token = token;
//       done();
//     })
//     .catch(done);
//   });
//   afterEach( done =>{
//     Album.remove({})
//     .then( () => done())
//     .catch(done);
//   });
//
//   describe('POST ', () => {
//     it('should post an Album', done => {
//       request.post(`${url}`)
//      .set({Authorization: `Bearer ${this.token}`})
//      .send(testAlbum)
//      .end( (err, res) => {
//        console.log(res);
//        if(err) return done(err);
//        expect(res.status).to.equal(200);
//        console.log(res.body);
//        User.remove({});
//        done();
//      });
//     });
//   });
//
//
// });
