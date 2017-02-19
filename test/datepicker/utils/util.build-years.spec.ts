import { expect } from 'chai';

import { DateUtils } from './../../../lib/datepicker/utils/util';

describe('Date Utils Year Display Builder', () => {
    it('should build decade 2010-2019', () => {
        let decade: number[] = DateUtils.buildDecade(2017);
        expect(decade).to.deep.equal([
           2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019 
        ]);
    });

    it('should build decade 1990-1999', () => {
        let decade: number[] = DateUtils.buildDecade(1994);
        expect(decade).to.deep.equal([
           1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999 
        ]);
    });

    it('should build century 2000-2090', () => {
        let century: number[] = DateUtils.buildCentury(2017);
        expect(century).to.deep.equal([
            2000, 2010, 2020, 2030, 2040, 2050, 2060, 2070, 2080, 2090
        ]);
    });
});
