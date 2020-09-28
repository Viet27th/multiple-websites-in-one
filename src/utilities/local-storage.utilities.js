export const LocalStorageUtilities = {
  setLocalStorageByName: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  getLocalStorageByName: (name) => {
    let data = localStorage.getItem(name);
    if(data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  },
  removeLocalStorageByName: (name) => {
    localStorage.removeItem(name);
  },
  clearAllLocalStorage: () => {
    localStorage.clear();
  }
};
