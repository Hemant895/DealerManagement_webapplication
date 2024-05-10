import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dealer-table',
  templateUrl: './dealer-table.component.html',
  styleUrls: ['./dealer-table.component.css']
})
export class DealerTableComponent implements OnInit {
  dealerdata:any =[]
  constructor(private service:ApiService,
    private toastr:ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.Dealerlist();
  }

  Dealerlist(){
    this.service.getDealerList().subscribe({
     next:(data)=>{
      this.dealerdata = data;
      this.toastr.success('successfully fetched ');
      console.log('Data : ', data);
     },
     error:(error)=>{
      this.toastr.error(error);
     }
    })
  }

  deleteDealer(dealerId: any): void {
    this.service.deleteDealer(dealerId).subscribe({
      next: (res: any) => {
        this.dealerdata = res;
        this.toastr.success('deleted Successfully');
        this.Dealerlist();
      },
      error: (error) => {
        this.toastr.error(error.msg);
      },
    });
    }
  

  // open modal for add user and navigate to userupsert page
  editDealer(dealer: any): void {
    this.router.navigate(['/dealerform'], { state: { dealer} });
  }
}
