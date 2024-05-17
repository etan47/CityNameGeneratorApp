import React, {Component} from "react";


class MainBody extends Component{
    constructor() {
        super()
        this.state = {
            output: "",
            currentInput: ""
        }
        this.finishName = this.finishName.bind(this)
        this.getName = this.getName.bind(this)
        this.getFiveNames = this.getFiveNames.bind(this)
        this.getOutput = this.getOutput.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.getOutput2 = this.getOutput2.bind(this)
        this.errorMessage = this.errorMessage.bind(this)
    }
    getOutput(input) {
        let inputData = { count: input}
        fetch('http://localhost:8000/create/', {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                output: data,
                currentInput: this.state.currentInput
            })
        })
    }
    getOutput2(input) {
        let inputData = { features: input}
        fetch('http://localhost:8000/finish/', {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                output: data,
                currentInput: this.state.currentInput
            })
        })
    }


    finishName() {
        const chars = new Set(['-','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ñ'])
        if (this.state.currentInput.length < 1){
            this.errorMessage("Not enough characters!")
            return
        }
        else if (this.state.currentInput.length > 10){
            this.errorMessage("Too many characters!")
            return
        }
        for (let i = 0; i < this.state.currentInput.length; i++){
            if (!chars.has(this.state.currentInput[i])){
                this.errorMessage("Only uppercase/lowercase English letters and hyphens please!")
                return
            }
        }
        this.getOutput2(this.state.currentInput)
    }
    getName() {
        this.getOutput(1)
    }
    getFiveNames(){
        this.getOutput(5)
    }
    handleInputChange(e){
        this.setState({
            output: this.state.output,
            currentInput: e.target.value
        })
    }
    errorMessage(message){
        this.setState({
            output: message,
            currentInput: this.state.currentInput
        })
    }
    render() {
        return(
            <div style={{whiteSpace: "pre-line"}}>
                <input type="text" placeholder="Begin name here" onChange={this.handleInputChange}></input>
                <br></br>
                <button onClick={this.finishName}>Finish Name</button>
                <button onClick={this.getName}>1 Random Name</button>
                <button onClick={this.getFiveNames}>5 Random Names</button>
                <p className='output'>{this.state.output}</p>
            </div>
        )
    }
}
export default MainBody
