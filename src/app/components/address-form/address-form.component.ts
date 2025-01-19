import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address.model';
import { HttpService } from 'src/app/service/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  public address: Address = new Address();
  userForm:FormGroup;
  enableEdit: boolean =  false;
  states: string[] = [
    'Karnataka',
    'Telangana',
    'Andhra Pradesh',
    'Maharashtra',
    'Tamil Nadu',
    'West Bengal'
  ];
  
  cities: { [key: string]: string[] } = {
    Karnataka: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Chitradurga', 'Belgaum', 'Udupi', 'Dakshina Kannada', 'Bidar', 'Gulbarga'],
    Telangana: ['Hyderabad', 'Warangal', 'Khammam', 'Nizamabad', 'Karimnagar', 'Ramagundam', 'Mahabubnagar', 'Adilabad', 'Khammam', 'Suryapet'],
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Kakinada', 'Rajahmundry', 'Nellore', 'Anantapur', 'Chittoor', 'Kadapa'],
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Aurangabad', 'Nashik', 'Thane', 'Kolhapur', 'Solapur', 'Amravati', 'Jalgaon'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Erode', 'Vellore', 'Tirunelveli', 'Kanchipuram', 'Dindigul'],
    'West Bengal': ['Kolkata', 'Siliguri', 'Durgapur', 'Asansol', 'Howrah', 'Kharagpur', 'Burdwan', 'Malda', 'Jalpaiguri', 'Kalyani']
  };
  filteredCities: string[] = [];
  
  constructor(private formBuilder:FormBuilder,private httpservice:HttpService, private router: Router,private dataService: DataService,private activatedRoute: ActivatedRoute,){
    this.userForm=this.formBuilder.group({
      name:['', [Validators.required]],
      phone:['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address:['',Validators.required],
      state:['',Validators.required],
      city:[{ value: ''},Validators.required], 
      zipcode:['',[Validators.required, Validators.pattern('^[0-9]{6}$')]]
    })
  }

  ngOnInit(): void {
    // Check if there's an 'id' parameter in the route
    if (this.activatedRoute.snapshot.params['id'] !== undefined) {
      this.enableEdit = true;
      // Subscribe to currentAddress observable to fetch the address data
      this.dataService.currentAddress.subscribe(address => {
        if (Object.keys(address).length !== 0) {
          console.log(address);
          // Set form values based on the fetched address
          this.userForm.get('name')?.setValue(address.name);
          this.userForm.get('phone')?.setValue(address.phone);
          this.userForm.get('address')?.setValue(address.address);
          this.userForm.get('state')?.setValue(address.state);
          this.userForm.get('city')?.setValue(address.city);
          this.userForm.get('zipcode')?.setValue(address.zipcode);
        }
      });
    }
  
    // Subscribe to state changes to filter cities
    this.userForm.get('state')?.valueChanges.subscribe((selectedState) => {
      if (selectedState) {
        // Update filtered cities based on the selected state
        this.filteredCities = this.cities[selectedState];
        // Enable the city dropdown
        this.userForm.get('city')?.enable();
      } else {
        // Reset and disable the city dropdown if no state is selected
        this.filteredCities = [];
        this.userForm.get('city')?.reset();
        this.userForm.get('city')?.disable();
      }
    });
  }

onSubmit(): void {
    this.address = this.userForm.value;
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.httpservice.updateEmployeData(this.activatedRoute.snapshot.params['id'], this.address).subscribe(response => {
        console.log(response);
        alert("Updated Successfully");
  
        // Redirect to table with a forced reload
        this.router.navigateByUrl('/address-table', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/address-table']);
        });
      });
    } else if (this.userForm.valid) {
      this.httpservice.addAddress(this.userForm.value).subscribe(response => {
        console.log('Address added successfully', response);
        alert("Address Added Successfully");
        this.router.navigate(['/address-table']);
      });
    } else {
      console.log('Form invalid');
    }
  
  
}
resetUserForn():void{
this.userForm.reset();

// Clear filteredCities and disable the city dropdown
this.filteredCities = [];
this.userForm.get('city')?.disable();
  
}
}
