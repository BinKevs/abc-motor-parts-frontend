import React, { useState } from "react";

const VoucherModal = (props) => {
  const { onChange, handleVoucherApply, handleModalVoucher } = props;
  const { showModalVoucher } = props.state;
  return (
    <>
      <div class={showModalVoucher ? "h-screen " : "h-screen hidden"}>
        <div class="mx-auto max-w-screen-lg h-full">
          <div
            className="z-20 absolute top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <div class="modal-overlay absolute w-full h-full z-25 bg-gray-900 opacity-50"></div>
            <div className="h-full overflow-auto w-full flex flex-col">
              <div className="m-2 md:m-12">
                <form class="mt-9">
                  <div className="relative p-4 md:p-8 bg-white shadow-md rounded border border-gray-400 ">
                    <div class="text-left p-0 mb-8">
                      <div>
                        <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                        <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                          ABC Motor Parts
                        </h1>
                      </div>

                      <h1 class="text-gray-800 text-3xl font-medium">
                        Gift Vouchers
                      </h1>
                    </div>
                    <div className="py-3">
                      <div className="flex justify-center">
                        <div class="flex flex-wrap mb-5">
                          <h2 class="px-4 pt-3 pb-2 text-gray-800 text-xl">
                            Gift Voucher Code
                          </h2>
                          <div class="w-full">
                            <input
                              class="rounded border-2 border-gray-600 w-full py-4 px-6 placeholder-gray-700 focus:outline-none"
                              name="voucher_code"
                              onChange={onChange}
                              placeholder="Type Your Voucher Code"
                              required
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center ">
                        <button
                          onClick={handleVoucherApply}
                          class="bg-teal_custom hover:bg-gray-700 text-white font-bold p-2 rounded text-md w-2/5"
                        >
                          <span>Apply</span>
                        </button>
                      </div>
                    </div>

                    <div
                      onClick={handleModalVoucher}
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

export default VoucherModal;
