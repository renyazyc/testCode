import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

@connect(mapStateToProps,mapDispatchToProps)
// React component
class Counter extends Component {
    constructor(props){
        super(props);
        this.state={};
    }
    render() {
        const { value, onIncreaseClick } = this.props;
        return (
            <div>
                <span>{value}</span>
                <button onClick={onIncreaseClick}>Increase11</button>
            </div>
            /*<div>
                <div style={{width:200,float:'left',background:'red',height:200}}></div>
                <div style={{}}></div>
                <div style={{width:200,float:'right',background:'blue',height:200}}></div>
            </div>*/

        )
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

export default Counter





