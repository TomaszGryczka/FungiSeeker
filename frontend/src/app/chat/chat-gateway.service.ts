import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ChatMessage} from "./chat/chat.component";

@Injectable({
  providedIn: 'root'
})
export class ChatGatewayService {

  private readonly chatUrl = environment.backendApiUrl + '/chat';

  constructor(private httpClient: HttpClient) { }

  fetchChatMessages(mushroomHuntingId: number): Observable<ChatMessage[]> {
    return this.httpClient.get<ChatMessage[]>(`${this.chatUrl}/messages/${mushroomHuntingId}`);
  }
}
