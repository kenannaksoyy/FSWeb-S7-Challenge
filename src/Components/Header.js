import React from 'react';
import { Link } from 'react-router-dom';

export default function Header () {
  return (
    <div className="header-container">
      <h1 id="pizza-title">Lambda Eats</h1>
      <Link to="/" id="order-pizzaa">Anasayfa</Link>
    </div>
  );
}