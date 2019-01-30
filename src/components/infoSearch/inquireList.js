import React, { Component } from 'react';
import { Breadcrumb, Card, Table, Form, Col, Row, Select, Input, Button, DatePicker } from 'antd';
import { connect } from 'react-redux';
const FormItem = Form.Item;
const Option = Select.Option;
import { download } from '../../utils/util';
const { RangePicker } = DatePicker;

const mapStateToProps = (state) => {
  return {
    inquireListModel: state.inquireListModel
  }
};

export default @connect(mapStateToProps)
@Form.create()
class inquireList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'inquireListModel/reqList',
      payload: {
        page: 1,
        rows: 10,
        name: '',
        community_id: '',
        start_at: '',
        end_at: '',
        card_no: '',
        type: ''
      }
    })
    this.props.dispatch({
      type: 'inquireListModel/communityList',
      payload: {
        
      }
    })
  }
  /**
   * 分页change
   * @param {} page 
   * @param {*} size 
   */
  handlePaginationChange(page, size){
    const { inquireListModel } = this.props;
    const { params } = inquireListModel;
    let param = {...params,page}
    this.props.dispatch({
      type: 'inquireListModel/reqList',
      payload: param
    })
  }

  /**
   * 搜索
   */
  handleSubmit() {
    this.props.form.validateFields((err, values) => {
      const param = {
        community_id: values.community_id || '',
        name: values.name || '',
        card_no: values.card_no || '',
        type: values.type || '',
      };
      param.page = 1;
      param.rows = 10;
      if (values.date && values.date.length > 0) {
        param.start_at = values.date ? values.date[0].format('YYYY-MM-DD') : '';
        param.end_at = values.date ? values.date[1].format('YYYY-MM-DD') : '';
      } else {
        param.start_at = '';
        param.end_at = '';
      }
      this.props.dispatch({
        type: 'inquireListModel/reqList',
        payload: param
      })
    })
  }

  /**
   * 重置
   */
  handleReset() {
    let { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'inquireListModel/reqList',
      payload: {
        page: 1,
        rows: 10,
        name: '',
        community_id: '',
        start_at: '',
        end_at: '',
        card_no: '',
        type: ''
      }
    })
  }

  /**
   * 房管中心导出
   */
  handleExport() {
    let { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      const param = {
        community_id: values.community_id || '',
        name: values.name || '',
        card_no: values.card_no || '',
        type: values.type || '',
      };
      param.page = this.props.inquireListModel.params.page;
      param.rows = 10;
      if (values.date && values.date.length > 0) {
        param.start_at = values.date ? values.date[0].format('YYYY-MM-DD') : '';
        param.end_at = values.date ? values.date[1].format('YYYY-MM-DD') : '';
      } else {
        param.start_at = '';
        param.end_at = '';
      }
      console.log('before request');
      dispatch({
        type: 'inquireListModel/houseExport',
        payload: param,
        callback(data) {
          download(data);
        }
      });
    });
  }

  render() {
    let { dataSource, totals, communityList,params, loading } = this.props.inquireListModel;
    let { pathname } = this.props.location;
    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '账单日期',
      dataIndex: 'bill_date',
      key: 'bill_date',
    }, {
      title: '应缴金额（元）',
      dataIndex: 'bill_amount',
      key: 'bill_amount',
    }, {
      title: '已缴金额（元）',
      dataIndex: 'paid_amount',
      key: 'paid_amount',
    }, {
      title: '欠费金额（元）',
      dataIndex: 'no_amount',
      key: 'no_amount',
    }, {
      title: '小区名称',
      dataIndex: 'community_name',
      key: 'community_name',
    }, {
      title: '房屋信息',
      dataIndex: 'room_info',
      key: 'room_info',
    }, {
      title: '业主',
      dataIndex: 'name',
      key: 'name',
    }];
    const paginationConfig = {
      defaultPageSize: 10,
      defaultCurrent: 1,
      current: params.page,
      onChange: this.handlePaginationChange.bind(this),
      total: parseInt(totals),
      showTotal:totals => `共${totals}条`
    }

    // 布局
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 16
      },
    };

    const formItemLayout1 = {
      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 21
      },
    }
    return (
      <div className="search-own">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>信息查询</Breadcrumb.Item>
          {pathname === '/intermediaryList' ? <Breadcrumb.Item>中介查询</Breadcrumb.Item> : null}
          {pathname === '/streetList' ? <Breadcrumb.Item>街道查询</Breadcrumb.Item> : null}
          {pathname === '/administrativeList' ? <Breadcrumb.Item>行政中心查询</Breadcrumb.Item> : null}
          {pathname === '/housingManagementList' ? <Breadcrumb.Item>房管中心查询</Breadcrumb.Item> : null}
        </Breadcrumb>
        <Card className="section">
          <Form>
            <Row>
              <Col span={6}>
                <FormItem label="小区名称" {...formItemLayout}>
                  {getFieldDecorator('community_id')(
                    <Select placeholder="请选择小区名称" showSearch optionFilterProp="children">
                      {
                        communityList.map(item=>{
                          return <Option value={item.id} key={item.id}>{item.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="业主姓名" {...formItemLayout}>
                  {getFieldDecorator('name')(
                    <Input placeholder="请输入业主姓名" />
                  )}
                </FormItem>
              </Col>
              {
                pathname === '/housingManagementList' ?
                  <Col span={12}>
                    <FormItem label="日期" {...formItemLayout1}>
                      {getFieldDecorator('date')(<RangePicker placeholder={['开始时间', '结束时间']} style={{ width: '96%' }} format="YYYY-MM-DD" />)}
                    </FormItem>
                  </Col> : null
              }
              <Col span={6}>
                <FormItem label="身份证号" {...formItemLayout}>
                  {getFieldDecorator('card_no')(
                    <Input placeholder="请输入身份证号" />
                  )}
                </FormItem>
              </Col>

              {
                pathname === '/streetList' || pathname === '/administrativeList' ?
                  <Col span={6}>
                    <FormItem label="是否党员" {...formItemLayout}>
                      {getFieldDecorator('type')(
                        <Select placeholder="请选择是否党员">
                          <Option value="1">是</Option>
                          <Option value="2">否</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col> : null
              }
              
          
              <Col span={5} offset={1}>
                <Button type="primary" style={{ marginRight: 10 }} onClick={this.handleSubmit.bind(this)}>查询</Button>
                <Button type="ghost" style={{ marginRight: 10 }} onClick={this.handleReset.bind(this)}>重置</Button>
                {pathname === '/housingManagementList' ? <Button type="ghost" onClick={this.handleExport.bind(this)}>导出</Button> : null}
              </Col>
            </Row>
          </Form>
        </Card>
        <Card>
          <Table dataSource={dataSource} loading={loading} columns={columns} pagination={{ ...paginationConfig }} rowKey={state => state.id}/>
        </Card>
      </div>
    )
  }
}
