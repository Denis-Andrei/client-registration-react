import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react'
import App from './App';

afterEach(cleanup);

it("App() renders withoud crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div)
})