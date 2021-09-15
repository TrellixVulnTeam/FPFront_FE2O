import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuoteComponent } from './components/quote/quote.component';
import { ProposalComponent } from './components/proposal/proposal.component';
import { PaymentConfirmationComponent } from './components/payment-confirmation/payment-confirmation.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { UploadDashboardComponent } from './components/upload-dashboard/upload-dashboard.component';
import { SafePipe } from './pipe/safe.pipe';
import { FallBackComponent } from './components/fall-back/fall-back.component';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { PreviousPolicyDetailsComponent } from './components/previous-policy-details/previous-policy-details.component';
import { PolicyConfirmationComponent } from './components/policy-confirmation/policy-confirmation.component';
import { PolicyCouponComponent } from './components/policy-coupon/policy-coupon.component';

@NgModule({
  declarations: [
    AppComponent,
    QuoteComponent,
    ProposalComponent,
    PaymentConfirmationComponent,
    FileUploadComponent,
    UploadDashboardComponent,
    SafePipe,
    FallBackComponent,
    GettingStartedComponent,
    PreviousPolicyDetailsComponent,
    PolicyConfirmationComponent,
    PolicyCouponComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
