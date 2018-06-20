window.onload=function () {
  var elems = [document.getElementById('el'), document.getElementById('input')];

  var data = {
    value: 'hello!'
  };

  var command = {
    text: function(str) {
      this.innerHTML = str;
    },
    value: function(str) {
      this.value=str;
    }
  };

  var scan = function() {
    /**
     * 扫描带指令的节点属性
     */
    for (var i = 0, len = elems.length; i < len; i++) {
      var elem = elems[i];
      elem.command = [];
      for (var j = 0, len1 = elem.attributes.length; j < len1; j++) {
        var attr = elem.attributes[j];
        if (attr.nodeName.indexOf('q-') >= 0) {
          /**
           * 调用属性指令
           */
          command[attr.nodeName.slice(2)].call(elem, data[attr.nodeValue]);
          elem.command.push(attr.nodeName.slice(2));

        }
      }
    }
  }

  var bValue;
  /**
   * 定义属性设置劫持
   */
  var defineGetAndSet = function(obj, propName) {
    try {
      Object.defineProperty(obj, propName, {

        get: function() {
          return bValue;
        },
        set: function(newValue) {
          bValue = newValue;
          scan();
        },

        enumerable: true,
        configurable: true
      });
    } catch (error) {
      console.log("browser not supported.");
    }
  }
  /**
   * 初始化数据
   */
  scan();

  /**
   * 可以理解为做数据劫持监听
   */
  defineGetAndSet(data, 'value');

  /**
   * 数据绑定监听
   */
  if(document.addEventListener){
    elems.forEach((item)=>{
      item.addEventListener('keyup', function(e) {
        data.value = e.target.value;
      }, false);
    })
  }else{
    elems.forEach((item)=>{
      item.addEventListener('onkeyup', function(e) {
        data.value = e.target.value;
      }, false);
    })
  }

  setTimeout(function() {
    data.value = 'fuck';
  }, 2000)
}