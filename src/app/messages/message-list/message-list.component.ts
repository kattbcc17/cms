import { Component, OnInit } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  imports: [],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('01', 'Math', 'Grades have been posted.', 'Kendrick'),
    new Message('02', 'Biology', 'Office hours are 2-5 p.m.', 'Kevyn'),
    new Message('02', 'Science', 'Assignment 3 is due today at 4 p.m.', 'Rhianne'),
  ];

  ngOnInit(): void {}
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
