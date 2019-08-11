import React, { createContext, useContext } from 'react';
import { useObserver, useLocalStore } from 'mobx-react-lite';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  initialState,
  ids,
  useCheckTearing,
} from '../common';

const Ctx = createContext();

const Counter = React.memo(() => {
  const store = useContext(Ctx);
  return useObserver(() => {
    const { count } = store;
    syncBlock();
    return <div className="count">{count}</div>;
  });
});

const Main = () => {
  const store = useContext(Ctx);
  useCheckTearing();
  useRegisterIncrementDispatcher(React.useCallback(() => {
    store.count += 1;
  }, [store]));
  const [localCount, localIncrement] = React.useReducer(c => c + 1, 0);
  return useObserver(() => {
    const { count } = store;
    return (
      <div>
        <h1>Remote Count</h1>
        {ids.map(id => <Counter key={id} />)}
        <div className="count">{count}</div>
        <h1>Local Count</h1>
        {localCount}
        <button type="button" id="localIncrement" onClick={localIncrement}>Increment local count</button>
      </div>
    );
  });
};

const App = () => {
  const store = useLocalStore(() => initialState);
  return (
    <Ctx.Provider value={store}>
      <Main />
    </Ctx.Provider>
  );
};

export default App;
