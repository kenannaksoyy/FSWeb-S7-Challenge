import React,{useState,useEffect} from 'react';
import  pizzaSecilimler  from '../Datas/pizzaData';
import * as yup from "yup";
import { checkFormErrors} from '../Utils/Util';
import axios from "axios";
import Service from './Service';

const pizzaSchema = yup.object().shape({
    isim: yup
    .string()
    .required("Pizza İsmi Yazınız")
    .min(2,"İsim en az 2 karakter olmalıdır"),
    boyut:yup
    .mixed()
    .oneOf(pizzaSecilimler.pizzaBoyut,"Lütfen Boyut Şecin"),
    turTercih:yup
    .mixed()
    .oneOf(pizzaSecilimler.pizzaTur,"Lütfen Pizza Tercihi Seçin")
});

export default function PizzaForm () {

    const [pizza, setPizza] = useState({
        isim: "",
        boyut: "",
        malzeme1: false,malzeme2: false,malzeme3: false,malzeme4: false,
        ozel: "",
        turTercih:""
    });

    const [errors, setErrors] = useState({
        isim: "",
        boyut: "",
        turTercih:""
    })

    const [disable, setDisable] = useState(true);
    const [pizzaCheck, setPizzaCheck] = useState(false);

    useEffect ( () => {
        pizzaSchema
        .isValid(pizza)
        .then(valid =>{
          setDisable(!valid)
        })
      },[pizza]);


    const handleChange = event =>{
        const {checked, value ,name ,type} = event.target; 
        const _value = type === "checkbox" ? checked : value;

        if(name==="isim" || name==="boyut" || name==="turTercih") {
            setErrors(checkFormErrors(name, _value, pizzaSchema, errors, setErrors));
        }
        
        setPizza({
            ...pizza,
            [name]:_value 
        });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setPizzaCheck(true);
        axios
        .post("https://reqres.in/api/orders",pizza)
        .then(res =>{
            console.log(res.data);
            setPizzaCheck(true);  
        })
        .catch(err => {
            console.error('Sunucu Hatası', err);
        });
    };

    if(pizzaCheck===true){
        return(
            <Service/>
        );
    }
    

  return (
    <div className="pizza-form-container">
      <h2>Kendi Özel Pizzanızı Hazırlayınız</h2>
        <div className='pizza-img'>
            <img src="https://www.freeiconspng.com/thumbs/pizza-png/pizza-png-15.png"/>
        </div>

        <div className='pizza-error-show' style={{color:"red"}}>
          <p>{errors.isim}</p>
          <p>{errors.boyut}</p>
          <p>{errors.turTercih}</p>

        </div>
        <form id='pizza-form' onSubmit={handleSubmit}>

            <p>
                <label htmlFor="name-input">Pizzanızın İsim: </label>
                <input 
                type="text" 
                id="name-input" 
                name="isim"
                value={pizza.isim} 
                placeholder="Lütfen Pizzanısın İsmini Girinizi"
                onChange={handleChange}
                />
            </p>

            <p>
                <strong>Pizza Türünüzü Seçiniz</strong>
                {
                    pizzaSecilimler["pizzaTur"].map(tur => (
                        <>
                            <br/>
                            <label>{tur}
                            <input type="radio" name="turTercih" value={tur} 
                            checked={pizza.turTercih===tur} onChange={handleChange}/>
                            </label>
                        </>
                    ))
                }
            </p>

            {
                (pizza.turTercih!=="") 
                &&
                (
                    pizzaSecilimler[`${pizza.turTercih}Malzemeler`].map ((malzeme,index) => 
                        (
                        <>
                        <label htmlFor={`malzeme${index+1}`}>{malzeme}: </label>
                        <input 
                        type="checkbox" 
                        id={`malzeme${index+1}`}
                        name={`malzeme${index+1}`}
                        checked={pizza[`malzeme${index+1}`]}
                        onChange={handleChange}
                        />
                        </>
                        )
                        )
                )
                
            }

            <p>
                <label htmlFor="size-dropdown">Pizza Boyutu: </label>
                <select id="size-dropdown" name="boyut" value={pizza.boyut} onChange={handleChange}>
                    <option value={""}>Pizza Boyutu Seçiniz</option>
                    {
                        pizzaSecilimler["pizzaBoyut"].map (_boyut => (
                            <option value={_boyut}>{_boyut}</option>
                        ))
                    }
                </select>
            </p>

            <p>
                <label htmlFor="special-text">Özel İstek: </label>
                <input 
                type="text" 
                id="special-text" 
                name="ozel"
                value={pizza.ozel} 
                placeholder="Özel İsteğiniz Varsa Giriniz"
                onChange={handleChange}
                />
            </p>

            <p>
                <input type="submit" id="order-button" value={disable===false?"Sipariş":"Gerekli Bilgileri Doldur"} disabled={disable} />
            </p>

        </form>
    </div>
  );
}