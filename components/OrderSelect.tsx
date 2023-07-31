import { orderData } from "@/utils/helper";
import { SelectProps } from "@/utils/interface";

export const OrderSelect = ({ currentData, setCurrentData }: SelectProps) => {
  return (
    <select
      value={currentData.orderIn}
      className="b-2 "
      onChange={(e) => {
        e.preventDefault();
        setCurrentData({
          ...currentData,
          orderIn: e.target.value,
          page: 1,
        });
      }}
      name="ordered"
      id="ordered"
    >
      {orderData.map((data, idx) => (
        <option value={data.value} key={data.id}>
          {data.name}
        </option>
      ))}
    </select>
  );
};
