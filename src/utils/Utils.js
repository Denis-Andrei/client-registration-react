


export const getData = (name) => sessionStorage.getItem(name) ? sessionStorage.getItem(name) : ""

export const isNameValid = (name) => /^([A-z])+(.?[a-zA-Z])*('?[a-zA-Z])*/.test(name)
export const isNumberValid = (number) => /^[0-9]{10}$|^[0-9]{11}$/.test(number) 
export const isPostcodeValid = (postcode) => /^(?:[A-Za-z]\d ?\d[A-Za-z]{2})|(?:[A-Za-z][A-Za-z\d]\d ?\d[A-Za-z]{2})|(?:[A-Za-z]{2}\d{2} ?\d[A-Za-z]{2})|(?:[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]{2})|(?:[A-Za-z]{2}\d[A-Za-z] ?\d[A-Za-z]{2})/.test(postcode) 
export const isPasswordValid = (password) => password.length >= 10 
export const isPasswordMatching = (password, checkPassword) => password === checkPassword

