var expect = require('expect.js'),
    Promise = require('../promise.js'),
    sinon = require('sinon');

describe("Promises", function() {

  var promise;
  beforeEach(function() {
    promise = new Promise();
  });

  it("defaults to pending", function() {
    expect(promise.state).to.be("pending");
  });

  describe("that are pending", function() {

    it("may transition to resolved", function() {
      promise.resolve();
      expect(promise.state).to.be("resolved");
    });

    it("may transition to rejected", function() {
      promise.reject();
      expect(promise.state).to.be("rejected");
    });

  });

  describe("that are resolved", function() {

    it("may not transition to rejected", function() {
      promise.resolve();
      promise.reject();
      expect(promise.state).to.be("resolved");
    });

  });

  describe("that are rejected", function() {

    it("may not transition to resolved", function() {
      promise.reject();
      promise.resolve();
      expect(promise.state).to.be("rejected");
    });

    it("must have a reason", function() {
      promise.reject();
      expect(promise.reason).to.be.a("string");
    });

  });


});
