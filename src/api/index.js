const socket = new WebSocket('wss://localhost:9000/ws');

let connect = (cb) =>{
    console.log('connecting..')

    socket.onopen = () =>{
        console.log('connected successfully!!')
    }
    socket.onmessage = (msg) =>{
        console.log('Massage from websocket: ',msg)
    }
    socket.onclose = (event) =>{
        console.log('socket closed :',event)
    }

    socket.onerror = (error) => {
        console.log('socket error: ',error)
    }
};

let sendMsg = (msg) =>{
    socket.send(msg)
}

export {connect , sendMsg};