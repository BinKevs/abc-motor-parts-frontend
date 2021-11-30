import React from "react";
import { connect } from "react-redux";
import {
  getTransactionList,
  updateTransactionStatus,
  addRefund,
  getRefundList,
  addReview,
} from "../../../store/actions/transaction/transactions.js";
import { getReviewList } from "../../../store/actions/product/products";

import ReactPlayer from "react-player";
import noImageAvailable from "../../../no-image-available.png";
import ReviewsModal from "./ReviewsModal";
import RefundsModal from "./RefundsModal";
import Cancel_Order from "./Cancel_Order";
import swal from "sweetalert";
import { Link } from "react-router-dom";
let DateNow = Date().toLocaleString().split(" ");
let date_now =
  DateNow[0] +
  " " +
  DateNow[1] +
  " " +
  DateNow[2] +
  " " +
  DateNow[3] +
  " " +
  DateNow[4];
let NavButton = document.getElementsByClassName("NavButton");
let NavButtonActive = document.getElementsByClassName("NavButtonActive");
let filteredTransactionData = [];
class PurchasesIndex extends React.Component {
  componentDidMount() {
    this.props.getReviewList();
    this.props.getRefundList();
    this.props.getTransactionList();
  }
  onChange = (e) => {
    if (e.target.name === "RefundVideo") {
      this.setState({
        [e.target.name]: e.target.files,
        VideoFileURL: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };
  state = {
    showModal: false,
    showModalRefund: false,
    showRefundInfo: false,
    comment: "",
    product_name: "",
    product_image: "",
    product_id: 0,
    transaction_item_id: 0,
    filter_nav: "All",
    transactionId: 0,
    RefundVideo: "",
    RefundDescription: "",
    VideoFileURL: "",
    refund_item: "",
    showModalCancel: false,
    cancel_item: "",
  };

  handleOrderReceivedSubmit = (transactionId) => {
    return (e) => {
      e.preventDefault();

      swal(
        'By clicking "Confirm". You will not be able to return or refund after you confirm. Please ensure you have received the products and are satisfied with their condition.',
        {
          buttons: {
            catch: {
              text: "Confirm",
              value: "Confirm",
            },
            cancel: "Cancel",
          },
        }
      ).then((value) => {
        switch (value) {
          case "Confirm":
            const formData = new FormData();
            formData.append("order_status", "Complete(Customer) " + date_now);
            this.props.updateTransactionStatus(transactionId, formData);
            // this.setState({
            //   transactionId: 0,
            //   filter_nav: "Complete",
            // });
            break;
          default:
            break;
        }
      });
    };
  };
  handleSubmitReview = (star_rate) => {
    return (e) => {
      e.preventDefault();
      const { comment, product_id, transaction_item_id, transaction_id } =
        this.state;
      const review = {
        star_rate,
        comment,
        product: product_id,
        transaction_item_id,
        transaction_id,
      };
      this.props.addReview(transaction_id, review);
      this.setState({
        showModal: !this.state.showModal,
        comment: "",
        transaction_item_id: "",
        product_id: "",
        transaction_id: "",
      });
    };
  };
  handleToggleModalReview = (
    product_name,
    product_image,
    product_id,
    transaction_item_id,
    transaction_id
  ) => {
    return (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.setState({
        showModal: !this.state.showModal,
        product_name: product_name,
        product_image: product_image,
        product_id: product_id,
        transaction_item_id: transaction_item_id,
        transaction_id: transaction_id,
      });
    };
  };
  handleToggleModalReviewClose = (event) => {
    event.preventDefault();
    this.setState({
      showModal: !this.state.showModal,
    });
  };
  handleSubmitRefund = (e) => {
    e.preventDefault();
    const { refund_item, RefundVideo, RefundDescription } = this.state;
    const formData = new FormData();
    formData.append("user", this.props.AuthReducer.user.id);
    formData.append("transaction_item", refund_item.id);
    formData.append("product_condition_video", RefundVideo[0]);
    formData.append("description", RefundDescription);
    formData.append("status", "Pending");
    this.props.addRefund(formData);
    this.props.getRefundList();
    this.setState({
      showRefundInfo: true,
      showModalRefund: !this.state.showModalRefund,
    });
    this.props.history.push("/Home");
  };
  handleSubmitCancel = (transactionId) => {
    return (e) => {
      e.preventDefault();
      let date_now =
        DateNow[0] +
        " " +
        DateNow[1] +
        " " +
        DateNow[2] +
        " " +
        DateNow[3] +
        " " +
        DateNow[4];
      const formData = new FormData();
      formData.append(
        "order_status",
        "Canceled(Customer) (" + date_now + " ) " + this.state.CancelDescription
      );
      this.props.updateTransactionStatus(transactionId, formData);
      this.props.history.push("/Home");
    };
  };
  handleToggleModalRefund = (refund_item) => {
    return (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.setState({
        showModalRefund: !this.state.showModalRefund,
        refund_item,
      });
    };
  };
  handleToggleModalCancel = (cancel_transaction) => {
    return (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.setState({
        showModalCancel: !this.state.showModalCancel,
        cancel_transaction,
      });
    };
  };

  handleToggleModalRefundClose = (event) => {
    event.preventDefault();
    this.setState({
      showModalRefund: !this.state.showModalRefund,
    });
  };
  handleToggleModalCancelClose = (event) => {
    event.preventDefault();
    this.setState({
      showModalCancel: !this.state.showModalCancel,
    });
  };
  handleRefundNavigation = (event) => {
    event.preventDefault();
    for (var i = 0; i < NavButton.length; i++) {
      if (NavButtonActive.length > 0) {
        NavButtonActive[0].classList.remove("NavButtonActive");
      }
      event.target.classList.add("NavButtonActive");
    }
    this.setState({
      showRefundInfo: true,
    });
  };
  handelToggleNavButton = (event) => {
    event.preventDefault();
    for (var i = 0; i < NavButton.length; i++) {
      if (NavButtonActive.length > 0) {
        NavButtonActive[0].classList.remove("NavButtonActive");
      }
      event.target.classList.add("NavButtonActive");
    }
    this.setState({
      filter_nav: event.target.value,
      showRefundInfo: false,
    });
  };

  render() {
    console.log(this.props.transactions);
    filteredTransactionData = [];
    filteredTransactionData = this.props.transactions.filter((item) => {
      return this.props.AuthReducer.user.id === item.user
        ? this.state.filter_nav === "All"
          ? item.order_status.toString().includes("")
          : this.state.filter_nav === "To Ship"
          ? item.order_status.toString().includes(this.state.filter_nav) ||
            item.order_status.toString().includes("Preferring")
          : item.order_status.toString().includes(this.state.filter_nav)
        : "";
    });
    return (
      <>
        <div class="bg-gray-100 flex-1 mt-24 pb-24 md:pb-5">
          <div class="bg-gray-100 pt-3">
            <div class=" bg-gradient-to-r from-teal_custom to-gray-800 p-4 shadow text-2xl text-white text-center">
              <h3 class="font-bold">Purchases</h3>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <section class="mx-auto p-2">
              <div class="w-full overflow-hidden shadow-lg bg-white p-1">
                <nav class="flex flex-col justify-evenly sm:flex-row">
                  <button
                    value="All"
                    onClick={this.handelToggleNavButton}
                    class="NavButton NavButtonActive"
                  >
                    All
                  </button>
                  <button
                    value="Pending"
                    onClick={this.handelToggleNavButton}
                    class="NavButton"
                  >
                    Pending
                  </button>
                  <button
                    value="To Ship"
                    onClick={this.handelToggleNavButton}
                    class="NavButton "
                  >
                    To Ship
                  </button>
                  <button
                    value="To Receive"
                    onClick={this.handelToggleNavButton}
                    class="NavButton"
                  >
                    To Receive
                  </button>

                  <button
                    value="Complete"
                    onClick={this.handelToggleNavButton}
                    class="NavButton"
                  >
                    Complete
                  </button>
                  <button
                    onClick={this.handleRefundNavigation}
                    class="NavButton"
                  >
                    Refund/Return
                  </button>
                </nav>
              </div>
            </section>
            {this.state.showRefundInfo ? (
              <div className="space-y-6">
                {this.props.refunds.length > 0 ? (
                  this.props.refunds.map((refund) => (
                    <div className="mx-4">
                      <div className="mx-auto bg-white p-4">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div class="text-gray-600 text-xl font-medium pb-4">
                            Refund/Return Status :{" "}
                            <span className="text-gray-900 tracking-widest">
                              {refund.status}
                            </span>
                          </div>
                          <div class="text-gray-600 text-xl font-medium pb-4">
                            Date Requested :{" "}
                            <span className="text-gray-900 tracking-widest">
                              {refund.created_at}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-center  border-t-2 pt-5">
                          <div class="text-gray-900 text-2xl font-medium pb-4">
                            Product Details
                          </div>
                        </div>
                        <div className="bg-white mb-5">
                          <div className="p-2 flex flex-col md:flex-row justify-center w-full">
                            <div className="md:w-1/3 w-full">
                              <img
                                className=" border-gray-400 border-2 my-auto mx-auto md:mx-0 max-h-56 object-cover object-center rounded-3xl"
                                src={
                                  refund.transaction_item.product
                                    ? refund.transaction_item.product
                                        .file_content[0].image
                                    : ""
                                }
                                alt=""
                              />
                            </div>

                            <div className="md:ml-2 ml-0 mt-5 space-y-5 md:w-1/2 w-full ">
                              <div>{refund.transaction_item.product.name}</div>

                              <div>
                                {
                                  refund.transaction_item.product_variation_info
                                    .variation
                                }
                              </div>
                              <div className="flex justify-between">
                                <div>x{refund.transaction_item.quantity}</div>
                                <div className="text-gray-900">
                                  ₱{refund.transaction_item.product.price}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center  border-t-2 pt-5">
                          <div class="text-gray-900 text-2xl font-medium pb-4">
                            Refund/Return Details
                          </div>
                        </div>
                        <div className="bg-white border-b-4">
                          <div className="p-2 flex flex-col md:flex-row justify-center w-full">
                            <div className=" md:w-1/3 w-full border-4 h-60 rounded-3xl flex justify-center mb-5 ">
                              <ReactPlayer
                                width="80%"
                                height="100%"
                                playing={false}
                                controls={true}
                                url={
                                  refund.product_condition_video
                                    ? refund.product_condition_video
                                    : ""
                                }
                              />
                            </div>

                            <div className=" space-y-5 md:ml-14 ml-0 md:w-1/2 w-full  ">
                              <div>{refund.description}</div>
                            </div>
                          </div>
                        </div>
                        {refund.response ? (
                          <>
                            {" "}
                            <div className="flex justify-center pt-5">
                              <div class="text-gray-900 text-2xl font-medium pb-4">
                                Administration's Response
                              </div>
                            </div>
                            <div className="flex justify-center pt-5 pb-5">
                              <div class="">{refund.response}</div>
                            </div>
                          </>
                        ) : (
                          <div className="mx-4">
                            <div className="mx-auto bg-white p-4">
                              <div className="text-center text-gray-500">
                                <i class="fad fa-clock fa-7x"></i>

                                <div className="font-semibold text-xl">
                                  Administration will response as soon as
                                  possible.
                                </div>
                                <div className="font-semibold text-xl">
                                  Try refreshing the page.
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mx-4">
                    <div className="mx-auto bg-white p-4">
                      <div className="text-center text-gray-500">
                        <i class="fal fa-clipboard-list-check fa-7x"></i>
                        <div className="font-semibold text-xl">
                          No Refund/s / Return/s yet.
                        </div>
                        <div className="font-semibold text-xl">
                          Try refreshing the page.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredTransactionData.length > 0 ? (
                  filteredTransactionData.map((transaction) => (
                    <div className="mx-4">
                      <div className="mx-auto bg-white p-4">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div class="text-gray-600 text-xl font-medium pb-4">
                            Status :{" "}
                            <span className="text-gray-900 tracking-widest">
                              {transaction.order_status.includes(
                                "Canceled(Customer)"
                              )
                                ? transaction.order_status.split(",")[0] +
                                  transaction.order_status.split(",")[1]
                                : transaction.order_status}
                            </span>
                          </div>
                          <div class="text-gray-600 text-xl font-medium pb-4">
                            Date Created :{" "}
                            <span className="text-gray-900 tracking-widest">
                              {transaction.created_at}
                            </span>
                          </div>
                        </div>

                        <div className="bg-white border-t-2 border-b-2">
                          {transaction.items.map((item) => (
                            <div className="p-2 flex flex-col md:flex-row justify-center w-full">
                              <div className="md:w-1/3 w-full ">
                                <img
                                  className=" border-gray-400 border-2 my-auto mx-auto md:mx-0 max-h-56 object-cover object-center rounded-3xl"
                                  src={
                                    item.product.file_content[0].image
                                      ? item.product.file_content[0].image
                                      : noImageAvailable
                                  }
                                  alt=""
                                />
                              </div>

                              <div className="md:ml-2 ml-0 mt-5 space-y-5  md:w-1/2 w-full">
                                <div>{item.product.name}</div>

                                <div>
                                  {item.product_variation_info.variation}
                                </div>
                                <div className="flex justify-between">
                                  <div>x{item.quantity}</div>
                                  <div className="text-gray-900">
                                    ₱{item.product.price}
                                  </div>
                                </div>
                                <div className="flex justify-start pt-5 space-x-4">
                                  {!transaction.order_status.includes(
                                    "Complete"
                                  ) ? (
                                    item.refund_info.status !== null ? (
                                      <div className="text-xl text-gray-500">
                                        {" "}
                                        Refund / Exchange Status :{" "}
                                        <span className="text-gray-800 font-bold">
                                          {item.refund_info.status}{" "}
                                        </span>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={this.handleToggleModalRefund(
                                          item
                                        )}
                                        class={
                                          "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-md"
                                        }
                                      >
                                        <span>Refund</span>
                                      </button>
                                    )
                                  ) : (
                                    ""
                                  )}

                                  {transaction.order_status.includes(
                                    "Complete"
                                  ) ? (
                                    <>
                                      {/* {this.props.reviews.map((review) =>
                                    review.product !== item.product.id ? (
                                      
                                    ) : (
                                      ""
                                    )
                                  )} */}
                                      {item.review > 0 ? (
                                        ""
                                      ) : (
                                        <>
                                          <button
                                            onClick={this.handleToggleModalReview(
                                              item.product.name,
                                              item.product.file_content[0]
                                                .image,
                                              item.product.id,
                                              item.id,
                                              transaction.id
                                            )}
                                            class={
                                              "bg-teal_custom hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-md"
                                            }
                                          >
                                            <span>Rate</span>
                                          </button>
                                        </>
                                      )}
                                      <Link
                                        to={"/product/".concat(
                                          item.product.id + "/"
                                        )}
                                        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-md cursor-pointer"
                                      >
                                        <span>Buy Again</span>
                                      </Link>{" "}
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                          {transaction.tracking_number ? (
                            <div className="my-5">
                              <span className="text-md text-gray-700">
                                <p>Track your parcel via </p>
                                <p className="text-gray-900 font-semibold text-lg">
                                  https://www.ninjavan.co/en-ph/tracking{" "}
                                </p>
                                <p>
                                  Use this tracking number :{" "}
                                  <span className="text-gray-900 font-semibold text-lg">
                                    {transaction.tracking_number}
                                  </span>
                                </p>
                              </span>
                            </div>
                          ) : (
                            ""
                          )}

                          <div class="text-gray-800  font-medium pt-4 text-right">
                            <span className="text-xl text-gray-600">
                              Order Total :
                            </span>{" "}
                            <span className="text-2xl text-gray-900 tracking-widest">
                              ₱{transaction.totalAmount}
                            </span>
                          </div>
                        </div>

                        {!transaction.order_status.includes("Complete") ? (
                          <div className="flex justify-end my-5 ">
                            <button
                              onClick={this.handleOrderReceivedSubmit(
                                transaction.id
                              )}
                              class="bg-teal_custom hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-md"
                            >
                              <span>Order Received</span>
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                        {transaction.order_status.includes("Pending") ? (
                          <div className="flex justify-end my-5 ">
                            <button
                              // onClick={this.handleOrderReceivedSubmit(
                              //   transaction.id
                              // )}
                              onClick={this.handleToggleModalCancel(
                                transaction
                              )}
                              class="bg-gray-700 hover:bg-teal_custom text-white font-bold py-2 px-4 rounded text-md"
                            >
                              <span>Cancel Order</span>
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mx-4">
                    <div className="mx-auto bg-white p-4">
                      <div className="text-center text-gray-500">
                        <i class="fal fa-clipboard-list-check fa-7x"></i>
                        <div className="font-semibold text-xl">
                          No order/s yet.
                        </div>
                        <div className="font-semibold text-xl">
                          Try refreshing the page.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div class={this.state.showModal ? "h-screen " : "h-screen hidden"}>
          <ReviewsModal
            handleToggleModalReviewClose={this.handleToggleModalReviewClose}
            onChange={this.onChange}
            handleSubmitReview={this.handleSubmitReview}
            state={this.state}
          />
        </div>

        <RefundsModal
          state={this.state}
          handleToggleModalRefundClose={this.handleToggleModalRefundClose}
          onChange={this.onChange}
          handleSubmitRefund={this.handleSubmitRefund}
        />
        <Cancel_Order
          state={this.state}
          handleToggleModalCancelClose={this.handleToggleModalCancelClose}
          onChange={this.onChange}
          handleSubmitCancel={this.handleSubmitCancel}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  transactions: state.transactions.transactions,
  refunds: state.transactions.refunds,
  reviews: state.products.reviews,
  AuthReducer: state.AuthReducer,
});
export default connect(mapStateToProps, {
  getTransactionList,
  addReview,
  updateTransactionStatus,
  getReviewList,
  addRefund,
  getRefundList,
})(PurchasesIndex);
