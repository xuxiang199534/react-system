import request from '../utils/request';

const inquireService = {
  // 房管中心导出
  houseExport: (parameter) => {
    return request.post('/nbproperty/group/bill-export', parameter);
  },
  // 小区列表
  communityList: (parameter) => {
    return request.post('/nbproperty/group/community-drop-down', parameter);
  },
  // 街道统计列表
  streetCountList: (parameter) => {
    return request.post('/nbproperty/group/bill-statistics', parameter);
  },
  // 所有查询列表
  personlList: (parameter) => {
    return request.post('/nbproperty/group/bill-list', parameter);
  },
};
export default inquireService;
