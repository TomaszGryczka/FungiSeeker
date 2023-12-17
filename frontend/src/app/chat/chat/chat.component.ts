import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "@auth0/auth0-angular";
import {ChatGatewayService} from "../chat-gateway.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

  isLoading = false;
  chatId: number;

  webSocket?: WebSocket;
  messages: ChatMessage[] = [];
  messageToSend = "";

  chatHeight: number | undefined;

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

  ngAfterViewInit(): void {
    const intervalId = setInterval(() => {
      const docHeight = document.documentElement.clientHeight;
      const lowerBarHeight = document.getElementById("lower-bar")?.offsetHeight;
      const upperBarHeight = document.getElementById("upper-bar")?.offsetHeight;

      if (lowerBarHeight && docHeight && upperBarHeight) {
        this.chatHeight = docHeight - (lowerBarHeight + upperBarHeight);
        this.scrollToBottom();

        if (this.chatHeight) {
          clearInterval(intervalId);
        }
      }
    }, 100);
  }

  get chatHeightStyle() {
    return {
      height: (this.chatHeight ? this.chatHeight + "px" : "100%"),
      "overflow-y": "scroll"
    }
  }

  private connect() {
    if (environment.shouldAuthenticate) {
      this.auth.getAccessTokenSilently().subscribe(token => {
        this.initConnection(token);
      });
    } else {
      this.initConnection();
    }
  }

  sendMessage(message: ChatMessage) {
    this.webSocket?.send(JSON.stringify(message));
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.sendInputMessage();
    }
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
    this.isLoading = true;
    this.chatGatewayService.fetchChatMessages(this.chatId)
      .subscribe((message: ChatMessage[]) => {
        this.messages.push(...message);
        this.scrollToBottom();
        this.isLoading = false;
      });
  }

  private initConnection(token: string | undefined  = undefined) {
    this.webSocket = new WebSocket(environment.backendApiUrlWs + '/chat' + (token ? '?token=' + token : ''));

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
      this.scrollToBottom();
    }

    this.webSocket.onclose = (event) => {
      console.log('WebSocket Client Closed: ', event);
    }
  }

  private scrollToBottom() {
    const scroller = document.getElementById("scroller");
    if (scroller) {
      setTimeout(() => {
        scroller.scrollTo(0, scroller.scrollHeight);
      }, 100);
    }
  }
}

export interface ChatMessage {
  mushroomHuntingId: number;
  message?: string;
  senderName?: string;
  createDate?: string;
}
