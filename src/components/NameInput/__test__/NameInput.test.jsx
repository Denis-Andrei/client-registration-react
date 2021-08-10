import React from 'react';
import ReactDOM from 'react-dom';
import NameInput from '../NameInput';
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

it("NameInput() renders withoud crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<NameInput />, div)
})

it("renders NameInput() correctly", () => {
    const { getByTestId }  = render(<NameInput />)
    expect(getByTestId('heading')).toHaveTextContent("Enter Name")
    expect(getByTestId('label')).toHaveTextContent("Full name")
    expect(getByTestId('hint')).toHaveTextContent("Enter your full name")
})

it("matches snapshot", () => {
    const tree = renderer.create(<NameInput />).toJSON();
    expect(tree).toMatchSnapshot();
})

describe("handleChange() ", () => {
    it("updates contact number input on change event", () => {
        const { getByTestId } = render(<NameInput />)
        const nameInput = getByTestId("input-name");
    
        fireEvent.change(nameInput, {target: {value: "Test"}})
        expect(nameInput.value).toBe("Test")
    })
})

describe("handleSubmit() ", () => {
    it("onSubmit redirects to the correct route", () => {
        
        const mockIsNameValid =  jest.fn().mockReturnValue(true)
        Utils.isNameValid = mockIsNameValid

        const { getByTestId } = render(<NameInput />)
        const submit = getByTestId("submit");

        fireEvent.click(submit);
        expect(mockHistoryPush).toHaveBeenCalledWith('/business-name');
    })
})

describe("goBack() ", () => {
    it("should be called on click event", () => {
        const { getByTestId } = render(<NameInput />)
        const goBackBtn = getByTestId("goBack");
    
        fireEvent.click(goBackBtn)
        expect(mockGoBack).toHaveBeenCalled();
    })
})