import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  // Import Router

interface Category {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router  // Inject Router
  ) {
    this.productForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      excerpt: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      category: ['', Validators.required],
      status: [false]
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.http.get<{ categories: Category[] }>("http://localhost:3000/api/v1/categories").subscribe(
      (response) => {
        this.categories = response.categories; // Accessing the categories array
      },
      (error) => {
        console.log("Error fetching categories:", error);
        this.errorMessage = 'Error fetching categories. Please try again later.';
      }
    );
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.http.post("http://localhost:3000/api/v1/products", this.productForm.value).subscribe(
        (response) => {
          console.log("Product added successfully:", response);
          this.errorMessage = null; // Clear previous errors
          this.productForm.reset(); // Reset the form after submission
          this.router.navigate(['/home']); // Redirect to home page
        },
        (error) => {
          console.log("Error adding product:", error);
          this.errorMessage = 'An error occurred while adding the product. Please try again later.';
        }
      );
    }
  }
}


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';

// interface Category {
//   _id: string;
//   name: string;
// }

// @Component({
//   selector: 'app-addproduct',
//   templateUrl: './addproduct.component.html',
//   styleUrls: ['./addproduct.component.css']
// })
// export class AddProductComponent implements OnInit {
//   productForm: FormGroup;
//   categories: Category[] = [];
//   errorMessage: string | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private http: HttpClient
//   ) {
//     this.productForm = this.fb.group({
//       code: ['', Validators.required],
//       name: ['', Validators.required],
//       excerpt: ['', Validators.required],
//       description: ['', Validators.required],
//       price: [0, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
//       category: ['', Validators.required],
//       status: [false]
//     });
//   }

//   ngOnInit(): void {
//     this.getCategories();
//   }

//   getCategories() {
//     this.http.get<{ categories: Category[] }>("http://localhost:3000/api/v1/categories").subscribe(
//       (response) => {
//         this.categories = response.categories; // Accessing the categories array
//       },
//       (error) => {
//         console.log("Error fetching categories:", error);
//         this.errorMessage = 'Error fetching categories. Please try again later.';
//       }
//     );
//   }

//   onSubmit() {
//     if (this.productForm.valid) {
//       this.http.post("http://localhost:3000/api/v1/products", this.productForm.value).subscribe(
//         (response) => {
//           console.log("Product added successfully:", response);
//           this.errorMessage = null; // Clear previous errors
//           this.productForm.reset(); // Reset the form after submission
//         },
//         (error) => {
//           console.log("Error adding product:", error);
//           this.errorMessage = 'An error occurred while adding the product. Please try again later.';
//         }
//       );
//     }
//   }
// }

