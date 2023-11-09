import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import { Footer } from './Footer'

function WelcomeLayout({ children }) {
    return (
        <>
            <div className="bg-gradient-to-r from-rose-400 to-rose-500 min-h-screen font-poppins">
                <Header />
                {children}
                <Footer />
            </div>

        </>
    )
}


export default WelcomeLayout
