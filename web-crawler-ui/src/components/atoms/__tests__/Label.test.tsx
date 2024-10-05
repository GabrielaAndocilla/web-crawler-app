import { render } from '@testing-library/react';
import Label from '../Label';

describe('Label Component', () => {
  it('should render Label Component', async () => {
    const { getByText } = render(<Label text="Label Test" />);
    expect(getByText('Label Test')).toBeDefined();
  });
});
