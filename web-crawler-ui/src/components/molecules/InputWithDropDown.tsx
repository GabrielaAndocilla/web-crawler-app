import { ChangeEventHandler, useState } from 'react';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import SelectorInput from '../atoms/Selector';

const InputWithDropDown = <T extends Record<string, string | number>>({
  options,
  keyOption,
  valueOption = keyOption,
  onUserSelect,
}: {
  options: T[];
  keyOption: keyof T;
  valueOption?: keyof T;
  onUserSelect: (inputValue: string, selectValue: string) => void;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectorValue, setSelectorValue] = useState('');
  const [error, setError] = useState('');

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const { name, value } = event.target;
    console.log('aaaa', name, value);
    const newValues = {
      inputValue: name === 'input--filter' ? value : inputValue,
      selectorValue: name === 'selector--filter' ? value : selectorValue,
    };
    name === 'input--filter' ? setInputValue(value) : setSelectorValue(value);
    if (
      newValues.inputValue === '' ||
      ['None', ''].includes(newValues.selectorValue)
    ) {
      setError('If you want to filter select both if not it will show all');
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
          value={inputValue}
          onChange={handleChange}
          type="number"
          name="input--filter"
          placeholder="Number of words, ex: 5"
          className="right-0 pl-32"
        />
      </div>
      <p>{error}</p>
    </div>
  );
};
export default InputWithDropDown;
