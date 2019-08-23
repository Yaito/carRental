import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rent-order',
  templateUrl: './rent-order.component.html',
  styleUrls: ['./rent-order.component.scss']
})
export class RentOrderComponent implements OnInit {

  orderForm: FormGroup;
  submitted = false;

  cars$;
  orders$: AngularFireList<any>;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.cars$ = db.list('cars').snapshotChanges().pipe(
      map(changes => changes.map(change => ({
        key: change.payload.key,
        value: change.payload.val()
      })))
      );
    this.orders$ = this.db.list('/orders');
  }

  ngOnInit() {
    console.log(this.cars$);
    console.log(this.cars$.value.price);

    this.orderForm = this.formBuilder.group({
      name: ['', Validators.required],
      personal_ID: ['', Validators.required],
      id: [{ value: '', disabled: true }, Validators.required],
      day: [1, Validators.required],
      price: [{ value: '', disabled: true }, Validators.required]
    });
    this.setPrice(this.cars$.value.price);
    this.setUser(this.afAuth.auth.currentUser.uid);
  }

  // easier access to form fields
  get f() { return this.orderForm.controls; }

  // when form is submitted
  onSubmit() {
    this.submitted = true;

    // when form is invalid
    if (this.orderForm.invalid) {
      return;
  }
    this.update(this.cars$);
    this.add(this.cars$);
    this.activeModal.close();
  }

  // update car availability
  update(car) {
    this.db.object('/cars/' + car.key)
      .update({
        rented: true
      });
  }

  add(car) {
    this.orders$.push({
      user_name : this.f.name.value,
      user_pid : this.f.personal_ID.value,
      user: this.f.id.value,
      price: this.f.price.value,
      day: this.f.day.value,
      car_id: car.value.id,
      rent_status: true

    });
  }

  setPrice(price) {
    this.orderForm.get('price').setValue(Number(this.f.day.value) * price);
  }

  setUser(userId) {
    this.orderForm.get('id').setValue(userId);
  }


}
