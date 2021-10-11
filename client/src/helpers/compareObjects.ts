export const compareObjects = (object1: any, object2: any): boolean => {
  const updatedObject1 = removeDBDataFromObject(object1);
  const updatedObject2 = removeDBDataFromObject(object2);
  const keys1 = Object.keys(updatedObject1);
  const keys2 = Object.keys(updatedObject2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = updatedObject1[key];
    const val2 = updatedObject2[key];
    const areObjects = isObject(val1) && isObject(val2);

    if (
      areObjects && !compareObjects(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }

  return true;
};

const isObject = (object: any): boolean => {
  return object !== null && typeof object === 'object';
};

const removeDBDataFromObject = (object: any): any => {
  const objectCopy = JSON.parse(JSON.stringify(object));

  if (object._id) {
    delete objectCopy._id;
    delete objectCopy.__v;
  }
  
  return objectCopy;
};
