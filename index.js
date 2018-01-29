'use strict';

var _redux = require('redux');

const INITIAL_STATE = {
  visibilityFilter: 'SHOW_ALL',
  todos: [{
    text: 'Consider using Redux',
    completed: true
  }, {
    text: 'Keep all state in a single tree',
    completed: false
  }]
};

function visibilityFilter(state = INITIAL_STATE.visibilityFilter, action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

function todos(state = INITIAL_STATE.todos, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        text: action.text,
        completed: false
      }];
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          });
        }
        return todo;
      });
    default:
      return state;
  }
}

const reducer = (0, _redux.combineReducers)({ visibilityFilter, todos });
const store = (0, _redux.createStore)(reducer);

store.subscribe(data => {
  console.log(store.getState());
});

console.log(store.getState());

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});

store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
});

store.dispatch({
  type: 'ADD_TODO',
  text: 'Create Action Creators'
});
