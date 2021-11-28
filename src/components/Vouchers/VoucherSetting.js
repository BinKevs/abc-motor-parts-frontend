import React from "react";
import { connect } from "react-redux";
import {
  getVoucherList,
  addVoucher,
  updateVoucher,
  changeVoucherStatus,
} from "../../store/actions/product/products";
import swal from "sweetalert";
import { VoucherTableExportModal } from "./Print/VoucherTableExportModal";
import { CheckPassword } from "../../Helpers/functions";
let passwordVerified;
let filteredData;
class VoucherSetting extends React.Component {
  componentDidMount() {
    this.props.getVoucherList();
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  state = {
    code: "",
    value: "",
    voucher_id: "",
    showVoucherModal: false,
    EditButtonClicked: false,
    table_export_modal: false,
    search: "",
  };
  handleAddSubmitVoucher = (e) => {
    e.preventDefault();
    const { code, value } = this.state;
    const voucher = { code, value, voucher_status_details: "Not yet redeemed" };
    this.props.addVoucher(voucher);
    this.setState({
      code: "",
      value: "",
      showVoucherModal: !this.state.showVoucherModal,
    });
  };
  handleUpdateSubmitVoucher = (e) => {
    e.preventDefault();
    const { code, value, voucher_id } = this.state;
    const voucher = { code, value };
    this.props.updateVoucher(voucher_id, voucher);
    this.setState({
      code: "",
      value: "",
      voucher_id: "",
      EditButtonClicked: false,
      showVoucherModal: !this.state.showVoucherModal,
    });
  };

  handleOpenUpdateVoucherModal = (voucher_id, code, value) => {
    return (event) => {
      event.preventDefault();
      this.setState({
        code,
        value,
        voucher_id,
        showVoucherModal: true,
        EditButtonClicked: true,
      });
    };
  };
  handleToggleModal = (event) => {
    event.preventDefault();
    this.setState({
      showVoucherModal: !this.state.showVoucherModal,
    });
  };
  handleArchiveVoucher(voucherID) {
    return (event) => {
      event.preventDefault();

      swal(
        "Are you sure you want to delete this voucher?\n If you are sure, type in your password:",
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
                this.props.changeVoucherStatus(voucherID, formData);
                swal("Successfully deleted voucher!", "", "success");
              } else {
                swal("Invalid password!", "", "error");
              }
            })
            .catch((err) => console.log(err));
        }
      });
    };
  }
  handleToggleExportTable = (event) => {
    event.preventDefault();
    this.setState({ table_export_modal: !this.state.table_export_modal });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  render() {
    let lowercasedFilter = this.state.search.toLowerCase();

    filteredData = this.props.vouchers.filter((voucher) => {
      if (voucher.status)
        return voucher.code.toString().toLowerCase().includes(lowercasedFilter);
    });
    return (
      <>
        <div class="bg-gray-100 flex-1 mt-20 md:mt-14 pb-24 md:pb-5">
          <div class="bg-gray-800 pt-3">
            <div class="rounded-tl-3xl bg-gradient-to-r from-teal_custom to-gray-800 p-4 shadow text-2xl text-white">
              <h3 class="font-bold pl-2">Vouchers</h3>
            </div>
          </div>
          <div className="p-5 w-full">
            <div className="mx-auto bg-white dark:bg-gray-800 shadow rounded">
              <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-end items-start lg:items-stretch w-full">
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                  <div className="lg:ml-6 flex items-start w-full">
                    <div
                      onClick={this.handleToggleExportTable}
                      className="text-white cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center"
                    >
                      <i class="fal fa-print fa-lg"></i>
                    </div>
                    <div
                      onClick={this.handleToggleModal}
                      className="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center"
                    >
                      <i class="fal fa-plus fa-lg"></i>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                  {/* <div className="flex items-center lg:border-l lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6">
                    <p
                      className="text-base text-gray-600 dark:text-gray-400"
                      id="page-view"
                    >
                      Viewing
                    </p>
                    <div className="text-gray-600 dark:text-gray-400 ml-2 border-transparent border cursor-pointer rounded mr-4">
                      <i class="fad fa-angle-left fa-2x"></i>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 border-transparent border rounded focus:outline-none cursor-pointer">
                      <i class="fad fa-angle-right fa-2x"></i>
                    </div>
                  </div> */}
                  <div className="lg:ml-6 flex items-center">
                    <div class="relative w-full">
                      <input
                        type="text"
                        name="search"
                        onChange={this.onChange}
                        placeholder=" "
                        required
                        class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
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
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead>
                    <tr className="w-full h-16 border-gray-300 border-b py-8 text-left font-bold text-gray-500">
                      <th className="pl-14 pr-6 text-md">ID</th>
                      <th className=" pr-6 text-md">Code</th>

                      <th className="pr-6 text-md">Value</th>
                      <th className="pr-6 text-md">Status</th>
                      <th className="pr-6 text-md">Date Created</th>
                      <th className="pr-6 text-md">More</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((voucher) =>
                      voucher.status ? (
                        <tr className="h-24 border-gray-300 dark:border-gray-200 border-b">
                          <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            {voucher.id}
                          </td>
                          <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            {voucher.code}
                          </td>
                          <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            {voucher.value}
                          </td>
                          <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            {voucher.voucher_status_details}
                          </td>
                          {/* <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {voucher.status ? "True" : "False"}
                        </td> */}
                          <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            {voucher.created_at}
                          </td>
                          {/* <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {voucher.status ? "Available" : "Unavailable"}
                        </td> */}

                          <td className="pr-8 relative">
                            <button className="button-see-more text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none">
                              <div className="seeMore absolute left-0 top-0 mt-2 -ml-20 shadow-md z-10 w-32">
                                <ul className="bg-white shadow rounded p-2">
                                  <li
                                    onClick={this.handleOpenUpdateVoucherModal(
                                      voucher.id,
                                      voucher.code,
                                      voucher.value
                                    )}
                                    className="cursor-pointer text-gray-600  text-sm leading-3 py-3 hover:bg-teal_custom hover:text-white px-3 font-normal"
                                  >
                                    Edit
                                  </li>
                                  <li
                                    onClick={this.handleArchiveVoucher(
                                      voucher.id
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
                      ) : (
                        ""
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div
          class={this.state.showVoucherModal ? "h-screen " : "h-screen hidden"}
        >
          <div class="mx-auto max-w-screen-lg h-full">
            <div
              className="z-20 absolute top-0 right-0 bottom-0 left-0"
              id="modal"
            >
              <div class="modal-overlay absolute w-full h-full z-25 bg-gray-900 opacity-50"></div>
              <div className="h-full overflow-auto w-full flex flex-col">
                <div className="m-2 md:m-12">
                  <form
                    onSubmit={
                      this.state.EditButtonClicked
                        ? this.handleUpdateSubmitVoucher
                        : this.handleAddSubmitVoucher
                    }
                    class="mt-9"
                  >
                    <div className="relative p-4 md:p-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400 ">
                      <div class="text-left p-0 mb-8">
                        <div>
                          <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                          <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                            ABC Motor Parts
                          </h1>
                        </div>

                        <h1 class="text-gray-800 text-3xl font-medium">
                          Edit Voucher
                        </h1>
                      </div>
                      <div class="relative z-0 w-full mb-5">
                        <input
                          type="text"
                          name="code"
                          value={this.state.code}
                          onChange={this.onChange}
                          placeholder=" "
                          required
                          class={
                            "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                          }
                        />
                        <label
                          for="code"
                          class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                        >
                          Code
                        </label>
                        <span class="text-sm text-red-600" id="error"></span>
                      </div>
                      <div class="relative z-0 w-full mb-5">
                        <input
                          type="text"
                          name="value"
                          value={this.state.value}
                          onChange={this.onChange}
                          placeholder=" "
                          required
                          class={
                            "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                          }
                        />
                        <label
                          for="value"
                          class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                        >
                          Value
                        </label>
                        <span class="text-sm text-red-600" id="error"></span>
                      </div>
                      <div className="flex items-center justify-center w-full">
                        <button
                          type="submit"
                          className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-2 text-sm"
                        >
                          Submit
                        </button>
                        <button
                          onClick={this.handleToggleModal}
                          className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                        >
                          Cancel
                        </button>
                      </div>

                      <div
                        onClick={this.handleToggleModal}
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
        <div
          class={
            this.state.table_export_modal ? "h-screen " : "h-screen hidden"
          }
        >
          <VoucherTableExportModal
            handleToggleExportTable={this.handleToggleExportTable}
            vouchers={filteredData}
          />
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  vouchers: state.products.vouchers,
  AuthReducer: state.AuthReducer,
});

export default connect(mapStateToProps, {
  getVoucherList,
  addVoucher,
  updateVoucher,
  changeVoucherStatus,
})(VoucherSetting);
