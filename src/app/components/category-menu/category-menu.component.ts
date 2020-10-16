import { Component, OnInit } from '@angular/core';
import {Category} from '../../common/category';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {

  categories: Category[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listCategories();
  }

  private listCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Categories= ' + JSON.stringify(data));
      }
    );
  }
}
