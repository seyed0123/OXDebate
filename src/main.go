package main

import (
	"OXDebate/pkg/websocket"
	"fmt"
	"net/http"
)

func main() {
	setupRoutes()
	http.ListenAndServe(":9000", nil)
}

func setupRoutes() {
	pool := websocket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(writer http.ResponseWriter, request *http.Request) {
		serveWS(pool, writer, request)
	})
}

func serveWS(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("websocket endpoint reached")

	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Println(err)
	}
	client := &websocket.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client

	client.Read()
}
