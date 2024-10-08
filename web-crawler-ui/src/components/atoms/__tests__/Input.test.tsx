import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('Input Component', () => {
  it('should render Input', () => {
    const typeFunction = jest.fn();
    const { getByRole } = render(
      <Input
        type="text"
        name="textInput"
        value="testValue"
        onChange={typeFunction}
      />
    );
    const input = getByRole('textbox');
    expect(input).toBeDefined();
    userEvent.type(input, 'aa');
    expect(typeFunction).toHaveBeenCalled();
  });
});
