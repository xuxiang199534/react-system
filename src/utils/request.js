import axios from 'axios';
import { message } from 'antd';
import { getUrl } from '../utils/util';
import queryString from 'query-string';
import md5 from 'crypto-js/md5';

// 默认实例参数
const defaultOptions = {
  baseURL: `${getUrl()}`,
  method: 'POST',
  timeout: 30000,
  validateStatus: function() {
    return true
  }
}

let CancelToken = axios.CancelToken;
// let cancel;
const request = axios.create(
  { 
    ...defaultOptions,
    cancelToken: new CancelToken(function (c) {
      // cancel = c;
    })
  }
);

request.interceptors.request.use(async (config) => {
  const params = {
    data: JSON.stringify(config.data),
    token: sessionStorage.getItem('QXToken')
  };
  const  appSecret = 'HU6%12(w';
  //四位随机数(1000-9999)
  let rand = parseInt(Math.random() * 8999 + 1000, 10).toString();
  let timestamp = new Date().getTime().toString();
  let md5String = JSON.stringify({"data": config.data, "rand": rand, "timestamp": timestamp, "token": params.token});
  //验签算法
  let sign = md5(md5(md5String).toString() + appSecret).toString();

  config.headers.Accept = 'application/json';
  config.headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  config.headers['Zj-Custom-Rand'] = rand;
  config.headers['Zj-Custom-Timestamp'] = timestamp;
  config.headers['Zj-Custom-Sign'] = sign;
  config.data = queryString.stringify(params);
  return config;
})

request.interceptors.response.use((response) => {
  const { code, error } = response.data;
  if (code == 20000) {
    return Promise.resolve(response.data);
  } else if (code == 50002 ) {
    setTimeout(() => {
      location.href = '#/';
    }, 2000);
    message.destroy();
    message.info('登录信息已失效，3秒后将自动跳转到登录页...');
    return Promise.resolve(response.data)
  } else {
    message.destroy();
    message.error(error && error.errorMsg || '网络错误');
    return Promise.resolve(response.data)
  }
}, (error) => {
  message.error(error && error || '网络错误');
  return Promise.reject(error);
})

export default request;
