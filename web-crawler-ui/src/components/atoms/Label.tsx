const Label = ({ text, idFor }: { text: string; idFor: string }) => {
  return (
    <label
      htmlFor={idFor}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {text}
    </label>
  );
};

export default Label
