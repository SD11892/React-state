import React, {
  createContext,
  useContext,
  useCallback,
  unstable_useTransition as useTransition,
} from 'react';
import { useObserver, useLocalStore } from 'mobx-react-lite';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  reducer,
  initialState,
  incrementAction,
  selectCount,
  ids,
  useCheckTearing,
  useCheckBranching,
  COUNT_PER_DUMMY,
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

let state = initialState;
let stateInPending = initialState;

const Main = () => {
  const store = useContext(Ctx);
  useCheckTearing();
  const [startTransition, isPending] = useTransition();
  const setMaxCount = useCheckBranching();
  if (isPending) {
    setMaxCount(selectCount(stateInPending));
  } else {
    setMaxCount(selectCount(state));
  }
  const increment = useCallback(() => {
    state = reducer(state, incrementAction);
    store.dummy += 1;
    if (store.dummy % COUNT_PER_DUMMY === COUNT_PER_DUMMY - 1) {
      store.count += 1;
    }
  }, [store]);
  useRegisterIncrementDispatcher(React.useCallback(() => {
    increment();
  }, [increment]));
  const [localCount, localIncrement] = React.useReducer((c) => c + 1, 0);
  const transitionIncrement = () => {
    startTransition(() => {
      state = reducer(state, incrementAction);
      stateInPending = reducer(stateInPending, incrementAction);
      increment();
    });
  };
  return useObserver(() => {
    const { count } = store;
    return (
      <div>
        <button type="button" id="normalIncrement" onClick={increment}>Increment shared count normally</button>
        <button type="button" id="transitionIncrement" onClick={transitionIncrement}>Increment shared count in transition</button>
        <span id="pending">{isPending && 'Pending...'}</span>
        <h1>Shared Count</h1>
        {ids.map((id) => <Counter key={id} />)}
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
