/**
 * This class is for javascript utils functions
 */
class Utils {

  /**
   * This method is to compare two unsorted arrays returns true
   * when the array are equal otherwise returns false
   */
  compare(arr1, arr2) {
    if (arr1.length === arr2.length) {
      arr1.forEach(elemArr1 => {
        if (!arr2.includes(elemArr1)) {
          return false;
        }
      });
      return true;
    } else {
      return false;
    }
  }
}

export default Utils