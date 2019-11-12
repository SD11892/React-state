import React from 'react';
import createStore from 'storeon';
import useStoreon from 'storeon/react';
import StoreContext from 'storeon/react/context';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  initialState,
  reducer,
  ids,
  useCheckTearing,
  shallowEqual,
} from '../common';

const counter = (store) => {
  store.on('@init', () => initialState);
  store.on('dispatch', reducer);
};

const store = createStore([counter]);

const Counter = React.memo(() => {
  const { count } = useStoreon('count');
  syncBlock();
  return <div className="count">{count}</div>;
}, shallowEqual);

const Main = () => {
  const { count, dispatch } = useStoreon('count');
  useCheckTearing();
  useRegisterIncrementDispatcher(React.useCallback(() => {
    dispatch('dispatch', { type: 'increment' });
  }, [dispatch]));
  const [localCount, localIncrement] = React.useReducer(c => c + 1, 0);
  return (
    <div>
      <h1>Shared Count</h1>
      {ids.map(id => <Counter key={id} />)}
      <div className="count">{count}</div>
      <h1>Local Count</h1>
      {localCount}
      <button type="button" id="localIncrement" onClick={localIncrement}>Increment local count</button>
    </div>
  );
};

const App = () => (
  <StoreContext.Provider value={store}>
    <Main />
  </StoreContext.Provider>
);

export default App;
