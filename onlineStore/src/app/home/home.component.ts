import { AuthService } from './../services/auth.service';
import { IProduct, Product } from './../product/models/product';
import { Observable } from 'rxjs/observable';
import { ProductService } from './../product/services/product.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IAlert } from '../product/models/ialert';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products:any[] = [];
  productAddedTocart:Product[];
  public alerts: Array<IAlert> = [];
  url = 'https://supermarket-test.digitalcube.rs';
  config: any;

  constructor(private productService: ProductService,
              private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              public authService: AuthService) {

    //Pagination
    this.config = { currentPage: 1, itemsPerPage: 3,totalItems: 0 }

    route.queryParams.subscribe(
      params => this.config.currentPage = params['page'] ? params ['page']: 1);
      for(let i=1; i <= 10; i++){
      this.products.push((`items ${i}`));
    }
  }

  pageChange(newPage: number){
    this.router.navigate([''], {
      queryParams: { page: newPage }
    });
  }

  ngOnInit(): void {
    //Povlacenje podataka iz api-a
    // this.http.get<any>(`${this.url}/api/products`).toPromise().then(data => {
    //     this.products = data.items;
    //     console.log(this.products);
    // });

    /* products api (slike se ne prikazuju zato sto je losa putanja API-a do slika,
    zato sam morao da napravim svoju "bazu" da bi prikazao slike) */
    this.productService.getProducts().subscribe(res => this.products = res);
  }

  onAddCart(product){
    this.productAddedTocart = this.productService.getProductFromCart();
    if(this.productAddedTocart==null){
      this.productAddedTocart = [];
      this.productAddedTocart.push(product);
      this.productService.addProductToCart(this.productAddedTocart);

      this.alerts.push({ id: 1, type: 'success', message: 'Product added to cart.'});
        setTimeout(() => {
          this.closeAlert(this.alerts);
          }, 3000);
      }
    else {
      let tempProduct = this.productAddedTocart.find(p => p.id == product.id);

      if(tempProduct == null){
        this.productAddedTocart.push(product);
        this.productService.addProductToCart(this.productAddedTocart);

        this.alerts.push({ id: 1, type: 'success', message: 'Product added to cart.'});
        setTimeout(()=>{
          this.closeAlert(this.alerts);
          }, 3000);
      }
      else {
        this.alerts.push({ id: 2, type: 'warning', message: 'Product already exist in cart.'});
        setTimeout(()=>{
          this.closeAlert(this.alerts);
          }, 3000);
      }
    }
  }

  public closeAlert(alert:any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
