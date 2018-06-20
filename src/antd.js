const {Button} = antd;

let code = `class Test extends React.Component {
  render() {
    return(
      <div>
        <Button>lalal</Button>
      </div>
    )
  }
}`;

const headEl = document.getElementsByTagName('head')[0];

const scriptEl = document.createElement('script');
scriptEl.text = Babel.transform(code, { presets: ['es2015', 'react'] }).code;
// code = Babel.transform(code, { presets: ['es2015', 'react'] }).code;
headEl.appendChild(scriptEl);


// const Test = Babel.transform(code, { presets: ['react']}).code;
// console.log(Test);