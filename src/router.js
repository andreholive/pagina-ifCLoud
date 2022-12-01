import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Logon from './pages/Logon/index';
import Main from './pages/Main/index'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element = {<Logon/>}  path="/" exact />
                <Route element = {<Main/>}  path="/project" />
            </Routes>
        </BrowserRouter>
    )
}