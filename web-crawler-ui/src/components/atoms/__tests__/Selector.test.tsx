import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Selector from '../Selector';

describe('Selector Component', () => {
  it('should show options and enable selection', async () => {
    const { getByRole, getAllByRole } = render(
      <Selector
        options={[
          { name: 'option 1', value: 'option1' },
          { name: 'option 2', value: 'option2' },
        ]}
        keyOption="name"
        valueOption="value"
      />
    );
    const selector = getByRole('combobox');
    expect(selector).toBeDefined();
    userEvent.click(selector);
    userEvent.selectOptions(selector, 'option1');
    const options = getAllByRole('option') as HTMLOptionElement[];
    expect(options.length).toBe(2);
    expect(options[0].selected).toBeTruthy();
  });
});
