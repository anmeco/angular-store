import { Component, OnInit } from "@angular/core";
import { Product } from "./interfaces/product.interface";
import { ProductsService } from "./services/products.service";
import { tap } from "rxjs/operators";
import { ShoppingCartService } from "src/app/shared/services/shopping-cart.services";

@Component({
  selector: "app-products",
  template: `<section class="products">
    <app-product
      (addToCartClick)="addToCart($event)"
      [product]="product"
      *ngFor="let product of products"
    ></app-product>
  </section> `,
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  constructor(
    private productSvc: ProductsService,
    private shoppingCartSvc: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.productSvc
      .getProducts()
      .pipe(tap((products: Product[]) => (this.products = products)))
      .subscribe();
  }

  addToCart(product: Product): void {
    console.log("Added to cart :)", product);
    this.shoppingCartSvc.updateCard(product);
  }
}
