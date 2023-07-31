"use client";
import React, { useState } from "react";
import useSWR from "swr";
import "../app/globals.css";
import { fetcher } from "@/utils/api";
import {
  MessageSelect,
  OrderBySelect,
  OrderSelect,
  SubmitOrderTable,
  TableMeta,
  TransactionDetailSelect,
  TransactionSelect,
  TransactionStatusSelect,
} from "@/components";

export default function HomePage() {
  const [currentData, setCurrentData] = useState({
    status: "",
    processName: "",
    message: "",
    order: "id",
    orderIn: "ASC",
    page: 1,
    category: "transaction",
    id: "",
    pageText: "",
  });
  const { data, error, isLoading } = useSWR(
    `/${currentData.category}?${
      currentData.category === "transaction"
        ? `page=${currentData.page}&status=${currentData.status}&id=${currentData.id}`
        : currentData.category === "transaction-detail"
        ? `order=${currentData.orderIn}&page=${currentData.page}&processName=${currentData.processName}&message=${currentData.message}&orderBy=${currentData.order}&id=${currentData.id}`
        : `page=${currentData.page}&id=${currentData.id}`
    }`,
    fetcher
  );
  const transactionData = data?.data.data.data;
  const transactionMeta = data?.data.data.meta;
  return (
    <div className="bg-white min-h-[100vh] flex justify-center">
      <div className="max-w-[1200px] mx-auto">
        <div className="py-3">
          <p className="text-center">Submit Order Table</p>
        </div>
        <div className="flex gap-x-4 items-center pb-5">
          <label>Search by ID</label>
          <input
            onChange={(e) => {
              e.preventDefault();
              setCurrentData({ ...currentData, id: e.target.value, page: 1 });
            }}
            className="border b-5 p-1 bg-black-40"
            type="text"
          />
        </div>
        <div>
          <div className="flex justify-between pb-[25px] items-end">
            <TransactionSelect
              currentData={currentData}
              setCurrentData={setCurrentData}
            />
            {currentData.category === "transaction" ? (
              <TransactionStatusSelect
                currentData={currentData}
                setCurrentData={setCurrentData}
              />
            ) : currentData.category === "transaction-detail" ? (
              <div>
                <div className="flex gap-x-4 items-end">
                  <TransactionDetailSelect
                    currentData={currentData}
                    setCurrentData={setCurrentData}
                  />
                  <MessageSelect
                    currentData={currentData}
                    setCurrentData={setCurrentData}
                  />
                  <div className="flex flex-col">
                    <p>Order by:</p>
                    <OrderBySelect
                      currentData={currentData}
                      setCurrentData={setCurrentData}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p>ASC/DESC:</p>
                    <OrderSelect
                      currentData={currentData}
                      setCurrentData={setCurrentData}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <SubmitOrderTable
            currentData={currentData}
            transactionData={transactionData}
          />
          {transactionMeta && (
            <TableMeta
              transactionMeta={transactionMeta}
              currentData={currentData}
              setCurrentData={setCurrentData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
