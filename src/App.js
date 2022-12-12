import React,{useState} from "react";
import './App.css';
import UserLogin from "./Components/UserLogin";
import users from "./Datas/user";
import stores from "./Datas/store";
import {Route} from "react-router-dom";

import Header from "./Components/Header";
import PizzaHome from "./Components/PizzaHome";
import PizzaForm from "./Components/PizzaForm";

const App = () => {
  
  const [activeUser, setActiveUser] = useState({
    id:0,
    user:"",
    password:""
  });

  const [loginUser, setLoginUser] = useState({
    user:"",
    password:""
  });

  const [activeCheck, setActiveCheck] = useState(false);

  return (
    <div className="App">
      <Header/>

      {
        (!activeCheck) 
        ? 
        (
          <UserLogin
          loginUser={loginUser} 
          setLoginUser={setLoginUser}
          users={users}
          setActiveCheck={setActiveCheck}
          setActiveUser={setActiveUser}
          />
        )
        :
        (
         <div className="hi-user">
          <p>Merhaba {activeUser.user}</p>
         </div> 
        )
        
      }

      {
        (activeCheck)
        &&
        (
          <div className="route-pizza">
            <Route path="/" exact><PizzaHome activeUser={activeUser} stores={stores}/></Route>
            <Route path="/pizza"><PizzaForm /></Route>
          </div>
        )
        
      }

    </div>
  );
};
export default App;
