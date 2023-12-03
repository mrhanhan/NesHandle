package main

import (
	"fmt"
	"github.com/go-vgo/robotgo"
	"net"
	"net/http"
	"strings"
)

func main() {
	http.HandleFunc("/api/keydown", func(writer http.ResponseWriter, request *http.Request) {
		value := request.FormValue("key")
		robotgo.KeyDown(strings.ToLower(value))
		println("KeyDown:", value)
		writer.Write([]byte("{}"))
	})

	http.HandleFunc("/api/keyup", func(writer http.ResponseWriter, request *http.Request) {
		value := request.FormValue("key")
		robotgo.KeyUp(strings.ToLower(value))
		println("KeyUp:", value)
		writer.Write([]byte("{}"))
	})

	fs := http.FileServer(http.Dir("page/"))
	http.Handle("/", http.StripPrefix("/", fs))
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		fmt.Println(err)
		return
	}
	for _, address := range addrs {
		if ipnet, ok := address.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				fmt.Println("请打开:http://" + ipnet.IP.String() + ":3000")
			}
		}
	}
	http.ListenAndServe(":3000", nil)
}
