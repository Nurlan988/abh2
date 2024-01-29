import React from "react";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import { Main } from "../layout/Main";
import Layout from "../conponents/Layout";
import UserDetails from "../conponents/UserDetails";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/:id" element={<UserDetails />} />
        </Route>
    )
);
