import * as yup from "yup";

const checkFormErrors = (name, value, schema, obj, setObj ) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setObj({
          ...obj,
          [name]: ""
        });
      })
      .catch((err) => {
        setObj({
          ...obj,
          [name]: err.errors[0]
        });
      });

    return obj;
};

const loginControl = (users, _loginUser) => {
    let loginCheck=false;
    let u;
    users.forEach(_user => {
        if ((_user["user"]===_loginUser["user"]) && (_user["password"]===_loginUser["password"])){
            loginCheck=true;
            u=_user
        }
    });
    return {loginCheck,u};
};

export {checkFormErrors , loginControl};