export const TransactionTHead = () => {
  return (
    <tr>
      <th className="px-2 border border-slate-300 bg-lightGray">ID</th>
      <th className="px-2 border border-slate-300 bg-lightGray">Status</th>
      <th className="px-2 border border-slate-300 bg-lightGray">
        Request JSON
      </th>
      <th className="px-2 border border-slate-300 bg-lightGray">
        Request Time
      </th>
      <th className="px-2 border border-slate-300 bg-lightGray">
        Transaction Meta
      </th>
    </tr>
  );
};
