import React from "react";
class ChatInput extends React.Component{
    render() {
        return (
            <div className={'ChatInput'}>
                <input className={'chatInputBox'} onKeyDown={this.props.send} placeholder={'send message'} type={'text'}/>
            </div>
        );
    }
}

export default ChatInput