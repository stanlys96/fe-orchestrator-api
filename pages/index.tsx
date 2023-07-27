"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/router";
import "../app/globals.css";

const axiosCustom = axios.create({ baseURL: "http://localhost:3000" });

const fetcher = (url: string) => axiosCustom.get(url).then((res) => res);

export default function HomePage() {
  const router = useRouter();
  const [currentData, setCurrentData] = useState({
    status: "",
    processName: "",
    message: "",
    order: "id",
    orderIn: "ASC",
    page: 1,
    category: "transaction",
    id: "",
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
  console.log(transactionData, "???");
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
            <select
              className="b-2 "
              onChange={(e) => {
                e.preventDefault();
                setCurrentData({
                  status: "",
                  processName: "",
                  message: "",
                  order: "id",
                  orderIn: "ASC",
                  page: 1,
                  category: e.target.value,
                  id: "",
                });
              }}
              name="table"
              id="table"
            >
              <option value="transaction">Transaction</option>
              <option value="transaction-detail">Transaction Detail</option>
              <option value="api-test/validation">Validation Test</option>
              <option value="api-test/customer">Customer Test</option>
              <option value="api-test/ereceipt">E-Receipt Test</option>
              <option value="api-test/order-accessories">
                Order Accessories Test
              </option>
              <option value="api-test/order-coupon">Order Coupon Test</option>
              <option value="api-test/order-fu">Order FU Test</option>
              <option value="api-test/purchase-order">
                Purchase Order Test
              </option>
              <option value="api-test/service-order-package">
                Service Order Package Test
              </option>
            </select>
            {currentData.category === "transaction" ? (
              <select
                value={currentData.status}
                className="b-2 "
                onChange={(e) => {
                  e.preventDefault();
                  setCurrentData({
                    ...currentData,
                    status: e.target.value,
                    page: 1,
                  });
                }}
                name="status"
                id="status"
              >
                <option value="">All</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                <option value="waiting">Waiting</option>
              </select>
            ) : currentData.category === "transaction-detail" ? (
              <div>
                <div className="flex gap-x-4 items-end">
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
                    <option value="">All</option>
                    <option value="checkCostumerQueue">
                      Check Customer Queue
                    </option>
                    <option value="ereceiptQueue">EReceipt Queue</option>
                    <option value="orderAccessoriesQueue">
                      Order Accessories Queue
                    </option>
                    <option value="orderCouponQueue">Order Coupon Queue</option>
                    <option value="orderResultQueueName">
                      Order Result Queue Name
                    </option>
                    <option value="orderServicePackageQueue">
                      Order Service Package Queue
                    </option>
                    <option value="purchaseOrderQueue">
                      Purchase Order Queue
                    </option>
                    <option value="submitOrderAfterSalesQueue">
                      Submit Order After Sales Queue
                    </option>
                    <option value="submitOrderFUQueue">
                      Submit Order FU Queue
                    </option>
                  </select>
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
                    <option value="">All</option>
                    <option value="completed">Completed</option>
                    <option value="active">Active</option>
                    <option value="waiting">Waiting</option>
                    <option value="completely-failed">Completely Failed</option>
                    <option value="failing">Failing</option>
                  </select>
                  <div className="flex flex-col">
                    <p>Order by:</p>
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
                      <option value="id">ID</option>
                      <option value="process_name">Process Name</option>
                      <option value="message">Message</option>
                      <option value="requesttime">Request Time</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <p>ASC/DESC:</p>
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
                      <option value="ASC">ASC</option>
                      <option value="DESC">DESC</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <table className="table-fixed border-collapse border border-slate-400">
            <thead>
              {currentData.category === "transaction" ? (
                <tr>
                  <th className="px-2 border border-slate-300 bg-lightGray">
                    ID
                  </th>
                  <th className="px-2 border border-slate-300 bg-lightGray">
                    Status
                  </th>
                  <th className="px-2 border border-slate-300 bg-lightGray">
                    Request JSON
                  </th>
                  <th className="px-2 border border-slate-300 bg-lightGray">
                    Request Time
                  </th>
                  <th className="px-2 border border-slate-300 bg-lightGray">
                    Transaction Meta
                  </th>
                </tr>
              ) : currentData.category === "transaction-detail" ? (
                <tr>
                  <th className="px-2 border border-slate-300 bg-lightGray">
                    ID
                  </th>
                  <th className="px-2 border border-slate-300 bg-lightGray">
                    Process Name
                  </th>
                  <th className="px-2 border border-slate-300 bg-lightGray">
                    Request JSON
                  </th>
                  <th className="px-2 border border-slate-300 bg-lightGray">
                    Response JSON
                  </th>
                  <th className="px-2 border border-slate-300 bg-lightGray">
                    Request Time
                  </th>
                  <th className="px-2 border border-slate-300 bg-lightGray">
                    Message
                  </th>
                </tr>
              ) : (
                <tr>
                  <th className="px-2 border border-slate-300 bg-lightGray">
                    ID
                  </th>
                  <th className="px-2 border border-slate-300 bg-lightGray">
                    Request JSON
                  </th>
                  <th className="px-2 border border-slate-300 bg-lightGray">
                    Response JSON
                  </th>
                  <th className="px-2 border border-slate-300 bg-lightGray">
                    Request Time
                  </th>
                </tr>
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
                      <td className="p-3 border border-slate-300">
                        {result.id}
                      </td>
                      <td className="p-3 border border-slate-300">
                        {result.status}
                      </td>
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
                      <td className="p-3 border border-slate-300">
                        {result.id}
                      </td>
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
                      <td className="p-3 border border-slate-300">
                        {result.id}
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
                    </a>
                  )
                )}
            </tbody>
          </table>
          {transactionMeta && (
            <div className="pb-8 pt-5">
              <p>Total item: {transactionMeta.itemCount}</p>
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
          )}
        </div>
      </div>
    </div>
  );
}
