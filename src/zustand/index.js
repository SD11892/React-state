import { useCallback } from 'react';
import create from 'zustand';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const useStore = create((set) => ({
  ...initialState,
  dispatch: (action) => set((state) => reducer(state, action)),
}));

const useCount = () => useStore(selectCount);

const useIncrement = () => {
  const dispatch = useStore((state) => state.dispatch);
  return useCallback(() => dispatch(incrementAction), [dispatch]);
};

const useDouble = () => {
  const dispatch = useStore((state) => state.dispatch);
  return useCallback(() => dispatch(doubleAction), [dispatch]);
};

export default createApp(useCount, useIncrement, useDouble);
