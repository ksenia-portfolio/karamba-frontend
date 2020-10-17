import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId = 1;
  private previousCategoryId = 1;
  searchMode = false;

  thePageNumber = 1;
  thePageSize = 12;
  theTotalElements = 0;

  previousKeyword = null;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    this.listProducts();
  }

  // tslint:disable-next-line:typedef
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }
  // tslint:disable-next-line:typedef
  private handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    if(this.previousKeyword !== theKeyword){
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;


    // searching for products through the keyword from the search bar
    this.productService.searchProductsPaginate(this.thePageNumber - 1,
                                                      this.thePageSize,
                                                      theKeyword).subscribe(this.processResult());
  }

  // tslint:disable-next-line:typedef
  handleListProducts(){
    // check if id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId){
      // get id param and convert to a number with + symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }else{
      // category id is not available, make category 1 as default
      this.currentCategoryId = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    // check if we have different category id than previous
    if (this.previousCategoryId !== this.currentCategoryId){
      this.thePageNumber = 1;
    }

    // now get all the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber -1,
      this.thePageSize,
      this.currentCategoryId).subscribe(this.processResult());
  }


  private processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number +1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  addToCart(theProduct: Product) {

  }
}
