const thunk = ({ dispatch }) => next => action => {
  console.log("I'm in the thunk middleware!");
  if (typeof action === 'function') {
    return action(dispatch);
  }
  return next(action);
};

export default thunk;