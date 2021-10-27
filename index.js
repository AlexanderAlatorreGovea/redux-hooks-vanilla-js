function createStore() {
  //1 state
  //2 get the state
  //listen to changes on the state
  //update the state
  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((list) => list !== listener);
    };
  };

  return {
    getState,
    subscribe,
  };
}

const store = createStore();

const unsubscribe = store.subscribe(() => {});

unsubscribe();
