import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form!: FormGroup;
  ret: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {
  }
  ngOnInit() {
    this.auth.isLoggedIn.subscribe(t => {
      if (t == true) {
        this.router.navigateByUrl('/register');
      }
    });
    this.form = this.fb.group({
      username: [''],
      password: ['', Validators.required]
    });
    // Get the query params
    this.route.queryParams.subscribe(
      params => {
        this.ret = params['return'] || '/register';
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.auth.login(this.form.value, this.ret);
    } else {
      console.log("form invalid");
    }
  }

}
