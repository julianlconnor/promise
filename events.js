(function(exports, module, self) {

  var Events = {};

  Events.extend = function(obj) {
    obj.on = this.on;
    obj.off = this.off;
    obj.trigger = this.trigger;
    obj.eventMap = {};
  };

  Events.on = function (evt, callback) {
    if ( !this.eventMap[evt] ) this.eventMap[evt] = [];
    this.eventMap[evt].push(callback);

    return this;
  };

  Events.off = function (evt, context) {
    if ( this.eventMap[evt] ) delete this.eventMap[evt];

    return this;
  };

  Events.trigger = function (evt, args) {
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
