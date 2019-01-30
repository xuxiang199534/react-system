import React from "react";
import { connect } from 'react-redux';
import { Form, Input, Button } from "antd";
import "./../Login/login.less";
import { checkPhone } from '../../utils/util';
import step1 from "../../images/step1.png";
import step2 from "../../images/step2.png";
const FormItem = Form.Item;
let timer;

export default @connect(state => { return { ...state.ForgotPassword, ...state.login } })
@Form.create()
class ForgotPassword extends React.Component {  
  componentDidMount () {
    this.props.dispatch({
      type: 'ForgotPassword/init',
      payload: {}
    })
  }
  /**
   * 返回登录
   */
  backLogin () {
    let { dispatch } = this.props;
    clearInterval(timer);
    dispatch({
      type: 'ForgotPassword/concat',
      payload: {
        count: '获取验证码',
        flagSend: true,
      }
    });
    window.location.href = '#/';
  }
  /**
   * 获取验证码
   */
  sendCode () {
    let { form, dispatch } = this.props;
    form.validateFields(['phone'], (err, values) => {
      if (err) { return }
      dispatch({
        type: 'ForgotPassword/getSmsCode',
        payload: {
          mobile: values.phone,
        },
        callback: () => {
          let count = 180;
          timer = setInterval(() => {
            count--;
            if (count == 0) {
              clearInterval(timer);
              dispatch({
                type: 'ForgotPassword/concat',
                payload: {
                  count: '发送验证码',
                  flagSend: true,
                }
              });
            } else {
              dispatch({
                type: 'ForgotPassword/concat',
                payload: {
                  count: count + 's后重试',
                  flagSend: false,
                }
              });
            }
          }, 1000);
        }
      })
    });
  }
  /**
   * 身份验证 => 下一步
   */
  handleCode () {
    let { form, dispatch, loginType } = this.props;
    form.validateFields(['phone', 'code'], (err, values) => {
      if (err) { return }
      dispatch({
        type: 'ForgotPassword/validateSmsCode',
        payload: {
          mobile: values.phone,
          code: values.code,
          user_type: loginType
        },
        callback: () => {
          clearInterval(timer);
          dispatch({
            type: 'ForgotPassword/concat',
            payload: {
              count: '获取验证码',
              flagSend: true,
            }
          });
        }
      })
    });
  }
  /**
   * 验证再次输入密码与首次输入是否相同
   */
  checkPass (rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }
  /**
   * 密码重置 => 下一步
   */
  handlePassword () {
    let { form, phone, loginType, acode, dispatch } = this.props;
    form.validateFields(['password','newpassword'], (err, values) => {
      if (err) { return }
      dispatch({
        type: 'ForgotPassword/resetPassword',
        payload: {
          password: values.password,
          mobile: phone,
          acode: acode,
          user_type: loginType
        },
      })
    });
  }
  /**
   * 监听输入新密码
   * @param {Object} e 事件对象
   */
  entryPassword (e) {
    const { resetFields } = this.props.form;
    resetFields(['newpassword']);
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    let { count, flagSend, showPassword, loadingOne, loadingTwo } = this.props;
    return (
      <div className="login">
        <div className="login">
          <div className="layout">
            <span className="logoSpan">物业缴费查询系统</span>
            {showPassword == false ?
              <div className="contents identifyCode">
                <h1 className="title">找回密码</h1>
                <img src={step1} />
                <Form>
                  <FormItem>
                    {getFieldDecorator("phone", {
                      rules: [{ required: true, message: '请输入手机号码' }, { validator: checkPhone.bind(this), message: '请输入手机号码！' }],
                    })(<Input placeholder="手机号码" />)}
                  </FormItem>
                  <div className="clearfix">
                    <FormItem className="code">
                      {getFieldDecorator("code", {
                        rules: [{ required: true, message: "请输入验证码" }]
                      })(
                        <Input
                          type="type"
                          placeholder="验证码"
                        />
                      )}
                    </FormItem>
                    {flagSend == true ?
                      <div className="send" onClick={() => this.sendCode()}>{count}</div>
                      :
                      <div className="send disabledSend">{count}</div>
                    }
                  </div>
                  <span className="forget" onClick={() => this.backLogin()}>返回登录</span>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="button"
                    onClick={() => this.handleCode()}
                    loading={loadingOne}
                  >
                  下一步
                  </Button>
                </Form>
              </div>
              :
              <div className="contents identifyCode password">
                <h1 className="title">找回密码</h1>
                <img src={step2}/>
                <Form>
                  <FormItem>
                    {getFieldDecorator("password", {
                      rules: [{ required: true, pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/, whitespace: true, message: '密码格式为6~20位英文字母+数字' }]
                    })(
                      <Input placeholder="新密码" type="password" onChange={(e) => this.entryPassword(e)}/>
                    )}
                  </FormItem>
                  <div>
                    <FormItem>
                      {getFieldDecorator("newpassword", {
                        rules: [{ required: true, message: '再次输入新密码' },
                          { validator: this.checkPass.bind(this)}]
                      })(
                        <Input
                          type="password"
                          placeholder="再次确认"
                        />
                      )}
                    </FormItem>
                  </div>
                  <span className="forget" onClick={() => this.backLogin()}>返回登录</span>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="button"
                    onClick={() => this.handlePassword()}
                    loading={loadingTwo}
                  >
                  下一步
                  </Button>
                </Form>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

