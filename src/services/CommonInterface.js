import request from '../utils/request';

const commonInterface = {
  // 用户登录
  login: (parameter) => {
    return request.post('/nbproperty/user/login', parameter);
  },
  // 用户退出
  loginOut: (parameter) => {
    return request.post('/nbproperty/user/login-out', parameter);
  },
  // 获取验证码
  getSmsCode: (parameter) => {
    return request.post('/nbproperty/user/get-sms-code', parameter);
  },
  // 身份验证 => 下一步
  validateSmsCode: (parameter) => {
    return request.post('/nbproperty/user/validate-sms-code', parameter);
  },
  // 重置密码 => 下一步
  resetPassword: (parameter) => {
    return request.post('/nbproperty/user/reset-password', parameter);
  },
  //变更密码
  changePassword: (parameter) => {
    return request.post('/nbproperty/user/change-password', parameter)
  },
};
export default commonInterface;
