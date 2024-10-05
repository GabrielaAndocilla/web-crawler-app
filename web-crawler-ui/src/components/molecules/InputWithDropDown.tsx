import { ChangeEventHandler, InputHTMLAttributes, useState } from 'react';
import { ERROR_MESSAGE_INPUT_DROPDOWN } from '../../constants/errorMessages';
import { NO_VALID_DROPDOWN_VALUES } from '../../constants/noValidValues';
import DropDown from '../atoms/DropDown';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

interface InputWithDropDownProps<T> {
  options: T[];
  keyOption: keyof T;
  valueOption?: keyof T;
  onUserSelect: (inputValue: string, selectValue: string) => void;
  errorMessage?: string;
  inputOptions?: InputHTMLAttributes<HTMLInputElement>;
}

const InputWithDropDown = <T extends Record<string, string | number>>({
  options,
  keyOption,
  valueOption = keyOption,
  onUserSelect,
  errorMessage,
  inputOptions,
}: InputWithDropDownProps<T>) => {
  const [inputValue, setInputValue] = useState('');
  const [dropDownValue, setDropDownValue] = useState('');
  const [error, setError] = useState('');

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const { name, value } = event.target;
    const newValues = {
      inputValue: name === 'input--filter' ? value : inputValue,
      selectorValue: name === 'selector--filter' ? value : dropDownValue,
    };
    name === 'input--filter' ? setInputValue(value) : setDropDownValue(value);
    if (
      newValues.inputValue === '' ||
      NO_VALID_DROPDOWN_VALUES.includes(newValues.selectorValue)
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
        <div className="absolute inset-y-0 flex items-center">
          <label htmlFor="filterType" className="sr-only">
            filter
          </label>
          <DropDown
            id="selector--filter"
            name="selector--filter"
            value={dropDownValue}
            onChange={handleChange}
            {...{ options, keyOption, valueOption }}
          />
        </div>
        <Input
          {...inputOptions}
          value={inputValue}
          onChange={handleChange}
          name="input--filter"
          className="right-0 pl-44 "
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-red-400">{error}</p>
    </div>
  );
};
export default InputWithDropDown;
