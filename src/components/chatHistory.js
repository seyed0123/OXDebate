import React from "react";
import Massage from "./massage";
class ChatHistory extends React.Component{
    render() {
        let messages = this.props.chatHistory.map( msg => {
            return <Massage key={msg.timeStamp} message={msg}/>
        });
        return (
            messages.length===0 ?<p/>:
            <div className={'ChatHistory'}>
                {messages}
            </div>
        );
    }
}

export default ChatHistory;
