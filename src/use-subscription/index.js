import React from 'react';
import { createStore } from 'redux';
import { useSubscription } from 'use-subscription';

import {
  syncBlock,
  useRegisterClickHandler,
  reducer,
  ids,
} from '../common';

const store = createStore(reducer);

let parentCount;

const Counter = React.memo(() => {
  const count = useSubscription(React.useMemo(() => ({
    getCurrentValue: () => store.getState().count,
    subscribe: (callback) => {
      return store.subscribe(callback);
    },
  }), []));
  if (parentCount !== count) {
    console.error(`count mismatch: ${parentCount} ${count}`);
    document.title = 'failed';
  }
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const count = useSubscription(React.useMemo(() => ({
    getCurrentValue: () => store.getState().count,
    subscribe: (callback) => {
      return store.subscribe(callback);
    },
  }), []));
  parentCount = count;
  useRegisterClickHandler(React.useCallback(() => {
    store.dispatch({ type: 'increment' });
  }, []));
  const forceUpdate = React.useReducer(c => c + 1, 0)[1];
  return (
    <div>
      <button type="button" id="forceupdate" onClick={forceUpdate}>force render</button>
      <h1 className="parentCount">{count}</h1>
      {ids.map(id => (
        <Counter key={id} />
      ))}
    </div>
  );
};

const App = () => (
  <React.Fragment>
    <Main />
  </React.Fragment>
);

export default App;
