import React from 'react';
import { connect } from 'react-redux';
import {
  incrementAction,
  decrementAction,
  changeStep,
  requestCounterFetching
} from './actionCreator';

const Counter = props => {
  return (
    <div>
      {props.counter}
      <input
        type="number"
        value={props.step}
        onChange={e => {
          props.changeStep(Number(e.target.value));
        }}
      />
      <button onClick={props.increment}>+</button>
      <button onClick={props.decrement}>-</button>
      <button
        onClick={() => {
          props.requestCounterFetching(props.counter);
        }}
      >
        Send
      </button>
      {props.isFetching && <div>FETCHING</div>}
    </div>
  );
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
  increment: incrementAction,
  decrement: decrementAction,
  changeStep,
  requestCounterFetching
};

const WrappedComponent = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default WrappedComponent;
