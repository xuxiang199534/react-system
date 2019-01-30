import React from "react";
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { getLocal } from '../../utils/util';

import "./login.less";
import { setLocal, removeLocal } from '../../utils/util';
const FormItem = Form.Item;

export default @connect(state => { return { ...state.login }})
@Form.create()
class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  componentDidMount () {
    sessionStorage.removeItem('currentSelectKey');
    sessionStorage.removeItem('currentOpenKey');
    this.props.dispatch({
      type: 'login/concat',
      payload: {
        token: '',
        username: getLocal('usernameLOCAL') || '',
        password: getLocal('passwordLOCAL') || '',
        checked: getLocal('autoLoginLOCAL') || 0,
        loginType: '1',
        loading: false
      }
    })
  }
  /**
   * 登录
   */
  handleSubmit (e) {
    let { form, dispatch, loginType } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) { return }
      dispatch({
        type: 'login/login',  
        payload: {
          username: values.username,
          password: values.password,
          user_type: parseInt(loginType)
        }
      })
    });
  }
  /**
   * 忘记密码
   */
  forgetPassword () {
    window.location.href = '#/forgotPassword';
  }
  /**
   * 监听是否设置自动登录
   * @param {Object} e 
   */
  checkboxChange (e) {
    let checked = e.target.checked;
    let autoLogin = checked ? 1 : 0;
    let { username, password } = this.props;
    if (checked) {
      setLocal('usernameLOCAL', username);
      setLocal('passwordLOCAL', password);
      setLocal('autoLoginLOCAL', autoLogin);
    } else {
      removeLocal('usernameLOCAL');
      removeLocal('passwordLOCAL');
      removeLocal('autoLoginLOCAL');
    }
    this.props.dispatch({
      type: 'login/concat',
      payload: {
        checked: autoLogin
      }
    })
  }
  /**
   * 监听用户名&密码change
   * @param {Object} e 
   * @param {String} key model内对应更新的字段key
   */
  iptChange (e, key) {
    let val = e.target.value;
    let payload = {};
    payload[key] = val;
    let autoLogin = getLocal('autoLoginLOCAL');
    if (autoLogin == 1) {
      setLocal(`${key}LOCAL`, val);
    }
    this.props.dispatch({
      type: 'login/concat',
      payload: payload
    })
  }
  /**
   * 个人用户、阻止机构切换
   * @param {String} val 当前选中loginType值
   */
  tabPaneChange (val) {
    this.props.dispatch({
      type: 'login/concat',
      payload: { loginType: val }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    let { checked, username, password, loginType, loading } = this.props;
    return (
      <div className="login">
        <div className="login">
          <div className="layout">
            <span className="logoSpan">物业缴费查询系统</span>
            <div className="contents">
              <h1 className="title">登录</h1>
              <div className="type-choice">
                <span 
                  className={loginType == '1' ? "type-btn type-btn-active" : "type-btn"} 
                  onClick={() => this.tabPaneChange('1')}>
                  个人用户
                </span>
                <span
                  className={loginType == '2' ? "type-btn type-btn-active" : "type-btn"} 
                  onClick={() => this.tabPaneChange('2')}>
                  组织机构
                </span>
              </div>
              <Form>
                <FormItem>
                  {getFieldDecorator("username", {
                    rules: [{ required: true, message: "请输入用户名" }],
                    initialValue: username || undefined
                  })(
                    <Input prefix={<Icon type="user" />} placeholder="用户名" onChange={(e) => this.iptChange(e, 'username')}/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("password", {
                    rules: [{ required: true, message: "请输入密码" }],
                    initialValue: password || undefined
                  })(
                    <Input
                      prefix={<Icon type="lock" />}
                      type="password"
                      placeholder="密码"
                      onChange={(e) => this.iptChange(e, 'password')}
                    />
                  )}
                </FormItem>
                <Checkbox onChange={(e) => this.checkboxChange(e)} checked={checked == 1 ? true : false}>
                  自动登录
                </Checkbox>
                <span className="forget" onClick={() => this.forgetPassword()}>忘记密码</span>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="button"
                  onClick={(e) => this.handleSubmit(e)}
                  loading={loading}
                >
                  登录
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

