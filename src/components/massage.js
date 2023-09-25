import React from "react";

class Message extends React.Component{
    constructor(props) {
        super(props);
        let tmp = JSON.parse(this.props.message)
        this.state={
            message :tmp
        }
    }

    render() {
        return (
            <div className={'message-wrapper'}>
                <p className={'message'}>{this.state.message.body}</p>
            </div>
        );
    }

}

export default Message;