import { orderByData } from "@/utils/helper";
import { SelectProps } from "@/utils/interface";

export const OrderBySelect = ({ currentData, setCurrentData }: SelectProps) => {
  return (
    <select
      value={currentData.order}
      className="b-2 "
      onChange={(e) => {
        e.preventDefault();
        setCurrentData({
          ...currentData,
          order: e.target.value,
          page: 1,
        });
      }}
      name="message"
      id="message"
    >
      {orderByData.map((data, idx) => (
        <option value={data.value} key={data.id}>
          {data.name}
        </option>
      ))}
    </select>
  );
};
