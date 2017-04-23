import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngmodel-example',
    template: `
    <div [style.height.rem]="6">
        NgModel Example<br>
        <angular-kalendar [(ngModel)]="myDate" (ngModelChange)="onModelChanges()"></angular-kalendar>
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