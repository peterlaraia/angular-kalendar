/// <reference path="../../node_modules/@types/mocha/index.d.ts" /> 
/// <reference path="../../node_modules/@types/node/index.d.ts" />

import { expect } from 'chai';
import 'reflect-metadata';
import { DatePickerDaysComponent } from './../../lib/datepicker/datepicker-days.component';
import { View } from './../../lib/datepicker/view';

describe('DatePicker Days Component', () => {
    let comp: DatePickerDaysComponent;

    beforeEach(() => {
        comp = new DatePickerDaysComponent();
    });

    it('should update date', () => {
        let newDate: Date = new Date('2012-10-16T12:00');
        comp.dateChange.subscribe((date: Date) => expect(date).to.deep.eq(newDate));
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.date = new Date('2012-10-13T12:00');
        comp.ngOnInit();
        comp.updateDate(newDate);
        expect(comp.displayDate).to.deep.eq(newDate, 'displayDate check');
        expect(comp.date).to.deep.eq(newDate, 'date check');
    });

    it('should update date but not display date', () => {
        let newDate: Date = new Date('2012-11-01T12:00');
        comp.dateChange.subscribe((date: Date) => expect(date).to.deep.eq(newDate));
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.date = new Date('2012-10-13T12:00');
        comp.ngOnInit();
        comp.updateDate(newDate);
        expect(comp.displayDate).to.deep.eq(new Date('2012-10-13T12:00'));
        expect(comp.date).to.deep.eq(newDate);
    });

    it('should display the next month', () => {
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.nextMonth();
        expect(comp.displayDate).to.deep.eq(new Date('2012-11-01T12:00'));
    });

    it('should display the next month in next year', () => {
        comp.displayDate = new Date('2011-12-14T12:00');
        comp.nextMonth();
        expect(comp.displayDate).to.deep.eq(new Date('2012-01-01T12:00'));
    });

    it('should display the prev month', () => {
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.prevMonth();
        expect(comp.displayDate).to.deep.eq(new Date('2012-09-01T12:00'));
    });

    it('should display the prev month in next year', () => {
        comp.displayDate = new Date('2012-01-14T12:00');
        comp.prevMonth();
        expect(comp.displayDate).to.deep.eq(new Date('2011-12-01T12:00'));
    });

    it('should indicate that date is selected', () => {
        comp.date = new Date('2012-01-14T12:00');
        expect(comp.dayIsSelected(new Date('2012-01-14T12:00'))).to.be.true;
    });

    it('should indicate day is not selected', () => {
        comp.date = new Date('2012-08-12T12:00');
        expect(comp.dayIsSelected(new Date('2012-08-13T12:00'))).to.be.false;
        expect(comp.dayIsSelected(new Date('2012-07-12T12:00'))).to.be.false;
        expect(comp.dayIsSelected(new Date('2013-07-12T12:00'))).to.be.false;
    });

    it('should indicate day is in the currently displayed month', () => {
        comp.displayDate = new Date('2012-08-12T12:00');
        expect(comp.dayInThisMonth(new Date('2012-08-14T12:00'))).to.be.true;
        expect(comp.dayInThisMonth(new Date('2012-08-10T12:00'))).to.be.true;
        expect(comp.dayInThisMonth(new Date('2012-08-01T12:00'))).to.be.true;
    });

    it('should indicate day is not in the currently displayed month', () => {
        comp.displayDate = new Date('2012-08-12T12:00');
        expect(comp.dayInThisMonth(new Date('2013-08-13T12:00'))).to.be.false;
        expect(comp.dayInThisMonth(new Date('2012-09-17T12:00'))).to.be.false;
        expect(comp.dayInThisMonth(new Date('2012-07-13T12:00'))).to.be.false;
        expect(comp.dayInThisMonth(new Date('2012-04-12T12:00'))).to.be.false;
    });

    it('should emit view change event', () => {
        comp.viewChange.subscribe((view: View) => expect(view).to.eq(View.Months));
        comp.date = new Date('2012-10-13T12:00');
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.ngOnInit();
        comp.onViewHigher({stopPropagation: (): any => undefined});
    });

});
