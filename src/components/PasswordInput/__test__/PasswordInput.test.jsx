import React from 'react';
import ReactDOM from 'react-dom';
import PasswordInput from '../PasswordInput';
import { render, cleanup, fireEvent } from '@testing-library/react'
import renderer from "react-test-renderer"
import * as Utils from '../../../utils/Utils'


afterEach(cleanup);

//Mocking history.push() and history.goBack()
const mockHistoryPush = jest.fn();
const mockGoBack = jest.fn();

    jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
        goBack: mockGoBack
    }),
}));
//end of mocking

it("PasswordInput() renders withoud crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<PasswordInput />, div)
})

it("renders PasswordInput() correctly", () => {
    const { getByTestId }  = render(<PasswordInput />)
    expect(getByTestId('heading')).toHaveTextContent("Enter Password")
    expect(getByTestId('label-pass')).toHaveTextContent("Password")
    expect(getByTestId('hint-pass')).toHaveTextContent("Your password must be 10 or more characters. You can use a mix of letters, numbers or symbols.")
    expect(getByTestId('label-re-enter-pass')).toHaveTextContent("Re-enter your password")
    expect(getByTestId('hint-re-enter-pass')).toHaveTextContent("Enter the same password as the one you entered above")
})

it("matches snapshot", () => {
    const tree = renderer.create(<PasswordInput />).toJSON();
    expect(tree).toMatchSnapshot();
})

describe("handleChangePass() ", () => {
    it("updates password input on change event", () => {
        const { getByTestId } = render(<PasswordInput />)
        const passwordInput = getByTestId("input-password");
    
        fireEvent.change(passwordInput, {target: {value: "test1test1"}})
        expect(passwordInput.value).toBe("test1test1")
    })
})

describe("handleChangeRepeatPass() ", () => {
    it("updates postcode input on change event", () => {
        const { getByTestId } = render(<PasswordInput />)
        const passwordCheckInput = getByTestId("input-password-check");
    
        fireEvent.change(passwordCheckInput, {target: {value: "test1test1"}})
        expect(passwordCheckInput.value).toBe("test1test1")
    })
})

describe("handleSubmit() ", () => {
    it("onSubmit redirects to the correct route", () => {
        
        const mockIsPasswordValid =  jest.fn().mockReturnValue(true)
        Utils.isPasswordValid = mockIsPasswordValid
        
        const mockIsPasswordMatching =  jest.fn().mockReturnValue(true)
        Utils.isPasswordMatching = mockIsPasswordMatching

        const { getByTestId } = render(<PasswordInput />)
        const submit = getByTestId("submit");

        fireEvent.click(submit);
        expect(mockHistoryPush).toHaveBeenCalledWith('/summary');
    })
})

describe("goBack() ", () => {
    it("should be called on click event", () => {
        const { getByTestId } = render(<PasswordInput />)
        const goBackBtn = getByTestId("goBack");
    
        fireEvent.click(goBackBtn)
        expect(mockGoBack).toHaveBeenCalled();
    })
})
