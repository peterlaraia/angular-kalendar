import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
        <div [style.height.rem]="6">DateTimePicker Demo
            <date-time-picker></date-time-picker>
        </div>
        <div [style.height.rem]="6">DateTimePicker Demo With Form Control
            <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
                <date-time-picker [formControl]="formGroup.get('date')"></date-time-picker>
                <button type="submit">SUBMIT</button>
                <button type="button" (click)="reset()">Reset</button>
            </form>
        </div>

        <div [style.height.rem]="6">DateTimePicker Demo with NgModel
            <date-time-picker [(ngModel)]="myDate" (ngModelChange)="onModelChanges()"></date-time-picker>
        </div>

    `
})
export class AppComponent implements OnInit {
    formGroup: FormGroup;
    myDate: Date;
    
    constructor() { }

    ngOnInit() { 
        this.formGroup = new FormGroup({
            'date': new FormControl(new Date())
        });
        this.myDate = new Date();
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
            'date': new FormControl(new Date())
        });
    }

    onModelChanges(): void {
        console.log('model changes', this.myDate);
    }

}