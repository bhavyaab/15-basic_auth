// 'use strict';
//
//
// const expect = require('chai').expect;
// const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const request = require('superagent');
// const User = require('../model/user.js');
// const debug = require('debug')('cfgram:auth-route-test');
// const serverToggle = require('./lib/serverToggle.js');
// mongoose.Promise = Promise;
//
// const server = require('../server.js');
//
// const url = `user://localhost:${process.env.PORT}`;
//
// const exampleUser = {
//   username: 'exampleUser',
//   password: '1234',
//   email: 'exampleuser@test.com'
// };
//
// describe('Auth routes', function(){
//   beforeEach( done => {
//     serverToggle.serverOn(server, done);
//   });
//   afterEach( done => {
//     serverToggle.serverOff(server, done);
//   });
//   describe('POST: /api/signup', () => {
//     debug('POST: /api/signup');
//     after( done => {
//       User.remove({})
//       .then( () => done())
//       .catch(done);
//     });
//     it('should say invalid path', done => {
//       request.post(`${url}/api/sig`)
//       .end((err, res) => {
//         if(err) return done(err);
//         expect(res.status).to.equal(404);
//       });
//       done();
//     });
//
//     it('should say body is invalid', done => {
//       request.post(`${url}/api/signup`)
//       .end((err, res) => {
//         if(err) return done(err);
//         expect(res.status).to.equal(400);
//       });
//       done();
//     });
//     it('should return a token', done => {
//       request.post(`${url}/api/signup`)
//       .send(exampleUser)
//       .end((err, res) => {
//         if(err) return done(err);
//         expect(res.status).to.equal(200);
//         expect(res).to.have.property('text');
//       });
//       done();
//     });
//   });
//   describe('GET: /api/signin', () => {
//     debug('GET: /api/signin');
//     before( done => {
//       new User(exampleUser).save()
//      .then(user => {
//        this.tempUser = user;
//        done();
//      })
//      .catch(done);
//     });
//     after( done => {
//       User.remove({})
//       .then( () => done())
//       .catch(done);
//     });
//     it('should say invalid path', done => {
//       request.get(`${url}/api/sig`)
//       .end((err, res) => {
//         if(err) return done(err);
//         expect(res.status).to.equal(404);
//       });
//       done();
//     });
//     it('should say user could not be authenticated', done => {
//       request.get(`${url}/api/signin`)
//       .send({'--auth': 'exampleUser:123'})
//       .end((err, res) => {
//         if(err) return done(err);
//         expect(res.status).to.equal(401);
//       });
//       done();
//     });
//
//
//     it('should get a token', done => {
//       request.get(`${url}/api/signin`)
//       .send({'--auth': 'exampleUser:1234'})
//       .end((err, res) => {
//         if(err) return done(err);
//         expect(res.status).to.equal(200);
//         expect(res).to.have.property('text');
//       });
//       done();
//     });
//   });
// });
