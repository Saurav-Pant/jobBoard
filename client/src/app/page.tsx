"use client"

import React from 'react';
import Cookies from 'js-cookie';
import Dashboard from '../app/Dashboard/page';
import Signup from '../app/signup/page';

const Page = () => {
    const token = Cookies.get('token');

    return (
        <div>
            {token ? <Dashboard /> : <Signup />}
        </div>
    );
}

export default Page;
