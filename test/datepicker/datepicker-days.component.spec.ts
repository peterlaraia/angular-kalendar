import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DatePickerDaysComponent } from '../../lib/datepicker/datepicker-days.component';
import { View } from '../../lib/datepicker/view';

describe('DatePicker Days Component', () => {
    let comp: DatePickerDaysComponent;
    let fixture: ComponentFixture<DatePickerDaysComponent>;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule],
            declarations: [DatePickerDaysComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatePickerDaysComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should update date', () => {
        let newDate: Date = new Date('2012-10-16T12:00');
        comp.dateChange.subscribe((date: Date) => expect(date).toEqual(newDate));
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.date = new Date('2012-10-13T12:00');
        fixture.detectChanges();
        comp.updateDate(newDate);
        expect(comp.displayDate).toEqual(newDate, 'displayDate check');
        expect(comp.date).toEqual(newDate, 'date check');
    });

    it('should update date but not display date when choosing day outside of month', () => {
        let newDate: Date = new Date('2012-11-01T12:00');
        comp.dateChange.subscribe((date: Date) => expect(date).toEqual(newDate));
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.date = new Date('2012-10-13T12:00');
        fixture.detectChanges();
        comp.updateDate(newDate);
        expect(comp.displayDate).toEqual(new Date('2012-10-13T12:00'));
        expect(comp.date).toEqual(newDate);
    });

    it('should display the next month', () => {
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.date = new Date('2012-10-13T12:00');
        let spy = spyOn(comp, 'nextMonth').and.callThrough();
        fixture.detectChanges();
        let btn: DebugElement = de.query(By.css('.ang2cal-next-btn'));
        expect(comp.displayDate).toEqual(new Date('2012-10-13T12:00'));
        btn.nativeElement.click();
        fixture.detectChanges();
        expect(spy.calls.any()).toBeTruthy();
        expect(comp.displayDate).toEqual(new Date('2012-11-01T12:00'));
    });

    it('should display the next month in next year', () => {
        comp.displayDate = new Date('2011-12-14T12:00');
        comp.date = new Date('2011-12-14T12:00');
        let spy = spyOn(comp, 'nextMonth').and.callThrough();
        fixture.detectChanges();
        let btn: DebugElement = de.query(By.css('.ang2cal-next-btn'));
        expect(comp.displayDate).toEqual(new Date('2011-12-14T12:00'));
        btn.nativeElement.click();
        fixture.detectChanges();
        expect(spy.calls.any()).toBeTruthy();
        expect(comp.displayDate).toEqual(new Date('2012-01-01T12:00'));
    });

    it('should display the prev month', () => {
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.date = new Date('2012-10-13T12:00');
        let spy = spyOn(comp, 'prevMonth').and.callThrough();
        fixture.detectChanges();
        let btn: DebugElement = de.query(By.css('.ang2cal-prev-btn'));
        expect(comp.displayDate).toEqual(new Date('2012-10-13T12:00'));
        btn.nativeElement.click();
        fixture.detectChanges();
        expect(spy.calls.any()).toBeTruthy();
        expect(comp.displayDate).toEqual(new Date('2012-09-01T12:00'));
    });

    it('should display the prev month in next year', () => {
        comp.displayDate = new Date('2012-01-14T12:00');
        comp.date = new Date('2012-01-14T12:00');
        let spy = spyOn(comp, 'prevMonth').and.callThrough();
        fixture.detectChanges();
        let btn: DebugElement = de.query(By.css('.ang2cal-prev-btn'));
        expect(comp.displayDate).toEqual(new Date('2012-01-14T12:00'));
        btn.nativeElement.click();
        fixture.detectChanges();
        expect(spy.calls.any()).toBeTruthy();
        expect(comp.displayDate).toEqual(new Date('2011-12-01T12:00'));
    });

    it('should indicate that date is selected', () => {
        comp.displayDate = new Date('2012-01-14T12:00');
        comp.date = new Date('2012-01-14T12:00');
        fixture.detectChanges();
        expect(comp.dayIsSelected(new Date('2012-01-14T12:00'))).toBeTruthy();
    });

    it('should indicate day is not selected', () => {
        comp.displayDate = new Date('2012-08-12T12:00');
        comp.date = new Date('2012-08-12T12:00');
        fixture.detectChanges();
        expect(comp.dayIsSelected(new Date('2012-08-13T12:00'))).toBeFalsy();
        expect(comp.dayIsSelected(new Date('2012-07-12T12:00'))).toBeFalsy();
        expect(comp.dayIsSelected(new Date('2013-07-12T12:00'))).toBeFalsy();
    });

    it('should indicate day is in the currently displayed month', () => {
        comp.displayDate = new Date('2012-08-12T12:00');
        comp.date = new Date('2012-08-12T12:00');
        fixture.detectChanges();
        expect(comp.dayInThisMonth(new Date('2012-08-14T12:00'))).toBeTruthy();
        expect(comp.dayInThisMonth(new Date('2012-08-10T12:00'))).toBeTruthy();
        expect(comp.dayInThisMonth(new Date('2012-08-01T12:00'))).toBeTruthy();
    });

    it('should indicate day is not in the currently displayed month', () => {
        comp.displayDate = new Date('2012-08-12T12:00');
        comp.date = new Date('2012-08-12T12:00');
        fixture.detectChanges();
        expect(comp.dayInThisMonth(new Date('2013-08-13T12:00'))).toBeFalsy();
        expect(comp.dayInThisMonth(new Date('2012-09-17T12:00'))).toBeFalsy();
        expect(comp.dayInThisMonth(new Date('2012-07-13T12:00'))).toBeFalsy();
        expect(comp.dayInThisMonth(new Date('2012-04-12T12:00'))).toBeFalsy();
    });

    it('should emit view change event', () => {
        comp.viewChange.subscribe((view: View) => expect(view).toBe(View.Months));
        comp.date = new Date('2012-10-13T12:00');
        comp.displayDate = new Date('2012-10-13T12:00');
        let spy = spyOn(comp, 'onViewHigher').and.callThrough();
        let btn: DebugElement = de.query(By.css('th.ang2cal-selectable'));
        btn.nativeElement.click();
        fixture.detectChanges();
        expect(spy.calls.any()).toBeTruthy();
    });

});
