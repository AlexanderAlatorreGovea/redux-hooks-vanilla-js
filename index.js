/*
    Characteristics of a pure function
    
    1) They always return the same result if the same arguments are passed in.

    2) they depend only on the arguments passed into them.

    3) Never produce any side effects. (no ajax request, 
        no mutation of the state,
        no dom interaction)
*/

// const action = {
//   type: "ADD_TODO",
//   todo: {
//     id: 0,
//     name: "Learn Redux",
//     completed: false,
//   },
// };

// {
//     type: "REMOVE_TODO",
//     id: 0,
// }

// {
//     type: "TOGGLE_TODO",
//     id: 0
// }

// {
//     type: "ADD_GOAL",
//     goal: {
//         id: 0,
//         name: "Run a Marathon"
//     }
// }

// {
//     type: "REMOVE_GOAL",
//     id: 0
// }

function todos(state = [], action) {
  if (action.type === "ADD_TODO") {
    return state.concat([action.todo]);
  }

  return state;
}

function createStore(reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state. (getState)
  // 3. Listen to changes on the state. (subscribe)
  // 4. Update the state (dispatch)

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

const store = createStore(todos);

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 1,
    name: "Learn Redux",
    completed: false,
  },
});

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 2,
    name: "Learn Redux",
    completed: false,
  },
});

const unsubscribe = store.subscribe(() => {
  console.log("the new state is: ", store.getState());
});

unsubscribe();
