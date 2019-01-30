import request from '../utils/request';
const systemSettingsService = {
  // 机构列表
  getUserList: (parameter) => {
    return request.post('/nbproperty/group/user-list', parameter)
  },
  //禁用启用
  getUserStatus: (parameter) => {
    return request.post('/nbproperty/group/user-status', parameter)
  },
  //新增
  userAdd: (parameter) => {
    return request.post('/nbproperty/group/user-add', parameter)
  },
  //编辑
  userEdit: (parameter) => {
    return request.post('/nbproperty/group/user-edit', parameter)
  },
  //详情
  getUserShow: (parameter) => {
    return request.post('/nbproperty/group/user-show', parameter)
  },
  //获取小区
  communityDropDown: (parameter) => {
    return request.post('/nbproperty/group/community-drop-down', parameter)
  },
}
export default systemSettingsService;