import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getTransactionList,
  changeTransactionStatus,
} from "../../store/actions/transaction/transactions.js";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import TransactionView from "./TransactionView";
import { TransactionsTableExportModal } from "./Print/TransactionsTableExportModal";
import swal from "sweetalert";
import { CheckPassword } from "../../Helpers/functions";
let passwordVerified;
let filteredData = [];
let Transactions = [];
class TransactionSettingIndex extends React.Component {
  static propTypes = {
    transanctions: PropTypes.array.isRequired,
    getTransanctionList: PropTypes.func.isRequired,
  };

  state = {
    search: "",
    InputDate: "",
    showTransactionViewModal: false,
    showMoreOption: false,
    showMoreOptionTransacId: 0,
    TransactionToShow: "",
    table_export_modal: false,
  };
  // setSeeMore(transaction_id) {
  //   return (e) => {
  //     e.preventDefault();
  //     document.getElementById(transaction_id).classList.toggle("hidden");
  //   };
  // }
  handleShowTransactionViewModal = (event) => {
    event.preventDefault();
    this.setState({
      showTransactionViewModal: !this.state.showTransactionViewModal,
    });
  };

  handleShowMoreOption = (showMoreOptionTransacId) => {
    return (event) => {
      event.preventDefault();
      this.setState({
        showMoreOption: !this.state.showMoreOption,
        showMoreOptionTransacId: showMoreOptionTransacId,
        TransactionToShow: filteredData.filter(
          (x) => x.id === showMoreOptionTransacId
        ),
      });
    };
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  componentDidMount() {
    this.props.getTransactionList();
  }
  handleToggleExportTable = (event) => {
    event.preventDefault();
    this.setState({ table_export_modal: !this.state.table_export_modal });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  handleArchiveTransaction(transactionID) {
    return (event) => {
      event.preventDefault();

      swal(
        "Are you sure you want to delete this transaction?\n If you are sure, type in your password:",
        {
          content: {
            element: "input",
            attributes: {
              placeholder: "Type your password",
              type: "password",
            },
          },
          icon: "warning",
          buttons: {
            confirm: {
              text: "Confirm",
              visible: true,
              className: "",
              closeModal: true,
            },
            cancel: {
              text: "Cancel",
              value: false,
              value: "cancel",
              visible: true,
              className: "",
              closeModal: true,
            },
          },
          dangerMode: true,
        }
      ).then((value) => {
        const formPassword = new FormData();
        formPassword.append("password", value);
        if (value === "cancel") {
        } else {
          CheckPassword(
            this.props.AuthReducer.user.id,
            formPassword,
            this.props.AuthReducer.token
          )
            .then((data) => {
              if (data === "Valid") {
                const formData = new FormData();
                formData.append("status", false);
                this.props.changeTransactionStatus(transactionID, formData);
                swal("Successfully deleted transaction!", "", "success");
              } else {
                swal("Invalid password!", "", "error");
              }
            })
            .catch((err) => console.log(err));
        }
      });
    };
  }
  render() {
    //returning the search filtered
    console.log(this.props.transactions);
    const { InputDate } = this.state;
    Transactions = [];

    this.props.transactions.map((trans) =>
      trans.status
        ? Transactions.push({
            id: trans.id,
            creator: trans.user_info.name
              ? trans.user_info.name.split(" ")[0]
              : "None",
            items: trans.items,
            created_at: trans.created_at,
            totalAmount: trans.totalAmount,
            totalProfit: trans.totalProfit,
            quantity: trans.quantity,
            mode_of_payment: trans.payment_method,
            payment_details: trans.payment_details,
            contact_number: trans.contact_number,
            address: trans.address,
            order_status: trans.order_status,
          })
        : ""
    );
    filteredData = [];
    const lowercasedFilter = this.state.search.toLowerCase();
    filteredData = Transactions.filter((item) => {
      return item.creator.toString().toLowerCase().includes(lowercasedFilter);
    });
    if (InputDate === "") {
      filteredData = Transactions.filter((item) => {
        return item.creator.toString().toLowerCase().includes(lowercasedFilter);
      });
    } else {
      if (InputDate === null) {
        filteredData = Transactions.filter((item) => {
          return item.creator
            .toString()
            .toLowerCase()
            .includes(lowercasedFilter);
        });
      } else {
        let InputDateDateSeparated = InputDate.toString().split(" ");
        filteredData = Transactions.filter((item) => {
          return item.created_at
            .toString()
            .includes(
              InputDateDateSeparated[1] +
                " " +
                InputDateDateSeparated[2] +
                " " +
                InputDateDateSeparated[3]
            );
        });
      }
    }
    if (lowercasedFilter !== "" && InputDate !== null && InputDate !== "") {
      let InputDateDateSeparated = InputDate.toString().split(" ");
      filteredData = Transactions.filter((item) => {
        return (
          item.created_at
            .toString()
            .includes(
              InputDateDateSeparated[1] +
                " " +
                InputDateDateSeparated[2] +
                " " +
                InputDateDateSeparated[3]
            ) &&
          item.creator.toString().toLowerCase().includes(lowercasedFilter)
        );
      });
    }

    return (
      <>
        <div class="bg-gray-100 flex-1 mt-20 md:mt-14 pb-24 md:pb-5">
          <div class="bg-gray-800 pt-3">
            <div
              class="
    rounded-tl-3xl
    bg-gradient-to-r
    from-teal_custom
    to-gray-800
    p-4
    shadow
    text-2xl text-white
"
            >
              <h3 class="font-bold pl-2">Transactions</h3>
            </div>
          </div>
          <div className="p-5 w-full">
            <div className="mx-auto bg-white shadow rounded">
              <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-end items-start lg:items-stretch w-full">
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                  <div className="lg:ml-6 flex items-start w-full">
                    <div
                      onClick={this.handleToggleExportTable}
                      className="text-white cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center"
                    >
                      <i class="fal fa-print fa-lg"></i>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                  {/* <div className="flex items-center lg:border-l lg:border-r border-gray-300  py-3 lg:py-0 lg:px-6">
                    <p className="text-base text-gray-600 " id="page-view">
                      Viewing 1 - 20 of 60
                    </p>
                    <div className="text-gray-600  ml-2 border-transparent border cursor-pointer rounded mr-4">
                      <i class="fad fa-angle-left fa-2x"></i>
                    </div>
                    <div className="text-gray-600  border-transparent border rounded focus:outline-none cursor-pointer">
                      <i class="fad fa-angle-right fa-2x"></i>
                    </div>
                  </div> */}
                  <div className="lg:ml-6 flex items-center">
                    <div class="relative w-full">
                      <input
                        type="text"
                        name="search"
                        placeholder=" "
                        required
                        class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                        onChange={this.onChange}
                        value={this.state.search}
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
                <table className="min-w-full bg-white ">
                  <thead>
                    <tr className="w-full h-16 border-gray-300 border-b py-8 text-left font-bold text-gray-500">
                      <th className="pl-10 pr-4 text-md">ID</th>
                      <th className=" pr-4 text-md">User</th>
                      <th className="pr-4 text-md ">
                        {" "}
                        <div>Date</div>
                        <DatePicker
                          selected={this.state.InputDate}
                          onChange={(date) =>
                            this.setState({ InputDate: date })
                          }
                          value={this.state.InputDate}
                          closeOnScroll={true}
                          placeholderText="Select Date"
                          className="my-1 px-1 py-1 border-2 text-sm rounded-l w-5/6"
                        />
                      </th>
                      <th className="pr-4 text-md">
                        <div className="text-center mb-5">Items</div>
                        <div className="flex justify-between  whitespace-no-wrap">
                          <th className="text-sm pr-4 whitespace-no-wrap ">
                            SKU
                          </th>
                          <th className="text-sm pr-4 whitespace-no-wrap ">
                            Product Name
                          </th>
                          <th className="text-sm pr-4 whitespace-no-wrap ">
                            Retail Price
                          </th>
                          <th className="text-sm pr-4 whitespace-no-wrap ">
                            Cost Price
                          </th>
                          {/* <th className="text-sm pr-4 whitespace-no-wrap ">
                            QTY
                          </th> */}
                        </div>
                      </th>
                      <th className="pr-4 text-md">Total amount</th>
                      <th className="pr-4 text-md">Total profit</th>
                      {/* <th className="pr-4 text-md">Total number of items</th> */}
                      <th className="pr-4 text-md">Mode of payment</th>
                      <th className="pr-4 text-md">Payment details</th>
                      <th className="pr-4 text-md">More</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="h-24 border-gray-300  border-b"
                      >
                        <td className="pl-10 text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                          {transaction.id}
                        </td>
                        <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                          {transaction.creator}
                          <div className="my-2">{transaction.address}</div>
                          <div>{transaction.contact_number}</div>
                        </td>
                        <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
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
                              <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 my-auto">
                                {transac.sku_id}
                              </td>
                              <td className="text-sm pr-4 whitespace-no-wrap overflow-ellipsis overflow-hidden text-gray-800 ">
                                {transac.product.name}
                                <div>
                                  ({transac.product_variation_info.variation})
                                </div>
                              </td>
                              <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 my-auto">
                                ₱{transac.product.price}
                              </td>
                              <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 my-auto">
                                ₱{transac.product.cost_price}
                              </td>

                              {/* <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 my-auto">
                                {transac.quantity}
                              </td> */}
                            </tr>
                          ))}
                        </td>

                        <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                          ₱{transaction.totalAmount}
                        </td>
                        <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                          ₱{transaction.totalProfit}
                        </td>
                        {/* <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                          {transaction.quantity}
                        </td> */}
                        <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                          {transaction.mode_of_payment}
                        </td>
                        <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                          {transaction.payment_details}

                          <div className="mt-2 font-semibold">
                            Order Status :{" "}
                            <span className="font-bold">
                              {transaction.order_status.includes(
                                "Canceled(Customer)"
                              )
                                ? transaction.order_status.split(",")[0] +
                                  transaction.order_status.split(",")[1]
                                : transaction.order_status}
                            </span>
                          </div>
                        </td>
                        <td className="pr-8 relative">
                          <button
                            onClick={this.handleShowMoreOption(transaction.id)}
                            className="text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none"
                          >
                            <div
                              className={`absolute left-0 top-0 mt-2 -ml-20 shadow-md z-10 w-32 ${
                                this.state.showMoreOption &&
                                this.state.showMoreOptionTransacId ===
                                  transaction.id
                                  ? ""
                                  : "hidden"
                              } `}
                            >
                              <ul className="bg-white shadow rounded p-2">
                                <li
                                  onClick={this.handleShowTransactionViewModal}
                                  className="cursor-pointer text-gray-600  text-sm leading-3 py-3 hover:bg-teal_custom hover:text-white px-3 font-normal"
                                >
                                  View
                                </li>
                                <li
                                  onClick={this.handleArchiveTransaction(
                                    transaction.id
                                  )}
                                  className="cursor-pointer text-sm leading-3 py-3 hover:bg-red-500 hover:text-white px-3 font-normal"
                                >
                                  Delete
                                </li>
                              </ul>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-dots-vertical dropbtn"
                              width={28}
                              height={28}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <circle cx={12} cy={12} r={1} />
                              <circle cx={12} cy={19} r={1} />
                              <circle cx={12} cy={5} r={1} />
                            </svg>
                          </button>
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
          class={
            this.state.table_export_modal ? "h-screen " : "h-screen hidden"
          }
        >
          <TransactionsTableExportModal
            handleToggleExportTable={this.handleToggleExportTable}
            Transactions={filteredData}
          />
        </div>
        <TransactionView
          state={this.state}
          handleShowTransactionViewModal={this.handleShowTransactionViewModal}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  transactions: state.transactions.transactions,
  AuthReducer: state.AuthReducer,
});

export default connect(mapStateToProps, {
  getTransactionList,
  changeTransactionStatus,
})(TransactionSettingIndex);
