import React from "react";
import './App.css';
import ChatInput from './components/chatInput'
import Header from './components/header'
import ChatHistory from "./components/chatHistory";
import socket from "./api";
class App extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            chatHistory:[{'message':'hey','type':'message'},{'message':'hello','type':'response'}],
            loading:true
        }
        this.handle = this.handle.bind(this)
    }
    componentDidMount() {
        // Send a message to the server
        socket.send("Hello, server!");

        // Receive messages from the server
        socket.onmessage = (event) => {
            console.log("Received message:", event.data);
            this.setState((prevState) => {
                // Create a new array by copying the previous chat history and adding the new message
                const updatedChatHistory = [...prevState.chatHistory];

                // Return the updated state object
                return { chatHistory: updatedChatHistory,
                    loading:false
                };
            });
        };

    }

    handle(msg){
        socket.send(msg)
        this.setState((prevState) => {
            // Create a new array by copying the previous chat history and adding the new message
            const updatedChatHistory = [...prevState.chatHistory, {'message':msg,'type':'message'}];

            // Return the updated state object
            return { chatHistory: updatedChatHistory,
                loading:true
            };
        });
        socket.onmessage = (event) => {
            this.setState((prevState) => {
                // Create a new array by copying the previous chat history and adding the new message
                const updatedChatHistory = [...prevState.chatHistory,{'message':event.data,'type':'response'}];

                // Return the updated state object
                return {
                    chatHistory: updatedChatHistory,
                    loading:false
                };
            });
        };
    }

    render() {
        return (
            <div className={'main'}>
                <Header/>
                <ChatHistory chatHistory={this.state.chatHistory}/>
                {this.state.loading?<h1/>:<ChatInput send={this.handle}/>}
            </div>
        );
    }
}

export default App;
