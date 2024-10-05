import { render } from '@testing-library/react';
import { DefinitionListItem } from '../DefinitionListIem';

describe('Definition List Item', () => {
  it('should show description list item', () => {
    const { getByText, getByRole } = render(
      <DefinitionListItem title="item list">
        {['item1', 'item2'].map((item, idex) => (
          <li key={idex}>{item}</li>
        ))}
      </DefinitionListItem>
    );
    expect(getByText('item list')).toBeDefined();
    expect(getByRole('definition').childNodes[0].childNodes.length).toBe(2);
  });
});
