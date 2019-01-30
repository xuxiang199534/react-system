import asyncComponent from '../common/AsyncComponent/asyncComponent';

const SystemSettingsRouter = [
  {
    path: '/organizationalManagement',
    component: asyncComponent(() => import(/* webpackChunkName: 'organizationalManagement'*/ "../components/systemSettings/organizationalManagement.js")),
    children: []
  },
  {
    path: '/organizationalAddEdit',
    component: asyncComponent(() => import(/* webpackChunkName: 'organizationalAddEdit'*/ "../components/systemSettings/organizationalAddEdit.js")),
    children: []
  }
];

export default SystemSettingsRouter;