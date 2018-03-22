var Sandbox = {
  create: function(core, module_selector) {
    var CONTAINER = core.dom.query('#' + module_selector);
    return {
      find: function(selector) {
        return CONTAINER.query(selector);
      },
      addEvent: function(element, typr, fn) {
        core.dom.bind(element,type, fn);
      },
      removeEvent: function(element, type, fn) {
        core.dom.unbind(element, type, fn);
      },
      notify: function(e) {
        if (core.isObj(e) && e.type) {
          core.triggerEvent(e);
        }
      },
      listen: function(e) {
        if (core.isObj(e)) {
          core.registerEvents(e, module_selector);
        })
      },
      ignore: function(e) {
        if (core.isArr) {
          core.removeEvents(e, module_selector);
        }
      },
      createElement: function(el, config) {
        var i, text;
        el = core.dom.create(el);

        if (config && config.children && core.isArr(config.children)) {
          i = 0;
          while(child = config.children[i]) {
            el.appendChild(child);
            i++;
          }
          delete config.children;
        }

        if(config.text) {
          el.appenChild(document.CreateTextNode(config.text));
          delete config.text;
        }
        core.dom.applyAttr(el, config);
      }
      return el;
    }
  }
};
