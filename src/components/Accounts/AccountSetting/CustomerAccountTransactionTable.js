import React, { useState } from "react";
let Transactions = [];
let filteredData = [];
const CustomerAccountTransactionTable = (props) => {
  const { showModalTransactionList, UserTransactions } = props.state;
  Transactions = [];
  filteredData = [];
  UserTransactions.map((trans) =>
    Transactions.push({
      id: trans.id,
      creator: trans.user_info.name
        ? trans.user_info.name.split(" ")[0]
        : "None",
      items: trans.items,
      created_at: trans.created_at,
      totalAmount: trans.totalAmount,
      quantity: trans.quantity,
      mode_of_payment: trans.payment_method,
    })
  );
  filteredData = Transactions.filter((item) => {
    return item;
  });
  return (
    <>
      <div class={showModalTransactionList ? "h-screen " : "h-screen hidden"}>
        <div class="mx-auto max-w-screen-lg h-full">
          <div
            className="z-20 absolute top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <div class="modal-overlay absolute w-full h-full z-25 bg-gray-900 opacity-50"></div>
            <div className="h-full overflow-auto w-full flex flex-col">
              <div className="m-2 md:m-12">
                <form class="mt-9">
                  <div className="relative p-4 md:p-8 bg-white dark:border-gray-700 shadow-md rounded border border-gray-400 ">
                    <div className="flex justify-between items-center">
                      <div class="text-left p-0 mb-8">
                        <div>
                          <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                          <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                            ABC Motor Parts
                          </h1>
                        </div>

                        <h1 class="text-gray-800 text-3xl font-medium">
                          Customer Transaction/s List
                        </h1>
                      </div>
                    </div>
                    <table className="min-w-full bg-white p-28">
                      <thead>
                        <tr className="w-full h-16 border-gray-300 border-b py-8 text-left font-bold text-gray-500">
                          <th className="pl-14 pr-6 text-md">ID</th>
                          <th className="  pr-6 text-md w-2/12">
                            {" "}
                            <div>Date</div>
                            {/* <DatePicker
                              selected={this.state.InputDate}
                              onChange={(date) =>
                                this.setState({ InputDate: date })
                              }
                              value={this.state.InputDate}
                              closeOnScroll={true}
                              placeholderText="Select Date"
                              className="my-1 px-1 py-1 border-2 rounded-l"
                            /> */}
                          </th>
                          <th className="pr-4 text-md">
                            <div className="text-center mb-5">Items</div>
                            <div className="flex justify-between  whitespace-no-wrap">
                              <th className="text-sm pr-4 whitespace-no-wrap ">
                                Product Name
                              </th>
                              <th className="text-sm pr-4 whitespace-no-wrap ">
                                Retail Price
                              </th>
                              <th className="text-sm pr-4 whitespace-no-wrap ">
                                Cost Price
                              </th>
                              <th className="text-sm pr-4 whitespace-no-wrap ">
                                QTY
                              </th>
                            </div>
                          </th>
                          <th className="pr-6 text-md">Total Amount</th>
                          <th className="pr-6 text-md">
                            Total Number of Items
                          </th>
                          <th className="pr-6 text-md">Mode of Payment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((transaction) => (
                          <tr
                            key={transaction.id}
                            className="h-24 border-gray-300  border-b"
                          >
                            <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800 ">
                              {transaction.id}
                            </td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 ">
                              {transaction.created_at}
                            </td>
                            <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 w-3/12">
                              {transaction.items.map((transac, index) => (
                                <tr
                                  className={
                                    transaction.items.length === 1
                                      ? "h-20 border-gray-300 flex justify-between"
                                      : index + 1 === transaction.items.length
                                      ? "h-20 border-gray-300 flex justify-between"
                                      : "h-20 border-gray-300 border-b-2 flex justify-between"
                                  }
                                >
                                  <td className="text-sm pr-4 whitespace-no-wrap overflow-ellipsis overflow-hidden text-gray-800 ">
                                    {transac.product.name}
                                    <div>
                                      (
                                      {transac.product_variation_info.variation}
                                      )
                                    </div>
                                  </td>
                                  <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 my-auto">
                                    ₱{transac.product.cost_price}
                                  </td>
                                  <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 my-auto">
                                    ₱{transac.product.price}
                                  </td>

                                  <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 my-auto">
                                    {transac.quantity}
                                  </td>
                                </tr>
                              ))}
                            </td>

                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 ">
                              {transaction.totalAmount}
                            </td>

                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 ">
                              {transaction.quantity}
                            </td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 ">
                              {transaction.mode_of_payment}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div
                      onClick={props.handleModalTransactionListClose}
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerAccountTransactionTable;
