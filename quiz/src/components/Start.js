import React from 'react';

const Start = ({ onQuizStart }) => {
    return (
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <h1>Quiz indítása.</h1>
                    <button className="button is-danger is-medium" onClick = { onQuizStart }>START</button>
                </div>
            </div>
        </div>
    )
}

export default Start;