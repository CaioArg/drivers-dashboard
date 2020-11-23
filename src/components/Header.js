import React from 'react'

function Header() {
    return (
        <header className="bg-dark">
            <div className="container">
                <img src="logo.png" alt="x4Fare logo"></img>
            </div>
        </header>
    )
}

export default React.memo(Header);