import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  registerForm: any = FormGroup;
  returnUrl: string = '';
  error: string = '';
  user!: User;

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
        password: [null, Validators.compose([
          Validators.required,
          this.patternValidator(/\d/, {hasNumber: true}),
          this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          this.patternValidator(/[a-z]/, { hasSmallCase: true }),
          this.patternValidator(/[$@$!%*?&]/, { hasSpecialCharacters: true }),
          Validators.minLength(8)
        ])]
    })
  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(!control.value) {
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    }
  }
}
