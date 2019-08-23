import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentOrderComponent } from '../rent-order/rent-order.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent {

  cars$: Observable<any[]>;

  constructor(private modalService: NgbModal,
              private db: AngularFireDatabase,
              private authService: AuthService,
              public router: Router) {
              this.cars$ = db.list('cars').snapshotChanges().pipe(
                map(changes => changes.map(change => ({
                  key: change.payload.key,
                  value: change.payload.val()
                })))
                );
              }

  rent(car) {
    if (this.authService.isLoggedIn) {
    const modalRef = this.modalService.open(RentOrderComponent, { size: 'lg' });
    modalRef.componentInstance.cars$ = car;
    } else {
      this.router.navigate(['login']);
    }
  }
}
