import { transactionDetailSelectData } from "@/utils/helper";
import { SelectProps } from "@/utils/interface";

export const TransactionDetailSelect = ({
  currentData,
  setCurrentData,
}: SelectProps) => {
  return (
    <select
      value={currentData.processName}
      className="b-2 "
      onChange={(e) => {
        e.preventDefault();
        setCurrentData({
          ...currentData,
          processName: e.target.value,
          page: 1,
        });
      }}
      name="processName"
      id="processName"
    >
      {transactionDetailSelectData.map((data, idx) => (
        <option key={data.id} value={data.value}>
          {data.name}
        </option>
      ))}
    </select>
  );
};
