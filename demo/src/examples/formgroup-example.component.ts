import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'formgroup-example',
    template: `
    <div [style.height.rem]="6">
        FormGroup Demo<br>
        <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
            <angular-kalendar [formControl]="formGroup.get('date')"></angular-kalendar>
            <button type="submit">SUBMIT</button>
            <button type="button" (click)="reset()">Reset</button>
        </form>
    </div>
    `
})
export class FormGroupComponent implements OnInit {
    formGroup: FormGroup;

    ngOnInit() { 
        this.formGroup = new FormGroup({
            'date': new FormControl(new Date())
        });
    }

    onSubmit(): void {
        console.log(this.formGroup.value);
        console.log('pristine', this.formGroup.pristine);
        console.log('touched', this.formGroup.touched);
        console.log('valid', this.formGroup.valid);
    }

    reset(): void {
        console.log('resetting');
        this.formGroup.reset({
            'date': new Date()
        });
    }

}