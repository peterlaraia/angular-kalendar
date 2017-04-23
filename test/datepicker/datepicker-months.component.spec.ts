import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DatePickerMonthsComponent } from '../../lib/datepicker/datepicker-months.component';
import { View } from '../../lib/datepicker/view';

describe('DatePicker Months Component', () => {
    let comp: DatePickerMonthsComponent;
    let fixture: ComponentFixture<DatePickerMonthsComponent>;
    let de: DebugElement;
    const months: string[] = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [DatePickerMonthsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatePickerMonthsComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should create months view on init', () => {
        comp.displayDate = new Date('2012-10-13T12:00');
        fixture.detectChanges();
        let cells: DebugElement[] = de.queryAll(By.css('td'));
        expect(cells.length).toBe(months.length);
        expect(cells.map((cell: DebugElement) => cell.nativeElement.textContent.trim())).toEqual(months);
        expect(comp.months).toEqual(months);
    });

    it('should update the display date', () => {
        comp.displayDate = new Date('2012-10-13T12:00');
        let spy = spyOn(comp, 'updateMonth').and.callThrough();
        fixture.detectChanges();
        let selected: DebugElement = de.query(By.css('.ang2cal-selected'));
        expect(selected.nativeElement.textContent.trim()).toEqual(`${months[9]}`);

        expect(comp.displayDate.getMonth()).toBe(9);

        let cells: DebugElement[] = de.queryAll(By.css('td'));
        cells[8].nativeElement.click();
        fixture.detectChanges();
        selected = de.query(By.css('.ang2cal-selected'));
        expect(selected.nativeElement.textContent.trim()).toEqual(`${months[8]}`);
        expect(spy.calls.any()).toBeTruthy();
        expect(comp.displayDate.getMonth()).toBe(8);
    });

    it('should display the previous year', () => {
        comp.displayDate = new Date('2012-10-13T12:00');
        let spy = spyOn(comp, 'prevYear').and.callThrough();
        fixture.detectChanges();
        let btn: DebugElement = de.query(By.css('.ang2cal-prev-btn'));
        expect(comp.displayDate.getFullYear()).toBe(2012);
        btn.nativeElement.click();
        fixture.detectChanges();
        expect(spy.calls.any()).toBeTruthy();
        expect(comp.displayDate.getFullYear()).toBe(2011);
    });

    it('should display the next year', () => {
        comp.displayDate = new Date('2012-10-13T12:00');
        let spy = spyOn(comp, 'nextYear').and.callThrough();
        fixture.detectChanges();
        let btn: DebugElement = de.query(By.css('.ang2cal-next-btn'));
        expect(comp.displayDate.getFullYear()).toBe(2012);
        btn.nativeElement.click();
        fixture.detectChanges();
        expect(spy.calls.any()).toBeTruthy();
        expect(comp.displayDate.getFullYear()).toBe(2013);
    });

    it('should emit view change event', () => {
        comp.viewChange.subscribe((view: View) => expect(view).toBe(View.Years));
        comp.displayDate = new Date('2012-10-13T12:00');
        let spy = spyOn(comp, 'onViewHigher').and.callThrough();
        let btn: DebugElement = de.query(By.css('th.ang2cal-selectable'));
        btn.nativeElement.click();
        fixture.detectChanges();
        expect(spy.calls.any()).toBeTruthy();
    });

});
