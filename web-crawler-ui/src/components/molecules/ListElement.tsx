const ListElement = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <li className="justify-between gap-x-6 py-5 text-gray-900 ">
      <p className="text-sm font-semibold leading-6 w-3/4">{title}</p>
      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
        {subtitle}
      </p>
    </li>
  );
};

export default ListElement;
