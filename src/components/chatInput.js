import React from "react";
class ChatInput extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        };
    }
    handleTextInputSubmit = () => {
        const { inputValue } = this.state;
        this.props.send(inputValue)
    };

    handleInputChange = (event) => {
        this.setState({ inputValue: event.target.value });
    };

    render() {
        return (
            <div className={'ChatInput'}>
                <button onClick={this.handleTextInputSubmit}>send</button>
                <input className={'chatInputBox'}  placeholder={'send message'} type={'text'} value={this.state.inputValue} onChange={this.handleInputChange}/>

            </div>
        );
    }
}

export default ChatInput