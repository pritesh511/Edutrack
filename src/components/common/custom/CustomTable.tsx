import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { ReactNode } from "react";

interface Props {
  tableTitle?: string;
  tableHeader: ReactNode;
  tableBody: ReactNode;
}

const CustomTable = (props: Props) => {
  const { tableTitle, tableHeader, tableBody } = props;
  return (
    <div className="bg-gray-50 rounded-none">
      {tableTitle && (
        <h3 className="text-2xl font-semibold mb-4">{tableTitle}</h3>
      )}
      <Table className="w-full border-collapse border border-gray-200">
        <TableHeader>
          <TableRow className="hover:bg-primary bg-primary">
            {tableHeader}
          </TableRow>
        </TableHeader>
        <TableBody>{tableBody}</TableBody>
      </Table>
    </div>
  );
};

export default CustomTable;
