import React, { Component } from 'react';
import { Breadcrumb, Card, Table } from 'antd';
import { connect } from 'react-redux';
import './infoSearch.less';

export default @connect(state => {return { streetCountModel: state.streetCountModel }})
class searchOwn extends Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    this.props.dispatch({
      type: 'streetCountModel/reqList',
      payload: {
        page: 1,
        rows: 10
      }
    })
  }
  render() {
    let { dataSource, totals, dataSourceCurrent, loading } = this.props.streetCountModel;
    const columnsCurrent = [{
      title: '小区数',
      dataIndex: 'community_num',
      key: 'community_num',
    }, {
      title: '住户数（户）',
      dataIndex: 'room_user_num',
      key: 'room_user_num',
    }, {
      title: '总账单（元）',
      dataIndex: 'total_amount',
      key: 'total_amount',
    }, {
      title: '已交账单（元）',
      dataIndex: 'paid_amount',
      key: 'paid_amount',
    }, {
      title: '收费率（%）',
      dataIndex: 'charge_rate',
      key: 'charge_rate',
    }];
    const columns = [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
    }, {
      title: '小区名称',
      dataIndex: 'community_name',
      key: 'community_name',
    }, {
      title: '住户数（户）',
      dataIndex: 'room_user_num',
      key: 'room_user_num',
    }, {
      title: '总账单（元）',
      dataIndex: 'total_amount',
      key: 'total_amount',
    }, {
      title: '已交账单（元）',
      dataIndex: 'paid_amount',
      key: 'paid_amount',
    }, {
      title: '收费率（%）',
      dataIndex: 'charge_rate',
      key: 'charge_rate',
    } ];
    const paginationConfig = {
      total: parseInt(totals),
      pageSize: 10,
      onChange: (page, pageSize) => {
        this.props.dispatch({
          type: 'streetCountModel/concat',
          payload: {
            page: page
          }
        })
        this.props.dispatch({
          type: 'streetCountModel/reqList',
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
          <Breadcrumb.Item>街道统计</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Table 
            dataSource={dataSourceCurrent} 
            columns={columnsCurrent} 
            pagination={false} 
            rowKey={state => state.key}
          />
        </Card>
        <Card>
          <Table 
            dataSource={dataSource}
            columns={columns}
            pagination={{ ...paginationConfig }} 
            rowKey={state => state.key}
            loading={loading}
          />
        </Card>
      </div>
    )
  }
}
