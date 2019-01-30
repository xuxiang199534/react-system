
import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import CommonInterface from '../../services/InfoSearchService';

const initState = {
  dataSource: [],
  communityList: [],
  params: {
    rows: 10,
    page: 1,
    community_name: '',
    name: '',
    card_no: '',
    type: '',
    start_at: '',
    end_at: ''
  },
  totals: 32,
  loading:false,
};
const nameSpace = 'inquireListModel';
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
      yield takeEvery(`${nameSpace}/reqList`, this.effect.reqList),
      yield takeEvery(`${nameSpace}/communityList`, this.effect.communityList),
      yield takeEvery(`${nameSpace}/houseExport`, this.effect.houseExport)
    ])
  },
  effect: {
    reqList: function* (action) {
      yield put({
        type: `${nameSpace}/concat`,
        payload: {
          loading:true,
        }
      })
      let { payload } = action;
      const params = yield select(state=>state.inquireListModel.params);
      const newParams = Object.assign(params, payload);
      const { data,code } = yield call(CommonInterface.personlList, payload);
      if(code === 20000){
        data.list && data.list.forEach((item, index) => {
          data.list[index].id = index + 1;
        });
        yield put({
          type: `${nameSpace}/concat`,
          payload: {
            dataSource: data.list ? [ ...data.list ] : [],
            totals: data.totals,
            params: newParams,
            loading:false,
          }
        })
      }
    },
    communityList: function* (action) {
      let { payload } = action;
      const { data,code } = yield call(CommonInterface.communityList, payload);
      if(code === 20000){
        yield put({
          type: `${nameSpace}/concat`,
          payload: {
            communityList: data ? data : [],
          }
        })
      }
    },
    houseExport: function* (action) {
      let { payload, callback } = action;
      const { data, code } = yield call(CommonInterface.houseExport, payload);
      if(code == 20000){
        yield put({
          type: 'concat',
          payload: {
            exportUrl: data.down_url
          }
        })
        callback&&callback(data.down_url);
      }
    },
  }
}