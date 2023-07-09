import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PreferenceSettings from '../assets/undraw_preferences_popup_re_4qk0.svg';
import CommonLogo from '../assets/undraw_adventure_4hum 1.svg'
import Categories from '../data/Categories';
import Checkbox from '../assets/custom_checkbox.svg';


import './StartPage.css'

const StartPage = ({ fetchQuestions }) => {

    const [options, setOptions] = useState({
        // "name": false,
        "currencies": false,
        "capital": false,
        "languages": false,
        "continents": false,
        "flags": false,

    })
    const [numOfQuestions, setNumOfQuestions] = useState(10);

    const navigate = useNavigate();

    const handleOption = (event) => {
        const { checked, id } = event.target
        setOptions(prev => ({
            ...prev, [id]: checked
        }))
    }

    const handleNumber = (event) => {
        setNumOfQuestions(event.target.value)
    }

    const handleSubmit = () => {
        fetchQuestions({ options, numOfQuestions })
        navigate("/quiz")
    }


    return (
        <div className='selection'>
            <div className="left_side">
                <header>
                    <div> Country Quiz</div>
                    <div className="adventure_logo">
                        <img src={CommonLogo} alt="default traveller pic" />
                    </div>
                </header>
                <div className="options">
                    {Categories.map((category) => {
                        return <div key={category.value} className='checkbox' >
                            <input type='checkbox' id={category.value} onClick={handleOption} />
                            <div className='checkbox_svg'>
                                <img src={Checkbox} alt="Checkbox" />
                            </div>

                            <label htmlFor={category.value} > {category.category} </label>

                        </div>
                    })}
                </div>

                <div className='number-of-questions'>
                    <p>Enter Number of questions</p>
                    <input type='number' placeholder='Enter number between 1 to 250, Default is 10, ' onChange={handleNumber} />
                </div>
                <div>
                    <button onClick={handleSubmit}>Start</button>
                </div>

            </div>
            <div className="right_side">
                <img src={PreferenceSettings} alt='preference settings' />
            </div >
        </div>
    )
}

export default StartPage