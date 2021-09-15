import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FallBackComponent } from './components/fall-back/fall-back.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { PaymentConfirmationComponent } from './components/payment-confirmation/payment-confirmation.component';
import { PolicyConfirmationComponent } from './components/policy-confirmation/policy-confirmation.component';
import { PolicyCouponComponent } from './components/policy-coupon/policy-coupon.component';
import { PreviousPolicyDetailsComponent } from './components/previous-policy-details/previous-policy-details.component';
import { ProposalComponent } from './components/proposal/proposal.component';
import { QuoteComponent } from './components/quote/quote.component';
import { UploadDashboardComponent } from './components/upload-dashboard/upload-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'swap', pathMatch: 'full' },
  { path: 'getting-started', component: GettingStartedComponent },
  { path: 'quote', component: QuoteComponent },
  { path: 'proposal', component: ProposalComponent },
  { path: 'previous-policy-details', component: PreviousPolicyDetailsComponent },
  { path: 'policy-coupon-details', component: PolicyCouponComponent },
  { path: 'policyConfirmation', component: PolicyConfirmationComponent },
  { path: 'paymentConfirmation', component: PaymentConfirmationComponent },
  { path: 'fileUpload', component: FileUploadComponent },
  { path: 'UploadDashbord', component: UploadDashboardComponent },
  { path: 'swap', component: FallBackComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
