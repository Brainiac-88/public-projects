import React, {useState, useEffect, useRef} from 'react';

const Question = ({
    data, 
    onAnswerUpdate, 
    numberOfQuestions, 
    activeQuestion, 
    onSetActiveQuestion,
    onSetStep
    }) => {
    
    const [selected, setSelected] = useState('');
    const [error, setError] = useState('');

    const radiosWrapper = useRef();
    
    //Következő kérdés inicializálásakor, reseteljük a választ az előző képernyőről
    useEffect(() => {
        const selectedInput = radiosWrapper.current.querySelector('input:checked');
        
        if(selectedInput){
            selectedInput.checked = false;
        }

    },[data]);

    const changeHandler = (e) => {
        setSelected(e.target.value);

        if(error) {
            setError('');
        }
    };

    const nextClickHandler = (e) => {
        
        //Megnézzük megfutott-e a changeHandler:
        if(selected === "") {
            return setError('Nincs kiválasztva semmi!');
        }

        //A kiválasztott választ, hozzácsapjuk a korábban megadott válaszokhoz
        //Objektum tömböt építünk a kérdéssel és a megadott válasszal az összegzéshez
        onAnswerUpdate(prevState => [...prevState, {q: data.question, a: selected }]);
        
        //Answer reset
        setSelected('');

        //Ugrás a következő kérdésre
        if(activeQuestion < numberOfQuestions -1) 
        {
            onSetActiveQuestion(activeQuestion+1);
        }
        else {
            //Az utolsó kérdéshez értünk:
            onSetStep(2);
        }
    };

    return(
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <h2 className="mb-5">{ data.question }</h2>
                    <div className="control" ref = { radiosWrapper }>
                      {
                            data.choices.map((choice, i)=>{
                            return <label className="radio has-background-light" key={ i }>
                            <input type="radio" name="answer" value = { choice } onChange={ changeHandler }/>
                                { choice }
                            </label>
                          })
                      }
                    </div>
                    { error && <div className="has-text-danger"> {error }</div>}
                    <button className="button is-link is-medium is-fullwidth mt-4" onClick={ nextClickHandler }>Következő</button>
                </div>
            </div>
        </div>
    );
}

export default Question;