import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { RouterModule } from '@angular/router';  

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    HeaderComponent,  
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent
  ],
  providers: [],
})
export class AppModule {}
