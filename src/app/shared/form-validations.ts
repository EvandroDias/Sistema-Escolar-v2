import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {

  static requiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
      /* const values = formArray.controls;
      let totalChecked = 0;
      for (let i = 0; i < values.length; i++) {
        if (values[i].value) {
          totalChecked += 1;
        }
      } */
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => current ? total + current : total, 0);
      return totalChecked >= min ? null : { required: true };
    };
    return validator;
  }

  static cepValidator(control: FormControl) {

    const cep = control.value;
    if (cep && cep !== '') {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido : true };
    }
    return null;
  }

  static cpfValido(control: FormControl){

    let cpf = control.value;
    
                
    cpf = !cpf || cpf.replace(/\D/g, '');
    var cpfsInvsRegex = /1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|0{11}/;
    
    if (!cpf || cpf.length !== 11 || cpfsInvsRegex.test(cpf)) {

       console.log(false);
       
        return { cpfInvalido : true };
    } 
    
    var x = cpf.length - 1;
    var digitosTemp = 0;
    var e = 0;
    var h = '';
    
    for (var i = 0; i <= cpf.length - 3; i++) {
        digitosTemp = cpf.substring(i, i + 1);
        e = e + (digitosTemp * x);
        x -= 1;
        h = h + digitosTemp;
    }
    
    var digitos = 11 - (e % 11);
    if (digitos === 10 || digitos === 11) {
        digitos = 0;
    }

    var cpfSemDigVer = cpf.substring(0, cpf.length - 2) + digitos;
    x = 11;
    e = 0;
    for (var j = 0; j <= (cpf.length - 2); j++) {
        e += (cpfSemDigVer.substring(j, j + 1) * x);
        x -= 1;
    }
    
    var digVerificador = 11 - (e % 11);
    if (digVerificador === 10 || digVerificador === 11) {
        digVerificador = 0;
    }

    console.log("retorno",((digitos + '' + digVerificador) === cpf.substring(cpf.length, cpf.length - 2) ? { cpfInvalido : true } : null));
    
    
    return ((digitos + '' + digVerificador) === cpf.substring(cpf.length, cpf.length - 2) ? null : { cpfInvalido : true });
}

  static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== formControl.value) {
        return { equalsTo : otherField };
      }

      return null;
    };
    return validator;
  }

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config = {
      'required': `${fieldName} é obrigatório.`,
      'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      'cepInvalido': 'CEP inválido.',
      'cpfInvalido': 'CPF inválido',
      'emailInvalido': 'Email já cadastrado!',
      'equalsTo': 'Campos não são iguais',
      'pattern': 'Campo inválido'
    };

    return config[validatorName];
  }
}