import { DateUtils } from '../../../lib/datepicker/utils/util';

describe('Date Utils methods', () => {
    describe('Is Object of type Date', () => {
        it('should recognize Date obj', () => {
            expect(DateUtils.isDate(new Date())).toBeTruthy();
        });

        it('should recognize String is not Date', () => {
            expect(DateUtils.isDate('2016-10-10')).toBeFalsy();
        });

        it('should recognize number is not Date', () => {
            expect(DateUtils.isDate(2017)).toBeFalsy();
        });
    });

    describe('24 Hr vs 12 Hr am/pm', () => {
        it('should convert 3 pm to 15:00', () => {
            expect(DateUtils.hoursTo24(3, true)).toBe(15);
        });

        it('should leave 3am as 3:00', () => {
            expect(DateUtils.hoursTo24(3, false)).toBe(3);
        });

        it('should convert 12 am to 0:00', () => {
            expect(DateUtils.hoursTo24(12, false)).toBe(0);
        });

        it('should leave 12pm as 12:00', () => {
            expect(DateUtils.hoursTo24(12, true)).toBe(12);
        });

        it('should convert 15:00 to 3pm', () => {
            expect(DateUtils.hoursTo12(15)).toEqual([3, 'PM']);
        });

        it('should convert 3:00 to 3am', () => {
            expect(DateUtils.hoursTo12(3)).toEqual([3, 'AM']);
        });

        it('should convert 12:00 to 12pm', () => {
            expect(DateUtils.hoursTo12(12)).toEqual([12, 'PM']);
        });

        it('should convert 0:00 to 12am', () => {
            expect(DateUtils.hoursTo12(0)).toEqual([12, 'AM']);
        });
    });

});
