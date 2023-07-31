import { transactionStatusData } from "@/utils/helper";
import { SelectProps } from "@/utils/interface";

export const TransactionStatusSelect = ({
  currentData,
  setCurrentData,
}: SelectProps) => {
  return (
    <select
      value={currentData.status}
      className="b-2 "
      onChange={(e) => {
        e.preventDefault();
        setCurrentData({
          ...currentData,
          status: e.target.value,
          page: 1,
        });
      }}
      name="status"
      id="status"
    >
      {transactionStatusData.map((data, idx) => (
        <option key={data.id} value={data.value}>
          {data.name}
        </option>
      ))}
    </select>
  );
};
