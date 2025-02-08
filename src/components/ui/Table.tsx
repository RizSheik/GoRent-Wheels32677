const Table = ({ children }: React.PropsWithChildren) => (
  <div className="w-full overflow-auto">
    <table className="w-full text-sm border-collapse">{children}</table>
  </div>
);

export const TableHeader = ({ children }: React.PropsWithChildren) => (
  <thead className="bg-gray-100 text-gray-700">{children}</thead>
);

export const TableBody = ({ children }: React.PropsWithChildren) => (
  <tbody className="divide-y divide-gray-200">{children}</tbody>
);

export const TableRow = ({ children }: React.PropsWithChildren) => (
  <tr className="border-b transition-colors hover:bg-gray-50">{children}</tr>
);

export const TableHead = ({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) => (
  <th
    className={`h-12 px-4 text-left font-medium text-gray-600 ${className}`}
  >
    {children}
  </th>
);

export const TableCell = ({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) => (
  <td className={`p-4 align-middle ${className}`}>{children}</td>
);

export default Table;