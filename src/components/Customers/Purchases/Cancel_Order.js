import React, { useState } from "react";
import noImageAvailable from "../../../no-image-available.png";

import ReactPlayer from "react-player";
import { connect } from "react-redux";
const CancelModal = (props) => {
  const { handleToggleModalCancelClose, onChange, handleSubmitCancel } = props;
  const { showModalCancel, cancel_transaction, CancelDescription } =
    props.state;
  console.log(cancel_transaction);
  return (
    <>
      <div class={showModalCancel ? "h-screen " : "h-screen hidden"}>
        <div class="mx-auto max-w-screen-lg h-full">
          <div
            className="z-20 absolute top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <div class="modal-overlay absolute w-full h-full z-25 bg-gray-900 opacity-50"></div>
            <div className="h-full overflow-auto w-full flex flex-col">
              <div className="m-2 md:m-12">
                <form
                  onSubmit={handleSubmitCancel(
                    cancel_transaction ? cancel_transaction.id : ""
                  )}
                  class="mt-9"
                >
                  <div className="relative p-4 md:p-8 bg-white shadow-md rounded border border-gray-400 ">
                    <div class="text-left p-0 mb-8">
                      <div>
                        <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                        <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                          ABC Motor Parts
                        </h1>
                      </div>

                      <h1 class="text-gray-800 text-3xl font-medium">
                        Cancellation of order
                      </h1>
                    </div>
                    <div className="w-full overflow-x-auto">
                      <div className="space-y-6 mx-4">
                        <div className="mx-auto bg-white p-4">
                          <div className="flex justify-between">
                            <div class="text-gray-800 text-xl font-medium pb-4">
                              Date Created :{" "}
                              {cancel_transaction
                                ? cancel_transaction.created_at
                                : ""}
                            </div>
                          </div>

                          <div className="bg-white border-t-2 border-b-2">
                            {cancel_transaction
                              ? cancel_transaction.items.map((item) => (
                                  <>
                                    <div className="p-2 flex flex-col md:flex-row justify-center">
                                      <div className="md:w-1/3 w-full">
                                        <img
                                          className=" border-gray-400 border-2 my-auto mx-auto md:mx-0 max-h-56 object-cover object-center rounded-3xl"
                                          src={
                                            item.product.file_content[0].image
                                              ? item.product.file_content[0]
                                                  .image
                                              : noImageAvailable
                                          }
                                          alt=""
                                        />
                                      </div>

                                      <div className="md:ml-2 ml-0 mt-5 space-y-5  md:w-1/2 w-full">
                                        <div>{item.product.name}</div>

                                        <div>
                                          {
                                            item.product_variation_info
                                              .variation
                                          }
                                        </div>
                                        <div className="flex justify-between">
                                          <div>x {item.quantity}</div>
                                          <div className="text-gray-900">
                                            ₱ {item.product.price}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ))
                              : ""}
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-wrap mb-5">
                        <h2 class="px-4 pt-3 pb-2 text-gray-800">
                          Reason for cancellation
                        </h2>
                        <div class="w-full md:w-full px-3 mb-2 mt-2">
                          <textarea
                            class="rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 placeholder-gray-700 focus:outline-none"
                            name="CancelDescription"
                            onChange={onChange}
                            value={CancelDescription}
                            placeholder="Reason for cancellation"
                            required
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center w-full">
                      <button
                        type="submit"
                        className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-2 text-sm"
                      >
                        Submit
                      </button>
                      <button
                        onClick={handleToggleModalCancelClose}
                        className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                    <div
                      onClick={handleToggleModalCancelClose}
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

export default connect(null, {})(CancelModal);
