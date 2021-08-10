import React from 'react';
import ReactDOM from 'react-dom';
import BusinessTypeInput from '../BusinessTypeInput';
import { render, cleanup, fireEvent } from '@testing-library/react'
import renderer from "react-test-renderer"



afterEach(cleanup);

//Mocking history.push() and history.goBack()
const mockHistoryPush = jest.fn();
const mockGoBack = jest.fn();

    jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockHistoryPush,
        goBack: mockGoBack
    }),
}));
//end of mockingw

it("BusinessTypeInput() renders withoud crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BusinessTypeInput />, div)
})

it("renders BusinessTypeInput() correctly", () => {
    const { getByTestId }  = render(<BusinessTypeInput />)
    expect(getByTestId('heading')).toHaveTextContent("Please select your business type")
})

it("matches snapshot", () => {
    const tree = renderer.create(<BusinessTypeInput />).toJSON();
    expect(tree).toMatchSnapshot();
})
// describe("handleChange() ", () => {
//     it("updates businessName input on change event", () => {
//         const { getByTestId } = render(<BusinessTypeInput />)
//         const businessTypeInput = getByTestId("input-business-type");
    
//         fireEvent.change(businessTypeInput, {target: {value: "Sole trader"}})
//         expect(businessTypeInput.value).toBe("Sole trader")
//     })
// })

// describe("handleSubmit() ", () => {
//     it("onSubmit redirects to the correct route", () => {

    

//         const { getByTestId } = render(<BusinessTypeInput />)
//         const submit = getByTestId("submit");

//         fireEvent.click(submit);
//         expect(mockHistoryPush).toHaveBeenCalledWith('/password');
//     })
// })

describe("goBack() ", () => {
    it("should be called on click event", () => {
        const { getByTestId } = render(<BusinessTypeInput />)
        const goBackBtn = getByTestId("goBack");
    
        fireEvent.click(goBackBtn)
        expect(mockGoBack).toHaveBeenCalled();
    })
})