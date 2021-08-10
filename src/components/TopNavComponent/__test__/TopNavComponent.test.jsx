import React from 'react';
import ReactDOM from 'react-dom';
import TopNavComponent from '../TopNavComponent';
import { render, cleanup } from '@testing-library/react'
import renderer from "react-test-renderer"


afterEach(cleanup);

it("TopNavComponent() renders withoud crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TopNavComponent />, div)
})

it("renders TopNavComponent() correctly", () => {
    const { getByTestId }  = render(<TopNavComponent />)
    expect(getByTestId('service-title')).toHaveTextContent("Client Service")
    expect(getByTestId('banner')).toHaveTextContent("This is an initial implementation of GOVUK-React")
})

it("matches snapshot", () => {
    const tree = renderer.create(<TopNavComponent />).toJSON();
    expect(tree).toMatchSnapshot();
})
