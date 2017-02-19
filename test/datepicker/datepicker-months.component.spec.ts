/// <reference path="../../node_modules/@types/mocha/index.d.ts" /> 
/// <reference path="../../node_modules/@types/node/index.d.ts" />

import { expect } from 'chai';
import 'reflect-metadata';
import { DatePickerMonthsComponent } from './../../src/datepicker/datepicker-months.component';
import { View } from './../../src/datepicker/view';

describe('DatePicker Months Component', () => {
    let comp: DatePickerMonthsComponent;

    beforeEach(() => {
        comp = new DatePickerMonthsComponent();
    });

    it('should create months view on init', () => {
        comp.displayDate = new Date('2012-10-13T12:00');
        expect(comp.months).to.deep.equal([
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]);
    });

    it('should update the display date', () => {
        comp.displayDate = new Date('2012-10-13T12:00');
        expect(comp.displayDate.getMonth()).to.equal(9);
        comp.updateMonth(8, {stopPropagation: (): any => undefined});
        expect(comp.displayDate.getMonth()).to.equal(8);
    });

    it('should display the previous year', () => {
        comp.displayDate = new Date('2012-10-13T12:00');
        expect(comp.displayDate.getFullYear()).to.equal(2012);
        comp.prevYear();
        expect(comp.displayDate.getFullYear()).to.equal(2011);
    });

    it('should display the next year', () => {
        comp.displayDate = new Date('2012-10-13T12:00');
        expect(comp.displayDate.getFullYear()).to.equal(2012);
        comp.nextYear();
        expect(comp.displayDate.getFullYear()).to.equal(2013);
    });

    it('should emit view change event', () => {
        comp.viewChange.subscribe((view: View) => expect(view).to.eq(View.Years));
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.onViewHigher({stopPropagation: (): any => undefined});
    });

});
