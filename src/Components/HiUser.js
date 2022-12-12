import React from 'react';

export default function HiUser (props) {
   const {activeUser} = props
  return (
    <div className="hi-user">
    <p>Merhaba {activeUser.user}</p>
   </div> 
  );
}