package main

import (
	"fmt"
	"github.com/go-resty/resty/v2"
	"github.com/gorilla/websocket"
	"io/ioutil"
	"log"
	"net/http"
)

var key string

const (
	apiEndpoint = "https://api.openai.com/v1/chat/completions"
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
			msg = []byte(APICall(string(msg)))
		}
		err = conn.WriteMessage(websocket.TextMessage, msg)
		if err != nil {
			log.Println(err)
			break
		}
	}
}

func main() {
	apiKey, err := ioutil.ReadFile("src/config.txt")
	if err != nil {
		log.Fatal(err)
	}
	key = string(apiKey)
	fmt.Println(key)
	http.HandleFunc("/ws", wsHandler)
	log.Fatal(http.ListenAndServe(":9000", nil))

}
func APICall(msg string) string {
	client := resty.New()
	resp, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetBody(map[string]interface{}{
			"input_text": msg,
		}).
		Post("http://localhost:5000/mingpt")

	if err != nil {
		log.Printf("Failed to send the request: %v\n", err)
		return "Failed to send the request"
	}

	body := resp.Body()
	return string(body)
}
