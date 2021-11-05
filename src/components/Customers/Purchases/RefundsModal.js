import React, { useState } from "react";
import noImageAvailable from "../../../no-image-available.png";
import video1 from "../../../Group2.mp4";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
const RefundsModal = (props) => {
  const { handleToggleModalRefundClose, onChange, handleSubmitRefund } = props;
  const { showModalRefund, VideoFileURL, refund_item, RefundDescription } =
    props.state;
  return (
    <>
      <div class={showModalRefund ? "h-screen " : "h-screen hidden"}>
        <div class="mx-auto max-w-screen-lg h-full">
          <div
            className="z-20 absolute top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <div class="modal-overlay absolute w-full h-full z-25 bg-gray-900 opacity-50"></div>
            <div className="h-full overflow-auto w-full flex flex-col">
              <div className="m-2 md:m-12">
                <form onSubmit={handleSubmitRefund} class="mt-9">
                  <div className="relative p-4 md:p-8 bg-white shadow-md rounded border border-gray-400 ">
                    <div class="text-left p-0 mb-8">
                      <div>
                        <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                        <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                          ABC Motor Parts
                        </h1>
                      </div>

                      <h1 class="text-gray-800 text-3xl font-medium">
                        Return / Refund
                      </h1>
                    </div>
                    <div className="w-full overflow-x-auto">
                      <div className="space-y-6 mx-4">
                        <div className="mx-auto bg-white p-4">
                          <div className="flex justify-between">
                            <div class="text-gray-800 text-xl font-medium pb-4">
                              Date Created :{" "}
                              {refund_item.transaction_date
                                ? refund_item.transaction_date.created_at
                                : ""}
                            </div>
                          </div>

                          <div className="bg-white border-t-2 border-b-2">
                            <div className="p-2 flex flex-col md:flex-row justify-center">
                              <div className="md:w-1/3 w-full">
                                <img
                                  className=" border-gray-400 border-2 my-auto mx-auto md:mx-0 max-h-56 object-cover object-center rounded-3xl"
                                  src={
                                    refund_item.product
                                      ? refund_item.product.file_content[0]
                                          .image
                                      : ""
                                  }
                                  alt=""
                                />
                              </div>

                              <div className="md:ml-2 ml-0 mt-5 space-y-5  md:w-1/2 w-full">
                                <div>
                                  {refund_item.product
                                    ? refund_item.product.name
                                    : ""}
                                </div>

                                <div>
                                  {refund_item.product
                                    ? refund_item.product_variation_info.color
                                    : ""}
                                  /
                                  {refund_item.product
                                    ? refund_item.product_variation_info.size
                                    : ""}
                                </div>
                                <div className="flex justify-between">
                                  <div>x {refund_item.quantity}</div>
                                  <div className="text-gray-900">
                                    ₱{" "}
                                    {refund_item.product
                                      ? refund_item.product.price
                                      : ""}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-wrap mb-5">
                        <h2 class="px-4 pt-3 pb-2 text-gray-800">
                          Description
                        </h2>
                        <div class="w-full md:w-full px-3 mb-2 mt-2">
                          <textarea
                            class="rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 placeholder-gray-700 focus:outline-none"
                            name="RefundDescription"
                            onChange={onChange}
                            value={RefundDescription}
                            placeholder="Return/ Refund Reason And Description"
                            required
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    {VideoFileURL === "" ? (
                      ""
                    ) : (
                      <div className="h-60  border-4 rounded-3xl flex justify-center mb-5 ">
                        <ReactPlayer
                          width="100%"
                          height="100%"
                          playing={false}
                          controls={true}
                          url={VideoFileURL}
                        />
                      </div>
                    )}

                    <section class="h-full overflow-auto p-8 w-full px-3 flex flex-col">
                      <header class="border-dashed border-2 border-gray-400 py-6 flex flex-col justify-center items-center">
                        <label class="cursor-pointer mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                          Upload a file
                          <input
                            type="file"
                            name="RefundVideo"
                            onChange={onChange}
                            className="hidden"
                          />
                        </label>
                      </header>
                    </section>

                    <div className="flex items-center justify-center w-full">
                      <button
                        type="submit"
                        className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-2 text-sm"
                      >
                        Submit
                      </button>
                      <button className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">
                        Cancel
                      </button>
                    </div>
                    <div
                      onClick={handleToggleModalRefundClose}
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

export default connect(null, {})(RefundsModal);
