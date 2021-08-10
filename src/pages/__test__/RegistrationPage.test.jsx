import React from 'react';
import ReactDOM from 'react-dom';
import RegistrationPage from '../RegistrationPage';
import { render, cleanup } from '@testing-library/react'
import renderer from "react-test-renderer"


afterEach(cleanup);

it("RegistrationPage() renders withoud crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<RegistrationPage />, div)
})

it("renders RegistrationPage() correctly", () => {
    const str = "children"
    const { getByTestId }  = render(<RegistrationPage children={str}/>)
    expect(getByTestId('content')).toHaveTextContent("children")
})

it("matches snapshot", () => {
    const tree = renderer.create(<RegistrationPage />).toJSON();
    expect(tree).toMatchSnapshot();
})
