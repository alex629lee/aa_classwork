import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER
} from '../actions/session';

const _nullSession = {
  currentUser: null
} //returned if we don't have a current user

export default (state = _nullSession, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER: 
      //new slice of state with current user nested under 
      //when we have a window.currentUser, the default state will be that currentUser instead of _nullSession
      return Object.assign({}, { currentUser: action.user });
    case LOGOUT_CURRENT_USER: 
      return _nullSession;
    default: 
      return state;
  }
}




