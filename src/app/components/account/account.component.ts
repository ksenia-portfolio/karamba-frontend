import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../../services/customer.service';
import {KarambaValidator} from '../../validators/karamba-validator';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../../common/customer';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private httpClient: HttpClient) {
  }

  registrationFormGroup: FormGroup;
  signInFormGroup: FormGroup;

  ngOnInit(): void {
    this.registrationFormGroup = this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.required,
            Validators.minLength(2),
            KarambaValidator.notOnlyWhitespace]),
        lastName: new FormControl('',
          [Validators.required,
            Validators.minLength(2),
            KarambaValidator.notOnlyWhitespace]),
        email: new FormControl('',
          [Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        password1: new FormControl('',
          [Validators.required,
            Validators.minLength(6),
            Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]), // at list 1 lower, 1 capital, 1 number pattern
        password2: new FormControl('',
          [Validators.required,
            Validators.minLength(6),
            Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')])
      });

    this.signInFormGroup = this.formBuilder.group({
        email: new FormControl('',
          [Validators.required]),
        password: new FormControl('',
          [Validators.required])
      });

    // registration form validator

    // signIn form validator


  }

}
