var expect = require('expect.js'),
    Promise = require('../promise.js'),
    sinon = require('sinon');

describe("then method", function() {

  var promise;
  beforeEach(function() {
    promise = new Promise(function(resolve, reject) {
      
    });
  });

  it("is defined", function() {
    expect(promise.then).to.be.a("function");
  });

  it("ignores onFulfilled if not a function", function() {
    promise.then('foo');
    expect(promise.onFulfilled).to.be(undefined);
  });

  it("saves onFulfilled if function", function() {
    promise.then(function() { });
    expect(promise.onFulfilled).to.be.a("function");
  });

  it("ignores onRejected if not a function", function() {
    promise.then(function() { }, 'foo');
    expect(promise.onRejected).to.be(undefined);
  });

  it("saves onRejected if function", function() {
    promise.then('foo', function() { });
    expect(promise.onRejected).to.be.a("function");
  });

  it("only calls onRejected once", function() {
    var callback = sinon.spy();
    promise.then('foo', callback);
    promise.reject();

    expect(callback.called).to.be(true);
    promise.reject();
    expect(callback.callCount).to.be(1);
  });

  it("calls onRejected with a reason", function() {
    var callback = sinon.spy();
    promise.then('foo', callback);
    promise.reject("This is a reason.");

    expect(callback.calledWith("This is a reason.")).to.be(true);
  });

  it("does not call onRejected if onFulfilled has been called", function() {
    var onFulfilled = sinon.spy(),
        onRejected = sinon.spy();

    promise.then(onFulfilled, onRejected);
    promise.resolve();
    promise.reject();

    expect(onRejected.called).to.be(false);
  });

  it("calls onFulfilled when resolved", function() {
    var callback = sinon.spy();
    promise.then(callback);
    promise.resolve();

    expect(callback.called).to.be(true);
  });

  it("only calls onFulfilled once", function() {
    var callback = sinon.spy();
    promise.then(callback);
    promise.resolve();

    expect(callback.called).to.be(true);
    promise.resolve();
    expect(callback.callCount).to.be(1);
  });

  it("calls onFulfilled with fulfillment value as first arg", function() {
    var callback = sinon.spy();
    promise.then(callback);
    promise.resolve('foo');

    expect(callback.calledWith('foo')).to.be(true);
  });

  it("does not call onFulfilled if onRejected has been called", function() {
    var onFulfilled = sinon.spy(),
        onRejected = sinon.spy();

    promise.then(onFulfilled, onRejected);
    promise.reject();
    promise.resolve();

    expect(onFulfilled.called).to.be(false);
  });

  it("returns before onFulfilled or onRejected are called", function() {
    var onFulfilled = sinon.spy(),
        onRejected = sinon.spy();

    promise.then(onFulfilled, onRejected);

    expect(onFulfilled.called).to.be(false);
    expect(onRejected.called).to.be(false);
  });

  it("may be called multiple times on the same promise", function() {
    var onFulfilled = sinon.spy(),
        onRejected = sinon.spy();

    // Will throw an exception if illegal.
    promise.then(onFulfilled, onRejected).then('foo', 'bar');
  });

  it("will execute onFulfilled callbacks in their respective order", function() {
    var outstr = '';
    var onFulfilled1 = function() {
      outstr += 'foo';
    };
    var onFulfilled2 = function() {
      outstr += 'bar';
    };

    // Will throw an exception if illegal.
    promise.then(onFulfilled1).then(onFulfilled2);
    promise.resolve();

    expect(outstr).to.be('foobar');
  });

  it("must return a promise", function() {
    var onFulfilled = sinon.spy(),
        onRejected = sinon.spy();

    var promise2 = promise.then(onFulfilled, onRejected);
    expect(promise2 instanceof Promise).to.be(true);
  });

});

