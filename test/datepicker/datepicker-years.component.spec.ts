import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DatePickerYearsComponent } from '../../lib/datepicker/datepicker-years.component';
import { View } from '../../lib/datepicker/view';

describe('DatePicker Years Component', () => {
    let comp: DatePickerYearsComponent;
    let fixture: ComponentFixture<DatePickerYearsComponent>;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [DatePickerYearsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatePickerYearsComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    describe('Decade View', () => {
        it('should create years view on init', () => {
            comp.displayDate = new Date('2012-10-13T12:00');
            fixture.detectChanges();
            expect(comp.years).toEqual([
                2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019
            ]);
        });

        it('should select a year', () => {
            comp.displayDate = new Date('2012-10-13T12:00');
            let spy = spyOn(comp, 'updateYear').and.callThrough();
            fixture.detectChanges();
            expect(comp.displayDate.getFullYear()).toBe(2012);
            let selected: DebugElement = de.query(By.css('.ang2cal-selected'));
            expect(selected.nativeElement.textContent.trim()).toEqual('2012');

            let cells: DebugElement[] = de.queryAll(By.css('td'));
            expect(cells.length).toBe(10);
            cells[6].nativeElement.click();
            fixture.detectChanges();
            selected = de.query(By.css('.ang2cal-selected'));
            expect(spy.calls.any()).toBeTruthy();
            expect(selected.nativeElement.textContent.trim()).toEqual('2016');
            expect(comp.displayDate.getFullYear()).toBe(2016);
        });

        it('should display the previous decade', () => {
            comp.displayDate = new Date('2012-10-13T12:00');
            let spy = spyOn(comp, 'prev').and.callThrough();
            fixture.detectChanges();
            let displaying: DebugElement = de.query(By.css('thead th div'));
            expect(displaying.nativeElement.textContent.trim()).toContain('2010', '2020');
            let btn: DebugElement = de.query(By.css('.ang2cal-prev-btn'));
            btn.nativeElement.click();
            fixture.detectChanges();

            displaying = de.query(By.css('thead th div'));
            expect(displaying.nativeElement.textContent.trim()).toContain('2000', '2010');
            expect(spy.calls.any()).toBeTruthy();
            expect(comp.years).toEqual([
                2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009
            ]);
        });

        it('should display the next decade', () => {
            comp.displayDate = new Date('2012-10-13T12:00');
            let spy = spyOn(comp, 'next').and.callThrough();
            fixture.detectChanges();
            let displaying: DebugElement = de.query(By.css('thead th div'));
            expect(displaying.nativeElement.textContent.trim()).toContain('2010', '2020');
            let btn: DebugElement = de.query(By.css('.ang2cal-next-btn'));
            btn.nativeElement.click();
            fixture.detectChanges();

            displaying = de.query(By.css('thead th div'));
            expect(displaying.nativeElement.textContent.trim()).toContain('2020', '2030');
            expect(spy.calls.any()).toBeTruthy();
            expect(comp.years).toEqual([
                2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029
            ]);
        });

        it('should emit view change event', () => {
            comp.viewChange.subscribe((view: View) => expect(view).toBe(View.Decades));
            comp.displayDate = new Date('2012-10-13T12:00');
            let spy = spyOn(comp, 'onViewHigher').and.callThrough();
            fixture.detectChanges();
            let btn: DebugElement = de.query(By.css('th.ang2cal-selectable'));
            btn.nativeElement.click();
            fixture.detectChanges();
            expect(spy.calls.any()).toBeTruthy();
        });
    });

    describe('Century View', () => {
        it('should select a decade', () => {
            comp.centuryView = true;
            comp.displayDate = new Date('2012-10-13T12:00');
            let spy = spyOn(comp, 'updateYear').and.callThrough();
            fixture.detectChanges();
            expect(comp.displayDate.getFullYear()).toBe(2012);
            let selected: DebugElement = de.query(By.css('.ang2cal-selected'));
            expect(selected.nativeElement.textContent.trim()).toEqual('2010');

            let cells: DebugElement[] = de.queryAll(By.css('td'));
            expect(cells.length).toBe(10);
            cells[2].nativeElement.click(); // 2020
            fixture.detectChanges();
            selected = de.query(By.css('.ang2cal-selected'));
            expect(spy.calls.any()).toBeTruthy();
            expect(selected.nativeElement.textContent.trim()).toEqual('2020');
            expect(comp.displayDate.getFullYear()).toBe(2020);
        });

        it('should select the same decade', () => {
            comp.centuryView = true;
            comp.displayDate = new Date('2012-10-13T12:00');
            let spy = spyOn(comp, 'updateYear').and.callThrough();
            fixture.detectChanges();
            expect(comp.displayDate.getFullYear()).toBe(2012);
            let selected: DebugElement = de.query(By.css('.ang2cal-selected'));
            expect(selected.nativeElement.textContent.trim()).toEqual('2010');

            let cells: DebugElement[] = de.queryAll(By.css('td'));
            expect(cells.length).toBe(10);
            cells[1].nativeElement.click(); // 2010
            fixture.detectChanges();
            selected = de.query(By.css('.ang2cal-selected'));
            expect(spy.calls.any()).toBeTruthy();
            expect(selected.nativeElement.textContent.trim()).toEqual('2010');
            expect(comp.displayDate.getFullYear()).toBe(2012);
        });

        it('should create decade view on init', () => {
            comp.centuryView = true;
            comp.displayDate = new Date('2012-10-13T12:00');
            fixture.detectChanges();
            expect(comp.years).toEqual([
                2000, 2010, 2020, 2030, 2040, 2050, 2060, 2070, 2080, 2090
            ]);
        });

        it('should display the previous century', () => {
            comp.centuryView = true;
            comp.displayDate = new Date('2012-10-13T12:00');
            let spy = spyOn(comp, 'prev').and.callThrough();
            fixture.detectChanges();
            let displaying: DebugElement = de.query(By.css('thead th div'));
            expect(displaying.nativeElement.textContent.trim()).toContain('2000', '2100');
            let btn: DebugElement = de.query(By.css('.ang2cal-prev-btn'));
            btn.nativeElement.click();
            fixture.detectChanges();

            displaying = de.query(By.css('thead th div'));
            expect(displaying.nativeElement.textContent.trim()).toContain('1900', '2000');
            expect(spy.calls.any()).toBeTruthy();
            expect(comp.years).toEqual([
                1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990
            ]);
        });

        it('should display the next century', () => {
            comp.centuryView = true;
            comp.displayDate = new Date('2012-10-13T12:00');
            let spy = spyOn(comp, 'next').and.callThrough();
            fixture.detectChanges();
            let displaying: DebugElement = de.query(By.css('thead th div'));
            expect(displaying.nativeElement.textContent.trim()).toContain('2000', '2100');
            let btn: DebugElement = de.query(By.css('.ang2cal-next-btn'));
            btn.nativeElement.click();
            fixture.detectChanges();

            displaying = de.query(By.css('thead th div'));
            expect(displaying.nativeElement.textContent.trim()).toContain('2100', '2200');
            expect(spy.calls.any()).toBeTruthy();
            expect(comp.years).toEqual([
                2100, 2110, 2120, 2130, 2140, 2150, 2160, 2170, 2180, 2190
            ]);
        });
    });
});
