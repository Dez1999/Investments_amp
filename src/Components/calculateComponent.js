import React, {Component} from 'react';
import './App.css';
import FormBox from './Components/FormBox';
import ResultComponent from './Components/ResultComponent';

class calculateComponent extends Component{
    constructor(){
        super();

        this.state={
            result: ""
        }
    }

    onClick = button => {
        if(button === "result"){
            this.calculate()
        }
    }

    calculate = () =>{
        try{
            this.setState({
                result:(eval(this.state.result) || "") + ""
            })
        }catch (e){          
             this.setState({
                result:"error"
            })
            }
     };

    render(){
    return (
        <div>
            <div className="calculator-body">
                <h1> Simple Interest Calculator</h1>
                <ResultComponent result ={this.state.result}/>
                <FormBox on Click={this.onClick}/>
            </div>
        </div>

    ); 
} 
}

export default calculateComponent;