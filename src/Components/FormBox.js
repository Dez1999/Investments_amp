import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(to bottom, #f05053, #e1eec3);
    height: 100%;
    margin: 0;
    color: #555;
  }
`;

const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

const StyledInput = styled.input`
  font-size: 30px;
  display: block;
  width: 100%;
  ${sharedStyles}
`;

const StyledTextArea = styled.textarea`
  background-color: #eee;
  width: 100%;
  min-height: 100px;
  resize: none;
  ${sharedStyles}
`;
const StyledButton = styled.button`
  display: block;
  background-color: #f7797d;
  color: #fff;
  font-size: 0.9rem;
  border: 3;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  margin : 20px 0;
  cursor: pointer;
  box-sizing: border-box;
`;

const StyledFieldset = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;
  legend {
    padding: 0 10px;
  }
  label {
    padding-right: 20px;
  }
  input {
    margin-right: 10px;
  }
`;

const StyledError = styled.div`
  color: red;
  font-weight: 800;
  margin: 0 0 40px 0;
`;

const initialState = {
  startAmount: '',
  rate: '',
  year:'',
  message: '',
  gender: '', 
};

function FormBox() {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState('');
  const [startNum, setStartNum] = useState();
  const [yearNum, setYearNum] = useState();
  const [rateNum, setRateNum] = useState();
  const [annualNum, setAnnualNum] = useState();
  const [total, setTotal] = useState();

  function calculateResult(){
    if (annualNum === "" || annualNum === 0){     //Calculate without annual additions
      if (rateNum === ""){       //Check interest rate value
          setRateNum(0.00);
      }
      if (yearNum === ""){       //Check year value
          setYearNum(0);
      }
      if (startNum === ""){       //Check initial value
          setStartNum(0.0)
      }
      var x = parseFloat(startNum) * (Math.pow(parseFloat(rateNum/100) + 1.00, parseFloat(yearNum)));    //Calculate Interest on principle amount by n years; Formula: F = P*(F/P, i, n)
      var total1 = x.toFixed(2)    //Round result to 2 decimal places
      return total1        //Returns the result and displays it * Math.pow(1+i,n)
  }
    else {          //******This Calculates at END of EACH COMPOUNDING Period
        if (rateNum === ""){       //Check interest rate value
            setRateNum(0.00);
        }
        if (yearNum === ""){       //Check year value
            setYearNum(0);
        }
        if (startNum === ""){       //Check start value
            setStartNum(0.0);
        }
        var y = parseFloat(startNum) * (Math.pow(parseFloat(rateNum/100) + 1.00, parseFloat(yearNum)));    //Calculate Interest on principle amount by n years; Formula: F = P*(F/P, i, n)
        var d = parseFloat(annualNum) * ((Math.pow(1.00 + parseFloat(rateNum/100), yearNum) - 1) / parseFloat(rateNum/100))     //Calculate total amount on annual uniform payments; Formula: F = A*(((1 +i)^2 - 1)/i)
        var total2 = y + d;
        var fixedTotal = total2.toFixed(2);
        return fixedTotal  /*ADD FEATURE: ADD COMMAS TO ANSWER*/
    }
    
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log('submitted!');
    console.log(state);
    /*setTotal(yearNum + rateNum)*/
    setError('');
    console.log("Succeeded!!!")

    setTotal(calculateResult)

    /*
    for (let key in state) {
      if (state[key] === '') {
        setError(`You must provide the ${key}`)
        return
      }
    }
    */
   
    // const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // const test = regex.test(state.email);
    // console.log(test);

    
  };

  const handleInput = e => {
    const inputName = e.currentTarget.name;
    const value = e.currentTarget.value;

    setState(prev => ({ ...prev, [inputName]: value }));
  };

  const handlenum1 = (event) => {
       this.setState({
         startAmount: event.target.value
       })
  }

  const handlenum2 = (event) => {
    this.setState({
      rate: event.target.value
    })
  }

  const handlenum3 = (event) => {
  this.setState({
    year: event.target.value
  })
  }

  const execute =(event) =>{
    this.setState({result: this.state.year + this.state.rate});
    event.prevent.default();
    console.log("Succeeded!!!")
  }

  return (
    <>
      <GlobalStyle />
      <StyledFormWrapper>
        <StyledForm onSubmit={handleSubmit}>
          <h2>Interest Calculator</h2>

          <label htmlFor="startAmount">Starting Amount $</label>
          <StyledInput
            type="number"
            name="startAmount"
            value={startNum}
            onChange={e => setStartNum(+e.target.value)}
          />

          <label htmlFor="rate">Interest Rate</label>
          <StyledInput
            type="number"
            name="rate"
            value={rateNum}
            onChange={e => setRateNum(+e.target.value)}
          />

          <label htmlFor="year">Number of Years</label>
          <StyledInput
            type="number"
            name="year"
            value={yearNum}
            onChange={e => setYearNum(+e.target.value)}
          />

          <label htmlFor="year">Annual Payments $</label>
          <StyledInput
            type="number"
            name="annual"
            value={annualNum}
            onChange={e => setAnnualNum(+e.target.value)}
          />

          <StyledFieldset>
            <legend>Compunding Period</legend>
            <label>
              <input
                type="radio"
                value="female"
                name="gender"
                checked={state.gender === 'female'}
                onChange={handleInput}
              />
              Beginning
            </label>
            <label>
              <input
                type="radio"
                value="male"
                name="gender"
                checked={state.gender === 'male'}
                onChange={handleInput}
              />
              End
            </label>
        
          </StyledFieldset>
          
          {error && (
            <StyledError>
              <p>{error}</p>
            </StyledError>
          )}
          <StyledButton type="submit">Calculate</StyledButton>
          <p><strong> Result: $ </strong> {total}</p>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
}

export default FormBox;