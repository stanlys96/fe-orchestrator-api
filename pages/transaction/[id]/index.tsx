import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import ReactJson from "react-json-view";

const getJsonIndented = (obj: any) =>
  JSON.stringify(obj, null, 4).replace(/["{[,\}\]]/g, "");

const axiosCustom = axios.create({ baseURL: "http://localhost:3000" });

const fetcher = (url: string) => axiosCustom.get(url).then((res) => res);

export default function TransactionDetail() {
  const router = useRouter();
  const routingData = router.asPath.split("/");
  const { data, error, isLoading } = useSWR(
    `/${routingData[1]}/${routingData[2]}`,
    fetcher
  );
  const transactionData = data?.data.data;
  const json = {
    name: "John Doe",
    age: 32,
    email: "johndoe@example.com",
  };
  return (
    <div className="min-h-[100vh] bg-white">
      {transactionData && (
        <div className="grid grid-cols-2 w-full">
          <div className="h-full w-full flex flex-col justify-center items-center">
            <p>ID: {transactionData.id}</p>
            <p>Transaction Meta: {transactionData.transactionmeta}</p>
            <p>
              Request Time:{" "}
              {new Date(transactionData.requesttime ?? "").toLocaleString(
                "id-ID"
              ) === "Invalid Date"
                ? "No Date"
                : new Date(transactionData.requesttime ?? "").toLocaleString(
                    "id-ID"
                  )}
            </p>
          </div>
          <div>
            <div className="flex justify-center gap-x-4">
              <p className="text-center">Request JSON:</p>
              <a
                onClick={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify(
                      JSON.parse(transactionData.requestjson),
                      null,
                      2
                    )
                  );
                }}
                className="cursor-pointer"
              >
                Copy to clipboard
              </a>
            </div>
            <div className="max-w-[100vw] max-h-[90vh] overflow-scroll">
              <pre>
                {JSON.stringify(
                  JSON.parse(transactionData.requestjson),
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
