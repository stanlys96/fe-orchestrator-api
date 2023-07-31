interface Props {
  transactionMeta: any;
  currentData: any;
  setCurrentData: (param1: any) => void;
}

export const TableMeta = ({
  transactionMeta,
  currentData,
  setCurrentData,
}: Props) => {
  return (
    <div className="pb-8 pt-5">
      <p>Total item: {transactionMeta.itemCount}</p>
      <div className="flex gap-x-4 items-center justify-between py-3">
        <a
          onClick={() => {
            if (transactionMeta.page === 1) return;
            setCurrentData({ ...currentData, pageText: "", page: 1 });
          }}
          className="bg-lightGray p-1 text-white cursor-pointer"
        >
          First Page
        </a>
        <div className="flex gap-x-4 items-center">
          <label>Go to page:</label>
          <input
            value={currentData.pageText}
            onChange={(e) => {
              setCurrentData({
                ...currentData,
                pageText: e.target.value,
              });
            }}
            className="border b-5 p-1 bg-black-40"
            type="number"
          />
          <a
            onClick={() => {
              if (currentData.pageText === "" || currentData.pageText === "0")
                return;
              if (parseInt(currentData.pageText) === transactionMeta.page)
                return;
              if (parseInt(currentData.pageText) > transactionMeta.pageCount)
                return;
              if (parseInt(currentData.pageText) < 1) return;
              try {
                setCurrentData({
                  ...currentData,
                  page: parseInt(currentData.pageText),
                  pageText: "",
                });
              } catch (e) {
                console.log(e);
              }
            }}
            className="bg-lightGray p-1 text-white cursor-pointer"
          >
            Go
          </a>
        </div>
        <a
          onClick={() => {
            if (transactionMeta.page === transactionMeta.pageCount) return;
            setCurrentData({
              ...currentData,
              pageText: "",
              page: transactionMeta.pageCount,
            });
          }}
          className="bg-lightGray p-1 text-white cursor-pointer"
        >
          Last Page
        </a>
      </div>
      <div className="flex justify-between">
        <p className="py-3">Current page: {transactionMeta.page}</p>
        <p className="py-3">Total page: {transactionMeta.pageCount}</p>
      </div>
      <div className="flex justify-center items-center gap-x-5">
        <a
          className={`${
            currentData.page !== 1 ? "cursor-pointer" : "text-superGray"
          }`}
          onClick={() => {
            if (currentData.page <= 1) return;
            setCurrentData({
              ...currentData,
              page: currentData.page - 1,
            });
          }}
        >
          Sebelumnya
        </a>
        <a
          className={`${
            currentData.page < transactionMeta.pageCount
              ? "cursor-pointer"
              : "text-superGray"
          }`}
          onClick={() => {
            if (currentData.page >= transactionMeta.pageCount) return;
            setCurrentData({
              ...currentData,
              page: currentData.page + 1,
            });
          }}
        >
          Berikutnya
        </a>
      </div>
    </div>
  );
};
