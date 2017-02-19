import { expect } from 'chai';
import * as _ from 'lodash';
import { DateUtils } from './../../../src/datepicker/utils/util';

describe('Date Utils Calendar Display Builder', () => {
    it('should create a calendar for Feb 2017', () => {
        let calendar: Date[][] = DateUtils.buildCalendar(1, 2017);
        expect(calendar.length).to.equal(5);
        expect(_.map(calendar, (week: Date[]) => _.map(week, (date: Date) => date.getDate()))).to.deep.equal([
            [29, 30, 31, 1, 2, 3, 4],
            [5, 6, 7, 8, 9, 10, 11],
            [12, 13, 14, 15, 16, 17, 18],
            [19, 20, 21, 22, 23, 24, 25],
            [26, 27, 28, 1, 2, 3, 4]
        ]);
        expect(_.map(calendar, (week: Date[]) => _.map(week, (date: Date) => date.getMonth()))).to.deep.equal([
            [0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 2, 2, 2, 2],
        ]);
        for(let week of calendar) {
            for(let day of week) {
                expect(day.getFullYear()).to.equal(2017);
            }
        }
    });

    it('should create a calendar for Feb 2016 (leap year)', () => {
        let calendar: Date[][] = DateUtils.buildCalendar(1, 2016);
        expect(calendar.length).to.equal(5);
        expect(_.map(calendar, (week: Date[]) => _.map(week, (date: Date) => date.getDate()))).to.deep.equal([
            [31, 1, 2, 3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12, 13],
            [14, 15, 16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25, 26, 27],
            [28, 29, 1, 2, 3, 4, 5]
        ]);
        expect(_.map(calendar, (week: Date[]) => _.map(week, (date: Date) => date.getMonth()))).to.deep.equal([
            [0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 2, 2, 2, 2, 2],
        ]);
        for(let week of calendar) {
            for(let day of week) {
                expect(day.getFullYear()).to.equal(2016);
            }
        }
    });

    it('should create a calendar for Sep 2017', () => {
        let calendar: Date[][] = DateUtils.buildCalendar(8, 2017);
        expect(calendar.length).to.equal(5);
        expect(_.map(calendar, (week: Date[]) => _.map(week, (date: Date) => date.getDate()))).to.deep.equal([
            [27, 28, 29, 30, 31, 1, 2],
            [3, 4, 5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14, 15, 16],
            [17, 18, 19, 20, 21, 22, 23],
            [24, 25, 26, 27, 28, 29, 30]
        ]);
        expect(_.map(calendar, (week: Date[]) => _.map(week, (date: Date) => date.getMonth()))).to.deep.equal([
            [7, 7, 7, 7, 7, 8, 8],
            [8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8],
        ]);
        for(let week of calendar) {
            for(let day of week) {
                expect(day.getFullYear()).to.equal(2017);
            }
        }
    });

    it('should create a calendar for May 2016', () => {
        let calendar: Date[][] = DateUtils.buildCalendar(4, 2016);
        expect(calendar.length).to.equal(5);
        expect(_.map(calendar, (week: Date[]) => _.map(week, (date: Date) => date.getDate()))).to.deep.equal([
            [1, 2, 3, 4, 5, 6, 7],
            [8, 9, 10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19, 20, 21],
            [22, 23, 24, 25, 26, 27, 28],
            [29, 30, 31, 1, 2, 3, 4]
        ]);
        expect(_.map(calendar, (week: Date[]) => _.map(week, (date: Date) => date.getMonth()))).to.deep.equal([
            [4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 5, 5, 5, 5],
        ]);
        for(let week of calendar) {
            for(let day of week) {
                expect(day.getFullYear()).to.equal(2016);
            }
        }
    });

    it('should create a calendar for Jan 1997', () => {
        let calendar: Date[][] = DateUtils.buildCalendar(0, 1997);
        expect(calendar.length).to.equal(5);
        expect(_.map(calendar, (week: Date[]) => _.map(week, (date: Date) => date.getDate()))).to.deep.equal([
            [29, 30, 31, 1, 2, 3, 4],
            [5, 6, 7, 8, 9, 10, 11],
            [12, 13, 14, 15, 16, 17, 18],
            [19, 20, 21, 22, 23, 24, 25],
            [26, 27, 28, 29, 30, 31, 1]
        ]);
        expect(_.map(calendar, (week: Date[]) => _.map(week, (date: Date) => date.getMonth()))).to.deep.equal([
            [11, 11, 11, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1],
        ]);
        expect(_.map(calendar, (week: Date[]) => _.map(week, (date: Date) => date.getFullYear()))).to.deep.equal([
            [1996, 1996, 1996, 1997, 1997, 1997, 1997],
            [1997, 1997, 1997, 1997, 1997, 1997, 1997],
            [1997, 1997, 1997, 1997, 1997, 1997, 1997],
            [1997, 1997, 1997, 1997, 1997, 1997, 1997],
            [1997, 1997, 1997, 1997, 1997, 1997, 1997],
        ]);
    });

    it('should create a calendar for Dec 2002', () => {
        let calendar: Date[][] = DateUtils.buildCalendar(11, 2002);
        expect(calendar.length).to.equal(5);
        expect(_.map(calendar, (week: Date[]) => _.map(week, (date: Date) => date.getDate()))).to.deep.equal([
            [1, 2, 3, 4, 5, 6, 7],
            [8, 9, 10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19, 20, 21],
            [22, 23, 24, 25, 26, 27, 28],
            [29, 30, 31, 1, 2, 3, 4]
        ]);
        expect(_.map(calendar, (week: Date[]) => _.map(week, (date: Date) => date.getMonth()))).to.deep.equal([
            [11, 11, 11, 11, 11, 11, 11],
            [11, 11, 11, 11, 11, 11, 11],
            [11, 11, 11, 11, 11, 11, 11],
            [11, 11, 11, 11, 11, 11, 11],
            [11, 11, 11, 0, 0, 0, 0],
        ]);
        expect(_.map(calendar, (week: Date[]) => _.map(week, (date: Date) => date.getFullYear()))).to.deep.equal([
            [2002, 2002, 2002, 2002, 2002, 2002, 2002],
            [2002, 2002, 2002, 2002, 2002, 2002, 2002],
            [2002, 2002, 2002, 2002, 2002, 2002, 2002],
            [2002, 2002, 2002, 2002, 2002, 2002, 2002],
            [2002, 2002, 2002, 2003, 2003, 2003, 2003],
        ]);
    });
});
