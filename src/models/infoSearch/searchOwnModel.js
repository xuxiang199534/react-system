import { put, takeEvery, all, call } from 'redux-saga/effects';
import inquireService from '../../services/InfoSearchService';

const initState = {
  dataSource: [],
  rows: 10,
  page: 1,
  totals: 32,
  loading: false
};
const nameSpace = 'searchOwnModel';
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
      try {
        yield put({ type: `${nameSpace}/concat`, payload: { loading: true } })
        const { data, code } = yield call(inquireService.personlList, action.payload);
        if (code == 20000) {
          data.list && data.list.forEach((item, index) => {
            data.list[index].key = index + 1;
          });
          yield put({
            type: `${nameSpace}/concat`,
            payload: {
              dataSource: data.list ? [ ...data.list ] : [],
              totals: data.totals
            }
          })
        }
        yield put({ type: `${nameSpace}/concat`, payload: { loading: false } })
      } catch (err) {}
    }
  }
}