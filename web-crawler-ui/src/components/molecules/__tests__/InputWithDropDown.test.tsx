import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ERROR_MESSAGE_INPUT_DROPDOWN } from '../../../constants/errorMessages';
import InputWithDropDown from '../InputWithDropDown';

describe(' Input With Drop Down', () => {
  it('should render Input with Drop Down', () => {
    const onSelection = jest.fn();
    const { getByRole, getByText, getByPlaceholderText, queryByText } = render(
      <InputWithDropDown
        options={[
          { name: 'Option 1', value: 'option1' },
          { name: 'Option 2', value: 'option2' },
          { name: 'Option 3', value: 'option3' },
        ]}
        keyOption="name"
        valueOption="value"
        inputOptions={{
          type: 'number',
          min: 0,
          placeholder: 'placeholder',
        }}
        onUserSelect={onSelection}
      />
    );

    const selector = getByRole('combobox');
    expect(selector).toBeDefined();
    userEvent.click(selector);
    userEvent.selectOptions(selector, 'option1');
    expect(getByText(ERROR_MESSAGE_INPUT_DROPDOWN)).toBeDefined();

    const input = getByPlaceholderText('placeholder');
    expect(input).toBeDefined();
    userEvent.type(input, '5');

    expect(queryByText(ERROR_MESSAGE_INPUT_DROPDOWN)).toBeNull();
    expect(onSelection).toHaveBeenCalledWith('5', 'option1');
  });
});
