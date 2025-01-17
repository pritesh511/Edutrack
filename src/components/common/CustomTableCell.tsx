import { TableCell } from "@/components/ui/table";
import { ReactNode } from "react";

interface Props {
  cellName: string | number | null | undefined | ReactNode;
  width?: string;
  colSpan?: number;
  className?: string;
}

const CustomTableCell = (props: Props) => {
  const { cellName, width, colSpan, className } = props;
  return (
    <TableCell
      colSpan={colSpan ? colSpan : 0}
      width={width ? width : ""}
      className={`p-4 text-gray-700 font-medium ${className}`}
    >
      {cellName ? cellName : "---"}
    </TableCell>
  );
};

export default CustomTableCell;
