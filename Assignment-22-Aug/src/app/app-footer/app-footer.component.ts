import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css']
})
export class AppFooterComponent {
  footerItems = [
    { title: 'Privacy Policy', path: '/privacy' },
    { title: 'Terms of Service', path: '/terms' }
  ];
}
