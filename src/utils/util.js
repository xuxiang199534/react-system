// 判断当前是否是开发环境
export function isDevEnvironment() {
  let isDev = false;
  let location = window.location;
  let hostname = location.hostname;
  if (hostname == 'localhost' || hostname == '127.0.0.1') {
    isDev = true
  }
  return isDev;
}

export function getUrl () {
  let location = window.location, hostname = location.hostname;
  if(hostname=='localhost' || hostname=='127.0.0.1'){   //本地启动接口地址
    return 'http://115.231.181.17:81'
  } else if (hostname =='115.231.181.17'){  //测试地址
    return 'http://115.231.181.17:81'
  }
}

export function checkPhone(rule, value, callback) {
  let regex = /^1[0-9]{10}$/;//手机号
  if (value && !regex.test(value)) {
    //react使用正则表达式变量的test方法进行校验，直接使用value.match(regex)显示match未定义
    callback('请输入正确的手机号码！');
  } else {
    callback();
  }
}

export function download(url){
  if (url && Object.prototype.toString.call(url) === '[object String]') {
    let a = document.createElement('a')
    a.href = encodeURI(url);
    a.download = 'excel';
    a.id = 'downLoad';
    a.style.display = 'none';
    // a.click()
    document.body.appendChild(a);
    document.getElementById('downLoad').click()
    document.body.removeChild(document.getElementById('downLoad'))
    a = null
  }
}

export function getLocal (key) {
  return window.localStorage.getItem(key);
}

export function setLocal (key, value) {
  window.localStorage.setItem(key, value);
}

export function removeLocal (key) {
  window.localStorage.removeItem(key);
}