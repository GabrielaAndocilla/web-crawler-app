import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button Component', () => {
  it('should render Button', async () => {
    const clickAction = jest.fn();
    const { getByRole } = render(
      <Button type="button" onClick={clickAction}>
        Button test
      </Button>
    );
    const button = getByRole('button');
    expect(button.innerHTML).toBe('Button test');
    userEvent.click(button);
    expect(clickAction).toHaveBeenCalledTimes(1);
  });
});
