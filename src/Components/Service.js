import React from 'react';
import  pizzaSecilimler  from '../Datas/pizzaData';

export default function Service (props) {
     const {pizza} = props;
  return (
    <div>
      <h1>{pizza.id} ID Sipariş Alındı</h1>
      <div className='service'>
            <div id="service img">
              <img src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"/>
            </div>
            <div id="pizza-info">
                <p>Pizza İsim : {pizza.isim}</p>
                <p>Pizza Özel : {pizza.ozel==="" ? "Ozel İstek Yok": pizza.ozel}</p>
                <p>Pizza Tercihi : {pizza.turTercih}</p>
                {
                  pizzaSecilimler[`${pizza.turTercih}Malzemeler`].map((malzeme,index)=>(
                    pizza[`malzeme${index+1}`] && <p>Malzeme : {malzeme}</p>
                  ))
                }
            </div>
        </div>
    </div>
  );
}