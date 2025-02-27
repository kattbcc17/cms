import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  standalone: false,
  
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
  
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  ngOnInit(): void {
    // Initialize 
    this.document = new Document('', '', '', '', '', []);
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log('Form Submitted successfully:', this.document);
    // Implement form submission logic
  }

  onCancel() {
    console.log('Cancel button clicked');
    // Implement navigation 
  }
}
