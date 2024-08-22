import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']

})
export class AppMenuComponent {
  links = [
    { name: 'Home', url: '/home' },
    { name: 'Admin', url: '/admin' },
    { name: 'Add Product', url: '/addproduct' }
  ];
}
