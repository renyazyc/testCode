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
      this.value= str;
    }
  };

  var scan = function(elems) {
    /**
     * 扫描带指令的节点属性
     */
    for (var i = 0, len = elems.length; i < len; i++) {
      var elem = elems[i];
      elem.command = {};
      for (var j = 0, len1 = elem.attributes.length; j < len1; j++) {
        var attr = elem.attributes[j];
        if (attr.nodeName.indexOf('q-event') >= 0) {
          /**
           * 调用属性指令
           */
          var dataKey = elem.getAttribute('ng-bind') || undefined;
          /**
           * 进行数据初始化
           */
          command[attr.nodeValue].call(elem, data[dataKey]);
          elem.command[attr.nodeValue] = data[dataKey];
        }
      }
    }
  }

  /**
   * 脏循环检测
   * @param {[type]} elems [description]
   * @return {[type]}    [description]
   */
  var digest = function(elems) {
    /**
     * 扫描带指令的节点属性
     */
    for (var i = 0, len = elems.length; i < len; i++) {
      var elem = elems[i];
      for (var j = 0, len1 = elem.attributes.length; j < len1; j++) {
        var attr = elem.attributes[j];
        if (attr.nodeName.indexOf('q-event') >= 0) {
          /**
           * 调用属性指令
           */
          var dataKey = elem.getAttribute('ng-bind') || undefined;

          /**
           * 进行脏数据检测，如果数据改变，则重新执行指令，否则跳过
           */
          if(elem.command[attr.nodeValue] !== data[dataKey]){

            command[attr.nodeValue].call(elem, data[dataKey]);
            elem.command[attr.nodeValue] = data[dataKey];
          }
        }
      }
    }
  }

  /**
   * 初始化数据
   */
  scan(elems);

  /**
   * 可以理解为做数据劫持监听
   */
  function $digest(value){
    var list = document.querySelectorAll('[ng-bind='+ value + ']');
    digest(list);
  }

  /**
   * 输入框数据绑定监听
   */
  if(document.addEventListener){
    elems.forEach((item)=>{
      item.addEventListener('keyup', function(e) {
        data.value = e.target.value;
        $scope.$apply
        $digest(e.target.getAttribute('ng-bind'));
      }, false);
    })
  }else{
    elems.forEach((item)=>{
      item.addEventListener('onkeyup', function(e) {
        data.value = e.target.value;
        $digest(e.target.getAttribute('ng-bind'));
      }, false);
    })
  }

  setTimeout(function() {
    data.value = 'fuck';
    /**
     * 这里执行$digest是需要手动调用$digest方法来启动脏检测
     */
    $digest('value');
  }, 2000)
}