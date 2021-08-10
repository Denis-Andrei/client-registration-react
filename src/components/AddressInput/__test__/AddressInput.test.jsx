import React from 'react';
import ReactDOM from 'react-dom';
import AddressInput from '../AddressInput';
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

it("AddressInput() renders withoud crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AddressInput />, div)
})

it("renders AddressInput() correctly", () => {
    const { getByTestId }  = render(<AddressInput />)
    expect(getByTestId('heading')).toHaveTextContent("Enter Property number and address")
    expect(getByTestId('label-property')).toHaveTextContent("Property Number")
    expect(getByTestId('hint-property')).toHaveTextContent("The house number you live at, for example - '103b'")
    
    expect(getByTestId('label-postcode')).toHaveTextContent("Postcode")
    expect(getByTestId('hint-postcode')).toHaveTextContent("The postcode where you live, for example - 'HA8 3NY'")
})

it("matches snapshot", () => {
    const tree = renderer.create(<AddressInput />).toJSON();
    expect(tree).toMatchSnapshot();
})

it("PropertyInput value updated on change event", () => {
    const { getByTestId } = render(<AddressInput />)
    const propertyInput = getByTestId("input-property");

    fireEvent.change(propertyInput, {target: {value: "test"}})
    expect(propertyInput.value).toBe("test")
})

describe("handleChangeProperty() ", () => {
    it("updates property input on change event", () => {
        const { getByTestId } = render(<AddressInput />)
        const postcodeInput = getByTestId("input-postcode");
    
        fireEvent.change(postcodeInput, {target: {value: "test"}})
        expect(postcodeInput.value).toBe("test")
    })
})

describe("handleChangePostcode() ", () => {
    it("updates postcode input on change event", () => {
        const { getByTestId } = render(<AddressInput />)
        const postcodeInput = getByTestId("input-postcode");
    
        fireEvent.change(postcodeInput, {target: {value: "test"}})
        expect(postcodeInput.value).toBe("test")
    })
})

describe("handleSubmit() ", () => {
    it("onSubmit redirects to the correct route", () => {
        
        const mockIsPostcodeValid =  jest.fn().mockReturnValue(true)
        Utils.isPostcodeValid = mockIsPostcodeValid

        const { getByTestId } = render(<AddressInput />)
        const submit = getByTestId("submit");

        fireEvent.click(submit);
        expect(mockHistoryPush).toHaveBeenCalledWith('/business-type');
    })
})

describe("goBack() ", () => {
    it("should be called on click event", () => {
        const { getByTestId } = render(<AddressInput />)
        const goBackBtn = getByTestId("goBack");
    
        fireEvent.click(goBackBtn)
        expect(mockGoBack).toHaveBeenCalled();
    })
})
