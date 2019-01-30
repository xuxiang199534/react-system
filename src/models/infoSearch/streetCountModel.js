import { put, takeEvery, all, call } from 'redux-saga/effects';
import inquireService from '../../services/InfoSearchService';

const initState = {
  dataSource: [],
  rows: 10,
  page: 1,
  totals: 32,
  dataSourceCurrent: [],
  loading: false
};
const nameSpace = 'streetCountModel';
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
      yield takeEvery(`${nameSpace}/reqList`, this.effect.reqList)
    ])
  },
  effect: {
    reqList: function* (action) {
      yield put({ type: `${nameSpace}/concat`, payload: { loading: true } })
      const { data, code } = yield call(inquireService.streetCountList, action.payload);
      if (code == 20000) {
        let dataSourceCurrent = [];
        dataSourceCurrent.push({
          charge_rate: data.charge_rate,
          community_num: data.community_num,
          paid_amount: data.paid_amount,
          room_user_num: data.room_user_num,
          total_amount: data.total_amount,
          key: 1
        })
        data.list && data.list.forEach((item, index) => {
          data.list[index].key = index + 1;
        });
        yield put({
          type: `${nameSpace}/concat`,
          payload: {
            dataSource: data.list ? [ ...data.list ] : [],
            totals: data.totals,
            dataSourceCurrent: [ ...dataSourceCurrent ]
          }
        })
      }
      yield put({ type: `${nameSpace}/concat`, payload: { loading: false } })
    }
  }
}