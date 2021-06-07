import React, { useState, useEffect } from 'react';
import List from './List';

const url = 'https://api.github.com/users';

function App() {

  const[people, setPeople] = useState([]);
  const[loading, setLoading] = useState(true);

  const getPeople = async() => {
    const response = await fetch(url);
    const users = await response.json();
    setPeople(users);
    setLoading(false);
  };

  //Simulate Loading... 
  useEffect(()=>{
    setTimeout(()=>{
      getPeople();
    }, 3000);
  },[]);

  const clearClickHandler = () => {
    setPeople([]);
  }

  return (
    <main>
      <section className="container">
        <h3>{ people.length} github users</h3>
        <List elements={ people }/>
        <button onClick={ clearClickHandler }>
          { loading ? 'Loading...' : 'CLEAR ALL'}
        </button>
      </section>
    </main>
  )}

export default App;
