import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  standalone: false,

  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  // Step 1: Create a Subscription variable
  subscription: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments(); // Load initial data
    this.documentService.documentChangedEvent.subscribe(
      (arr: Document[]) => (this.documents = arr)
    );
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentList: Document[]) => (this.documents = documentList)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Step 3: Unsubscribe to prevent memory leaks
  }
}