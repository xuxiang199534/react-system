import { put, takeEvery, all,call } from 'redux-saga/effects';
import systemSettingsService from '../../services/systemSettingsService.js';
const { communityDropDown,userAdd,getUserShow,userEdit } = systemSettingsService;

const initState = {
  communityList:[],
  detail:{},
  checkedKeys:[],
};
const nameSpace = 'organizationalAddEditModel';

export default {
  nameSpace:nameSpace,
  reducer:(state = initState,action = {}) => {
    switch (action.type) {
      case `${nameSpace}/concat`:
        return {...state, ...action.payload}
      default:
        return state
    }
  },
  saga:function*(){
    yield all([
      yield takeEvery(`${nameSpace}/getCommunity`, this.effect.getCommunity),
      yield takeEvery(`${nameSpace}/getInfo`, this.effect.getInfo),
      yield takeEvery(`${nameSpace}/add`,this.effect.add),
      yield takeEvery(`${nameSpace}/edit`,this.effect.edit)
    ])
  },
  effect:{
    getCommunity:function*( { payload } ){
      try {
        const { code,data } = yield call( communityDropDown,payload);
        if(code == 20000){
          yield put({
            type: `${nameSpace}/concat`,
            payload: {
              communityList: data&&data.length>0?data:[],
            }
          })
        }
      } catch (error){}
    },
    add:function*( { payload,callBack,err } ){
      try {
        const { code } = yield call( userAdd,payload);
        if(code == 20000){
          
          callBack && callBack()
        }else{
          err && err() 
        }
      } catch (error){
      }

    },
    edit:function*( { payload,callBack,err } ){
      try {
        const { code } = yield call( userEdit,payload);
        if(code == 20000){
          
          callBack && callBack()
        }else{
          err && err() 
        }
      } catch (error){
      }
    },
    getInfo:function*({ payload }){
      try {
        const { code,data } = yield call( getUserShow,payload);
        if(code == 20000){
          yield put({
            type: `${nameSpace}/concat`,
            payload: {
              detail: data,
              checkedKeys:data.communitys ? data.communitys.map((val, index) => val.id) : []
            }
          })
        }
      } catch (error){}
    }
  },
}
