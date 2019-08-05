import { FormControl, FormArray, FormGroup, ValidatorFn } from '@angular/forms';
export class FormValidations {

  static  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : {obrigatoriedade: true});
  }

  static validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: {tamanho: valor}};
    };
  }

  static requiredMinCheckbox(min = 1 ) {
    const validator = (formArray: FormArray) => {
    /*  const values = formArray.controls;
      let totalChecked = 0;
      for (let i = 0; i < values.length; i++) {
        if (values[i].value) {
          totalChecked += 1;
        }
      }
      */
      const totalChecked = formArray.controls
              .map(v => v.value)
              .reduce((total, current) => current ? total + current : total, 0);
      return totalChecked >= min ? null : { required: true};
      };
      return validator;
  }


  static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
    const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
    const isValid = otherControlNames.every(controlName =>
                formGroup.get(controlName).value === formGroup.get(firstControlName).value);
    return isValid ? null : { childrenNotEqual: true };
}


  static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('E necessário informar um campo.');

      }
      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }
      const field = (<FormGroup>formControl.root).get(otherField);
      if (!field) {
        throw new Error('E necessário informar um campo valido.');
      }
      if (field.value !== formControl.value) {
        return { equalsTo : otherField };
     //   return (input.value ? null : {obrigatoriedade: true});
     //   return totalChecked >= min ? null : { required: true};
      }
      return null;
    };
    return validator;
  }

}
