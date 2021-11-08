import * as helpers from '.';

describe('', () => {
  it('Return true if objects are similar', () => {
    const obj1 = {
      image: 'assets/images/chia.jpg',
      title: 'Chia',
      categoryId: '6176f073a9153a1c50d6f78e',
      size: '50g',
      amount: 0,
      price: 150,
      description: 'Some description'
    };

    const obj2WithVersionAndId = {
      image: 'assets/images/chia.jpg',
      title: 'Chia',
      categoryId: '6176f073a9153a1c50d6f78e',
      size: '50g',
      amount: 0,
      price: 150,
      description: 'Some description',
      __v: '1',
      _id: '6176f4efa9153a1c50d6f7ba'
    };

    expect(helpers.compareObjects(obj1, obj2WithVersionAndId)).toEqual(true);
  });

  it('Return false if objects are different', () => {
    const obj1 = {
      image: 'assets/images/chia.jpg',
      title: 'Chia',
      categoryId: '6176f073a9153a1c50d6f78e',
      size: '50g',
      amount: 0,
      price: 500,
      description: 'Some description 2'
    };

    const obj2WithVersionAndId = {
      image: 'assets/images/chia.jpg',
      title: 'Chia',
      categoryId: '6176f073a9153a1c50d6f78e',
      size: '50g',
      amount: 0,
      price: 150,
      description: 'Some description',
      __v: '1',
      _id: '6176f4efa9153a1c50d6f7ba'
    };

    expect(helpers.compareObjects(obj1, obj2WithVersionAndId)).toEqual(false);
  });
});
