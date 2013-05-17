(function(exports, module, self) {

  var Events = {};

  Events.extend = function(obj) {
    obj.on = this.on;
    obj.off = this.off;
    obj.trigger = this.trigger;
  };

  function fetchCallbacks(promise, evt) {
    if ( !promise.eventMap ) promise.eventMap = {};
    if ( !promise.eventMap[evt] ) promise.eventMap[evt] = [];

    return promise.eventMap[evt];
  }

  Events.on = function(evt, cb) {
    var callbacks = fetchCallbacks(this, evt);
    callbacks.push(cb);

    return this;
  };

  Events.off = function(evt) {
    if ( this.eventMap && this.eventMap[evt] )
      delete this.eventMap[evt];

    return this;
  };

  Events.trigger = function(evt, args, id) {
    if ( !this.eventMap ) this.eventMap = {};
    var callbacks = this.eventMap[evt] || [],
        _this = this;

    each(callbacks, function(callback, index) {
      callback.apply(_this, [args]);
    });
  };

  function each(lst, fn) {
    for ( var i = 0, len = lst.length; i < len; i++ )
      fn(lst[i], i);
  }

  if ( typeof exports !== "undefined" )
    exports = module.exports = Events;
  else
    this.Events = Events;

})(exports, module, this);
