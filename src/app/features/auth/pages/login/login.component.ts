import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ToastrService } from 'ngx-toastr'

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

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      // this.isAdmin = this.tokenStorage.getUser().isAdmin;
    }
  }

  onSubmit(): void {
    
    const { email, password } = this.loginFormGroup.value;
    this.authService.login(email, password).subscribe({
      next: data => {
        //console.log(data);
        this.tokenStorage.saveToken(data.JWT);
        this.tokenStorage.saveUser(data.content);
        this.tokenStorage.saveRefreshToken(data.refresh)
        this.isLoggedIn = true;
        this.isLogginFailed = false;
        this.isAdmin = this.tokenStorage.getUser().isAdmin;
        this.notifyService.showSuccess('Successfully Login', 'Success');
        this.router.navigate(['/profile']);
      },
      error: err => {
        this.errorMessage = err.error.error;
        this.isLogginFailed = true;

        this.notifyService.showError(this.errorMessage, 'Warning');
      }
    })
  }
}
