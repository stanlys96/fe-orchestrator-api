import { fetcher } from "@/utils/api";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ApiTestCategory() {
  const router = useRouter();
  const routingData = router.asPath.split("/");
  const { data, error, isLoading } = useSWR(
    `/${routingData[1]}/${routingData[2]}/${routingData[3]}`,
    fetcher
  );
  const transactionData = data?.data.data;
  return (
    <div className="min-h-[100vh] bg-white">
      {transactionData && (
        <div className="grid grid-cols-2 w-full">
          <div className="w-full h-full flex flex-col justify-center items-center gap-y-4">
            <p>ID: {transactionData.id}</p>
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
            <div className="flex justify-center items-center gap-x-4">
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
            <div className="max-w-[100vw] max-h-[45vh] overflow-scroll">
              <pre>
                {JSON.stringify(
                  JSON.parse(transactionData.requestjson),
                  null,
                  2
                )}
              </pre>
            </div>
            <div className="flex justify-center gap-x-4">
              <p className="text-center">Response JSON:</p>
              <a
                onClick={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify(
                      JSON.parse(transactionData.responsejson),
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
            <div className="max-w-[100vw] max-h-[45vh] overflow-scroll">
              <pre>
                {JSON.stringify(
                  JSON.parse(transactionData.responsejson),
                  null,
                  2
                ).replaceAll("/", "")}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
