import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './MainLayout.less';

const SubMenu = Menu.SubMenu;
let defaultSelectKey = undefined;

export default @connect(state => { return { MainLayoutModel: state.MainLayoutModel } })
class MainSiderBar extends Component {
  constructor (props) {
    super(props);
  }
  UNSAFE_componentWillMount () {
    if (sessionStorage.getItem('currentSelectKey')) {
      defaultSelectKey = JSON.parse(sessionStorage.getItem('currentSelectKey'));
    }
    this.props.dispatch({
      type: 'MainLayoutModel/init'
    })
  }
  /**
   * 控制同一时间只展开一个二级菜单
   */
  menuOpenChange = (openKeys) => {
    if (openKeys.length > 0) {
      openKeys = [openKeys[openKeys.length - 1]];
    }
    sessionStorage.setItem('currentOpenKey', JSON.stringify(openKeys));
    this.props.dispatch({
      type: 'MainLayoutModel/concat',
      payload: { currentOpenKey: [ ...openKeys ] }
    })
  }
  onMenuSelect ({ item, key, selectedKeys }) {
    sessionStorage.setItem('currentSelectKey', JSON.stringify(selectedKeys));
  }
  render() {
    let { menuList, currentOpenKey } = this.props.MainLayoutModel;
    let QXType = window.sessionStorage.getItem('QXType');
    return (
      <div className="main-siderbar">
        <div className="menu-header">
          
        </div>
        <Menu
          openKeys={currentOpenKey}
          onOpenChange={(val) => this.menuOpenChange(val)}
          mode="inline"
          theme="dark"
          defaultSelectedKeys={defaultSelectKey || []}
          onSelect={(val) => this.onMenuSelect(val)}
        >
          {
            menuList.map((item) => {
              return (
                <SubMenu key={item.id} title={<span><Icon type={item.menuIcon} /><span>{item.menuName}</span></span>}>
                  {item.children && item.children.map((items) => {
                    if (QXType && items.type.indexOf(QXType) != -1) {
                      return (
                        <Menu.Item key={items.id}>
                          <Link to={`${items.menuUrl}`}>
                            {items.menuName}
                          </Link>
                        </Menu.Item>
                      )
                    }
                  })}
                </SubMenu>
              )
            })
          }
        </Menu>
      </div>
    )
  }
}
