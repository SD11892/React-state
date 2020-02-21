import React from 'react';

let skipCount = 0;

// block for about 20 ms
export const syncBlock = () => {
  skipCount += 1;
  if (skipCount % 10 === 0) {
    // just one tenth, auto click the increment button
    const count = document.getElementById('autoIncrementCount').value;
    if (count > 0) {
      document.getElementById('autoIncrementCount').value = count - 1;
      document.getElementById('remoteIncrement').click();
      return;
    }
  }
  const start = Date.now();
  while (Date.now() - start < 20) {
    // empty
  }
};

export const useRegisterIncrementDispatcher = (listener) => {
  React.useEffect(() => {
    const ele = document.getElementById('remoteIncrement');
    ele.addEventListener('click', listener);
    return () => {
      ele.removeEventListener('click', listener);
    };
  }, [listener]);
};

export const initialState = {
  count: 0,
  dummy: 0,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        dummy: state.dummy + 1,
        // only update once in two
        count: state.dummy % 2 === 1 ? state.count + 1 : state.count,
      };
    default:
      return state;
  }
};

// 50 child components
export const ids = [...Array(50).keys()];

// check if all child components show the same count
// and if not, change the title
export const useCheckTearing = () => {
  React.useEffect(() => {
    const counts = ids.map((i) => Number(
      document.querySelector(`.count:nth-of-type(${i + 1})`).innerHTML,
    ));
    // add count in <Main>
    counts.push(Number(document.querySelector('.count:last-of-type').innerHTML));
    if (!counts.every((c) => c === counts[0])) {
      console.error('count mismatch', counts);
      document.title = 'failed';
    }
  });
};
