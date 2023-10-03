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
            chatHistory:[],
            loading:true
        }
        this.handle = this.handle.bind(this)
    }
    componentDidMount() {
        // Send a message to the server
        // socket.send("Hello, server!");

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
                {this.state.loading?
                    <div className={'loading-wrapper'}>
                        <svg className="pl" viewBox="0 0 128 128" width="128px" height="128px"
                                              xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="hsl(193,90%,55%)"/>
                                <stop offset="100%" stop-color="hsl(223,90%,55%)"/>
                            </linearGradient>
                        </defs>
                        <circle className="pl__ring" r="56" cx="64" cy="64" fill="none" stroke="hsla(0,10%,10%,0.1)"
                                stroke-width="16" stroke-linecap="round"/>
                        <path className="pl__worm"
                              d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z"
                              fill="none" stroke="url(#pl-grad)" stroke-width="16" stroke-linecap="round"
                              stroke-linejoin="round" stroke-dasharray="44 1111" stroke-dashoffset="10"/>
                        </svg>
                    </div>
                    : <ChatInput send={this.handle}/>}
            </div>
        );
    }
}

export default App;
