import React from "react";

class Message extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            message :this.props.message
        }
    }
    render() {
        return (
            <div className={this.state.message.type==='message'?'message-wrapper':'response-wrapper'}>
                <h2 className={this.state.message.type==='message'?'message':'response'}>{this.state.message.message}</h2>
            </div>
        );
    }
}

export default Message;