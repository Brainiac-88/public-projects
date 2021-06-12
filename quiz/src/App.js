import './App.css';
import Start from './components/Start';
import Question from './components/Question';
import End from './components/End';
import Modal from './components/Modal';

import QuizData from './data/quiz.json';
import { useState ,useEffect } from 'react';

//Ebben tároljuk a másodperceket.
let interval = 0;

const App = () => {

  //Melyik lépésnél járunk
  const [step, setStep] = useState(0);

  //Aktuális kérdés
  const [activeQestion, setActiveQuestion] = useState(0);

  //Válaszokat tartalmazza
  const [answers, setAnswers] = useState([]);

  //Idő
  const [time, setTime] = useState(0);
  
  const startQuizHandler = () => {
    
  //Számláló indítása  
  interval = setInterval( () => {
    setTime(prevTime => prevTime +1);
  },1000);

    setStep(1);
  } 

  //Új kör indítása
  const onRestart = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(1);
    setTime(0);

    //Előről kezdjük a számolást is
    interval = setInterval( () => {
      setTime(prevTime => prevTime +1);
    },1000);

  }

  //A végén timer reset.
  useEffect(() => {
    if(step === 2){
      return clearInterval(interval);
    }
  }, [step]);

  //Modal

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      {step === 0 && <Start onQuizStart = { startQuizHandler } /> }
      {step === 1 && <Question 
        data = {QuizData.data[activeQestion]}
        onAnswerUpdate = {setAnswers}
        numberOfQuestions = {QuizData.data.length}
        activeQuestion = {activeQestion}
        onSetActiveQuestion = {setActiveQuestion}
        onSetStep = {setStep}
      />}
      {step === 2 && <End 
        results = { answers }
        data = { QuizData.data}
        onRestart = { onRestart }
        onAnswerCheck = { ()=> { setShowModal(true) }}
        time = { time }

      />}
      {showModal && <Modal 
        onClose={()=> { setShowModal(false) }}
        results = { answers }
        data = { QuizData.data }
      />}
    </div>
  );
}

export default App;
