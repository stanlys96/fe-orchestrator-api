import { TransactionSelect } from "@/components";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";

export default function PostPage() {
  const router = useRouter();
  const url = "https://v2.jokeapi.dev/joke/Any";
  const [currentData, setCurrentData] = useState({
    request: "",
    loading: false,
    response: "",
    category: "",
  });
  return (
    <div className="bg-white min-h-[100vh] flex justify-center">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <div className="p-3">
          <button
            onClick={() => {
              router.push("/");
            }}
            className="bg-lightGray p-2 rounded-xl text-white mx-auto"
          >
            Go To Get Page
          </button>
        </div>
        <div>
          <TransactionSelect
            currentData={currentData}
            setCurrentData={setCurrentData}
            className="border b-1 p-1"
            category="post"
          />
        </div>
        <div className="p-3">
          <div className="max-w-[100vw] flex gap-x-5 items-start">
            <div className="w-[400px] h-full flex flex-col items-center w-[400px]">
              <div className="flex justify-between w-full mb-4">
                <p className="text-center">Request:</p>
                <a
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(currentData.request, null, 2)
                    );
                  }}
                  className="cursor-pointer underline"
                >
                  Copy to clipboard
                </a>
              </div>
              <textarea
                onChange={(e) => {
                  e.preventDefault();
                  setCurrentData({ ...currentData, request: e.target.value });
                }}
                value={currentData.request}
                className="w-full border b-1 w-[400px] h-[400px]"
              />
              {currentData.loading ? (
                <ColorRing
                  height="40"
                  width="40"
                  ariaLabel="loading"
                  wrapperClass="mt-4"
                />
              ) : (
                <button
                  onClick={async () => {
                    try {
                      setCurrentData({ ...currentData, loading: true });
                      const result = await axios.get(url);
                      setCurrentData({
                        ...currentData,
                        response: result.data,
                        loading: false,
                      });
                    } catch (e) {
                      console.log(e);
                      setCurrentData({
                        ...currentData,
                        loading: false,
                      });
                    }
                  }}
                  className="bg-lightGray p-2 rounded-xl text-white mt-4"
                >
                  Hit API
                </button>
              )}
            </div>
            <div className="w-[400px]">
              <div className="flex justify-between w-full mb-4">
                <p className="text-center">Response:</p>
                <a
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(currentData.response, null, 2)
                    );
                  }}
                  className="cursor-pointer underline"
                >
                  Copy to clipboard
                </a>
              </div>
              <div className="w-full border b-1 w-[400px] h-[400px] overflow-scroll">
                <pre>{JSON.stringify(currentData.response, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
