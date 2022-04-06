import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   
   loginFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5)])
  });
   isLoggedIn = false;
   isLogginFailed = false;
   errorMessage = "";
   isAdmin = false;

  constructor(private authService : AuthService, private tokenStorage: TokenStorageService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
     // this.isAdmin = this.tokenStorage.getUser().isAdmin;
    }
  }

  onSubmit(): void {
    console.log(this.loginFormGroup);
    const { email, password } = this.loginFormGroup.value;
    this.authService.login(email, password).subscribe({
        next: data => {
          console.log(data);
          this.tokenStorage.saveToken(data.JWT);
          this.tokenStorage.saveUser(data.content);
          this.isLoggedIn = true;
          this.isLogginFailed = false;
          this.isAdmin = this.tokenStorage.getUser().isAdmin;
          this.router.navigate(['/profile']);
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isLogginFailed = true;
        }
    })
  }
}
