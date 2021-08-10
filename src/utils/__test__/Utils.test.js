import { cleanup } from '@testing-library/react'
import { getData, isNameValid, isNumberValid, isPasswordMatching, isPostcodeValid, isPasswordValid } from '../Utils';

const validName = "test";
const invalidName = 12;
const validNumber = 1234567890;
const invalidNumber = 123456789;
const validPostcode = "B65 7TY";
const invalidPostcode = "B65 TTY";
const validPassword= "qwerty12345";
const invalidPassword= "qwerty";


afterEach(cleanup);

it("getData() should return empty string", () => {
    expect(getData("name")).toEqual("")
})

// it("getData() should return whats in the session", () => {
//     expect(getData("name")).toEqual("Not found")
// })

it("isNameValid() should return true", () => {
    expect(isNameValid(validName)).toEqual(true)
})
it("isNameValid() should return false", () => {
    expect(isNameValid(invalidName)).toEqual(false)
})

it("isNumberValid() should return true", () => {
    expect(isNumberValid(validNumber)).toEqual(true)
})
it("isNumberValid() should return false", () => {
    expect(isNumberValid(invalidNumber)).toEqual(false)
})

it("isPostcodeValid() should return true", () => {
    expect(isPostcodeValid(validPostcode)).toEqual(true)
})
it("isPostcodeValid() should return false", () => {
    expect(isPostcodeValid(invalidPostcode)).toEqual(false)
})

it("isPasswordValid() should return true", () => {
    expect(isPasswordValid(validPassword)).toEqual(true)
})
it("isPasswordMatching() should return false", () => {
    expect(isPasswordMatching(invalidPassword, validPassword)).toEqual(false)
})


