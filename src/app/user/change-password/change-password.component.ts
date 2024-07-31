import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@core/domain-classes/user';
import { SecurityService } from '@core/security/security.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { UserService } from '../user.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent extends BaseComponent implements OnInit {
  changePasswordForm: UntypedFormGroup;
  constructor(
    private userService: UserService,
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private toastrService: ToastrService,
    private securityService: SecurityService,
    public translationService: TranslationService) {
    super(translationService);
    this.getLangDir();
  }

  ngOnInit(): void {
    this.createChangePasswordForm();
    this.changePasswordForm.get('email').setValue(this.data.userName);
  }
  commonPasswords = ['Pass@123','pasS@123','password123','Admin@123' ,'admin', '123456', 'qwerty','asdfghjk'];
  createChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      email: [],
      oldPasswordPassword: ['', [Validators.required]],
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

  changePassword() {
    if (this.changePasswordForm.valid) {
      debugger
      this.sub$.sink = this.userService.changePassword(this.createBuildObject()).subscribe(d => {
        this.toastrService.success(this.translationService.getValue('SUCCESSFULLY_CHANGED_PASSWORD'))
        this.securityService.logout();
        this.dialogRef.close();
      })
    }
  }

  createBuildObject() {
    return {
      email: '',
      oldPassword: this.changePasswordForm.get('oldPasswordPassword').value,
      newPassword: this.changePasswordForm.get('password').value,
      userName: this.changePasswordForm.get('email').value,
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
