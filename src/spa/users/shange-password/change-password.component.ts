import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {
  checkPasswords,
  lowerCaseLetterValidator,
  nonAlphanumericCharacterValidator,
  upperCaseLetterValidator
} from '../../validators/validators';
import {validationMessages} from '../../validators/validationMessages';
import {AppDataService} from '../../../app/services/app-data.service';
import {MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';
import {ChangePasswordDTOInterface} from '../../interfaces/changePasswordDTO.interface';
import {of} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'spa-shange-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: UntypedFormGroup;
  changePasswordDTO: ChangePasswordDTOInterface = new ChangePasswordDTOInterface();

  formErrors = {
    oldPassword: [] as string[],
    password: [] as string[],
    confirmPassword: [] as string[],
  };

  formErrorsRequired = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  passwordValidationMessages = [
    {name: validationMessages.password.minlength, valid: false},
    {name: validationMessages.password.lowerCaseLetterValidator, valid: false},
    {name: validationMessages.password.upperCaseLetterValidator, valid: false},
    {name: validationMessages.password.nonAlphanumericCharacterValidator, valid: false},
    {name: validationMessages.confirmPassword.checkPasswords, valid: false},
  ];

  serverErrors: string[] = [];
  passwordChanged: boolean = false;


  constructor(private fb: UntypedFormBuilder,
              private appDataService: AppDataService,
              public modalRef: MdbModalRef<ChangePasswordComponent>,
              public router: Router) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: [this.changePasswordDTO.oldPassword, [
        Validators.required,
      ]],
      password: [this.changePasswordDTO.password, [
        Validators.required,
        Validators.minLength(6),
        lowerCaseLetterValidator,
        upperCaseLetterValidator,
        nonAlphanumericCharacterValidator,
      ]],
      confirmPassword: [this.changePasswordDTO.confirmPassword, [
        Validators.required,
      ]]
    }, {validators: checkPasswords('password', 'confirmPassword')});

    this.changePasswordForm.valueChanges
      .subscribe(data => {
        this.onValueChange(data);
        this.validatePassword();
      });
  }

  onValueChange(data: any): void {
    if (!this.changePasswordForm) {
      return;
    }
    let form = this.changePasswordForm;

    for (let field in this.formErrors) {
      // @ts-ignore
      this.formErrors[field] = [] as string[];
      // @ts-ignore
      this.formErrorsRequired[field] = '';
      let control = form.get(field);
      console.log(control.errors);

      if (control && control.dirty) {
        if (!control.valid) {
          // @ts-ignore
          let message = validationMessages[field];
          for (let key in control.errors) {
            // @ts-ignore
            if (key === 'required') {
              // @ts-ignore
              this.formErrorsRequired[field] = message[key];
            } else {
              // @ts-ignore
              this.formErrors[field].push(message[key]);
            }
          }
        }
      }
    }
  }

  validatePassword(): void {
    let messages = [...this.formErrors.password, ...this.formErrors.confirmPassword];
    let passwordControl = this.changePasswordForm.get('password');
    let confirmPasswordControl = this.changePasswordForm.get('confirmPassword');

    if (passwordControl.dirty) {
      for (let item of this.passwordValidationMessages) {
        if (item.name === validationMessages.confirmPassword.checkPasswords && !confirmPasswordControl.valid) {
          item.valid = false;
        } else {
          item.valid = true;
        }
      }

      for (let item of this.passwordValidationMessages) {
        if (messages.includes(item.name)) {
          item.valid = false;
        }

        if (item.name === validationMessages.password.minlength && passwordControl.value.length < 6) {
          item.valid = false;
        }
      }
    }

  }

  onSubmit(form: UntypedFormGroup): void {
    if (form.valid) {
      this.serverErrors = [];
      this.appDataService.changeUserPassword(form.value).subscribe((result) => {
        if (result.succeeded) {
          this.passwordChanged = true;
        } else {
          for (let errorMessage of result.errors) {
            this.serverErrors.push(errorMessage.description);
          }
        }
      }, error => {
        console.error(error);
      });
    }
  }

  onClose(): void {
    this.modalRef.close();
    if (this.passwordChanged) {
      this.router.navigate(['/sign-in']);
    }
  }

}
