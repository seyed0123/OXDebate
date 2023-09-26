package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	openai "github.com/sashabaranov/go-openai"
)

var key string

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

		// Send message back to client
		err = conn.WriteMessage(websocket.TextMessage, msg)
		if err != nil {
			log.Println(err)
			break
		}
	}
}

func main() {
	apiKey, err := ioutil.ReadFile("config.txt")
	if err != nil {
		log.Fatal(err)
	}
	key = string(apiKey)
	http.HandleFunc("/ws", wsHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))

}
func APICall(msg string) string {
	client := openai.NewClient(key)
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: msg,
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return ""
	}
	fmt.Println("answer for this text %v : %v \n", msg, resp.Choices[0].Message.Content)
	return resp.Choices[0].Message.Content

}
