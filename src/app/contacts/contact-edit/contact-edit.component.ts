import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  @ViewChild('f', { static: false }) slForm: NgForm;
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This method checks if a contact is valid for adding to the group
  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  // Add a dragged contact to the group
  addToGroup(event: CdkDragDrop<Contact[]>) {
    const draggedContact = event.item.data; 
    if (draggedContact && !this.groupContacts.includes(draggedContact)) {
      this.groupContacts.push(draggedContact);
    }
  }

  // This lifecycle hook initializes the component with the contact data if editing
  ngOnInit(): void { 
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(id);
      if (!this.originalContact) {
        return;
      }
      this.editMode = true;
      this.contact = { ...this.originalContact }; // Clone the originalContact

      if (this.contact.group) {
        this.groupContacts = [...this.contact.group]; // Spread to clone the array
      }
    });
  }

  // Handle the drop event for rearranging contacts within the group
  onContactDropped(event: CdkDragDrop<Contact[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.groupContacts, event.previousIndex, event.currentIndex);
    }
  }

  // Check if a contact is already in the group
  isContactInGroup(contact: Contact): boolean {
    return this.groupContacts.some((groupContact) => groupContact.id === contact.id);
  }

  // Handle form submission: either add or update the contact
  onSubmit(form: NgForm): void {
    let value = form.value;
    let newContact = new Contact(
      value.id,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      value.group
    );
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact!, newContact); // Ensure originalContact is defined
    } else {
      this.contactService.addContact(newContact);
      this.onCancel();
    }
  }

  // Reset the form and navigate back
  onCancel() {
    this.slForm.reset();
    this.router.navigate(['/contacts']);
  }

  // Remove a contact from the group
  onRemoveItem(index: number): void {
    if (index >= 0 && index < this.groupContacts.length) {
      this.groupContacts.splice(index, 1);
    }
  }
}
