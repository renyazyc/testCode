window.onload=function () {
  const elems =[document.getElementById('el'),document.getElementById('input')];

  const data = {
    value: 'hello'
  };

  const command = {
    text: (str) => {
      this.innerHTML(str);
    },

    value: (str) => {
      this.setAttribute('value', str);
    }
  };


};