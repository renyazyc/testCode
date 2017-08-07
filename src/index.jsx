import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import { connect,Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';

// Store
const store = createStore(counter);

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
            /*<div>
                <span>{value}</span>
                <button onClick={onIncreaseClick}>Increase</button>
            </div>*/
            <div>
                <div style={{width:200,float:'left',background:'red',height:200}}></div>
                <div style={{}}></div>
                <div style={{width:200,float:'right',background:'blue',height:200}}></div>
            </div>

        )
    }
}

Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncreaseClick: PropTypes.func.isRequired
}

// Action
const increaseAction = { type: 'increase' }

// Reducer
function counter(state = { count: 0 }, action) {
    const count = state.count
    switch (action.type) {
        case 'increase':
            return { count: count + 1 }
        default:
            return state
    }
}




// Map Redux state to component props
function mapStateToProps(state) {
    return {
        value: state.count
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        onIncreaseClick: () => dispatch(increaseAction)
    }
}

render(
    <Provider store={store}>
        <Counter />
    </Provider>,
    document.getElementById('root')
)




