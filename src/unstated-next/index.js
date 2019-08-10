import React from 'react';
import { createContainer } from 'unstated-next';

import {
  syncBlock,
  useRegisterClickHandler,
  initialState,
  reducer,
  ids,
  useCheckTearing,
} from '../common';

const useValue = () => React.useReducer(reducer, initialState);
const C = createContainer(useValue);

const Counter = React.memo(() => {
  const [state] = C.useContainer();
  const { count } = state;
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const [state, dispatch] = C.useContainer();
  const { count } = state;
  useCheckTearing();
  useRegisterClickHandler(React.useCallback(() => {
    dispatch({ type: 'increment' });
  }, [dispatch]));
  const forceUpdate = React.useReducer(c => c + 1, 0)[1];
  return (
    <div>
      <button type="button" id="forceupdate" onClick={forceUpdate}>force render</button>
      <h1 className="parentCount">{count}</h1>
      {ids.map(id => <Counter key={id} />)}
    </div>
  );
};

const App = () => (
  <C.Provider useValue={useValue}>
    <Main />
  </C.Provider>
);

export default App;
