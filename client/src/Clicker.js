import { connect } from 'react-redux';
import { clickerSendData } from './actionCreator';

const Clicker = props => {
  const obj = {
    data: 'hello'
  };
  return (
    <div style={{ width: '100px', height: '100px', color: 'red' }}>
      <h2
        onClick={() => {
          props.clickerSendData(obj);
        }}
      >
        Click me
      </h2>
    </div>
  );
};

const mapDispatchToProps = {
  clickerSendData
};

const WrappedComponent = connect(null, mapDispatchToProps)(Clicker);

export default WrappedComponent;
