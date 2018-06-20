import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { obj } from './test';
import { Chart, Tooltip, Axis, Legend, Line, Point } from 'viser-react';
import CodeMirror from 'react-codemirror';
// import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import Tree from 'antd/lib/tree';
import 'antd/lib/tree/style/css';
const TreeNode = Tree.TreeNode;
console.log('obj', obj);

const treeData = [];

const loopTree = (par,num) => {
  for(let i = 1; i < 21 ; i++){
    const obj = {
      title :num?`${num}-${i}`:`${i}`,
      key : num?`${num}-${i}`:`${i}`,
      children : []
    }
    par.push(obj);
    const length = obj.title.split('-').length;
      if(length < 3){
        loopTree(obj.children,obj.title)
      }
  }
}

// React component
class Counter extends Component {
    constructor(props){
        super(props);
        this.state={};
        this.renderTreeNodes=this.renderTreeNodes.bind(this)
    }

    componentDidMount(){
      // document.addEventListener('mouseenter',(e)=>{debugger;},false)
    }

    renderTreeNodes(data){
      return data.map((item) => {
        if (item.children) {
          return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode {...item} />;
      });
    }

    render() {
      const { value, onIncreaseClick } = this.props;
      loopTree(treeData);
      const options = {
        lineNumbers: true,
        // mode:'javaScript',
        readOnly: true,
        lineWrapping:true,
        mode: this.state.mode,
        lineSeparator:'<br>'
      };
      const data =[{
        date:1511150190000,
        createDiff:1,
        closeDiff:0,
        fixDiff:1},
        {
          date:1514778990000,
          createDiff:2,
          closeDiff:0,
          fixDiff:2
        }]

      const dataPre = {
        transform: {
          type: 'fold',
          fields: ['createDiff', 'closeDiff','fixDiff'],
          key: 'diff',
          value: 'number',
        },
      };

      const scale = [{
        dataKey: 'date',
        type:'time',
        mask:'YYYY/MM/DD',
      }];
        return (
            <div>
              <Link to="/abc">点我</Link>
              {/*<div style={{flex:'0 0 360px'}}>*/}
                {/*<span>{value}</span>*/}
                {/*<button onClick={onIncreaseClick}>Increase11</button>*/}
                {/*</div>*/}
                {/*<CodeMirror options={options}/>*/}
              {/*<ul style={{overflow:'hidden'}}>*/}
                {/*<li style={{background:'#333',height:100,width:100,float:'left'}}></li>*/}
                {/*<li style={{background:'#333',height:100,width:100,float:'left'}}></li>*/}
                {/*<li style={{background:'#333',height:100,width:100,float:'left'}}></li>*/}
              {/*</ul>*/}
              <Tree
              >
                {this.renderTreeNodes(treeData)}
              </Tree>
            </div>
        )
    }
}

@connect(mapStateToProps,mapDispatchToProps)
class SubCounter extends Counter{
  constructor(props){
    super(props)
    this.renderMethod=this.renderMethod.bind(this)
    console.log(super.render)
  }

  renderMethod(){
    console.log('success')
  }


}

Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncreaseClick: PropTypes.func.isRequired
}

// Action
const increaseAction = { type: 'increase' }






// Map Redux state to component props
function mapStateToProps(state) {
    return {
        value: state.counter.count
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        onIncreaseClick: () => dispatch(increaseAction)
    }
}

export default SubCounter





