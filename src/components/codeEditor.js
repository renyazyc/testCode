import React, { Component } from 'react';
import { render } from 'react-dom';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';
import ace from 'brace';
import 'brace/mode/jsx';
import JsoneEitor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

/* eslint-disable no-alert, no-console */
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';

// 这几个文件导入会导致js文件异常的大  拆分加载
require.ensure([], (require) => {
  require('brace/mode/java');
}, 'mode_java');
require.ensure([], (require) => {
  require('brace/snippets/java');
}, 'snippets_java');
require.ensure([], (require) => {
  require('brace/mode/xml');
}, 'mode_xml');
require.ensure([], (require) => {
  require('brace/snippets/xml');
}, 'snippets_xml');

require.ensure([], (require) => {
  require('brace/mode/json');
}, 'mode_json');
require.ensure([], (require) => {
  require('brace/snippets/json');
}, 'snippets_json');
require.ensure([], (require) => {
  require('brace/mode/html');
}, 'mode_html');
require.ensure([], (require) => {
  require('brace/snippets/html');
}, 'snippets_html');
require.ensure([], (require) => {
  require('brace/theme/github');
}, 'theme_github');

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    let that = '';
    this.state = {
      mode: this.props?this.props.mode || 'json':'json',
      value: this.props?this.props.value:'',
      theme: 'github',
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      fontSize: 14,
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      enableSnippets: false,
      showLineNumbers: true,
      options: this.props?this.props.options:{},
      jsonOptions: this.props?this.props.jsonOptions:{},
    };
    this.onChange = this.onChange.bind(this);
    this.init = (props) => {
      that = render(
        <CodeEditor {...props} />
        , document.getElementById('codeEditor'));
    };
    this.set = ()=> {
      that.setState({
        haha : '1'
      })
    }
  }

  componentDidMount() {
    this.renderJsonEditor();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
    if (nextProps.mode != this.props.mode) {
      this.setState({
        mode: nextProps.mode,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let refresh = '';
    const editor = document.getElementsByClassName('jsoneditor')[0];
    if (nextState.mode != 'json') {
      refresh = nextState.value != this.state.value || nextState.mode != this.state.mode;
      if (refresh && editor) {
        this.state.editor.destroy();
      }
    } else {
      refresh = !editor;
    }
    return refresh;
  }

  componentDidUpdate() {
    this.renderJsonEditor(this.jsonEditor);
  }

  onChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    } else {
      this.setState({
        value,
      });
    }
  }

  handleJsonEditorChange = () => {
    if (this.state.editor) {
      const json = this.state.editor.getText();
      if (json) {
        try {
          JSON.parse(json);
          this.setState({
            value: json,
          });
        } catch (e) {
          // 不是正确的json 就不往上传递了
        }
      }
    }
  }

  renderJsonEditor(container) {
    if (this.state.mode == 'json') {
      if (!container) {
        container = this.jsonEditor;
      }
      const options = {
        mode: 'code',
        ace: ace,
        onChange: this.handleJsonEditorChange,
        onError: (e) => {
          console.log(e);
        },
        ...this.state.jsonOptions,
      };
      const json = this.state.value != undefined ? this.state.value : '';
      this.state.editor = new JsoneEitor(container, options);
      try {
        this.state.editor.set(JSON.parse(json));
      } catch (e) {
        this.state.editor.setText(json);
      }
    }
  }

  render() {
    let height = '270px';
    if (this.props.style && this.props.style.height) {
      height = this.props.style.height.toString();
    }
    if (height.indexOf('px') == -1) {
      height += 'px';
    }

    return this.state.mode == 'json' ?
      <div id={this.id} ref={(div) => { this.jsonEditor = div; }} style={this.props.style ? this.props.style : { width: '100%', height: 270 }} /> : (
        <div className="columns" style={{ paddingTop: 10 }}>
          <div className="examples column" style={{ border: '1px solid #e8e8e8' }}>
            <AceEditor
              mode={this.state.mode}
              theme={this.state.theme}
              name="blah2"
              onChange={this.onChange}
              height={height}
              width="100%"
              showPrintMargin={this.state.showPrintMargin}
              showGutter={this.state.showGutter}
              highlightActiveLine={this.state.highlightActiveLine}
              value={this.state.value || ''}
              setOptions={{
                enableBasicAutocompletion: this.state.enableBasicAutocompletion,
                enableLiveAutocompletion: this.state.enableLiveAutocompletion,
                enableSnippets: this.state.enableSnippets,
                showLineNumbers: this.state.showLineNumbers,
                tabSize: 2,
              }}
              {...this.state.options}
            />
          </div>
        </div>
      );
  }
}

CodeEditor.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.object,
  jsonOptions: PropTypes.object,
  value: PropTypes.string,
  mode: PropTypes.string,
};

(function initEditor() {
  const yunxiaoCodeEditor = CodeEditor;
  // 最后将插件对象暴露给全局对象
  const global = (function () { return this || (0, eval)('this'); }());
  if (!('yunxiaoCodeEditor' in global)) {
    global.yunxiaoCodeEditor = yunxiaoCodeEditor;
  }
}());

export default CodeEditor;
