import React from 'react'
import { render } from 'react-dom'
import {
    BrowserRouter
} from 'react-router-dom'
import App from './app'

const rootElment = document.getElementById('app')

render (
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    rootElment
)