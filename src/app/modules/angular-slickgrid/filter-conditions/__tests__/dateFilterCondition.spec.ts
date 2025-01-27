import { FilterConditionOption, FieldType } from '../../models/index';
import { dateFilterCondition } from '../dateFilterCondition';
import { executeMappedCondition } from '../executeMappedCondition';

describe('dateFilterCondition method', () => {
  it('should return False when no cell value is provided, neither search terms', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.date, cellValue: '' } as FilterConditionOption;
    const output = dateFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when any cell value is provided without any search terms', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.date, cellValue: '2000-12-25' } as FilterConditionOption;
    const output = dateFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when search term is not a valid date', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.date, cellValue: '2000-12-25', searchTerms: ['2000-14-25'] } as FilterConditionOption;
    const output = dateFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value provided is equal to the searchTerms', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.date, cellValue: '1993-12-25', searchTerms: ['1993-12-25'] } as FilterConditionOption;
    const output = dateFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms and is called by "executeMappedCondition"', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.date, cellValue: '1993-12-25', searchTerms: ['1993-12-25'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when cell value is not the same value as the searchTerm', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.date, cellValue: '1993-12-25', searchTerms: ['2003-03-14'] } as FilterConditionOption;
    const output = dateFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False even when the cell value is found in the searchTerms since it only compares first term', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.date, cellValue: '1993-12-25', searchTerms: ['2003-03-14', '1993-12-25'] } as FilterConditionOption;
    const output = dateFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False even when Operator is Not Equal and cell value equals the search term', () => {
    const options = { dataKey: '', operator: 'NE', fieldType: FieldType.date, cellValue: '1993-12-25', searchTerms: ['1993-12-25'] } as FilterConditionOption;
    const output = dateFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True even when Operator is Not Equal and cell value is different than the search term', () => {
    const options = { dataKey: '', operator: 'NE', fieldType: FieldType.date, cellValue: '1993-12-25', searchTerms: ['2002-12-25'] } as FilterConditionOption;
    const output = dateFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when there are no search term and no operator', () => {
    const options = { dataKey: '', fieldType: FieldType.date, cellValue: '1993-12-25', searchTerms: [null] } as FilterConditionOption;
    const output = dateFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when search and cell values are different and there are no operator passed, it will use default EQ operator', () => {
    const options = { dataKey: '', fieldType: FieldType.date, cellValue: '1993-12-25', searchTerms: ['1993-12-27'] } as FilterConditionOption;
    const output = dateFilterCondition(options);
    expect(output).toBe(false);
  });
});
