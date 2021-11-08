import 'jsdom-global/register';
import React from 'react';
import { Products } from './Products';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ProductListItem } from '@/admin/components/ProductListItem';
import { AddProductForm } from '@/admin/components/AddProductForm';

const middlewares = [];
const mockStore = configureStore(middlewares);


configure({ adapter: new Adapter() });

const useSelectorMock = jest.spyOn(redux, 'useSelector');
const useDispatchMock = jest.spyOn(redux, 'useDispatch');
let store = mockStore();

const productsStore = [
  {
    "id": 10,
    "categoryId": 0,
    "title": "Arugula",
    "description": "Arugula – also called salad rocket – is known mainly in Italian cuisine as a spicy salad ingredient. It belongs to the mucus-forming seeds and is a light germ, so you should not cover the seeds for germination and spray them daily with water.",
    "size": 50,
    "image": "arugula.jpg",
    "price": 2
  },
  {
    "id": 15,
    "categoryId": 1,
    "title": "Pressure sprayer",
    "description": "High-quality pressure storage sprayer with a capacity of 1.75 litres for microgreen professionals. Spray in any position (360° function). Rotating and adjustable brass nozzle.",
    "amount": 1,
    "image": "sprayer.jpg",
    "price": 16.9
  },
  {
    "id": 19,
    "categoryId": 2,
    "title": "Grow-Grow Nut Refill Package “Asian Festival”",
    "description": "Need a refill for your Grow-Grow Nut? This refill pack contains three coco soil bricks and the familiar seed varieties from your starter pack (Radish Daikon, Pak Choi & Kohlrabi Red).",
    "amount": 1,
    "image": "asianFestival.jpg",
    "price": 10.9
  },
];

const productToRemove = {
  "id": 19,
  "categoryId": 2,
  "title": "Grow-Grow Nut Refill Package “Asian Festival”",
  "description": "Need a refill for your Grow-Grow Nut? This refill pack contains three coco soil bricks and the familiar seed varieties from your starter pack (Radish Daikon, Pak Choi & Kohlrabi Red).",
  "amount": 1,
  "image": "asianFestival.jpg",
  "price": 10.9
};

const categoryToRemoveId = 19;

const newProduct = {
  "id": 21,
  "categoryId": 2,
  "title": "Grow-Grow Nut Starter Set",
  "description": "From the shopping bag to the To Go cup to the cutlery – we produce an incredible amount of plastic waste. The Grow-Grow Nut allows you to grow Microgreens at home on your window sill – plastic-free! The Grow-Grow Nut is 100% biodegradable and just looks great. The first completely biodegradable microgreen breeding kit – Let’s grow!",
  "amount": 1,
  "image": "growGrowNut.jpg",
  "price": 12.9
};

beforeEach(() => {
  useSelectorMock.mockClear();
  useDispatchMock.mockClear();
});

const component = shallow(
  <Provider store={store}>
    <BrowserRouter>
      <Products />
    </BrowserRouter>
  </Provider>
);

const productsListItem = shallow(
  <Provider store={store}>
    <BrowserRouter>
      <ProductListItem product={productToRemove} />
    </BrowserRouter>
  </Provider>
);

const addProductForm = shallow(
  <Provider store={store}>
    <BrowserRouter>
      <AddProductForm/>
    </BrowserRouter>
  </Provider>
);

describe('Test case for products page', () => {

  it('Should render Products component without errors', () => {
    const dummyDispatch = jest.fn(() => productsStore.push(newProduct));
    const dispatch = useDispatchMock.mockReturnValue(dummyDispatch);
    const products = useSelectorMock.mockReturnValue(productsStore);

    const productsComponent = component.find('Products');
    const productsWrapper = productsComponent.dive();

    expect(productsWrapper.length).toBe(1);
  });
  
  // it('add product success', () => {
  //   const dummyDispatch = jest.fn(() => productsStore.push(newProduct));
  //   const dispatch = useDispatchMock.mockReturnValue(dummyDispatch);
  //   const products = useSelectorMock.mockReturnValue(productsStore);

  //   const productsComponent = component.find('Products');
  //   const productsWrapper = productsComponent.dive();
  //   const productsListLengthBeforeAdd = productsWrapper.find('ProductsList').dive().find('.productsList').children().length;

  //   console.log(addProductForm.find('AddProductForm').dive().find('.form').debug())
  //   addProductForm.find('AddProductForm').dive().find('input[type="submit"]').simulate('click');

  //   addProductForm.find('AddProductForm').dive().find('.form').simulate('submit');
  //   productsWrapper.update();
  //   expect(productsWrapper.find('ProductsList').dive().find('.productsList').children().length).toBe(productsListLengthBeforeAdd + 1);
  // });

  // it('delete category success', () => {
  //   const dummyDispatch = jest.fn(() => categoriesStore.splice(categoriesStore.findIndex((item) => item.id === categoryToRemoveId), 1));
  //   const dispatch = useDispatchMock.mockReturnValue(dummyDispatch);
  //   const categories = useSelectorMock.mockReturnValue(categoriesStore);

  //   const categoriesComponent = component.find('Categories');
  //   const categoriesWrapper = categoriesComponent.dive();
  //   const categoriesListLengthBeforeAdd = categoriesWrapper.find('CategoriesList').dive().find('.categoriesList').children().length;

  //   const itemComponent = categoriesListItem.find('CategoriesListItem');
  //   const itemWrapper = itemComponent.dive();

  //   itemWrapper.find('.btns Button').at(1).simulate('click', {
  //     preventDefault: () => {}
  //   });

  //   expect(categoriesWrapper.find('CategoriesList').dive().find('.categoriesList').children().length).toBe(categoriesListLengthBeforeAdd - 1);
  // });

});
