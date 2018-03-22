var CORE = (function() {
  var moduleData = {},
  toStr = function (anything) {
    return Object.prototype.toString.call(anything);
  };
  debug = true;

  return {
    debug: function(on) {
      debug = on ? true : false
    },
    create_modules: function(moduleID, creator) {
      var temp;
      if (typeof moduleID === 'string' && typeof creator === 'function') {
        temp = creator(Sandbox.create(this, moduleID));
        if (temp.init && typeof temp.init === 'function' && temp.destroy && typeof temp.destroy ==='function') {
          temp = null;
          moduleData[moduleID] = {
            create: creator,
            istance: null
          }
        } else {
          this.log(1, "Module'" + moduleID + "' Registration: FAILED : instance has no init or destroy functions")
        }
      } else {
        this.log(1, "Module'" + moduleID + "'Registration: FAILED : one or more argumets are of incorrect types")
      }
    },
    start: function(moduleID) {
      var mod = moduleData[moduleID];
      if (mod) {
        mod.instance = mod.create(Sandbox.create(this, moduleID));
        mod.instance.init();
      }
    },
    startAll: function() {
      var moduleID;
      for (moduleID in moduleData) {
        if (moduleData.hasOwnProperty(moduleID)) {
          this.start(moduleID);
        }
      }
    },

    stop: function(moduleID) {
      var data;
      if (data = moduleData[moduleID] && data.instance) {
        data.instance.destroy();
        data.instance = null;
      } else {
        this.log(1, "Stop Module '" + moduleID + "': FAILED : module does not exist or has not been started")
      }
    },
    stopAll: function() {
      var moduleID;
      for (moduleID in moduleData) {
        if (moduleData.hasOwnProperty(moduleID)) {
          this.stop(moduleID);
        }
      }
    },
    registerEvents: function(e, mod) {
      if (this.isObj(e) && mod) {
        if (moduleData[mod]) {
          moduleData[mod].events = e;
        } else {
          this.log(1, "");
        }
      } else {
        this.log(1, "");
      }
    },
    triggerEvent: function(e) {
      var mod;
      for (var mod in moduleData) {
        if (moduleData.hasOwnProperty(mod)) {
          mod = moduleData[mod];
          if (mod.events && mod.events[e.type]) {
            mod.events[e.type](e.data);
          }
        }
      }
    },
    removeEvents: function(e) {
      if (this.isObj(e) && mod && (mod.moduleData[moduleID]) && mod.events) {
        delete mod.events;
      }
    },
    log: function(severity, message) {
      if (debug) {
        console[ (severity === 1) ? 'log': (severity === 2) ? 'warn' : 'error'](message);
      } else {
        // send to the server
      }
    },
    dom: {
      query: function(selector, context) {
        var ret = {}, that = this, jqEls, i = 0;

        if (context && context.find) {
          jqEls = context.find(selector);
        } else {
          jqEls = $(selector);
        }

        ret = jqEls.get();
        ret.length = jqEls.length;
        ret.query = function(sel) {
          return that.query(sel, jqEls)
        }
        return ret;
      },
      bind: function(element, e, fn) {
        if (element && e) {
          if (typeof e === 'function') {
            fn = e;
            e = 'click';
          }
          $(element).bind(e, fn);
        } else {
          // log wrong arguments
        }
      },
      unbind: function(element, e, fn) {
        if (element && e) {
          if (typeof e === 'function') {
            fn = e;
            e = 'click';
          }
          $(element).unbind(e, fn);
        } else {
          // log wrong arguments
        }
      },
      create: function(el) {
        return document.createElement(el);
      },
      applyAttr: function(el, attrs) {
        $(el).attr(attrs);
      },
      isArr: function(arr) {
        return $.isArr(arr);
      },
      isObj: function(obj) {
        return $.isPlainObject(obj);
      }

   };

}());
