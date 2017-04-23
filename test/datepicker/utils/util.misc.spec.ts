import { DateUtils } from '../../../lib/datepicker/utils/util';

describe('Date Utils methods', () => {
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
