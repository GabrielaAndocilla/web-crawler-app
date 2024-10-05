import { render } from '@testing-library/react';
import ListElement from '../ListElement';

describe('List Element Component', () => {
  it('should render Title Component with title and sub title', async () => {
    const { getByText } = render(
      <ListElement title="List Title" subtitle="List Subtitle" />
    );
    expect(getByText('List Title')).toBeDefined();
    expect(getByText('List Title')).toHaveClass('font-semibold');
    expect(getByText('List Subtitle')).not.toHaveClass('font-semibold');
  });

  it('should render Title Component with title ', async () => {
    const { getByText, queryByText } = render(
      <ListElement title="List Title" />
    );
    expect(getByText('List Title')).toBeDefined();
    expect(getByText('List Title')).toHaveClass('font-semibold');
    expect(queryByText('List Subtitle')).toBeNull();
  });

  it('should render Title Component with title ', async () => {
    const { getByText, queryByText } = render(
      <ListElement subtitle="List Subtitle" />
    );
    expect(getByText('List Subtitle')).toBeDefined();
    expect(getByText('List Subtitle')).not.toHaveClass('font-semibold');
    expect(queryByText('List Title')).toBeNull();
  });
});
