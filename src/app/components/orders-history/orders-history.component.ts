import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})
export class OrdersHistoryComponent implements OnInit {

  orders$;
  user;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {
    // db.list('/orders').valueChanges()
    //   .subscribe(orders => {
    //     this.orders$ = orders;
    //     console.log(this.orders$);
    //   });
    // this.orders$ = db.list('/orders', ref => ref.orderByChild('user').equalTo(this.user)).valueChanges();
    // this.orders$ = db.list('/orders', ref => ref.orderByChild('key').equalTo(this.afAuth.auth.currentUser.uid));
    // console.log(this.orders$);
  }

  ngOnInit() {
    this.user = this.afAuth.auth.currentUser.uid;
    // this.orders$ = this.db.list('/orders', ref => ref.orderByChild('user').equalTo(this.user)).valueChanges();

    this.orders$ = this.db.list('orders', ref => ref.orderByChild('user').equalTo(this.user)).snapshotChanges().pipe(
      map(changes => changes.map(change => ({
        key: change.payload.key,
        value: change.payload.val()
      })))
      );

  }

  update(order) {
    this.db.object('/orders/' + order.key)
      .update({
        rent_status: false
      });
    this.db.object('/cars/' + order.value.car_id)
      .update({
        rented: false
      });
  }

}
