import React from 'react';

export default function Service (props) {
     const {pizza} = props;
  return (
    <div>
      <h1>Sipariş Alındı</h1>
      <div className='service'>
            <img src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"/>
        </div>
    </div>
  );
}