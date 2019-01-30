import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Input, Button } from 'antd';
const FormItem = Form.Item;
import './MainLayout.less';


export default @connect(state => { return { MainLayoutModel: state.MainLayoutModel } })
@Form.create()
class MainHeader extends Component {
  constructor(props) {
    super(props);
  }
  /**
  * 退出登入
  */
  logout(){
    const _th = this;
    Modal.confirm({
      title: '确认退出该账号？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        _th.props.dispatch({
          type: 'MainLayoutModel/loginOut',
          payload: {}
        });
      }
    });
    
  }
  /**
   * 修改密码弹窗
   */
  showModal() {
    this.props.dispatch({
      type: 'MainLayoutModel/concat',
      payload: {
        visible: true
      }
    });
  }
  /**
   * 隐藏修改密码弹窗
   */
  hideModal(){
    let { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'MainLayoutModel/concat',
      payload: {
        visible: false,
      }
    });
  }
  /**
   * 修改密码submit
   */

  handleSubmit(e){
    let { form, dispatch } = this.props;
    e.preventDefault();
    form.validateFields(['password', 'rePasswd','old_password'], (err, values) => {
      if (err) {
        return;
      }
      let param = form.getFieldsValue(['password', 'old_password']);
      dispatch({
        type: 'MainLayoutModel/changePassword',
        payload: param
      })
    })
  }

  /**
   * 验证两次密码是否输入一致
   */
  checkPass2(rule, value, callback) {
    const {
      getFieldValue
    } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }

  /**
   * 修改新密码时 清空二次确认密码
   */
  handleChange(val){
    let { form } = this.props;
    form.resetFields(['rePasswd'])
  }

  render() {
    let { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className="main-header">
        <div className="right">
          <a href="javascript:;" className="operate-btn" onClick={this.logout.bind(this)}>退出登录</a>
          <a className="operate-btn" onClick={this.showModal.bind(this)}>修改密码</a>
        </div>
        <Modal title="修改密码" visible={this.props.MainLayoutModel.visible} onCancel={this.hideModal.bind(this)} footer={false}>
          <Form horizontal="true">
            <FormItem>
              {getFieldDecorator('old_password', { rules: [{ required: true, message: '请填写原密码' }] })(<Input type="password" placeholder="请填写原密码" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', { rules: [{ required: true, pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/, whitespace: true, message: '密码格式为6~20位英文字母+数字' }] })(
                <Input type="password" placeholder="请输入6-20位新密码" onChange={this.handleChange.bind(this)} autoComplete="off" onContextMenu={()=>{return false;}} onPaste={()=>{return false;}} onCopy={()=>{return false;}} onCut={()=>{return false;}} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('rePasswd', { rules: [{ required: true, message: '再次输入新密码' }, { validator: this.checkPass2.bind(this), }] })(
                <Input type="password" placeholder="请再次输入新密码" autoComplete="off" onContextMenu={()=>{return false;}} onPaste={()=>{return false;}} onCopy={()=>{return false;}} onCut={()=>{return false;}} />
              )}
            </FormItem>
            <Button type="primary" className="bigSubmitBtn w100" onClick={this.handleSubmit.bind(this)}>提交</Button>
          </Form>
        </Modal>
      </div>
    )
  }
}
