// utils/LocalStorage.js
export function getUserDataFromLocalStorage() {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
        return JSON.parse(userDataString);
    }
    return null;
}

export function setUserDataToLocalStorage(userData) {
    localStorage.setItem("userData", JSON.stringify(userData));
}

export function removeUserDataFromLocalStorage(){
    localStorage.removeItem("userData");
    localStorage.removeItem("password");
    // localStorage.setItem("userData", {});
    // localStorage.setItem("password","");
}

export function setPasswordToLocalStorage(pw){
    localStorage.setItem("password", pw)
}

export function getPasswordFromLocalStorage(){
    const pw = localStorage.getItem("password");
    return pw;
}

export function clearDataFromLocalStorage(){
    localStorage.clear();
}