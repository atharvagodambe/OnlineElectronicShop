import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ElectronicstoreService } from 'src/app/electronicstore.service';

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrls: ['./customer-payment.component.css']
})
export class CustomerPaymentComponent {

  totalPrice: string = '';
  orderId: number = 0;
  customer: any = {};
  nameOnCard: string = '';
  cardNumber: string = '';
  expYear: string = '';
  cvv: string = '';
  // PaidDate: string = '';
  paidAmount: string = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private eservice: ElectronicstoreService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.eservice.isCustomerLoginPresent();
    this.activateRoute.params.subscribe((res: any) => {
      this.orderId = res?.orderId;
      this.totalPrice = res?.totalPrice;
    });
  }

  ngOnInit(): void {
    this.getCustomerDetail();
  }

  // setPaidDate(ev: any): void {
  //   const date: any = this.datePipe.transform(ev?.value, 'yyyy-MM-dd');
  //   this.PaidDate = date;
  // }

  getCustomerDetail(): void {
    const cid = this.eservice.getCustomerAuthorization();
    this.eservice.getCustomerById(cid).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("Customer*****", res);
        if (!!res && res?.customerId) {
          this.customer = res;
        }
      }, err => {
        console.log("Err");
      }
    )
  }
  onPayment(): void {
    this.paidAmount = this.totalPrice;
    //validation
    if (this.nameOnCard.length === 0) {
      alert("Name on card should not be blank");
      return;
    }
    if (this.cardNumber === '' || this.cardNumber.length < 16 || this.cardNumber.length > 16) {

      alert("card number exactly 16 digit");
      return;
    }
    if (this.expYear.length === 0) {
      alert("Exp year  should not be blank");
      return;
    }
    if (this.cvv.length === 0 || this.cvv.length < 3 || this.cvv.length>3) {
      alert("CVV must be 3 digit only");
      return;
    }
    // this.setPaidDate(new Date());
    const body: any = {
      totalPrice: parseInt(this.totalPrice),
      orderId: this.orderId,
      nameOnCard: this.nameOnCard,
      cardNumber: this.cardNumber,
      expYear: this.expYear,
      cvv: parseInt(this.cvv),
      // PaidDate: this.PaidDate,
      paidAmount: parseInt(this.paidAmount),
      customer: this.customer


    };
    console.log("$$$$$$$", body);
    this.eservice.addPayment(body, this.orderId, this.customer?.customerId).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("*********", res);
        if (res && res?.paymentId) {
          alert("Payment done sucessfulyy");
          this.router.navigate(["/customer/order"])
        }
      }, err => {
        console.log("error");
      }
    )
  }


}

