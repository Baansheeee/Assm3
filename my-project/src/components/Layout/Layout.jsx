// eslint-disable-next-line no-unused-vars
import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import {Helmet} from "react-helmet";
// eslint-disable-next-line react/prop-types
const Layout = ({ children,title,description,author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content={description}/>
                <meta name='author' content={author} />     
                <title>{title}</title>
            </Helmet>
            <Navbar />
            <main className='min-h-screen'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'Shop Sphere - Where Shopping becomes easy',
    description: 'This is a simple e-commerce website built using React',
    author: 'Shayan',
}

export default Layout;
