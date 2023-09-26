package websocket

import (
	"fmt"
	"github.com/gorilla/websocket"
	"sync"
)

type Client struct {
	ID   string
	Conn *websocket.Conn
	Pool *Pool
	mu   sync.Mutex
}

type Message struct {
	Type int    `json:"type"`
	Body string `json:"body"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		err := c.Conn.Close()
		if err != nil {
			return
		}
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		}
		message := Message{Type: messageType, Body: string(p)}
		c.Pool.Broadcast <- message

		fmt.Printf("message received:%+v\n", message)
	}
}
