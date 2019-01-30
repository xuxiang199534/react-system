import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from '../src/createStore';

const { store } = configureStore();
import HomePage from '../src/components/homePage/homePage';
const { shallow, mount } = Enzyme;

Enzyme.configure({ adapter: new Adapter() });

describe('测试homePage', function (done) {
  it('homePage title', function () {
    let homePage = mount(<Provider store={store}><HomePage /></Provider>);
    // expect(homePage.find('.title').text()).to.equal('首页');
  });
});
describe('ppppp', function () {
  it('test 点击事件', function () {
    let homePage = mount(<Provider store={store}><HomePage /></Provider>);
    // let nameValue = homePage.find('.name').text();
    // homePage.find('.click-btn').simulate('click');
    // expect(homePage.find('.name').text()).to.equal(nameValue);
  })
});
