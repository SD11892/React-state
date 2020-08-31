import { BehaviorSubject, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';
import React, { useCallback } from 'react';
import { store, useStore, useSubscription } from '@rx-store/react';
import {
  createApp,
  reducer,
  incrementAction,
  initialState,
} from '../common';

const storeValue = {
  counterChange$: new Subject(),
  count$: new BehaviorSubject({ count: 0 }),
};

const effect = ({ sources, sinks }) => sources.counterChange$().pipe(
  scan(reducer, initialState),
  sinks.count$(),
);

const { Manager, context } = store({ value: storeValue, effect });

const useCount = () => {
  const { count$ } = useStore(context);
  const [state] = useSubscription(count$);
  return state ? state.count : 0;
};

const useIncrement = () => {
  const { counterChange$ } = useStore(context);
  return useCallback(() => {
    counterChange$.next(incrementAction);
  }, [counterChange$]);
};

const Root = ({ children }) => (
  <Manager>
    {children}
  </Manager>
);

export default createApp(useCount, useIncrement, Root);
