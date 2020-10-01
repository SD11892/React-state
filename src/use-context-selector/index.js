import React, { useCallback } from 'react';
import {
  createContext,
  useContextSelector,
  useContextUpdate,
} from 'use-context-selector';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const context = createContext(null);

const useCount = () => useContextSelector(context, (v) => selectCount(v[0]));

const useIncrement = () => {
  const update = useContextUpdate(context);
  const dispatch = useContextSelector(context, (v) => v[1]);
  return useCallback(
    () => update(() => dispatch(incrementAction)),
    [update, dispatch],
  );
};

const useDouble = () => {
  const update = useContextUpdate(context);
  const dispatch = useContextSelector(context, (v) => v[1]);
  return useCallback(
    () => update(() => dispatch(doubleAction)),
    [update, dispatch],
  );
};

const Root = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <context.Provider value={[state, dispatch]}>
      {children}
    </context.Provider>
  );
};

export default createApp(useCount, useIncrement, useDouble, Root);
