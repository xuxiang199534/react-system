import React, { Component } from 'react';
import { Breadcrumb, Card, Table } from 'antd';
import { connect } from 'react-redux';
import './infoSearch.less';

export default @connect(state => { return { searchOwnModel: state.searchOwnModel } })
class searchOwn extends Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    this.props.dispatch({
      type: 'searchOwnModel/reqList',
      payload: {
        page: 1,
        rows: 10
      }
    })
  }
  render() {
    let { dataSource, totals, loading } = this.props.searchOwnModel;
    const columns = [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
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
      key: 'community_name'
    }, {
      title: '房屋信息',
      dataIndex: 'room_info',
      key: 'room_info'
    }];
    const paginationConfig = {
      total: parseInt(totals),
      pageSize: 10,
      onChange: (page, pageSize) => {
        this.props.dispatch({
          type: 'searchOwnModel/concat',
          payload: {
            page: page
          }
        })
        this.props.dispatch({
          type: 'searchOwnModel/reqList',
          payload: {
            page: page,
            rows: 10
          }
        })
      }
    }
    return (
      <div className="search-own">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>信息查询</Breadcrumb.Item>
          <Breadcrumb.Item>个人查询</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Table 
            dataSource={dataSource} 
            columns={columns} 
            loading={loading}
            pagination={{ ...paginationConfig }} 
            rowKey={state => state.key}
          />
        </Card>
      </div>
    )
  }
}
