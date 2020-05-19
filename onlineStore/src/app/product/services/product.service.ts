import { AuthService } from './../../services/auth.service';
import { Observable } from "rxjs/observable";
import { Product, IProduct } from "./../models/product";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  url = `https://supermarket-test.digitalcube.rs`;

  private product: Array<Product> = [
    {
      id: "475cd22a-c5bb-4a69-93ed-eb2b13426bc4",
      name: "Bavarska Kifla",
      photos: [`${this.url}/static/products/1902f1fe-0a78-4d2c-916e-9b9fbb7946af.jpg`],
      category: "food",
      unit: "item",
      price: 24.0,
      reserved: 17.0,
      available: 987.0
    },
    {
      id: "8558d4af-33f2-4554-afad-9f1ac2ce2941",
      name: "Domace crno vino",
      photos: [`${this.url}/static/products/f94fcaec-05d1-46bc-91a8-e908f8be36a3.jpg`],
      category: "alcohol_drinks",
      unit: "liter",
      price: 85.0,
      reserved: 3.0,
      available: 288.0
    },
    {
      id: "5ff6410d-9556-4932-8f5e-fb8e203851d4",
      name: "Hleb",
      photos: [`${this.url}/static/products/a06b9fb9-76bc-41c5-91f9-d66f215f92d4.jpg`],
      category: "food",
      unit: "item",
      price: 59.0,
      reserved: 0.0,
      available: 885.0
    },
    {
      id: "1730be06-8615-477e-b3c5-b141f3ba6ce6",
      name: "Kifla",
      photos: [`${this.url}/static/products/42f07338-d49e-43f0-ab16-482ca830e917.jpg`],
      category: "food",
      unit: "item",
      price: 19.0,
      reserved: 0.0,
      available: 990.0
    },
    {
      id: "14c25f9f-ff31-4beb-b8ff-f2c1379f2539",
      name: "Koka kola 1.5L",
      photos: [`${this.url}/static/products/91584606-0d1a-440d-ab95-03092404d8ac.jpg`],
      category: "non_alcohol_drinks",
      unit: "item",
      price: 99.0,
      reserved: 0.0,
      available: 297.0
    },
    {
      id: "18ab663d-c719-4204-b58b-8b864fd19205",
      name: "Koka kola 1L",
      photos: [`${this.url}/static/products/7f2958cd-8971-4059-9cd9-d5fcd406c708.jpg`],
      category: "non_alcohol_drinks",
      unit: "item",
      price: 75.0,
      reserved: 0.0,
      available: 300.0
    },
    {
      id: "ffef480a-f9b6-4b61-a1d0-df4ecb8b328c",
      name: "Koka kola limenka 0.33L",
      photos: [`${this.url}/static/products/ff455cc9-b0ec-4f18-99bc-668fec1bbd0b.jpg`],
      category: "non_alcohol_drinks",
      unit: "item",
      price: 50.0,
      reserved: 0.0,
      available: 497.0
    },
    {
      id: "910b3ece-eabf-4d88-900e-9083f53ec19e",
      name: "Pereca",
      photos: [`${this.url}/static/products/d7f04799-7d41-489b-8be7-80a72e357e32.jpg`],
      category: "food",
      unit: "item",
      price: 19.0,
      reserved: 0.0,
      available: 998.0
    },
    {
      id: "73bdd6e0-25e1-48fb-b541-cf354111a9d2",
      name: "Vranac Pro corde",
      photos: [`${this.url}/static/products/87787f7b-a55e-4435-a9b0-cdc286474460.jpg`],
      category: "alcohol_drinks",
      unit: "item",
      price: 300.0,
      reserved: 0.0,
      available: 989.0
    }
  ];

  constructor(private authService: AuthService) {}

  getProducts() {
    return of(this.product);
  }

  addProductToCart(product: any):void{
    const token = this.authService.getToken();

    localStorage.setItem("product", JSON.stringify(product));
  }

  getProductFromCart(){
    return JSON.parse(localStorage.getItem("product"));
  }

  removeAllProductFromCart() {
    return localStorage.removeItem("product");
  }

}
