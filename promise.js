var Events = require('./events');

(function(exports, module, self) {
  var S_PENDING   = "pending",
      S_RESOLVED  = "resolved",
      S_REJECTED  = "rejected";

  var Promise = function(fn) {
    this.state = S_PENDING;
    this.reason = null;

    if ( fn ) fn(this.resolve, this.reject);
  };

  Promise.prototype.then = function(onFulfilled, onRejected) {
    var parent = new Promise();

    if ( onFulfilled && typeof onFulfilled === "function" ) {
      onFulfilled.called = false;
      this.on('resolved', parent.resolve.bind(parent));
      this.onFulfilled = onFulfilled;
    }

    if ( onRejected && typeof onRejected === "function" ) {
      onRejected.called = false;
      this.on('reject', parent.reject.bind(parent));
      this.onRejected = onRejected;
    }

    return parent;
  };

  Promise.prototype.resolve = function(val) {
    if ( this.state === S_PENDING ) {
      this.state = S_RESOLVED;

      if ( this.onFulfilled && !this.onFulfilled.called )
        this.trigger('resolved', this.onFulfilled(val));
    }

    return this;
  };

  Promise.prototype.reject = function(reason) {
    if ( this.state === S_PENDING ) {
      this.state = S_REJECTED;
      this.reason = reason;

      if ( this.onRejected && !this.onRejected.called )
        this.trigger('reject', this.onRejected(reason));
    }

    return this;
  };

  Events.extend(Promise.prototype);

  if ( typeof exports !== "undefined" )
    exports = module.exports = Promise;
  else
    this.Promise = Promise;

})(exports, module, this);
