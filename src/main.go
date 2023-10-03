package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	for {
		// Read message from client
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			break
		}

		// Process message
		log.Printf("Received message: %s", msg)

		if string(msg) != "Hello, server!" {
			msg = []byte(sendMessage(string(msg)))
		}
		err = conn.WriteMessage(websocket.TextMessage, msg)
		if err != nil {
			log.Println(err)
			break
		}
	}
}

func main() {
	message := "Hello from Go"

	response := sendMessage(message)
	fmt.Println("Response from server:", response)
	http.HandleFunc("/ws", wsHandler)
	log.Fatal(http.ListenAndServe(":9000", nil))

}
func sendMessage(message string) string {
	resp, err := http.PostForm("http://localhost:8080/process",
		url.Values{"message": {message}})
	if err != nil {
		fmt.Println(err)
		return "there is an err"
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
		return "there is an err"
	}

	return string(body)
}
