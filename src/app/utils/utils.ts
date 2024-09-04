export const isDefinedAndNotEmpty = (obj: Object | any): boolean => {

    if (typeof obj === 'undefined' || obj === null) {
      return false; // Object is undefined or null
    }
  
    if (typeof obj === 'object' && Object.keys(obj).length === 0) {
      return false; // Object is empty
    }
  
    return true; // Object is defined and not empty
}