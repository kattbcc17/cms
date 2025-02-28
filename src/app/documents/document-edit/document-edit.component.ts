import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

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
  id: string;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize 
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      
      if (!this.id) {
        this.editMode = false;
        return;
      }

      const documents = this.documentService.getDocuments();
      this.originalDocument = documents.find(doc => doc.id === this.id);

      if (!this.originalDocument) {
        return;
      }

      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument)); 
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const newDocument = new Document(
      this.id ?? Math.random().toString(),
      form.value.name,
      form.value.description,
      form.value.imageUrl, 
      form.value.url,
      [] 
    );

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
