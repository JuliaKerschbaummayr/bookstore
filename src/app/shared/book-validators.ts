import {FormArray, FormControl} from '@angular/forms';

export class BookValidators {
    static isbnFormat(control : FormControl) : {[error:string]:any} {
        if(!control.value) {
            return null;
        }
        //Bindestrich durch Leerzeichen ersetzen, regular expression
        const isolatedNumbers = control.value.replace(/-/g,'');
        //isbn am Anfang Dezimalzahl mit 10 oder 13 Zeichen
        const isbnPattern = /(^\d{10}$)|(^\d{13}$)/;
        return isbnPattern.test(isolatedNumbers) ? null : {isbnFormat: {valid:false}};
    }

    static atLeastOneImage(controlArray : FormArray) : {[error:string]:any} {
        //some -> wenn eine oder mehrere Bedingungen stimmen wird check auf true gesetzt
        const check = controlArray.controls.some((el)=> {
            return el.value && el.value.url != "" && el.value.url != null
                && el.value.title != "" && el.value.title != null;
        });
        return check ? null : {atLeastOneImage: {valid: false}};
    }

    //für mehr validatoren neues static anlegen
}
