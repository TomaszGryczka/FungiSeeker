import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  isLoading = false;
  chatId: number;

  webSocket?: WebSocket;
  messages: string[] = [];

  constructor(private route: ActivatedRoute,
              private auth: AuthService) {
    this.chatId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.connect();
  }

  ngOnDestroy(): void {
    this.closeConnection();
  }

  private connect() {
    this.isLoading = true;

    // this.webSocket = new WebSocket('ws://localhost:8080/chat/' + this.chatId);

    this.auth.getAccessTokenSilently().subscribe(token => {

      document.cookie = 'X-Authorization=' + token + '; path=/';

      this.webSocket = new WebSocket('ws://localhost:8080/chat');

      this.webSocket.onopen = (event) => {
        console.log('WebSocket Client Connected: ', event);
      };

      this.webSocket.onmessage = (event) => {
        console.log('WebSocket Client Received Message: ', event);
        this.messages.push(event.data);
      }

      this.webSocket.onclose = (event) => {
        console.log('WebSocket Client Closed: ', event);
      }

      this.isLoading = false;
    });
  }

  sendMessage(message: string) {
    this.webSocket?.send(message);
  }

  private closeConnection() {
    this.webSocket?.close();
  }
}
