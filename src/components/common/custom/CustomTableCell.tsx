import { TableCell } from "@/components/ui/table";
import { ReactNode } from "react";

interface Props {
  cellName: string | number | null | undefined | ReactNode;
  width?: string;
  colSpan?: number;
  className?: string;
  size?: "sm";
}

const CustomTableCell = (props: Props) => {
  const { cellName, width, colSpan, className, size } = props;
  const isSizeSmall = size === "sm";
  return (
    <TableCell
      colSpan={colSpan ? colSpan : 0}
      width={width ? width : ""}
      className={`${
        isSizeSmall ? "p-3" : "p-4"
      } text-gray-700 font-medium ${className}`}
    >
      {cellName ? cellName : "---"}
    </TableCell>
  );
};

export default CustomTableCell;
