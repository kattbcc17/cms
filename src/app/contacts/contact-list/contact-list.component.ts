import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'cms-contact-list',
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
  
export class ContactListComponent {
  get imagePath() {
    return 'assets/images/';
  }
  
  contacts: Contact[] = [
    new Contact(
      "1",
      "R. Kent Jackson",
      "jacksonk@byui.edu",
      "208-496-3771",
      "jacksonk.jpg",
      null
    ),
    new Contact(
      "2",
      "Rex Barzee",
      "barzeer@byui.edu",
      "208-496-3768",
      "barzeer.jpg",
      null
    )
  ];
}
