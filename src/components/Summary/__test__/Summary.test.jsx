import React from 'react';
import ReactDOM from 'react-dom';
import Summary from '../Summary';
import { render, cleanup, fireEvent } from '@testing-library/react'
import renderer from "react-test-renderer"

afterEach(cleanup);

const mockHistoryPush = jest.fn();
const mockGoBack = jest.fn();


jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockHistoryPush,
        goBack: mockGoBack
    }),
}));



it("Summary() renders withoud crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Summary />, div)
})

it("renders Summary() correctly", () => {
    const { getByTestId }  = render(<Summary />)
    expect(getByTestId('table-cell-name')).toHaveTextContent("Name")
    expect(getByTestId('table-cell-business')).toHaveTextContent("Business Name")
    expect(getByTestId('table-cell-number')).toHaveTextContent("Contact Number")
    expect(getByTestId('table-cell-address')).toHaveTextContent("Address")
    expect(getByTestId('table-cell-business-type')).toHaveTextContent("Business Type")
})

it("matches snapshot", () => {
    const tree = renderer.create(<Summary />).toJSON();
    expect(tree).toMatchSnapshot();
})


// describe("handleSubmit() ", () => {
//     it("onSubmit redirects to the correct route", () => {
        
//         const { getByTestId } = render(<Summary />)
//         const submit = getByTestId("submit");
       
//         const mockRegisterUser =  jest.fn()
//         Utils.registerUser = mockRegisterUser

//         fireEvent.click(submit);
//         expect(mockRegisterUser).toHaveBeenCalled();
//     })
// })

describe("goBack() ", () => {
    it("should be called on click event", () => {
        const { getByTestId } = render(<Summary />)
        const goBackBtn = getByTestId("goBack");
    
        fireEvent.click(goBackBtn)
        expect(mockGoBack).toHaveBeenCalled();
        
    })
})

