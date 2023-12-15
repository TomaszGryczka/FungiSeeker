import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "@auth0/auth0-angular";
import {ChatGatewayService} from "../chat-gateway.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  isLoading = false;
  chatId: number;

  webSocket?: WebSocket;
  messages: ChatMessage[] = [];
  messageToSend = "";

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private chatGatewayService: ChatGatewayService) {
    this.chatId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.fetchAllMessages();
    this.connect();
  }

  ngOnDestroy(): void {
    this.closeConnection();
  }

  private connect() {
    this.isLoading = true;

    this.auth.getAccessTokenSilently().subscribe(token => {

      document.cookie = 'X-Authorization=' + token + '; path=/; secure; SameSite=None;';

      this.webSocket = new WebSocket(environment.backendApiUrlWs +'/chat');

      this.webSocket.onopen = (event) => {
        console.log('WebSocket Client Connected: ', event);
        this.sendMessage({
            mushroomHuntingId: this.chatId,
            message: "init message"
        } as ChatMessage)
      };

      this.webSocket.onmessage = (event) => {
        console.log('WebSocket Client Received Message: ', event);
        this.messages.push(JSON.parse(event.data) as ChatMessage);
      }

      this.webSocket.onclose = (event) => {
        console.log('WebSocket Client Closed: ', event);
      }

      this.isLoading = false;
    });
  }

  sendMessage(message: ChatMessage) {
    this.webSocket?.send(JSON.stringify(message));
  }

  sendInputMessage() {
    this.auth.user$.subscribe(user => {
      this.sendMessage({
        mushroomHuntingId: this.chatId,
        message: this.messageToSend,
        senderName: user?.name || undefined
      } as ChatMessage);
      this.messageToSend = '';
    });
  }

  private closeConnection() {
    this.webSocket?.close();
  }

  private fetchAllMessages() {
    this.chatGatewayService.fetchChatMessages(this.chatId)
      .subscribe((message: ChatMessage[]) => {
        this.messages.push(...message);
      });
  }
}

export interface ChatMessage {
  mushroomHuntingId: number;
  message?: string;
  senderName?: string;
}
