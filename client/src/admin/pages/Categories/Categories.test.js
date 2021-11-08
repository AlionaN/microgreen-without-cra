import 'jsdom-global/register';
import React from 'react';
import { Categories } from './Categories';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CategoriesListItem } from '@/admin/components/CategoriesListItem';

const middlewares = [];
const mockStore = configureStore(middlewares);


configure({ adapter: new Adapter() });

const useSelectorMock = jest.spyOn(redux, 'useSelector');
const useDispatchMock = jest.spyOn(redux, 'useDispatch');
let store = mockStore({
  isLogIn: false
});

const categoriesStore = [
  {
    "title": "Seeds",
    "id": 0
  },
  {
    "title": "Equipment",
    "id": 1
  },
  {
    "title": "Starter Packages",
    "id": 2
  }
];

const categoryToRemove = {
  "title": "Starter Packages",
  "id": 2
};

const categoryToRemoveId = 2;

const newCategory = {
  "title": "test",
  "id": 4
};

beforeEach(() => {
  useSelectorMock.mockClear();
  useDispatchMock.mockClear();
});

const component = shallow(
  <Provider store={store}>
    <BrowserRouter>
      <Categories />
    </BrowserRouter>
  </Provider>
);

const categoriesListItem = shallow(
  <Provider store={store}>
    <BrowserRouter>
      <CategoriesListItem category={categoryToRemove} />
    </BrowserRouter>
  </Provider>
);

describe('Test case for categories page', () => {

  it('Should render Categories component without errors', () => {
    const dummyDispatch = jest.fn(() => categoriesStore.push(newCategory));
    const dispatch = useDispatchMock.mockReturnValue(dummyDispatch);
    const categories = useSelectorMock.mockReturnValue(categoriesStore);

    const categoriesComponent = component.find('Categories');
    const categoriesWrapper = categoriesComponent.dive();

    expect(categoriesWrapper.length).toBe(1);
  });
  
  it('add category success', () => {
    const dummyDispatch = jest.fn(() => categoriesStore.push(newCategory));
    const dispatch = useDispatchMock.mockReturnValue(dummyDispatch);
    const categories = useSelectorMock.mockReturnValue(categoriesStore);

    const categoriesComponent = component.find('Categories');
    const categoriesWrapper = categoriesComponent.dive();
    const categoriesListLengthBeforeAdd = categoriesWrapper.find('CategoriesList').dive().find('.categoriesList').children().length;
    
    categoriesWrapper.find('Button').simulate('click', {
      preventDefault: () => {}
    });

    expect(categoriesWrapper.find('CategoriesList').dive().find('.categoriesList').children().length).toBe(categoriesListLengthBeforeAdd + 1);
  });

  it('delete category success', () => {
    const dummyDispatch = jest.fn(() => categoriesStore.splice(categoriesStore.findIndex((item) => item.id === categoryToRemoveId), 1));
    const dispatch = useDispatchMock.mockReturnValue(dummyDispatch);
    const categories = useSelectorMock.mockReturnValue(categoriesStore);

    const categoriesComponent = component.find('Categories');
    const categoriesWrapper = categoriesComponent.dive();
    const categoriesListLengthBeforeAdd = categoriesWrapper.find('CategoriesList').dive().find('.categoriesList').children().length;

    const itemComponent = categoriesListItem.find('CategoriesListItem');
    const itemWrapper = itemComponent.dive();

    itemWrapper.find('.btns Button').at(1).simulate('click', {
      preventDefault: () => {}
    });

    expect(categoriesWrapper.find('CategoriesList').dive().find('.categoriesList').children().length).toBe(categoriesListLengthBeforeAdd - 1);
  });

});
