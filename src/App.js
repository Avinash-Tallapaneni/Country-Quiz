import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Quiz from "./quiz/Quiz";
import StartPage from "./startpage/StartPage";
import Results from "./results/Results";

import './App.css'

function App() {

  const [questions, setQuestions] = useState([])

  const fetchQuestions = async ({ options, numOfQuestions }) => {

    // const filterOptions = ["name", "currencies", "capital", "languages", "continents",];
    const filterOptions = ["currencies", "capital", "languages", "continents", "flags"];
    // const filterOptions = ["currencies", "capital", "languages", "continents", "flags"];
    const selectedFilter = filterOptions.filter((option) => options[option]);
    const filters = selectedFilter.length > 0 ? selectedFilter.join(",") : filterOptions.join(",")


    await fetch(`https://restcountries.com/v3.1/all?fields=name,${filters}`)
      .then(response => response.json())
      .then(data => {
        data.sort(() => Math.random() - 0.5);
        setQuestions(data.slice(0, numOfQuestions));
      })
  }

  useEffect(() => {
    console.log(questions)
  }, [questions])



  return (

    <Router >
      <div className="startpage" >
        <Routes>
          <Route path="/" element=<StartPage fetchQuestions={fetchQuestions} /> />
          <Route path="/quiz" element=<Quiz questions={questions} /> />
          <Route path="/result" element=<Results /> />
        </Routes>
      </div>
    </Router >
  );
}

export default App;
