import React, { createContext, useContext } from 'react';
import { useObserver, useLocalStore } from 'mobx-react-lite';

import {
  syncBlock,
  useRegisterClickHandler,
  initialState,
  ids,
} from '../common';

const Ctx = createContext();

let parentCount;

const Counter = React.memo(() => {
  const store = useContext(Ctx);
  return useObserver(() => {
    const { count } = store;
    if (parentCount !== count) {
      console.error(`count mismatch: ${parentCount} ${count}`);
      document.title = 'failed';
    }
    if (count > 0) syncBlock();
    return <div className="count">{count}</div>;
  });
});

const Main = () => {
  const store = useContext(Ctx);
  useRegisterClickHandler(React.useCallback(() => {
    store.count += 1;
  }, [store]));
  const forceUpdate = React.useReducer(c => c + 1, 0)[1];
  return useObserver(() => {
    const { count } = store;
    parentCount = count;
    return (
      <div>
        <button type="button" id="forceupdate" onClick={forceUpdate}>force render</button>
        <h1 className="parentCount">{count}</h1>
        {ids.map(id => (
          <Counter key={id} />
        ))}
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
