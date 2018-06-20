import React,{Component} from 'react';
import { Link } from 'react-router-dom';

class Test extends Component {

  componentWillMount() {
    debugger;
  }

  componentWillReceiveProps(){
    debugger;
  }

  render() {
    return (
      <div><Link to="/">点我</Link></div>
    )
  }
}

export default Test