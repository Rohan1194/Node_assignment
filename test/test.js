let expect = require('chai').expect
let request = require('supertest')
let express = require('express')
let sinon = require('sinon')
let App = require('../app')
let model = require('../models/data')
let modelStub = sinon.stub(model, 'find')
let server = request('http://localhost/3000')
let addStub = sinon.stub(model.prototype, 'save')
let updateStub =sinon.stub(model,'update')
let removeStub =sinon.stub(model,'remove')
describe('Fetching Data', () => {
    it('respond with json', (done) => {
        server
        modelStub.yields(null, [{ title: "Let us C", author: "Yashwant" }, { title: "Let us D", author: "Yashwant1" }])
        request(App)
            .get('/show')
            .end((err, res) => {
                if (err) return done(err);
                console.log(res.body[0].title);
                expect({ title: "Let us C", author: "Yashwant" }).to.deep.equal({ title: res.body[0].title, author: res.body[0].author });
                expect({ title: "Let us D", author: "Yashwant1" }).to.deep.equal({ title: res.body[1].title, author: res.body[1].author });
                done();
            })
    });
})
/*    it('respond with json', (done) => {
        server
       modelStub.yields(null, [{ title: "Let us C", author: "Yashwant" }, { title: "Let us D", author: "Yashwant1" }])
        request(App)
            .post('/user/show')
            .end((err, res) => {
                if (err) return done(err);
                console.log( res.body[0].title);
                expect({ title: "Let us C", author: "Yashwant" }).to.deep.equal({ title: res.body[0].title, author: res.body[0].author });
                expect({ title: "Let us D", author: "Yashwant1" }).to.deep.equal({ title: res.body[1].title, author: res.body[1].author });
                done();
            })
    });*/

describe('POST', function() {
    before(function() {
        addStub.yields(null, { title: "bio", author: "plant" })
    })
    it('checking post', function(done) {
        request(App)
            .post('/show/add')
            /*  .expect('Content-Type', /json/)*/
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.title).to.be.equal("bio");
                /*expect(res.body.author).to.be.equal("plant");*/
                done();
            })
    })
})

describe('Update', () => {
    before(() => {
        updateStub.withArgs({ _id: "rohan" }, { $set: { title: "C3" } })
            .yields(null, {
                "ok": 1,
                "nModified": 1,
                "n": 1
            });
    })
    it('respond with json', (done) => {
        console.log('inside put Test');
        request(App)
            .put('/show/update/rohan')
            .send({ title: "C3" })
            .end((err, res) => {
                if (err) return done(err);
                else {
                    //console.log(res.body);
                    expect(res.body.ok).to.be.equal(1);
                    done();
                }
            });
    });
});
describe('Remove', () => {
    before(() => {
        removeStub.withArgs({ '_id': "qqewqqeeq" })
            .yields(null, {
                "ok": 1,
                "nModified": 1,
                "n": 1
            });
    })
    it('respond with json', (done) => {
        console.log('inside delete Test');
        request(App)
            .delete('/show/delete/qqewqqeeq')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    //console.log(res.body);
                    expect(res.body.ok).to.be.equal(1);
                    done();
                }
            });
    });
    });