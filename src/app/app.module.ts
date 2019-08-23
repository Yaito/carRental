import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { CarsComponent } from './components/cars/cars.component';
import { RentOrderComponent } from './components/rent-order/rent-order.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/home/home.component';
import { OrdersHistoryComponent } from './components/orders-history/orders-history.component';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    RentOrderComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    HomeComponent,
    OrdersHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    RentOrderComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
