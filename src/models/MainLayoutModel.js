
import { call, put, takeEvery } from 'redux-saga/effects';
import CommonInterface from '../services/CommonInterface';
import { message } from 'antd';

const initState = {
  currentOpenKey: [],
  menuList: [],
  visible: false,
};
const nameSpace = 'MainLayoutModel';
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
    yield takeEvery(`${nameSpace}/init`, this.effect.init)
    yield takeEvery(`${nameSpace}/changePassword`, this.effect.changePassword)
    yield takeEvery(`${nameSpace}/loginOut`, this.effect.loginOut)
  },
  effect: {
    init: function* (action) {  // 初始化model数据，init方法在MainSiderBar.js调用
      let currentOpenKey = ['00'];
      let QXType = window.sessionStorage.getItem('QXType');
      if (sessionStorage.getItem('currentOpenKey')) {
        currentOpenKey = JSON.parse(sessionStorage.getItem('currentOpenKey'));
      }
      let menuList = [];
      if (QXType != '8') {
        menuList = [
          {
            id: '00', 
            menuName: '信息查询', 
            menuIcon: 'search',
            children: [
              { id: '0001', menuName: '个人查询', menuUrl: 'searchOwn', type: '9,8'},
              { id: '0002', menuName: '中介查询', menuUrl: 'intermediaryList', type: '1,8'},
              { id: '0003', menuName: '街道查询', menuUrl: 'streetList', type: '2,8'},
              { id: '0004', menuName: '街道统计', menuUrl: 'streetCount', type: '2,8'},
              { id: '0005', menuName: '行政中心查询', menuUrl: 'administrativeList', type: '3,8'},
              { id: '0006', menuName: '房管中心查询', menuUrl: 'housingManagementList', type: '4,8'}
            ]
          }
        ]
      } else {
        menuList = [
          {
            id: '00', 
            menuName: '信息查询', 
            menuIcon: 'search',
            children: [
              { id: '0001', menuName: '个人查询', menuUrl: 'searchOwn', type: '9,8'},
              { id: '0002', menuName: '中介查询', menuUrl: 'intermediaryList', type: '1,8'},
              { id: '0003', menuName: '街道查询', menuUrl: 'streetList', type: '2,8'},
              { id: '0004', menuName: '街道统计', menuUrl: 'streetCount', type: '2,8'},
              { id: '0005', menuName: '行政中心查询', menuUrl: 'administrativeList', type: '3,8'},
              { id: '0006', menuName: '房管中心查询', menuUrl: 'housingManagementList', type: '4,8'}
            ]
          },
          {
            id: '01', 
            menuName: '系统设置', 
            menuIcon: 'cluster',
            children: [
              { id: '0101', menuName: '机构管理', menuUrl: 'organizationalManagement', type: '8'}
            ]
          }
        ]
      }
      yield put({
        type: `${nameSpace}/concat`,
        payload: {
          currentOpenKey: currentOpenKey,
          visible: false,
          menuList: [ ...menuList ]
        }
      })
    },
    changePassword: function* (action){ // 修改密码   
      let { payload } = action;   
      const { code } = yield call(CommonInterface.changePassword, payload);
      if (code == 20000) {
        window.sessionStorage.removeItem('password_time_stamp');
        message.success('密码修改成功，3秒后返回登录页');
        yield put({
          type: 'concat',
          payload: {
            visible: false
          }
        });
        setTimeout(() => {
          location.href = "#/";
        }, 2000)
      }
    },
    loginOut: function* (action) { // 退出登录   
      let { payload } = action;
      const { code } = yield call(CommonInterface.loginOut, payload);
      if (code == 20000) {
        message.success('退出成功，3秒后返回登录页');
        setTimeout(() => {
          location.href = "#/";
        }, 2000)
      }
    },
  }
}