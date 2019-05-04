import {FormArray, FormControl} from '@angular/forms';

export class StatusValidator {
  static rightstatus(control : FormControl) : {[error:string]:any} {
    if (control.value != 'Offen' && control.value != 'Bezahlt' && control.value != 'Storniert' && control.value != 'Versendet') {
      return {rightstatus: {valid:false}};
    } else {
      return null;
    }
  }
}
