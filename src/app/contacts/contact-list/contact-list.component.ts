import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { CommonModule } from '@angular/common';
import { ContactItemComponent } from '../contact-item/contact-item.component';  // Import ContactItemComponent


@Component({
  standalone: true,
  imports: [CommonModule, ContactItemComponent],
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
  
export class ContactListComponent {
  
  contacts: Contact[] = [
    new Contact(
      '1', 
      'R. Kent Jackson', 
      'jacksonk@byui.edu', 
      '208-496-3771',
      '../../assets/images/jacksonk.jpg',
      null,
    ),
    new Contact(
      '2', 
      'Rex Barzee', 
      'barzeer@byui.edu',
      '208-496-3768',
      '../../assets/images/barzeer.jpg',
      null,
    ),
  ];


  onNewContact() {
    console.log('clicked!');
  }
}
