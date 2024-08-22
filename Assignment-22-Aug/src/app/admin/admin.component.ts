import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']

})
export class AdminComponent implements OnInit {
  categories: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/api/v1/categories')
      .subscribe((data: any) => {
        this.categories = data.categories;
      });
  }
}
