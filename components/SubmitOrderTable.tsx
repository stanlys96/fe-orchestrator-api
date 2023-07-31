import { CommonTHead } from "./CommonTHead";
import { TranasctionDetailTHead } from "./TransactionDetailTHead";
import { TransactionTHead } from "./TransactionTHead";

interface Props {
  currentData: any;
  transactionData: any;
}

export const SubmitOrderTable = ({ currentData, transactionData }: Props) => {
  return (
    <table className="table-fixed border-collapse border border-slate-400">
      <thead>
        {currentData.category === "transaction" ? (
          <TransactionTHead />
        ) : currentData.category === "transaction-detail" ? (
          <TranasctionDetailTHead />
        ) : (
          <CommonTHead />
        )}
      </thead>
      <tbody>
        {transactionData &&
          transactionData.map((result: any, idx: any) =>
            currentData.category === "transaction" ? (
              <a
                style={{ display: "table-row" }}
                href={`${currentData.category}/${result.id}`}
                target="_blank"
                rel="noreferrer"
                className="text-center cursor-pointer"
                key={idx}
              >
                <td className="p-3 border border-slate-300">{result.id}</td>
                <td className="p-3 border border-slate-300">{result.status}</td>
                <td className="p-3 border border-slate-300">
                  {result?.requestjson?.slice(0, 10) ?? ""}
                </td>
                <td className="p-3 border border-slate-300">
                  {new Date(result.requesttime ?? "").toLocaleString(
                    "id-ID"
                  ) === "Invalid Date"
                    ? "No Date"
                    : new Date(result.requesttime ?? "").toLocaleString(
                        "id-ID"
                      )}
                </td>
                <td className="p-3 border border-slate-300">
                  {result.transactionmeta}
                </td>
              </a>
            ) : currentData.category === "transaction-detail" ? (
              <a
                style={{ display: "table-row" }}
                href={`${currentData.category}/${result.id}`}
                target="_blank"
                rel="noreferrer"
                className="text-center cursor-pointer"
                key={idx}
              >
                <td className="p-3 border border-slate-300">{result.id}</td>
                <td className="p-3 border border-slate-300">
                  {result.process_name}
                </td>
                <td className="p-3 border border-slate-300">
                  {result?.requestjson?.slice(0, 10) ?? ""}
                </td>
                <td className="p-3 border border-slate-300">
                  {result?.responsejson?.slice(0, 10) ?? ""}
                </td>
                <td className="p-3 border border-slate-300">
                  {new Date(result.requesttime ?? "").toLocaleString(
                    "id-ID"
                  ) === "Invalid Date"
                    ? "No Date"
                    : new Date(result.requesttime ?? "").toLocaleString(
                        "id-ID"
                      )}
                </td>
                <td className="p-3 border border-slate-300">
                  {result.message}
                </td>
              </a>
            ) : (
              <a
                style={{ display: "table-row" }}
                href={`${currentData.category}/${result.id}`}
                target="_blank"
                rel="noreferrer"
                className="text-center cursor-pointer"
                key={idx}
              >
                <td className="p-3 border border-slate-300">{result.id}</td>
                <td className="p-3 border border-slate-300">
                  {result?.requestjson?.slice(0, 10) ?? ""}
                </td>
                <td className="p-3 border border-slate-300">
                  {result?.responsejson?.slice(0, 10) ?? ""}
                </td>
                <td className="p-3 border border-slate-300">
                  {new Date(result.requesttime ?? "").toLocaleString(
                    "id-ID"
                  ) === "Invalid Date"
                    ? "No Date"
                    : new Date(result.requesttime ?? "").toLocaleString(
                        "id-ID"
                      )}
                </td>
              </a>
            )
          )}
      </tbody>
    </table>
  );
};
