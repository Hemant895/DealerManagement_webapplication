import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dealer-form',
  templateUrl: './dealer-form.component.html',
  styleUrls: ['./dealer-form.component.css']
})
export class DealerFormComponent implements OnInit {
  dealerForm: FormGroup |any;
  submitted = false;
  Dealer: any = [];
  constructor(private formBuilder: FormBuilder,
    private service:ApiService ,
    private toastr:ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
     //  Edit mode
     this.Dealer = history.state.dealer;
     if (this.Dealer) {
       this.dealerForm.patchValue(this.Dealer);
     }
     
  }

  createForm() {
    this.dealerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      companyName: ['',Validators.required],
      mobileNo: ['', [Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      whatsappNo:['', [Validators.required]],
      telephoneNo: ['', [Validators.required]],
      gstType: ['',Validators.required],
      gstin: ['',Validators.required],
      panNo: ['',Validators.required],
      creditLimit: [null, [Validators.required]],
      openingBalance: [null, [Validators.required]],
      supplierType: ['',Validators.required],
      dateOfBirth: ['',Validators.required],
      anniversaryDate: ['',Validators.required],
    });
  }
  get f() {
    return this.dealerForm.controls;
  }

  goto() {
    this.router.navigate(['/dealerlist']);
  }

  onSubmit() {
    this.submitted = true
    if (this.dealerForm.valid) {
      console.log('Form submitted:', this.dealerForm.value);
      const dealer = {
        name: this.dealerForm.get('name').value,
        email: this.dealerForm.get('email').value,
        company_name: this.dealerForm.get('companyName').value,
        mobile_no: this.dealerForm.get('mobileNo').value,
        telephone_no: this.dealerForm.get('telephoneNo').value,
        whatsapp_no: this.dealerForm.get('whatsappNo').value,
        remark: '7410852063',
        date_of_birth: this.dealerForm.get('dateOfBirth').value,
        anniversary_date: this.dealerForm.get('anniversaryDate').value,
        gst_type: this.dealerForm.get('gstType').value,
        gstin: this.dealerForm.get('gstin').value,
        pan_no: this.dealerForm.get('panNo').value,
        apply_tds: 'True',
        credit_limit: this.dealerForm.get('creditLimit').value,
        opening_balance: this.dealerForm.get('openingBalance').value,
        supplier_type: this.dealerForm.get('supplierType').value,
        opening_balance_type: 'Cr'
      };
      console.log('test' ,dealer);
     //  If it is an edit operation then update the data
     this.service.getUserByEmail(dealer.email).subscribe({
      next: (existingUser) => {
        if (this.Dealer && existingUser) {
          this.toastr.success('Dearler already exist');

          dealer.mobile_no = existingUser.mobile_no;

          const id = JSON.parse(JSON.stringify(existingUser.id))
          //  Update the user details in database
          this.service.updateDealer(dealer,id ).subscribe((updatedDealer) => {
            console.log('User updated:', updatedDealer);
            this.toastr.success('Dealer updated successfully');
            this.dealerForm.reset();
            this.goto();
          });
        } else {
          //   Save the new user details in database
          this.service.addDealer(dealer).subscribe((newdealer) => {
            this.toastr.success('dealer created successfully');
            console.log('User created:', newdealer);
            this.dealerForm.reset();
            this.goto();
          });
        }
      },
      error: (error) => {
        this.toastr.error(error.msg);
      },
    });
      
    }
    } 
    

}
