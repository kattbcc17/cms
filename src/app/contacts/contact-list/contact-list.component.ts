import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  standalone: false,
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.fetchContacts();
    this.contactService.contactChangedEvent.subscribe((arr: Contact[]) => {
      this.contacts = arr;
    });
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactList: Contact[]) => (this.contacts = contactList)
    );
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe(); // Unsubscribe from the event to avoid memory leaks
  }

  search(value: string) {
    this.term = value;
  }
}