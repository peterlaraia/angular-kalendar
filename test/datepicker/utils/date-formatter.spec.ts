import { DateFormatter } from '../../../lib/datepicker/utils/date-formatter';

describe('Date Formatter', () => {
    describe('Dates', () => {
        it('should format m/d/yyyy', () => {
            let date = new Date('1994-03-21T12:00');
            let formattedStr = DateFormatter.formatDate(date, 'm/d/yyyy');
            expect(formattedStr).toEqual('3/21/1994');
        });

        it('should format mm/dd/yyyy', () => {
            let date = new Date('1994-03-21T12:00');
            let formattedStr = DateFormatter.formatDate(date, 'mm/dd/yyyy');
            expect(formattedStr).toEqual('03/21/1994');
        });

        it('should format m/dd/yyyy', () => {
            let date = new Date('1974-11-02T12:00');
            let formattedStr = DateFormatter.formatDate(date, 'm/dd/yyyy');
            expect(formattedStr).toEqual('11/02/1974');
        });

        it('should format m/dd/yy pre 2000s', () => {
            let date = new Date('1974-11-02T12:00');
            let formattedStr = DateFormatter.formatDate(date, 'm/dd/yy');
            expect(formattedStr).toEqual('11/02/74');
        });

        it('should format m/dd/yy post 2000s', () => {
            let date = new Date('2025-05-22T12:00');
            let formattedStr = DateFormatter.formatDate(date, 'm/dd/yy');
            expect(formattedStr).toEqual('5/22/25');
        });

        it('should format shortMonth d, yyyy', () => {
            let date = new Date('2015-08-03T12:00');
            let formattedStr = DateFormatter.formatDate(date, 'mmm d, yyyy');
            expect(formattedStr).toEqual('Aug 3, 2015');
        });

        it('should format shortMonth dd, yyyy', () => {
            let date = new Date('2015-06-09T12:00');
            let formattedStr = DateFormatter.formatDate(date, 'mmm dd, yyyy');
            expect(formattedStr).toEqual('Jun 09, 2015');
        });

        it('should format longMonth dd, yyyy', () => {
            let date = new Date('2015-07-08T12:00');
            let formattedStr = DateFormatter.formatDate(date, 'mmmm dd, yyyy');
            expect(formattedStr).toEqual('July 08, 2015');
        });

        it('should format longMonth d, yy', () => {
            let date = new Date('2013-03-25T12:00');
            let formattedStr = DateFormatter.formatDate(date, 'mmmm d, yy');
            expect(formattedStr).toEqual('March 25, 13');
        });
    });

    describe('Date & Times', () => {
        it('should format m/d/yyyy HH:MM in 24hr time', () => {
            let date = new Date('21 Mar 1994 13:00');
            let formattedStr = DateFormatter.formatDate(date, 'm/d/yyyy HH:MM');
            expect(formattedStr).toEqual('3/21/1994 13:00');
        });

        it('should format m/d/yyyy H:MM in 12hr time', () => {
            let date = new Date('21 Mar 1994 13:00');
            let formattedStr = DateFormatter.formatDate(date, 'm/d/yyyy H:MM', false);
            expect(formattedStr).toEqual('3/21/1994 1:00 PM');
        });

        it('should format m/d/yyyy HH:MM in 12hr time', () => {
            let date = new Date('21 Mar 1994 13:00');
            let formattedStr = DateFormatter.formatDate(date, 'm/d/yyyy HH:MM', false);
            expect(formattedStr).toEqual('3/21/1994 01:00 PM');
        });
    });

    describe('Bad Input', () => {
        it('should allow the user to format weird input, not gonna double check their work', () => {
            let date = new Date('2015-07-08T12:00');
            let formattedStr = DateFormatter.formatDate(date, 'yymmmddmmyyyy');
            expect(formattedStr).toEqual('15Jul08072015');
        });

        it('should allow the user to format weird input, not gonna double check their work 2', () => {
            let date = new Date('2015-07-08T12:00');
            let formattedStr = DateFormatter.formatDate(date, 'yyxmmxmd34dmzzmyyyyWOW');
            expect(formattedStr).toEqual('15x07x783487zz72015WOW');
        });
    });
});
