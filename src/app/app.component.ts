import { Component } from '@angular/core';
// import { HeaderComponent } from './header/header.component';  
// import { ContactsComponent } from './contacts/contacts.component';  

@Component({
  selector: 'cms-root',
  standalone: true,  
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';
  selectedFeature = 'contacts';

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
