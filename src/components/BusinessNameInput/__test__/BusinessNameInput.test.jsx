import React from 'react';
import ReactDOM from 'react-dom';
import BusinessNameInput from '../BusinessNameInput';
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


it("BusinessNameInput() renders withoud crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BusinessNameInput />, div) 
})

it("renders BusinessNameInput() correctly", () => {
    const { getByTestId }  = render(<BusinessNameInput />)
    expect(getByTestId('heading')).toHaveTextContent("Enter Business Name")
    expect(getByTestId('label')).toHaveTextContent("Business Name")
    expect(getByTestId('hint')).toHaveTextContent("Enter the name of your business, this cannot be changed once submitted at the end, for example - 'McDonalds'")
})

it("matches snapshot", () => {
    const tree = renderer.create(<BusinessNameInput />).toJSON();
    expect(tree).toMatchSnapshot();
})

describe("handleChange() ", () => {
    it("updates businessName input on change event", () => {
        const { getByTestId } = render(<BusinessNameInput />)
        const businessNameInput = getByTestId("input-business-name");
    
        fireEvent.change(businessNameInput, {target: {value: "test"}})
        expect(businessNameInput.value).toBe("test")
    })
})

describe("handleSubmit() ", () => {
    it("onSubmit redirects to the correct route", () => {
        
        const mockIsNameValid =  jest.fn().mockReturnValue(true)
        Utils.isNameValid = mockIsNameValid

        const { getByTestId } = render(<BusinessNameInput />)
        const submit = getByTestId("submit");

        fireEvent.click(submit);
        expect(mockHistoryPush).toHaveBeenCalledWith('/contact-number');
    })
})

describe("goBack() ", () => {
    it("should be called on click event", () => {
        const { getByTestId } = render(<BusinessNameInput />)
        const goBackBtn = getByTestId("goBack");
    
        fireEvent.click(goBackBtn)
        expect(mockGoBack).toHaveBeenCalled();
    })
})