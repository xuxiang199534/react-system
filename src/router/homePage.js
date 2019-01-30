import asyncComponent from '../common/AsyncComponent/asyncComponent';

const HomePageRouter = [
  {
    path: '/homePage',
    component: asyncComponent(() => import(/* webpackChunkName: 'homePage'*/ "../components/homePage/homePage")),
    children: []
  }
];

export default HomePageRouter;