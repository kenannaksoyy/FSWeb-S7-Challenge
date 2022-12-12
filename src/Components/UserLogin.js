import React,{useState, useEffect} from 'react';
import * as yup from "yup";
import { checkFormErrors, loginControl } from '../Utils/Util';

const loginSchema = yup.object().shape({
    user: yup
    .string()
    .required("İsim Girilmesi Zorunlu")
    ,
    password: yup
    .string()
    .required("Sifre Girilmesi Zorunlu")

});

export default function UserLogin (props) {

    const {loginUser, setLoginUser, users, setActiveCheck,setActiveUser}=props;

    const [errors, setErrors] = useState({
        user:"",
        password:""
    });

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        loginSchema
        .isValid(loginUser)
        .then((valid) => setDisabled(!valid));
    }, [loginUser]);

    const handleChange = e => {
        const {name,value} = e.target;
        setErrors(checkFormErrors(name, value, loginSchema, errors, setErrors));
        setLoginUser({
            ...loginUser,
            [name]:value
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let {loginCheck,u}=loginControl(users, loginUser);

        if(loginCheck){
            setActiveCheck(loginCheck);
            setActiveUser(u);
        }
        else{
            alert("Kullanıcı Adı veya Şifre Yanlış");
        }
    };

    return (

        <div className="login-container">
            <div className='login-error-show' style={{color:"red"}}>
              <p>{errors.user}</p>
              <p>{errors.password}</p>
            </div>
    
          <form id="login-form"  onSubmit={handleSubmit}>
          <p>
                <label htmlFor="login-name-input">İsim: </label>
                <input
                  type="text"
                  id="login-name-input"
                  name="user"
                  value={loginUser.user}
                  placeholder="İsiminizi Giriniz"
                  onChange={handleChange}
                />
            </p>
    
            <p>
                <label htmlFor="login-password-input">Sifre: </label>
                <input
                    type="password"
                    id="login-password-input"
                    name="password"
                    value={loginUser.password}
                    placeholder="Şifrenizi Giriniz"
                    onChange={handleChange}
                />
            </p>
    
            <p>
                <input type="submit" value={"Giris"} disabled={disabled} />
            </p>
            
          </form>
        </div>
      );
  }