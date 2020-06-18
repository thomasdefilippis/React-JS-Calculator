import React from 'react';
import './components.css';
import Display from './displayClear';

let overText = '';

export default class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: '',
            total: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClearAll = this.handleClearAll.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick (event){
            
            if((overText[overText.length-1] !== "*" && overText[overText.length-1] !== "/" && overText[overText.length-1] !== "+" && overText[overText.length-1] !== "-" && overText[overText.length-1] !== "^") 
            || parseInt(event.currentTarget.value) || (event.currentTarget.value === '-' && overText[overText.length-1] !== '-')|| event.currentTarget.value === '.'){
                overText += event.currentTarget.value;
                if(overText === '*' || overText === '/' || overText === '+' || overText === '^'){
                    overText = ''; 
                }
            }
            this.setState({
                text: overText
            })
    }

    handleClearAll(){
        overText = '';
        this.setState({
            text: ''
        })
    }

    handleClear(){
        let substring = overText.substring(0, overText.length-1);
        overText = substring;
        this.setState({
            text: overText
        })

    }

    handleSubmit(){
        if(overText[overText.length-1] !== "*" 
        && overText[overText.length-1] !== "/"
        && overText[overText.length-1] !== "+" 
        && overText[overText.length-1] !== "-"
        && overText[overText.length-1] !== '^'
        && overText !== '') {
            let total = 0;
            let temp = 0;
            const operations = overText.split('').filter(x => !parseInt(x) && x !== '.' && x !== '0');
            console.log(operations)
            const numberText = overText.split(/[-+*/^]/);
            const numbers = numberText.map(x => parseFloat(x));
            for(let i=0; i < numbers.length; i++){
                if(Number.isNaN(numbers[i])){
                    numbers.splice(i, 2, -numbers[i+1]);
                    operations.splice(i, 1)
                    
                }
            }
            console.log(numbers, operations);
            for(let i = 0; i < operations.length; i++){
                if(operations[i] === '^'){
                    numbers.splice(i+1, 1, numbers[i]**numbers[i+1]);
                    numbers.splice(i, 1, 1);
                    operations.splice(i, 1, '*');
                }
            }
            console.log(numbers, operations)
            for(let i = 0; i < operations.length; i++){
                if(operations[i] === '-'){
                    numbers.splice(i+1, 1, -numbers[i+1]);
                    operations.splice(i, 1, '+');
                }
                if(operations[i] === '*'){
                    temp = numbers[i]*numbers[i+1];
                    numbers.splice(i, 1, 0);
                    numbers.splice(i+1, 1, temp);
                    operations.splice(i, 1, '+')
                    temp = 0;
                    
                }else if(operations[i] === '/'){
                    temp = numbers[i]/numbers[i+1];
                    numbers.splice(i, 1, 0);
                    numbers.splice(i+1, 1, temp);
                    operations.splice(i, 1, '+')
                    temp = 0;
                }
            }
            console.log(numbers, operations)
  
            total = numbers.reduce((x,y) => x+y)
            this.setState({
                text: Math.round(total*1000)/1000
            })

            overText = '';

            
        }
    }
    
    
    render(){
        return (
            <main>
                <table>
                    <Display text={this.state.text}/>
                    <tr className="table-row">
                        <td className="border-left">
                            <button onClick={this.handleClick} value='7'>7</button>
                        </td>
                        <td>
                            <button onClick={this.handleClick} value="8">8</button>
                        </td>
                        <td>
                            <button onClick={this.handleClick} value="9">9</button>
                        </td>
                        <th className="clear">
                            <td id="clear1">
                                <button id="clear" value="C" onClick={this.handleClear}>C</button>
                            </td>
                            <td id="clear-all">
                                <button value="AC" onClick={this.handleClearAll} >AC</button>
                            </td> 
                        </th>
                    </tr>
                    <tr className="table-row">
                        <td className="border-left">
                            <button onClick={this.handleClick} value="4">4</button>
                        </td>
                        <td>
                            <button onClick={this.handleClick} value="5">5</button>
                        </td>
                        <td>
                            <button onClick={this.handleClick} value="6">6</button>
                        </td>
                        <th className="border-right">
                            <td id="multiply">
                                <button onClick={this.handleClick} value="*">*</button>
                            </td>
                            <td id="divide">
                                <button onClick={this.handleClick} value="/">/</button>
                            </td>
                        </th>
                    </tr>
                    <tr className="table-row">
                        <td className='border-left'>
                            <button onClick={this.handleClick} value="1">1</button>
                        </td>
                        <td>
                            <button onClick={this.handleClick} value="2">2</button>
                        </td>
                        <td>
                            <button onClick={this.handleClick} value="3">3</button>
                        </td>
                        <th className="border-right">
                            <td id="add">
                                <button onClick={this.handleClick} value="+">+</button>
                            </td>
                            <td id="subtract">
                                <button onClick={this.handleClick} value="-">-</button>
                            </td>
                        </th>
                    </tr>
                    <tr>
                        <td className="corner-bottom-left">
                            <button onClick={this.handleClick} value='0'>0</button>
                        </td>
                        <td className="border-bottom">
                            <button value="." onClick={this.handleClick}>.</button>
                        </td>
                        <td className="border-bottom">
                            <button onClick={this.handleSubmit} value='='>=</button>
                        </td>
                        <td className="corner-bottom-right">
                            <button onClick={this.handleClick} value='^'>^</button>
                        </td>
                    </tr>
                </table>
            </main>
        )
    }
}