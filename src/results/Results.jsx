import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResultsLogo from '../assets/undraw_winners_ao2o 2.svg'

import "./Results.css"

const Results = ({ results }) => {
    const navigate = useNavigate()

    const handleTryAgain = () => {
        navigate("/")
    }

    return (
        <div className='results'>
            <div className="result_logo">
                <img src={ResultsLogo} alt="Results pic" />
            </div>
            <div className='result_header'> Results</div>

            <p> You got <span>{results} </span>correct answers</p>

            <button className="tryagain" onClick={handleTryAgain}>Try again</button>
        </div >
    )
}

export default Results