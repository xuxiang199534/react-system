import React, { Component } from 'react';
import { Breadcrumb, Card,Form,Row,Col,Input,Button,Select,Radio,Tree,message } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TreeNode = Tree.TreeNode;
// 布局
const formItemLayout = {
  labelCol: { span: 4,offset:1 },
  wrapperCol: { span: 16,offset:1  },
  style: { maxWidth: '600px' }
};
const mapStateToProps = (state) => {
  return {
    organizationalAddEditModel: state.organizationalAddEditModel
  }
};
export default @connect(mapStateToProps)
@Form.create()
class OrganizationalAddEdit extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id:'',
      loading:false,
    }
  }
  componentDidMount () {
    const { dispatch,location } = this.props;
    let paramsId = queryString.parse(location.search);
    dispatch({
      type:'organizationalAddEditModel/getCommunity',
      payload:{}
    })
    if(paramsId.id){
      dispatch({
        type:'organizationalAddEditModel/getInfo',
        payload:{
          id:paramsId.id,
        }
      });
      this.setState({
        id:paramsId.id,
      })
    }
  }
  componentWillUnmount (){
    const { dispatch } = this.props;
    dispatch({
      type:'organizationalAddEditModel/concat',
      payload:{
        detail:{},
        checkedKeys:[],
      }
    })
  }
  handleSave(){
    const { id } = this.state;
    const { form,organizationalAddEditModel,dispatch} = this.props;
    const { checkedKeys } = organizationalAddEditModel;
    form.validateFields((err,val)=>{
      if(!err){
        if(checkedKeys.length === 0){
          message.info('至少选着一个小区')
          return;
        }
        this.setState({
          loading: true,
        })
        const params = val;
        params.communitys = checkedKeys;
        let addEdit = id?'edit':'add';
        if(id){
          params.id = id;
        }
        dispatch({
          type:`organizationalAddEditModel/${addEdit}`,
          payload:{...params},
          callBack:()=>{
            this.setState({loading: false,})
            let messageStr = id?"编辑成功":"新增成功";
            message.success(messageStr);
            this.props.history.push('/organizationalManagement')
          },
          err:()=>{
            this.setState({
              loading: false,
            })
          }
        })
      }
    })
  }
  handleBack(){
    const { history } =  this.props;
    history.push('/organizationalManagement')
  }
  /** 
   * 推送小区
  */
  onChecks( checkedKeys ){
    let arr = [];
    checkedKeys.map((checkedKeys, index) => {
      if (checkedKeys != 'all') {
        arr.push(checkedKeys)
      }
    });
    this.props.dispatch({
      type: 'organizationalAddEditModel/concat',
      payload: { checkedKeys: arr }
    });
  }
  render() {
    const { form,organizationalAddEditModel } = this.props;
    const { loading,id } = this.state;
    const { communityList,detail,checkedKeys } = organizationalAddEditModel;
    const { getFieldDecorator } = form;
    return (
      <div className="search-own">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/organizationalManagement">机构管理</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{id?"编辑":"新增"}</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Form>
            <FormItem label="机构名称" {...formItemLayout}>
              {getFieldDecorator('group_name', {
                initialValue: detail && detail.group_name,
                rules: [{ required: true, message: '请输入机构名称' }, { pattern: /^[0-9a-zA-Z\u4e00-\u9fa5]+$/, message: '请输入正确的机构名称' }],
              })(
                <Input type="text" placeholder="请输入机构名称" />
              )}
            </FormItem>
            <FormItem label="机构类型" {...formItemLayout}>
              {getFieldDecorator('group_type',{
                initialValue: detail && detail.group_type,
                rules: [{ required: true, message: '请选择机构类型' }],
              })(
                <Select placeholder="请选择机构类型" notFoundContent="没有数据">
                  <Option value="1">中介</Option>
                  <Option value="2">街道</Option>
                  <Option value="3">行政中心</Option>
                  <Option value="4">房管中心</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="联系人" {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: detail && detail.name,
                rules: [{ required: true, message: '请输入姓名' }, { pattern: /^[0-9a-zA-Z\u4e00-\u9fa5]+$/, message: '请输入正确的名称' }],
              })(
                <Input type="text" placeholder="请输入姓名" />
              )}
            </FormItem>
            <FormItem label="手机号码" {...formItemLayout}>
              {getFieldDecorator('mobile', {
                initialValue: detail && detail.mobile,
                rules: [{ required: true, message: '请输入手机号码' }, { pattern: /^1[0-9]{10}$/, message: '请输入手机号码' }],
              })(
                <Input type="text" placeholder="请输入手机号码" />
              )}
            </FormItem>
            <FormItem label="登录账号" {...formItemLayout}>
              {getFieldDecorator('username', {
                initialValue: detail && detail.username,
                rules: [{ required: true, message: '请输入登录账号(字母、数字、中文、下划线,不超过20位)' }, { pattern: /^[\da-zA-Z_\u4e00-\u9f5a]{1,20}$/, message: '请输入登录账号(字母、数字、中文、下划线,不超过20位)' }],
              })(
                <Input type="text" placeholder="请输入登录账号(字母、数字、中文、下划线,不超过20位)" />
              )}
            </FormItem>
            {id === ""?<FormItem label="登录密码" {...formItemLayout}>
              {getFieldDecorator('password', {
                initialValue: detail && detail.password,
                rules: [{ required: true, message: '请输入登录密码(6~20个字符，区分大小写)' }, { pattern: /^(\w){6,20}$/, message: '请输入登录密码(6~20个字符，区分大小写)' }],
              })(
                <Input type="text" placeholder="请输入登录密码(6~20个字符，区分大小写)" />
              )}
            </FormItem>:''}
            <FormItem label="账号状态" {...formItemLayout}>
              {getFieldDecorator('is_enable', {
                initialValue: detail&&detail.is_enable?Number(detail.is_enable):1,
                rules: [{ required: true, message: '请选择账号状态' }],
              })(
                <RadioGroup><Radio value={1}>启用</Radio><Radio value={2}>禁用</Radio></RadioGroup>
              )}
            </FormItem>
            <Row>
              <Col span={8} offset={1} >
                <Card title="小区权限">
                  <Tree
                    checkable
                    defaultExpandAll={true}
                    defaultExpandedKeys={['all']}
                    checkedKeys={checkedKeys}
                    onCheck={this.onChecks.bind(this)}
                  >
                    <TreeNode title="全选" key="all">
                      {communityList ? communityList.map((value, index) => {
                        return <TreeNode title={value.name} key={value.id}></TreeNode>
                      }
                      ) : null}
                    </TreeNode>
                  </Tree>
                </Card>
              </Col>
            </Row>
            <FormItem wrapperCol={{span: 22, offset: 1}}>
              <Button type="primary" loading={loading} className="mr10" onClick={this.handleSave.bind(this)}>保存</Button>
              <Button type="ghost" onClick={this.handleBack.bind(this)}>取消</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}
