import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';
import { ModalLayout } from '.';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true,
});

describe('ModalLayout Component', () => {
  it('Should render without errors', () => {
    const component = shallow(<ModalLayout />);
    const wrapper = component.find('.modalWindow');
    expect(wrapper.length).toBe(1);
  });
});
