import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void { 
    // Get the route parameter 'id' for editing an existing contact
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];  // Get the 'id' from route parameters
      if (!this.id) {
        this.editMode = false; // If no 'id' in the URL, it's a new contact
        return;
      }
      // If 'id' exists, fetch the existing contact
      this.originalContact = this.contactService.getContact(this.id);
      if (!this.originalContact) {
        return; // If the contact does not exist, return
      }

      this.editMode = true; // We're in edit mode
      this.contact = JSON.parse(JSON.stringify(this.originalContact)); // Clone the contact

      // If the contact has a group, clone the group as well
      if (this.originalContact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
      }
    });
  }
  // Handle the drop event when a contact is dropped into the group
  onContactDropped(event: CdkDragDrop<Contact[]>): void {
    const draggedContact = event.item.data;  // Get the dragged contact
    if (this.isContactInGroup(draggedContact)) {
      return;  // If contact is already in the group, do nothing
    }
    this.groupContacts.push(draggedContact);  // Add the contact to the group
  }

  // Check if the dragged contact is already in the group
  isContactInGroup(contact: Contact): boolean {
    return this.groupContacts.some((groupContact) => groupContact.id === contact.id);
  }
  
  // Handle form submission
  onSubmit(contactForm: NgForm): void {
    if (contactForm.invalid) {
      return;
    }
  
    if (this.editMode) {
      // Update existing contact by passing original and new contact
      this.contactService.updateContact(this.originalContact, this.contact);
    } else {
      // Add new contact
      this.contactService.addContact(this.contact);
    }
  
    // Navigate back to the contacts list
    this.router.navigate(['/contacts']);
  }


  onCancel(): void {
    console.log('Cancel button clicked');
    this.router.navigate(['/contacts']);
  }

 // Remove item from groupContacts list
 onRemoveItem(index: number): void {
  this.groupContacts.splice(index, 1);
}
}

