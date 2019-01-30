import { message } from 'antd';
import { call, put, all, takeEvery } from 'redux-saga/effects';
import commonInterface from '../services/CommonInterface';

const initState = {
  count: '获取验证码',
  flagSend: true,
  showPassword: false,
  phone: '',
  acode: '',
  loadingOne: false,
  loadingTwo: false
}
const nameSpace = 'ForgotPassword';

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
      yield takeEvery(`${nameSpace}/init`, this.effect.init),
      yield takeEvery(`${nameSpace}/getSmsCode`, this.effect.getSmsCode),
      yield takeEvery(`${nameSpace}/validateSmsCode`, this.effect.validateSmsCode),
      yield takeEvery(`${nameSpace}/resetPassword`, this.effect.resetPassword)
    ])
  },
  effect: {
    init: function* (action) {
      yield put({
        type: `${nameSpace}/concat`,
        payload: initState
      });
    },
    getSmsCode: function* (action){ //  获取验证码
      const { code } = yield call(commonInterface.getSmsCode, action.payload);
      if (code == 20000) {
        yield put({
          type: `${nameSpace}/concat`,
          payload: {
            flagSend: false,
          }
        });
        action.callback && action.callback();
      }
    },
    validateSmsCode: function* (action) { // 身份验证 => 下一步
      yield put({ type: `${nameSpace}/concat`, payload: { loadingOne: true } });
      const { code, data } = yield call(commonInterface.validateSmsCode, action.payload);
      if (code == 20000) {
        yield put({
          type: `${nameSpace}/concat`,
          payload: {
            showPassword: true,
            phone: action.payload.mobile,
            acode: data.acode
          }
        })
        action.callback && action.callback();
      }
      yield put({ type: `${nameSpace}/concat`, payload: { loadingOne: false } });
    },
    resetPassword: function* (action) {
      yield put({
        type: `${nameSpace}/concat`,
        payload: { loadingTwo: true }
      })
      const { code } = yield call(commonInterface.resetPassword, action.payload);
      if (code == 20000) {
        message.success('重置密码成功，3秒后返回登录页');
        setTimeout(() => {
          location.href = "#/";
        }, 2000)
      }
      yield put({
        type: `${nameSpace}/concat`,
        payload: { loadingTwo: false }
      })
    }
  }
};
