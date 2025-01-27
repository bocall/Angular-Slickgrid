import { FilterConditionOption, FieldType } from '../../models/index';
import { dateUtcFilterCondition } from '../dateUtcFilterCondition';
import { executeMappedCondition } from '../executeMappedCondition';

describe('dateUtcFilterCondition method', () => {
  it('should return False when no cell value is provided, neither search terms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '' } as FilterConditionOption;
    const output = dateUtcFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when any cell value is provided without any search terms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '2000-12-25T23:01:52.103Z' } as FilterConditionOption;
    const output = dateUtcFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when search term is not a valid date', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '2000-12-25T23:01:52.103Z', fieldType: FieldType.dateUtc, searchTerms: ['2000-14-25T18:50:02.25Z'] } as FilterConditionOption;
    const output = dateUtcFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value provided is equal to the searchTerms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '1993-12-25T10:50:50.124Z', fieldType: FieldType.dateUtc, searchTerms: ['1993-12-25T10:50:50.124Z'] } as FilterConditionOption;
    const output = dateUtcFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms and is called by "executeMappedCondition"', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '1993-12-25T10:50:50.124Z', fieldType: FieldType.dateUtc, searchTerms: ['1993-12-25T10:50:50.124Z'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when cell value is not the same value as the searchTerm', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '1993-12-25T10:50:50.108Z', fieldType: FieldType.dateUtc, searchTerms: ['2003-03-14T13:03:03.003Z'] } as FilterConditionOption;
    const output = dateUtcFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False even when the cell value is found in the searchTerms since it only compares first term', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '1993-12-25T10:50:50.108Z', searchTerms: ['2003-03-14T13:03:03.003Z', '1993-12-25T10:50:50.108Z'] } as FilterConditionOption;
    const output = dateUtcFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False even when Operator is Not Equal and cell value equals the search term', () => {
    const options = { dataKey: '', operator: 'NE', cellValue: '1993-12-25T10:50:50.108Z', fieldType: FieldType.dateUtc, searchTerms: ['1993-12-25T10:50:50.108Z'] } as FilterConditionOption;
    const output = dateUtcFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True even when Operator is Not Equal and cell value is different than the search term', () => {
    const options = { dataKey: '', operator: 'NE', cellValue: '1993-12-25T10:50:50.115Z', fieldType: FieldType.dateUtc, searchTerms: ['1995-12-25T10:50:50.115Z'] } as FilterConditionOption;
    const output = dateUtcFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when there are no search term and no operator', () => {
    const options = { dataKey: '', cellValue: '1993-12-25T10:50:50.108Z', fieldType: FieldType.dateUtc, searchTerms: [null] } as FilterConditionOption;
    const output = dateUtcFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when search and cell values are different and there are no operator passed, it will use default EQ operator', () => {
    const options = { dataKey: '', cellValue: '1993-12-25T10:50:50.108Z', fieldType: FieldType.dateUtc, searchTerms: ['1993-12-27T12:27:27.127Z'] } as FilterConditionOption;
    const output = dateUtcFilterCondition(options);
    expect(output).toBe(false);
  });
});
