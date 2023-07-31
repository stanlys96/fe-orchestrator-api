import { messageData } from "@/utils/helper";
import { SelectProps } from "@/utils/interface";

export const MessageSelect = ({ currentData, setCurrentData }: SelectProps) => {
  return (
    <select
      value={currentData.message}
      className="b-2 "
      onChange={(e) => {
        e.preventDefault();
        setCurrentData({
          ...currentData,
          message: e.target.value,
          page: 1,
        });
      }}
      name="message"
      id="message"
    >
      {messageData.map((data, idx) => (
        <option value={data.value} key={data.id}>
          {data.name}
        </option>
      ))}
    </select>
  );
};
