var expect = require('expect.js'),
    Promise = require('../promise.js'),
    sinon = require('sinon');

describe("Promises", function() {

  var promise;
  beforeEach(function() {
    promise = new Promise(function(resolve, reject) {
      
    });
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

    it("and onFulfilled returns a value that is not a promise, the promise must be resolved with that value", function() {
      promise = new Promise(function(resolve, reject) { });
      var callback = sinon.spy(),
          mock, promise2;

      promise2 = promise.then(function(num) { return num; });
      promise2.then(callback);

      promise.resolve(5);

      expect(callback.calledWith(5)).to.be(true);
    });

    it("and onRejected returns a value that is not a promise, the promise must be resolved with that value", function() {
      var onFulfilled = sinon.spy(),
          onRejected = sinon.spy();

      var promise1 = new Promise(function(resolve, reject) { });

      promise2 = promise1.then(onFulfilled, onRejected);
      promise1.reject("error");

      expect(onRejected.calledWith("error")).to.be(true);
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
      promise.reject(new Error("FOO"));
      expect(promise.reason instanceof Error).to.be(true);
    });

  });



});
