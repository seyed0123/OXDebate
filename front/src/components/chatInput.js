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
                <button onClick={this.handleTextInputSubmit}>  <span>send</span>
                    <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0"/>
                    </svg></button>
                <input className={'chatInputBox'}  placeholder={'send message'} type={'text'} value={this.state.inputValue} onChange={this.handleInputChange}/>
            </div>
        );
    }
}

export default ChatInput