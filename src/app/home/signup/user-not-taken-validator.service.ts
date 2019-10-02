import { Injectable } from '@angular/core';
import { SignupService } from './signup.service';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

@Injectable()
export class UserNotTakenValidatorService {

  constructor(private signupService: SignupService) { }

  chekUserNameTaken() {
    return (control: AbstractControl) => {
      return control.valueChanges
        .pipe(
          debounceTime(300),
          switchMap(userName => this.signupService.checkUserNameTaken(userName)),
          map(isTaken => isTaken ? { userNameTaken : true } : null),
          first()
        );
    };
  }
}
