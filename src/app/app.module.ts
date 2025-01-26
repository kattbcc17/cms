import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';  

// Import components
import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';

@NgModule({
  declarations: [
    HeaderComponent,  
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent 
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),  // Import Angular modules
  ],
  exports: [ContactListComponent],  // Export any module/component if needed
  providers: [],
  bootstrap: [ContactsComponent]  // Bootstrapping your main component (adjust if necessary)
})
export class AppModule {}
