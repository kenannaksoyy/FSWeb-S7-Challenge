import React from 'react';
import { Link} from 'react-router-dom';


export default function PizzaHome (props) {
  const {activeUser, stores}=props

  console.log(activeUser);
  return (
    <div className='home-container'>
      <div className="fav-pizza-container">
        <h2 id="fav-pizza-title">{activeUser["user"]} Kodlama Yaparken Favori Yiyeceğin &#128512;</h2>
        <Link id="order-pizza" to="/pizza" >Pizza? &#129300;</Link>
      </div>
      <h2 id="best-ist" style={{color:"red"}}>&#129488; İstanbul Enleri &#129488;</h2>
      <div className='show-store'>
      {
        stores.map((store, index) =>(
          <div className={
            (index%2) ? "a-store" : "b-store"
          }>
            <h3>{store.name}</h3>
            <p>{store.favorites}</p>
          </div>
        ))
      }
      </div>
    </div>

    
  );
}