import { TableHead } from "@/components/ui/table";

interface Props {
  headeName: string;
}

const CustomTableHead = (props: Props) => {
  const { headeName } = props;
  return (
    <TableHead className="p-4 text-left text-sm font-semibold text-white">
      {headeName}
    </TableHead>
  );
};

export default CustomTableHead;
