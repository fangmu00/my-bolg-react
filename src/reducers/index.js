import { combineReducers } from 'redux';

const userInfo = (state = { userName: '', password: '' }, action) => {
  switch (action.type) {
    case 'login.submit':
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  userInfo,
});

export default reducer;
