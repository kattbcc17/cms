import { Component } from '@angular/core';
import { Contact } from '../contact.model';
@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent {
  groupContacts: Contact[] = [];

  onCancel() {
    console.log('Cancel button clicked');
  }

}

