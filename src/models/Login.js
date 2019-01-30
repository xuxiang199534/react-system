import { call, put, takeEvery, all } from 'redux-saga/effects';
import { getLocal } from '../utils/util';
import commonInterface from '../services/CommonInterface';

const initState = {
  token: '',
  username: getLocal('usernameLOCAL') || '',
  password: getLocal('passwordLOCAL') || '',
  checked: getLocal('autoLoginLOCAL') || 0,
  loginType: '1',
  loading: false
}
const nameSpace = 'login';
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
    yield all([
      yield takeEvery(`${nameSpace}/login`, this.effect.login)
    ])
  },
  effect: {
    login: function* (action) {
      yield put({ type: 'login/concat', payload: { loading: true } });
      const { data, code } = yield call(commonInterface.login, action.payload);
      if (code == 20000) {
        window.sessionStorage.setItem('QXToken', data.token);
        window.sessionStorage.setItem('QXType', data.type);
        yield put({
          type: 'login/concat',
          payload : {
            token: data.token,
          }
        })
        window.location.href = '#/homePage';
      }
      yield put({ type: 'login/concat', payload: { loading: false } });
    }
  }
};
