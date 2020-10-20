import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  registrationFormGroup: FormGroup;
  signInFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService) { }

  ngOnInit(): void {
    this.registrationFormGroup = this.formBuilder.group({
      newCustomer: this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ])
      })
    })
  }

}
