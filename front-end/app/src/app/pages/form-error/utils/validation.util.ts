import { ValidationErrors } from "@angular/forms";

export function getErrorMsg(validatorName:string,validationErros:ValidationErrors){
      let args = messages.get(validatorName)?.errorKeys?.map(name => validationErros[name])
      let template = messages.get(validatorName)?.message;
    return (args) ? stringTemplate(template,...args) : template;
}


const messages = new Map<string,{message:string,errorKeys?:string[]}>([
    ['required',{message:'This field is required'}],
    ['minlength',{message:'This field required atleast {0} value',errorKeys:['requiredLength']}],
    ['maxlength',{message:'This field required only {0} value',errorKeys:['requiredLength']}],
    ['min',{message:'This field required atleast {0} value',errorKeys:['min']}],
    ['max',{message:'This field required only  {0} value',errorKeys:['max']}],
    ['email',{message:'Email is invalid'}],
    ['pattern',{message:'Phone number is invalid'}],
    ['password',{message:'The password didn\t match'}]
])

function stringTemplate(template:string|undefined,...args:any[]){
    if(template){
        return template.replace(/{(\d+)}/g,(match,index)=> typeof args[index] !== undefined ? args[index] : match)
    }
    return undefined;
}