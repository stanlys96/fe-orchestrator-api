import { transactionsSelectData } from "@/utils/helper";
import { SelectProps } from "@/utils/interface";

export const TransactionSelect = ({ setCurrentData }: SelectProps) => {
  return (
    <select
      className="b-2 "
      onChange={(e) => {
        e.preventDefault();
        setCurrentData({
          status: "",
          processName: "",
          message: "",
          order: "id",
          orderIn: "ASC",
          page: 1,
          category: e.target.value,
          id: "",
          pageText: "",
        });
      }}
      name="table"
      id="table"
    >
      {transactionsSelectData.map((data, idx) => (
        <option key={data.id} value={data.value}>
          {data.name}
        </option>
      ))}
    </select>
  );
};
