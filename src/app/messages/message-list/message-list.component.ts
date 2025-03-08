import { Component, OnInit } from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  standalone: false,

  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}


  ngOnInit(): void {
    // Fetch initial messages from Firebase
    this.messageService.fetchMessages();

    // Subscribe to messageChangedEvent to update the messages when they change
    this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => (this.messages = messages)
    );
  }

  onAddMessage(message: Message) {
    this.messages.push(message); // Add the new message to the list
  }
}
