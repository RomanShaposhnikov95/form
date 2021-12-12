import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";


const useValidation = (value, validations) => {
    const [isEmpty,setEmpty] = useState(true)
    const [minLengthError,setMinLengthError] = useState(false)
    const [emailError,setEmailError] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case 'isEmpty':
                    value ? setEmpty(false): setEmpty(true)
                    break;
                case 'isEmail':
                    const re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true);
                    break
            }
        }
    },[value])

    return {
        isEmpty,
        minLengthError,
        emailError
    }
}


const useInput = (initialValue,validation) => {
    const [value,setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value,validation)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

function App() {
    const email = useInput('', {isEmpty: true, minLength: 3, isEmail: true})
    const password = useInput('',{isEmpty: true, minLength: 5})

  return (
    <div className="App">
      <form action="">
        <h1>Регистрация</h1>
          {(email.isDirty && email.isEmpty) && <div style={{color: 'red'}}>email empty</div>}
          {(email.isDirty && email.minLengthError) && <div style={{color: 'red'}}>Error email length</div>}
          {(email.isDirty && email.emailError) && <div style={{color: 'red'}}>uncorrect email</div>}
        <input onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} value={email.value} type="text" name='email'/>
          {(password.isDirty && password.isEmpty) && <div style={{color: 'red'}}>password empty</div>}
          {(password.isDirty && password.minLengthError) && <div style={{color: 'red'}}>password Error length</div>}
        <input onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} value={password.value} type="password" name='email'/>
        <button type='submit'>Sign in</button>
      </form>
    </div>
  );
}

export default App;
