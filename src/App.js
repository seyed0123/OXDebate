import React from "react";
import './App.css';
import ChatInput from './components/chatInput'
import Header from './components/header'
import ChatHistory from "./components/chatHistory";
import {connect,sendMsg} from "./api";
class App extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            ChatHistory:[]
        }
    }
    componentDidMount() {
        connect((msg) =>{
            this.setState((prevState) =>({
                chatHistory:[...prevState.chatHistory,msg]
            }));
        });
    }

    render() {
        return (
            <div className={'main'}>
                <Header/>
                <ChatHistory chatHistory={this.state.chatHistory}/>
                <ChatInput send={this.send}/>
            </div>
        );
    }
}

export default App;
