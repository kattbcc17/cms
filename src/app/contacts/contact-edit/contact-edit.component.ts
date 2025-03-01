import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
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
  
  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) { // Check if newContact is null or undefined
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) { // Check if contact is the same as the edited contact
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) { // Check if the contact is already in the group
        return true;
      }
    }
    return false; // Contact is not in the group
  }

  addToGroup(event: CdkDragDrop<Contact[]>) {
    const draggedContact = event.item.data;  // Get the dragged contact
    if (draggedContact && !this.groupContacts.includes(draggedContact)) {
      this.groupContacts.push(draggedContact);  // Add to the groupContacts array
    }
  }
  

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
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
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
  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return; // Exit if the index is out of bounds
    }
    this.groupContacts.splice(index, 1); // Remove the contact from the group
  }

}

