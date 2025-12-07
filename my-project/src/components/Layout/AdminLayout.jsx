/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import AdminMenu from './AdminMenu';
import {Helmet} from "react-helmet";


const AdminLayout = ({ children, title,description, author }) => {
    return (
        <div className="flex">
            <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content={description}/>
                <meta name='author' content={author} />     
                <title>{title}</title>
            </Helmet>
            <AdminMenu />
            <div className='bg-white w-full'>
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;

