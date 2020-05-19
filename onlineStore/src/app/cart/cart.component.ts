import { Product } from "./../product/models/product";
import { ProductService } from "./../product/services/product.service";
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {

  productAddedTocart: Product[];
  allTotal: number;
  defaultQuantity: number = 1;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productAddedTocart = this.productService.getProductFromCart();

    for (let i in this.productAddedTocart) {
      this.productAddedTocart[i].available = 1;
    }
    this.productService.removeAllProductFromCart();
    this.productService.addProductToCart(this.productAddedTocart);
    this.calculateAllTotal(this.productAddedTocart);
  }
  onAddQuantity(product: Product) {
    //Get Product
    this.productAddedTocart = this.productService.getProductFromCart();
    this.productAddedTocart.find(p => p.id == product.id).available = product.available + 1;

    this.productService.removeAllProductFromCart();
    this.productService.addProductToCart(this.productAddedTocart);
    this.calculateAllTotal(this.productAddedTocart);
  }
  onRemoveQuantity(product: Product) {
    this.productAddedTocart = this.productService.getProductFromCart();
    this.productAddedTocart.find(p => p.id == product.id).available = product.available - 1;
    this.productService.removeAllProductFromCart();
    this.productService.addProductToCart(this.productAddedTocart);
    this.calculateAllTotal(this.productAddedTocart);
  }

  calculateAllTotal(allItems: Product[]) {
    let total = 0;
    for (let i in allItems) {
      total = total + allItems[i].available * allItems[i].price;
    }
    this.allTotal = total;
  }

  removeProduct(product: Product){
    let delID = this.productAddedTocart.findIndex(p => p.id == product.id);
    this.productAddedTocart.splice(delID, 1);
    localStorage.setItem('product', JSON.stringify(this.productAddedTocart));
  }
}
