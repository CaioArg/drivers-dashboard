import React from 'react'
import './Card.css'

function Card(props) {
    return (
        <div className="info-card">
            <div className="card-heading">
                {props.heading}
            </div>

            <div className="card-content">
                {props.content}
            </div>
        </div>
    )
}

export default React.memo(Card);