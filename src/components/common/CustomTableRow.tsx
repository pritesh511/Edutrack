import { TableRow } from "@/components/ui/table";

const CustomTableRow = ({ children }: any) => {
  return <TableRow className="hover:bg-gray-50">{children}</TableRow>;
};

export default CustomTableRow;
