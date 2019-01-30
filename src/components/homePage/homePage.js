import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import './homePage.less';

export default @connect(state => { return { homePageModel: state.homePageModel } })
@Form.create()
class HomePage extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div className="home-page">
        <div className="welcome">
          欢迎使用物业缴费查询系统
        </div>
      </div>
    )
  }
}
