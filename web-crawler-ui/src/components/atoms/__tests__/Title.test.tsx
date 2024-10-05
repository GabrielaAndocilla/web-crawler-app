import { render } from '@testing-library/react';
import Title from '../Title';

describe('Title Component', () => {
  it('should render Title Component', async () => {
    const { getByText } = render(<Title text="Label Title" />);
    expect(getByText('Label Title')).toBeDefined();
  });
});
