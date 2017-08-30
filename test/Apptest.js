/*var assert = require('chai').assert;
var app = require("../routes/new").test();

describe('bookstore',function(){
	it('app should return hello',function(){
		assert.equal(app,"hello");
	})
})*/

var should=require("chai").should(),
supertest=require("supertest"),
app=require("../routes/show");
var url=supertest("http://localhost:3000");

describe("testing first route",function(err){
    it("should test multiplication",function(done)
    {
        url
        .post("/show/multiply/3/4")
        .end(function(err,res){
              res.text.should.be.equal("12");
              done();

    });
      });

    it("should test Addition",function(done)
    {
        url
        .post("/show/add/3/4")
        .end(function(err,res){
              res.text.should.be.equal("34");
              done();

    });
      });

});

