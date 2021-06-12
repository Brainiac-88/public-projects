import React, {useState, useEffect} from 'react';

//Idő formázás
const formatTime = time => {
    if(time < 60) {
      return time < 10 ? `0${time}mp` : `${time}mp`;
    }else {
      return Math.floor(time / 60) + 'perc ' + (time % 60) + 'mp';
    }
  }

  
const End = ({
        results,
        data,
        onRestart,
        onAnswerCheck,
        time
    }) => {

    const [correctAnswers, setCorrectAnswers] = useState(0);

    useEffect(() => {
        let correct = 0;
        results.forEach((result, index) => {
          if(result.a === data[index].answer) {
            correct++;
          }
        });
        setCorrectAnswers(correct);
      }, []);

    return (
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <h4>Eredmény:</h4>
                    <p><strong>Pontszám: { data.length } / { correctAnswers } </strong></p>
                    <p><strong>{ Math.floor(correctAnswers / data.length * 100) } % </strong></p>
                    <p><strong>Idő: { formatTime(time) } </strong></p>
                    <button className="button is-info mr-2" onClick = { onAnswerCheck } > RÉSZLETEK </button>
                    <button className="button is-success mr-2" onClick = { onRestart }> ÚJRA </button>
                </div>
            </div>
        </div>
    )
}

export default End;