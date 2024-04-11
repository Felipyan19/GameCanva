export function saveInLocalStorage(key, array) {
  try {
    const serializedArray = JSON.stringify(array);
    localStorage.setItem(key, serializedArray);
    return array;
  } catch (error) {
    console.error("Error guardando array en localStorage", error);
    return undefined;
  }
}

export function getFromLocalStorage(key) {
  try {
    const serializedArray = localStorage.getItem(key);
    if (serializedArray === null) {
      return undefined;
    }
    return JSON.parse(serializedArray);
  } catch (error) {
    console.error("Error tomando array de localStorage", error);
    return undefined;
  }
}


