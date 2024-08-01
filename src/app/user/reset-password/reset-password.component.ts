import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@core/domain-classes/user';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { UserService } from '../user.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {
  resetPasswordForm: UntypedFormGroup;
  constructor(
    private userService: UserService,
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private toastrService: ToastrService,
    public translationService: TranslationService) {
    super(translationService);
    this.getLangDir();
  }

  ngOnInit(): void {
    this.createResetPasswordForm();
    this.resetPasswordForm.get('email').setValue(this.data.email);
  }
  commonPasswords = ['Pass@123','pasS@123','password123','Admin@123' ,'admin', '123456', 'qwerty','asdfghjk'];
  createResetPasswordForm() {
    this.resetPasswordForm = this.fb.group({
      email: [],
      password: ['', [Validators.required, this.passwordLengthValidator(8, 12),
        this.passwordComplexityValidator(),
        this.commonPasswordValidator(this.commonPasswords)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: this.checkPasswords
    });
  }
  passwordLengthValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const length = control.value ? control.value.length : 0;
      return length < min || length > max ? { 'passwordLength': { value: control.value } } : null;
    };
  }
  
  // Validator for required character types
  passwordComplexityValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) return null;
      
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      
      const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;
      return !valid ? { 'passwordComplexity': { value } } : null;
    };
  }
  
  // Validator for common passwords
commonPasswordValidator(commonPasswords: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const isCommonPassword = commonPasswords.includes(value);
      return isCommonPassword ? { 'commonPassword': { value } } : null;
    };
  }
  checkPasswords(group: UntypedFormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.sub$.sink = this.userService.resetPassword(this.createBuildObject()).subscribe(d => {
        this.toastrService.success(this.translationService.getValue('SUCCESSFULLY_RESET_PASSWORD'))
        this.dialogRef.close();
      })
    }
  }

  createBuildObject(): User {
    return {
      email: '',
      password: this.resetPasswordForm.get('password').value,
      userName: this.resetPasswordForm.get('email').value,
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
