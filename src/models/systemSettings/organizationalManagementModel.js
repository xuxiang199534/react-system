import { put, takeEvery, all,call,select } from 'redux-saga/effects';
import { message } from 'antd';
import systemSettingsService from '../../services/systemSettingsService.js';
const { getUserList, getUserStatus } = systemSettingsService;

const initState = {
  list:[],
  totals:'',
  loading:false,
  params:{
    page:1,
    rows:10,
    group_name:'',
    name:'',
    group_type:'',
    is_enable:'',
  }
};
const nameSpace = 'organizationalManagementModel';

export default {
  nameSpace:nameSpace,
  reducer:(state = initState,action = {})=>{
    switch (action.type) {
      case `${nameSpace}/concat`:
        return {...state, ...action.payload}
      default:
        return state
    }
  },
  saga: function*(){
    yield all([
      yield takeEvery(`${nameSpace}/getList`, this.effect.getList),
      yield takeEvery(`${nameSpace}/changeStatus`, this.effect.changeStatus)
    ])
  },
  effect:{
    getList:function*({ payload }){
      yield put({
        type: `${nameSpace}/concat`,
        payload: {
          loading:true,
        }
      })
      const params = yield select(state=>state.organizationalManagementModel.params);
      const newParams = Object.assign(params, payload);
      const { code,data } = yield call( getUserList,payload);
      if(code == 20000){
        yield put({
          type: `${nameSpace}/concat`,
          payload: {
            list: data?data.list:[],
            totals:data.totals,
            params:newParams,
            loading:false,
          }
        })
      }
    },
    changeStatus:function*({ payload,callBack }){
      try {
        const { code } = yield call( getUserStatus,payload);
        if(code == 20000){
          message.success('操作成功！');
          callBack && callBack();
        }
      } catch (error){}
    }
  }
}