import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  createMutableSource,
  useMutableSource,
} from 'react';
import { createStore } from 'redux';

import {
  reducer,
  selectCount,
  incrementAction,
  createApp,
} from '../common';

const store = createStore(reducer);

const StoreContext = createContext();

const subscribe = (s, callback) => s.subscribe(callback);

const Root = ({ children }) => {
  const contextValue = useMemo(() => ({
    source: createMutableSource(store, () => store.getState()),
    dispatch: store.dispatch,
  }), []);
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

const useCount = () => {
  const getSnapshot = useCallback((s) => selectCount(s.getState()), []);
  const { source } = useContext(StoreContext);
  return useMutableSource(source, getSnapshot, subscribe);
};

const useIncrement = () => {
  const { dispatch } = useContext(StoreContext);
  return useCallback(() => dispatch(incrementAction), [dispatch]);
};

export default createApp(useCount, useIncrement, Root);
