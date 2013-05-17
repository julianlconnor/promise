var events = require('../events'),
    expect = require('expect.js'),
    sinon  = require('sinon');

describe("Events", function() {

  var foo;
  beforeEach(function() {
    foo = {};
    events.extend(foo);
  });

  it("extends objects with an `on` function", function() {
    expect(foo.on).to.be.a("function");
  });

  it("extends objects with an `off` function", function() {
    expect(foo.on).to.be.a("function");
  });

  it("extends objects with an `trigger` function", function() {
    expect(foo.trigger).to.be.a("function");
  });

  it("invokes a callback when an event is triggered", function() {
    var callback = sinon.spy();
    foo.on('bar', callback, foo);
    foo.trigger('bar');
    expect(callback.called).to.be(true);
  });
  
  it("does not invoke a callback when an event is triggered but not listening", function() {
    var callback = sinon.spy();
    foo.on('bar', callback);
    foo.off('bar', this);
    foo.trigger('bar');
    expect(callback.called).to.be(false);
  });

  it("bind directly to objects", function() {
    var callback1 = sinon.spy(),
        callback2 = sinon.spy(),
        bar = {};

    events.extend(bar);

    foo.on('bar', callback1, foo);
    bar.on('bar', callback2, bar);

    foo.trigger('bar');
    bar.trigger('bar');

    expect(callback1.callCount).to.be(1);
    expect(callback2.callCount).to.be(1);
  });

  it("allows for multiple callbacks on one event", function() {
    var callback1 = sinon.spy(),
        callback2 = sinon.spy();

    foo.on('bar', callback1);
    foo.on('bar', callback2);

    foo.trigger('bar');

    expect(callback1.called).to.be(true);
    expect(callback2.called).to.be(true);

    expect(callback2.callCount).to.be(1);
    expect(callback2.callCount).to.be(1);
  });

  it("can be triggered with arguments", function() {
    var callback = sinon.spy();

    foo.on('bar', callback);

    foo.trigger('bar', 'I am a banana.');

    expect(callback.calledWithExactly('I am a banana.')).to.be(true);
  });

});

