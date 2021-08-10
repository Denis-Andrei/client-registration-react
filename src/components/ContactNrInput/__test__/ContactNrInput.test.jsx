import React from 'react';
import ReactDOM from 'react-dom';
import ContactNrInput from '../ContactNrInput';
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

it("ContactNrInput() renders withoud crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ContactNrInput />, div)
})

it("renders ContactNrInput() correctly", () => {
    const { getByTestId }  = render(<ContactNrInput />)
    expect(getByTestId('heading')).toHaveTextContent("Enter Contact Number")
    expect(getByTestId('label')).toHaveTextContent("Contact Number")
    expect(getByTestId('hint')).toHaveTextContent("he phone number you prefer to be contacted on, for example - '01615555555'")
})

it("matches snapshot", () => {
    const tree = renderer.create(<ContactNrInput />).toJSON();
    expect(tree).toMatchSnapshot();
})

describe("handleChange() ", () => {
    it("updates contact number input on change event", () => {
        const { getByTestId } = render(<ContactNrInput />)
        const numberInput = getByTestId("input-number");
    
        fireEvent.change(numberInput, {target: {value: 1234567741}})
        expect(numberInput.value).toBe("1234567741")
    })
})

describe("handleSubmit() ", () => {
    it("onSubmit redirects to the correct route", () => {
        
        const mockIsNumberValid =  jest.fn().mockReturnValue(true)
        Utils.isNumberValid = mockIsNumberValid

        const { getByTestId } = render(<ContactNrInput />)
        const submit = getByTestId("submit");

        fireEvent.click(submit);
        expect(mockHistoryPush).toHaveBeenCalledWith('/address');
    })
})

describe("goBack() ", () => {
    it("should be called on click event", () => {
        const { getByTestId } = render(<ContactNrInput />)
        const goBackBtn = getByTestId("goBack");
    
        fireEvent.click(goBackBtn)
        expect(mockGoBack).toHaveBeenCalled();
    })
})