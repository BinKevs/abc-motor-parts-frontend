import React from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import video1 from "../../Group2.mp4";
import noImageAvailable from "../../no-image-available.png";
import {
  getRefundList,
  updateRefund,
} from "../../store/actions/transaction/transactions.js";
class RefundsIndex extends React.Component {
  state = {
    showViewMoreModal: false,
    refundInfo: "",
    response: "",
    status: "",
  };
  componentDidMount() {
    this.props.getRefundList();
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleOpenViewMoreModal = (refundInfo) => {
    return (event) => {
      event.preventDefault();
      this.setState({
        refundInfo: refundInfo,
        showViewMoreModal: !this.state.showViewMoreModal,
      });
    };
  };
  handleRefundUpdate = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("tranItemID", this.state.refundInfo.id);
    formData.append("response", this.state.response);
    formData.append("status", this.state.status);
    this.props.updateRefund(this.state.refundInfo.id, formData);
    this.setState({
      refundInfo: "",
      response: "",
      status: "",
      showViewMoreModal: !this.state.showViewMoreModal,
    });
  };
  handleRefundStatus = (status) => {
    return (event) => {
      event.preventDefault();
      this.setState({
        status: status,
      });
    };
  };

  handleCloseViewMoreModal = (event) => {
    event.preventDefault();
    this.setState({
      showViewMoreModal: !this.state.showViewMoreModal,
    });
  };
  render() {
    const { refundInfo } = this.state;
    console.log(refundInfo);
    return (
      <>
        <div class="bg-gray-100 flex-1 mt-20 md:mt-14 pb-24 md:pb-5">
          <div class="bg-gray-800 pt-3">
            <div class="rounded-tl-3xl bg-gradient-to-r from-teal_custom to-gray-800 p-4 shadow text-2xl text-white">
              <h3 class="font-bold pl-2">Refund/Return</h3>
            </div>
          </div>

          <div className="p-5 w-full">
            <div className="mx-auto bg-white shadow rounded">
              <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-end items-start lg:items-stretch w-full">
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                  <div className="lg:ml-6 flex items-start w-full">
                    <div
                      // onClick={this.OnToggleExportTable}
                      className="text-white cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center"
                    >
                      <i class="fal fa-print fa-lg"></i>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                  <div className="lg:ml-6 flex items-center">
                    <div class="relative w-full">
                      <input
                        type="text"
                        name="search"
                        placeholder=" "
                        required
                        class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                        // onChange={this.onChange}
                        // value={this.state.search}
                      />
                      <label
                        for="search"
                        class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                      >
                        Search
                      </label>
                    </div>
                    <i class="fad fa-search fa-lg"></i>
                  </div>
                </div>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="w-full h-16 border-gray-300 border-b py-8 text-left font-bold text-gray-500">
                      <th className="pl-14 pr-6 text-md">
                        Transaction Item ID
                      </th>
                      <th className=" pr-6 text-md">User</th>
                      <th className=" pr-6 text-md">Product</th>
                      <th className="  pr-6 text-md">Date Of Request</th>
                      <th className="pr-6 text-md">Status</th>
                      <th className=" pr-6 text-md">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.refunds.map((refund) => (
                      <tr
                        key={refund.id}
                        className="h-24 border-gray-300 border-b "
                      >
                        <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                          {refund.id}
                        </td>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                          {refund.user_info.name}
                        </td>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                          <div>{refund.transaction_item.product.name}</div>
                          <div>
                            <p>
                              Size :{" "}
                              {
                                refund.transaction_item.product_variation_info
                                  .size
                              }
                            </p>
                            <p>
                              Color :{" "}
                              {
                                refund.transaction_item.product_variation_info
                                  .color
                              }
                            </p>
                          </div>
                        </td>

                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                          {refund.created_at}
                        </td>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                          {refund.status}
                        </td>

                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                          <div className="space-y-5">
                            <button
                              onClick={this.handleOpenViewMoreModal(refund)}
                              className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-2 text-sm"
                            >
                              View More Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div
          class={this.state.showViewMoreModal ? "h-screen " : "h-screen hidden"}
        >
          <div class="mx-auto max-w-screen-lg h-full">
            <div
              className="z-20 absolute top-0 right-0 bottom-0 left-0"
              id="modal"
            >
              <div class="modal-overlay absolute w-full h-full z-25 bg-gray-900 opacity-50"></div>
              <div className="h-full overflow-auto w-full flex flex-col">
                <div className="m-2 md:m-12">
                  <div class="mt-9">
                    <div className="relative p-4 md:p-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400 ">
                      <div class="text-left p-0 mb-8">
                        <div>
                          <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                          <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                            ABC Motor Parts
                          </h1>
                        </div>

                        <h1 class="text-gray-800 text-2xl font-medium">
                          Return/Refund Information
                        </h1>
                      </div>
                      <div className="w-full">
                        <div className="space-y-6 mx-4">
                          <div className="mx-auto bg-white p-4">
                            <div className="flex justify-between">
                              <div class="text-gray-600 text-xl font-medium pb-4">
                                Date created :{" "}
                                <span className="text-gray-900">
                                  {refundInfo ? refundInfo.created_at : ""}
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div class="text-gray-600 text-xl font-medium pb-4">
                                User :{" "}
                                <span className="text-gray-900">
                                  {refundInfo.user_info
                                    ? refundInfo.user_info.name
                                    : ""}
                                </span>
                              </div>
                            </div>

                            <div className="bg-white border-t-2 border-b-2">
                              <div className="p-2 flex flex-col md:flex-row justify-center">
                                <div className="md:w-1/3 w-full ">
                                  <img
                                    className=" border-gray-400 border-2 my-auto mx-auto md:mx-0 max-h-56 object-cover object-center rounded-3xl"
                                    src={
                                      refundInfo.transaction_item
                                        ? refundInfo.transaction_item.product
                                            .file_content[0].image
                                        : ""
                                    }
                                    alt=""
                                  />
                                </div>

                                <div className="md:ml-2 ml-0 mt-5 space-y-5  md:w-1/2 w-full">
                                  <div>
                                    {refundInfo.transaction_item
                                      ? refundInfo.transaction_item.product.name
                                      : ""}
                                  </div>

                                  <div>
                                    {refundInfo.transaction_item
                                      ? refundInfo.transaction_item
                                          .product_variation_info.color
                                      : ""}
                                    /{" "}
                                    {refundInfo.transaction_item
                                      ? refundInfo.transaction_item
                                          .product_variation_info.size
                                      : ""}
                                  </div>
                                  <div className="flex justify-between">
                                    <div>
                                      x
                                      {refundInfo.transaction_item
                                        ? refundInfo.transaction_item.quantity
                                        : ""}
                                    </div>
                                    <div className="text-gray-900">
                                      ₱{" "}
                                      {refundInfo.transaction_item
                                        ? refundInfo.transaction_item.product
                                            .price
                                        : ""}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h1 class="text-gray-800 text-xl font-medium mb-5">
                          Submitted Product Video
                        </h1>

                        <div className=" w-full border-4 h-60 rounded-3xl flex justify-center mb-5 ">
                          <ReactPlayer
                            width="80%"
                            height="100%"
                            playing={false}
                            controls={true}
                            url={
                              refundInfo
                                ? refundInfo.product_condition_video
                                : ""
                            }
                          />
                        </div>
                        <h1 class="text-gray-800 text-xl font-medium mb-5">
                          Description
                        </h1>
                        <p class="text-justify">
                          {refundInfo ? refundInfo.description : ""}
                        </p>
                      </div>
                      <div className="flex justify-center pt-5">
                        <div class="text-gray-900 text-2xl font-medium pb-4">
                          Course of Action
                        </div>
                      </div>

                      <div className="w-full flex flex-col md:flex-row md:space-x-4 space-x-0 md:space-y-0 space-y-4  justify-center mb-5">
                        <div
                          onClick={this.handleRefundStatus(
                            "Your request is accepted"
                          )}
                          className={
                            this.state.status === "Your request is accepted"
                              ? "flex bg-teal_custom hover:bg-gray-400 text-white cursor-pointer rounded items-center justify-center px-3 h-16 border-4 border-gray-800"
                              : "flex bg-teal_custom hover:bg-gray-400 text-white cursor-pointer rounded items-center justify-center px-3 h-12"
                          }
                        >
                          <div>Accept Refund/Return</div>
                        </div>
                        <div
                          onClick={this.handleRefundStatus(
                            "Your request is denied"
                          )}
                          className={
                            this.state.status === "Your request is denied"
                              ? "flex bg-teal_custom hover:bg-gray-400 text-white cursor-pointer rounded items-center justify-center px-3 h-16 border-4 border-gray-800"
                              : "flex bg-teal_custom hover:bg-gray-400 text-white cursor-pointer rounded items-center justify-center px-3 h-12"
                          }
                        >
                          <div>Denied Refund/Return</div>
                        </div>
                      </div>
                      <div class="flex flex-wrap mb-5">
                        <h2 class="px-4 pt-3 pb-2 text-gray-800">Response</h2>
                        <div class="w-full md:w-full px-3 mb-2 mt-2">
                          <textarea
                            class="rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 placeholder-gray-700 focus:outline-none"
                            name="response"
                            onChange={this.onChange}
                            value={this.state.response}
                            placeholder="Write Your Response Here"
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex items-center justify-center w-full">
                        <button
                          onClick={this.handleRefundUpdate}
                          className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-2 text-sm"
                        >
                          Submit
                        </button>
                        <button className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">
                          Cancel
                        </button>
                        {/* <div
													className="w-full flex justify-center py-12 items-center"
													id="button"
												>
													<button
														className="focus:outline-none mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
														onClick={() => showModal(!modal)}
													>
														Open Modal
													</button>
												</div> */}
                      </div>
                      <div
                        onClick={this.handleCloseViewMoreModal}
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
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({ refunds: state.transactions.refunds });

export default connect(mapStateToProps, { updateRefund, getRefundList })(
  RefundsIndex
);
