import { Component, OnInit } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,

  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('01', 'Literature', 'This is literature class.', 'Marcos'),
    new Message('02', 'Math', 'This is math class', 'Gabriela'),
    new Message('02', 'Chemistry', 'This is Chemistry class', 'Kattia'),
  ];

  ngOnInit(): void {}

  
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
