import React from 'react';
import ReactDom from 'react-dom'
import Home from '../Home'
import { MemoryRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement("div")
    ReactDom.render(
        <MemoryRouter>
            <Home lable={'Thumbs up clicked!'} />
        </MemoryRouter>
    , div)
});