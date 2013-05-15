(function(exports, module, self) {
  var S_PENDING   = "pending",
      S_RESOLVED  = "resolved",
      S_REJECTED  = "rejected";

  var Promise = function() {
    this.state = S_PENDING;

    this.value = null;
    this.reason = null;

    /*
    * Lists of callbacks.
    */
    this.onFulfilled = [];
    this.onRejected = [];
  };

  Promise.prototype.then = function(onFulfilled, onRejected) {
    if ( onFulfilled && typeof onFulfilled === "function" ) {
      onFulfilled.called = false;
      this.onFulfilled.push(onFulfilled);
    }
    if ( onRejected && typeof onRejected === "function" ) {
      onRejected.called = false;
      this.onRejected.push(onRejected);
    }

    return this;
  };

  Promise.prototype.resolve = function(val) {
    var _this = this;

    if ( this.state === S_PENDING ) {
      this.state = S_RESOLVED;

      each(this.onFulfilled, function(callback) {
        callback.called = true;
        callback.call(_this, val);
      });
    }
    return this;
  };

  Promise.prototype.reject = function() {
    var _this = this;

    if ( this.state === S_PENDING ) {
      this.state = S_REJECTED;
      this.reason = "This is a reason.";

      each(this.onRejected, function(callback) {
        callback.called = true;
        callback.call(_this, _this.reason);
      });
    }

    return this;
  };

  function each(lst, fn) {
    for ( var i = 0; i < lst.length; i++ )
      fn(lst[i], i);
  }

  if ( typeof exports !== "undefined" )
    exports = module.exports = Promise;
  else
    this.Promise = Promise;

})(exports, module, this);
