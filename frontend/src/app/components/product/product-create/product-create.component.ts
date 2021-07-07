import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router'
import { Product } from '../product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})

export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  postProduct(): void {
    this.productService.post(this.product).subscribe(() => {
      this.productService.showMessage('Produto cadastrado!')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
