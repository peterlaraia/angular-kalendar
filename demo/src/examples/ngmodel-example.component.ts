import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ngmodel-example',
    template: `
    <div [style.height.rem]="6">
        NgModel Example<br>
        <date-time-picker [(ngModel)]="myDate" (ngModelChange)="onModelChanges()"></date-time-picker>
    </div>
    `
})
export class NgModelComponent implements OnInit {
    myDate: Date;
    
    ngOnInit() { 
        this.myDate = new Date();
    }

    onModelChanges(): void {
        console.log('model changes', this.myDate);
    }
}