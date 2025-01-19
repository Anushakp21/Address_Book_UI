import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.css']
})
export class AddressTableComponent implements OnInit {

  public addreesDetails: Address[] = [];

  constructor(private httpService: HttpService,private dataservice:DataService,private route:Router){}
  ngOnInit(): void {
    this.httpService.getAddressData().subscribe(data => {
      console.log(data);
      this.addreesDetails = data;
    });
  }


  remove(id: number): void {
    const isConfirmed = confirm("Are you sure you want to delete this data?");
    console.log(isConfirmed)
  
    if(isConfirmed){
     console.log(id)
     this.httpService.deleteAddressData(id).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });

    }
    else{
      alert("Delete operation canceled.");
    }
   
  }
   

  update(address: Address): void {
    this.dataservice.changeAddress(address);
    console.log(address.addressID)
    this.route.navigateByUrl('/address-form/'+address.addressID);
    console.log(this.addreesDetails);
  }

}
