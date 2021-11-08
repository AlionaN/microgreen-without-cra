import 'jsdom-global/register';
import React from 'react';
import { SignInForm } from './SignInForm';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';

const middlewares = [];
const mockStore = configureStore(middlewares);

configure({ adapter: new Adapter() });

const useSelectorMock = jest.spyOn(redux, 'useSelector');
const useDispatchMock = jest.spyOn(redux, 'useDispatch');

let store = mockStore();

const isLogInState = false;
const isLogInTrue = true;

const loginStatusDefault = {
  loading: false,
  success: null,
  error: null
};

const loginStatusLoading = {
  loading: true,
  success: null,
  error: null
};

const loginStatusSuccess = {
  loading: false,
  success: 'Action is success',
  error: null
};

const loginStatusFailure = {
  loading: false,
  success: null,
  error: 'Action is failure'
};

const onFormChange = jest.fn();

const userInfo = {
  email: 'test@gmail.com',
  password: 'skjn879rsgiueh983'
};

beforeEach(() => {
  useSelectorMock.mockClear();
  useDispatchMock.mockClear();
});

const component = shallow(
  <Provider store={store}>
    <SignInForm onFormChange={onFormChange} />
  </Provider>
);

describe('Test case for Sign In component', () => {
  
  it('Should render without errors', () => {
    const dummyDispatch = jest.fn();
    const dispatch = useDispatchMock.mockReturnValue(dummyDispatch);
    const isLogin = useSelectorMock.mockReturnValue(isLogInState);
    const loginStatus = useSelectorMock.mockReturnValue(loginStatusDefault);

    const signinComponent = component.find('SignInForm');
    const signinWrapper = signinComponent.dive();

    expect(signinWrapper.length).toBe(1);
  });

  it('Button should become disabled after click (loading)', () => {
    const dummyDispatch = jest.fn();
    const dispatch = useDispatchMock.mockReturnValue(dummyDispatch);
    const isLogin = useSelectorMock.mockReturnValue(isLogInState);
    const loginStatus = useSelectorMock.mockReturnValue(loginStatusLoading);

    const signinComponent = component.find('SignInForm');
    const signinWrapper = signinComponent.dive();

    signinWrapper.find('input[type="submit"]').simulate('click');
    
    expect(signinWrapper.find('input[type="submit"]').prop('disabled')).toBeTruthy();
  });

  it('Should appear success message after success login', () => {
    const dummyDispatch = jest.fn();
    const dispatch = useDispatchMock.mockReturnValue(dummyDispatch);
    let isLogin = useSelectorMock.mockReturnValue(isLogInTrue);
    let loginStatus = useSelectorMock.mockReturnValue(loginStatusSuccess);

    const signinComponent = component.find('SignInForm');
    const signinWrapper = signinComponent.dive();

    expect(signinWrapper.find('.message').length).toBe(1);
    expect(signinWrapper.find('.message').text()).toBe('You are successfully logged in');
  });

  it('Should appear failure message after failure login', () => {
    const dummyDispatch = jest.fn();
    const dispatch = useDispatchMock.mockReturnValue(dummyDispatch);
    let isLogin = useSelectorMock.mockReturnValue(isLogInState);
    let loginStatus = useSelectorMock.mockReturnValue(loginStatusFailure);

    const signinComponent = component.find('SignInForm');
    const signinWrapper = signinComponent.dive();

    expect(signinWrapper.find('.error').last().length).toBe(1);
    expect(signinWrapper.find('.error').last().text()).toBe('Action is failure');
  });

});
