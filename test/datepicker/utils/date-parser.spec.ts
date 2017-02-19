/// <reference path="../../../node_modules/@types/mocha/index.d.ts" /> 
import { expect } from 'chai';

import { DateParser } from './../../../lib/datepicker/utils/date-parser';

describe('Date Parser', () => {
    it('should parse yyyy-mm-dd H:MM', () => {
        let format = 'yyyy-mm-dd H:MM';
        let dateStr = '1994-03-21 12:00';
        let date = DateParser.parseDate(dateStr, format);
        expect(date).to.deep.eq(new Date('1994-03-21 12:00'));
    });

    it('should parse yyyy-mm-dd 12:MM pm', () => {
        let format = 'yyyy-mm-dd H:MM';
        let dateStr = '1994-03-21 12:00 pm';
        let date = DateParser.parseDate(dateStr, format);
        expect(date).to.deep.eq(new Date('1994-03-21 12:00'));
    });

    it('should parse yyyy-mm-dd 12:MM am', () => {
        let format = 'yyyy-mm-dd H:MM';
        let dateStr = '1994-03-21 12:00 AM';
        let date = DateParser.parseDate(dateStr, format);
        expect(date).to.deep.eq(new Date('1994-03-21 00:00'));
    });

    it('should parse yyyy-mm-dd H:MM pm', () => {
        let format = 'yyyy-mm-dd H:MM';
        let dateStr = '1994-03-21 6:34 PM';
        let date = DateParser.parseDate(dateStr, format);
        expect(date).to.deep.eq(new Date('1994-03-21 18:34'));
    });

    it('should parse m/dd/yy H:MM', () => {
        let format = 'm/dd/yy H:MM';
        let dateStr = '3/21/94 18:34';
        let date = DateParser.parseDate(dateStr, format);
        expect(date).to.deep.eq(new Date('2094-03-21 18:34'));
    });

    it('should parse m/dd/yyyy H:MM', () => {
        let format = 'm/dd/yyyy H:MM';
        let dateStr = '3/21/2018 3:34';
        let date = DateParser.parseDate(dateStr, format);
        expect(date).to.deep.eq(new Date('2018-03-21 3:34'));
    });

    it('should parse dd.mm.yyyy', () => {
        let format = 'dd.mm.yyyy';
        let dateStr = '15.08.2034';
        let date = DateParser.parseDate(dateStr, format);
        expect(date).to.deep.eq(new Date('2034-08-15 00:00'));
    });

});
