import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,

  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      '1',
      'Marcos Vazquez',
      'BYU-Idaho Student',
      'http://anything.com/',
      []
    ),
    new Document(
      '2',
      'Kattia Contreras',
      'BYU Provo Student',
      'http://anything.com/',
      []
    ),
    new Document(
      '3',
      'Shey Torres',
      'College Student',
      'http://anything.com/',
      []
    ),
    new Document(
      '4',
      'Gabriela Vazquez',
      'BYU Pathway Student',
      'http://anything.com/',
      []
    ),
    new Document(
      '5',
      'Mariela Badillo',
      'BYU Pathway Missionary',
      'http://anything.com/',
      []
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
