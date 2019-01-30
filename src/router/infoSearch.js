import asyncComponent from '../common/AsyncComponent/asyncComponent';

const InfoSearchRouter = [
  // 个人查询
  { 
    path: '/searchOwn',
    component: asyncComponent(() => import(/* webpackChunkName: 'searchOwn'*/ "../components/infoSearch/searchOwn")),
    children: []
  },
  // 街道统计
  { 
    path: '/streetCount',
    component: asyncComponent(() => import(/* webpackChunkName: 'streetCount'*/ "../components/infoSearch/streetCount")),
    children: []
  },
  // 中介查询
  { 
    path: '/intermediaryList',
    component: asyncComponent(() => import(/* webpackChunkName: 'intermediaryList'*/ "../components/infoSearch/inquireList")),
    children: []
  },
  // 街道查询
  { 
    path: '/streetList',
    component: asyncComponent(() => import(/* webpackChunkName: 'streetList'*/ "../components/infoSearch/inquireList")),
    children: []
  },
  // 行政中心查询
  { 
    path: '/administrativeList',
    component: asyncComponent(() => import(/* webpackChunkName: 'administrativeList'*/ "../components/infoSearch/inquireList")),
    children: []
  },
  // 房管中心查询
  { 
    path: '/housingManagementList',
    component: asyncComponent(() => import(/* webpackChunkName: 'housingManagementList'*/ "../components/infoSearch/inquireList")),
    children: []
  }
];

export default InfoSearchRouter;