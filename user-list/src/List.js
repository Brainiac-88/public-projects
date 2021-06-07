import React from 'react';
import { clickHandler } from './functions'

const List = (props) => {

  return (
    <React.Fragment>
      <ul>{
        props.elements.map((elem)=>{
          return (
          <article key={elem.id} className="person" onClick = { () => clickHandler(elem.login) }>
            <img src={elem.avatar_url} alt={elem.login}/>
            <div>
              <h4>{elem.login}</h4>
              <p>{elem.type}</p>
            </div>
          </article>)
        })
      }
      </ul>
    </React.Fragment>
  );
};

export default List;
