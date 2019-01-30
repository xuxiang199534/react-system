import React, { Component } from 'react';
import { Breadcrumb, Card, Table,Popconfirm,Popover,Form,Row,Col,Input,Button,Select } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const Option = Select.Option;
// 布局
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 16
  },
};
const mapStateToProps = (state) => {
  return {
    organizationalManagementModel: state.organizationalManagementModel
  }
};
export default @connect(mapStateToProps)
@Form.create() 
class OrganizationalManagement extends Component {
  constructor (props) {
    super(props);
    this.state = {}
  }
  componentDidMount () {
    const { organizationalManagementModel } = this.props;
    const { params } = organizationalManagementModel;
    this.getList(params)
  }
  handlePaginationChange(page, size){
    const { organizationalManagementModel } = this.props;
    const { params } = organizationalManagementModel;
    let param = {...params,page}
    this.getList(param)
  }
  /**
   * 启用禁用
   */
  changeStatus(record){
    const { dispatch,organizationalManagementModel } = this.props;
    const { params } = organizationalManagementModel;
    if(record.group_type !== '8'){
      dispatch({
        type:'organizationalManagementModel/changeStatus',
        payload:{
          is_enable:record.is_enable === "1"?'2':'1',
          id:record.id,
        },
        callBack:()=>{
          this.getList(params)
        }
      })
    }
  }
  /**
   * 获取列表
   */
  getList(data){
    const { dispatch } = this.props;
    let params = data;
    params.page = data.page?data.page:1;
    params.rows = data.rows?data.rows:10;
    for(let i in params){
      if(typeof(params[i]) === 'undefined' || params[i] === null){
        params[i] = ''
      }
    }
    dispatch({
      type:'organizationalManagementModel/getList',
      payload:{...params}
    })
  }
  /**
   * 搜索
   */
  handSearch(){
    const { form } = this.props;
    form.validateFields((error,val)=>{
      this.getList(val);
    })
  }
  /**
   * 重置
   */
  handleReset(){
    const { form } = this.props;
    let params = {
      page:1,
      rows:10,
      group_name:'',
      name:'',
      group_type:'',
      is_enable:'',
    }
    this.getList(params);
    form.resetFields();
  }
  communitysAuthor(data){
    return (
      <Popover title="权限详情" content={data.map((value, index) => {
        return (
          <span key={index}>{(index + 1) + '. ' + value.name}<br /></span>
        )
      })}>
        <a>查看详情</a>
      </Popover>
    )
  }
  render() {
    const { form,organizationalManagementModel } = this.props;
    const { getFieldDecorator } = form;
    const { list, totals,loading,params } = organizationalManagementModel;
    const columns = [{
      title: '机构名称',
      dataIndex: 'group_name',
      key: 'group_name',
    }, {
      title: '机构类型',
      dataIndex: 'group_type_desc',
      key: 'group_type_desc',
    }, {
      title: '联系人',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '手机号码',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '登录账号',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '状态',
      dataIndex: 'is_enable_desc',
      key: 'is_enable_desc',
    },{
      title: '小区权限',
      dataIndex: 'communitys',
      render:(text, record)=>this.communitysAuthor(record.communitys || [])
    },{
      title: '操作',
      dataIndex: 'desc',
      render:(text, record)=>{
        const isDark = record.group_type==="8" ? { color: '#999' } : {};
        let linkUrl = `/organizationalAddEdit?id=${record.id}`
        return <div>
          {record.group_type !== "8"?<Link to={linkUrl}>编辑</Link>:<span style={isDark}>编辑</span>}
          {record.group_type !== "8"?<Popconfirm title={record.is_enable === '1' ? '是否确认禁用' : '是否确认启用'} okText="确定" cancelText="取消" onConfirm={() => this.changeStatus(record)}>
            <a className="ml10">{record.is_enable === '1' ? '禁用' : '启用'}</a>
          </Popconfirm>
            :
            <a style={isDark} className="ml10">删除</a>
          }
        </div>
      }
    }];
    const pagination = {
      defaultPageSize: 10,
      defaultCurrent: 1,
      current: params.page,
      onChange: this.handlePaginationChange.bind(this),
      total: parseInt(totals),
      showTotal:totals => `共${totals}条`
    }
    return (
      <div className="search-own">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item>机构管理</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Form>
            <Row>
              <Col span={6}>
                <FormItem label="机构名称" {...formItemLayout}>
                  {getFieldDecorator('group_name')(<Input type="text" placeholder="请输入机构名称" />
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="联系人" {...formItemLayout}>
                  {getFieldDecorator('name')(<Input type="text" placeholder="请输入联系人" />
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="机构类型" {...formItemLayout}>
                  {getFieldDecorator('group_type')(
                    <Select placeholder="请选择机构类型" notFoundContent="没有数据">
                      <Option value="">全部</Option>
                      <Option value="1">中介</Option>
                      <Option value="2">街道</Option>
                      <Option value="3">行政中心</Option>
                      <Option value="4">房管中心</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="状态" {...formItemLayout}>
                  {getFieldDecorator('is_enable')(
                    <Select placeholder="请选择机构状态" notFoundContent="没有数据">
                      <Option value="">全部</Option>
                      <Option value="1">启用</Option>
                      <Option value="2">禁用</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col offset={20}>
                <Button type="primary" onClick={()=>{this.handSearch()}} style={{ marginLeft: '10px' }} >查询</Button>
                <Button className="ml10" type="ghost" onClick={()=>{this.handleReset()}}>重置</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card>
          <Link to="/organizationalAddEdit"><Button type="primary" style={{ marginBottom: '10px' }}>新增机构</Button></Link>
          <Table rowKey="id" dataSource={list} loading={loading} columns={columns} pagination={pagination}/>
        </Card>
      </div>
    )
  }
}
