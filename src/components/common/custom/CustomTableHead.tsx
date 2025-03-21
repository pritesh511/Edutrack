import { TableHead } from "@/components/ui/table";

interface Props {
  headeName: string;
  size?: "sm";
}

const CustomTableHead = (props: Props) => {
  const { headeName, size } = props;
  const isSizeSmall = size === "sm";
  return (
    <TableHead
      className={`${
        isSizeSmall ? "p-3" : "p-4"
      } text-left text-sm font-semibold text-white`}
    >
      {headeName}
    </TableHead>
  );
};

export default CustomTableHead;
