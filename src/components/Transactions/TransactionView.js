import React, { useState } from "react";
import { connect } from "react-redux";
const TransactionView = (props) => {
  const { handleShowTransactionViewModal } = props;
  const { showTransactionViewModal, TransactionToShow } = props.state;
  console.log(TransactionToShow);
  return (
    <>
      <div class={showTransactionViewModal ? "h-screen " : "h-screen hidden"}>
        <div class="mx-auto max-w-screen-lg h-full">
          <div
            className="z-20 absolute top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <div class="modal-overlay absolute w-full h-full z-25 bg-gray-900 opacity-50"></div>
            <div className="h-full overflow-auto w-full flex flex-col">
              <div className="m-2 md:m-12">
                <div className="relative p-4 md:p-8 bg-white shadow-md rounded border border-gray-400 ">
                  <div class="text-left p-0 mb-8">
                    <div>
                      <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                      <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                        ABC Motor Parts
                      </h1>
                    </div>

                    <h1 class="text-gray-800 text-3xl font-medium">
                      View Transaction
                    </h1>
                  </div>
                  {TransactionToShow
                    ? TransactionToShow.map((transaction) => (
                        <div className="flex md:flex-row flex-col justify-around">
                          <div className="md:w-2/5 w-full">
                            <div className="text-2xl text-white font-bold p-4 bg-gray-400 text-center">
                              Transaction details
                            </div>
                            <div className="text-lg text-gray-500 font-bold p-6 space-y-4">
                              <div>
                                ID :{" "}
                                <span className="text-black">
                                  {" "}
                                  {transaction.id}
                                </span>
                              </div>

                              <div>
                                User :{" "}
                                <span className="text-black">
                                  {" "}
                                  {transaction.creator}
                                </span>
                              </div>
                              <div>
                                Date :{" "}
                                <span className="text-black">
                                  {" "}
                                  {transaction.created_at}
                                </span>
                              </div>
                              <div>
                                Total Amount :{" "}
                                <span className="text-black">
                                  {" "}
                                  {transaction.totalAmount}
                                </span>
                              </div>
                              <div>
                                Total Profit :{" "}
                                <span className="text-black">
                                  {" "}
                                  {transaction.totalProfit}
                                </span>
                              </div>
                              <div>
                                Total number of items :{" "}
                                <span className="text-black">
                                  {" "}
                                  {transaction.quantity}
                                </span>
                              </div>
                              <div>
                                Status Order :{" "}
                                <span className="text-black">
                                  {" "}
                                  {transaction.order_status}
                                </span>
                              </div>
                              <div>
                                Mode of payment :{" "}
                                <span className="text-black">
                                  {" "}
                                  {transaction.mode_of_payment}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="md:w-2/5 w-full">
                            <div className="text-2xl text-white font-bold p-4 bg-gray-400 text-center">
                              Item/s Details
                            </div>
                            <div className="w-full flex overflow-x-auto">
                              {transaction.items
                                ? transaction.items.map((item) => (
                                    <div className="flex justify-around p-10 whitespace-nowrap">
                                      <div className="text-sm text-gray-500 font-bold p-6 space-y-4">
                                        <div>
                                          ID :{" "}
                                          <span className="text-black font-medium">
                                            {" "}
                                            {item.product.id}
                                          </span>
                                        </div>
                                        <div>
                                          SKU :{" "}
                                          <span className="text-black font-medium">
                                            {" "}
                                            {item.product.SKU}
                                          </span>
                                        </div>
                                        <div>
                                          Product name :{" "}
                                          <span className="text-black font-medium">
                                            {" "}
                                            {item.product.name}
                                          </span>
                                        </div>
                                        <div>
                                          Variant:{" "}
                                          <span className="text-black font-medium">
                                            {" "}
                                            {
                                              item.product_variation_info
                                                .variation
                                            }
                                          </span>
                                        </div>
                                        <div>
                                          Category :{" "}
                                          <span className="text-black font-medium">
                                            {" "}
                                            {item.product.category_info.name}
                                          </span>
                                        </div>
                                        <div>
                                          Retail price :{" "}
                                          <span className="text-black font-medium">
                                            {" "}
                                            {item.product.price}
                                          </span>
                                        </div>
                                        <div>
                                          Cost price :{" "}
                                          <span className="text-black font-medium">
                                            {" "}
                                            {item.product.cost_price}
                                          </span>
                                        </div>
                                        <div>
                                          Profit :{" "}
                                          <span className="text-black font-medium">
                                            {" "}
                                            {item.product.price -
                                              item.product.cost_price}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                : ""}
                            </div>
                          </div>
                        </div>
                      ))
                    : ""}
                  <div
                    onClick={handleShowTransactionViewModal}
                    className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:text-gray-400 transition duration-150 ease-in-out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Close"
                      className="icon icon-tabler icon-tabler-x"
                      width={35}
                      height={35}
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={18} y1={6} x2={6} y2={18} />
                      <line x1={6} y1={6} x2={18} y2={18} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {})(TransactionView);
