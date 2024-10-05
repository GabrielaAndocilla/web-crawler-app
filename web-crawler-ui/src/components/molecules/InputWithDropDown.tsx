import { ChangeEventHandler, HTMLAttributes, InputHTMLAttributes, useState } from 'react';
import { ERROR_MESSAGE_INPUT_DROPDOWN } from '../../constants/errorMessages';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import SelectorInput from '../atoms/Selector';

const InputWithDropDown = <T extends Record<string, string | number>>({
  options,
  keyOption,
  valueOption = keyOption,
  onUserSelect,
  errorMessage,
  inputOptions,
}: {
  options: T[];
  keyOption: keyof T;
  valueOption?: keyof T;
  onUserSelect: (inputValue: string, selectValue: string) => void;
  errorMessage?: string;
  inputOptions?: InputHTMLAttributes<HTMLInputElement>;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectorValue, setSelectorValue] = useState('');
  const [error, setError] = useState('');

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const { name, value } = event.target;
    const newValues = {
      inputValue: name === 'input--filter' ? value : inputValue,
      selectorValue: name === 'selector--filter' ? value : selectorValue,
    };
    name === 'input--filter' ? setInputValue(value) : setSelectorValue(value);
    if (
      newValues.inputValue === '' ||
      ['None', ''].includes(newValues.selectorValue)
    ) {
      setError(errorMessage || ERROR_MESSAGE_INPUT_DROPDOWN);
      return;
    }
    setError('');
    onUserSelect(newValues.inputValue, newValues.selectorValue);
  };

  return (
    <div>
      <Label
        idFor="number_of_words--filter"
        text="Filter the posts by number of words of the title as you like"
      />
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="absolute inset-y-0  flex items-center">
          <label htmlFor="filterType" className="sr-only">
            filter
          </label>
          <SelectorInput
            id="selector--filter"
            name="selector--filter"
            value={selectorValue}
            onChange={handleChange}
            {...{ options, keyOption, valueOption }}
          />
        </div>
        <Input
          {...inputOptions}
          value={inputValue}
          onChange={handleChange}
          name="input--filter"
          className="right-0 pl-32"
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-red-400">{error}</p>
    </div>
  );
};
export default InputWithDropDown;
