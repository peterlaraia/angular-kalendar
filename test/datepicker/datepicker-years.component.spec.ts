/// <reference path="../../node_modules/@types/mocha/index.d.ts" /> 
/// <reference path="../../node_modules/@types/node/index.d.ts" />

import { expect } from 'chai';
import 'reflect-metadata';
import { DatePickerYearsComponent } from './../../src/datepicker/datepicker-years.component';
import { View } from './../../src/datepicker/view';

describe('DatePicker Years Component', () => {
    let comp: DatePickerYearsComponent;

    beforeEach(() => {
        comp = new DatePickerYearsComponent();
    });

    it('should create years view on init', () => {
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.ngOnInit();
        expect(comp.years).to.deep.equal([
            2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019
        ]);
    });

    it('should update the display date', () => {
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.ngOnInit();
        expect(comp.displayDate.getFullYear()).to.equal(2012);
        expect(comp.years.length).to.equal(10);
        comp.updateYear(2016, {stopPropagation: (): any => undefined});
        expect(comp.displayDate.getFullYear()).to.equal(2016);
    });

    it('should display the previous decade', () => {
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.ngOnInit();
        comp.prev();
        expect(comp.years).to.deep.equal([
            2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009
        ]);
    });

    it('should display the next decade', () => {
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.ngOnInit();
        comp.next();
        expect(comp.years).to.deep.equal([
            2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029
        ]);
    });

    it('should emit view change event', () => {
        comp.viewChange.subscribe((view: View) => expect(view).to.eq(View.Decades));
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.ngOnInit();
        comp.onViewHigher({stopPropagation: (): any => undefined});
    });


    it('should create decade view on init', () => {
        comp.centuryView = true;
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.ngOnInit();
        expect(comp.years).to.deep.equal([
            2000, 2010, 2020, 2030, 2040, 2050, 2060, 2070, 2080, 2090
        ]);
    });

    it('should display the previous century', () => {
        comp.centuryView = true;
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.ngOnInit();
        comp.prev();
        expect(comp.years).to.deep.equal([
            1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990
        ]);
    });

    it('should display the next century', () => {
        comp.centuryView = true;
        comp.displayDate = new Date('2012-10-13T12:00');
        comp.ngOnInit();
        comp.next();
        expect(comp.years).to.deep.equal([
            2100, 2110, 2120, 2130, 2140, 2150, 2160, 2170, 2180, 2190
        ]);
    });

});
