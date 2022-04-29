import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showPassword: boolean = false;
  showPassword2: boolean = false;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe(t => {
      if (t == true) {
        this.router.navigateByUrl('/home');
      }
    });
    console.log('Hi');
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])],
      password2: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])],
      name: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
      ]),],
      isadmin: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Submitting');
    if (!this.form.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    console.log('Form valid');

    this.auth.register({
      username: this.form.get('username')!.value,
      password: this.form.get('password')!.value,
      password2: this.form.get('password2')!.value,
      name: this.form.get('name')!.value,
      email: this.form.get('email')!.value,
      isadmin: this.form.get('isadmin')!.value
    });
  }

}
