import { all } from 'redux-saga/effects';

const initState = {
  
};
const nameSpace = 'HomePageModel';
export default {
  nameSpace: nameSpace,
  reducer: function (state = initState, action) {
    switch (action.type) {
      case `${nameSpace}/concat`:
        return {...state, ...action.payload}
      default:
        return state
    }
  },
  saga: function* () {
    yield all([])
  },
  effect: {

  }
}