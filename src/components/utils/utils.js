import isEqual from 'lodash.isequal';

class Utils {
  compare(arr1, arr2) {
    let finalArray = [];
    if (arr1.length !== arr2.length) {
      return false;
    } else {
      arr1.forEach(elemArr1 => {
        arr2.forEach(elemArr2 => {
          if (elemArr1 === elemArr2) {
            finalArray.push(elemArr1);
          }
        });
      });

      if (isEqual(finalArray, arr1) && finalArray.length !== 0) {
        return true;
      }
      return false;
    }
  }
}

export default Utils