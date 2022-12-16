import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { FakestoreService } from 'src/app/services/fakestore.service';

@Component({
  selector: 'app-create-cart',
  templateUrl: './create-cart.component.html',
  styleUrls: ['./create-cart.component.scss']
})
export class CreateCartComponent implements OnInit {

  cartFormGroup : FormGroup = new FormGroup({
    items: new FormGroup({}),
    date : new FormControl<Date>(new Date())
  })
  
  products$! : Observable<Product[]>;

  constructor(private fakestore: FakestoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.products$ = this.fakestore.getProducts().pipe(shareReplay());
    
    let itemsGroup = this.cartFormGroup.get('items') as FormGroup;

    // create checkbox controls for each product
    this.products$.pipe(
      map((products: Product[]) =>
        products.forEach((product) =>
          itemsGroup.addControl(`${product.id}`, new FormControl(false))
        )
      )
    ).subscribe();
  }

  onCartCreate() : void {
    
    // prepare array of selected productIds
    let _products     : Array<{productId: number, quantity: number}> = [];
    const itemsGroup  : FormGroup = this.cartFormGroup.get('items') as FormGroup;

    for(const controlName of Object.keys(itemsGroup.controls))
    {
      let control = itemsGroup.get(controlName);
      if(control?.value) _products.push({productId: Number(controlName),quantity: 1});
    }

    // create cart object for posting
    let cart : Cart = {
      userId    : Number(this.route.snapshot.paramMap.get('userId')),
      products  : _products,
      date      : formatDate(this.cartFormGroup.get('date')?.value, 'yyyy-MM-dd', 'en-US')
    };

    // post new cart to endpoint
    this.fakestore.postCart(cart).subscribe();
        
  }

}
