import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getSupplierList,
  changeSupplierStatus,
} from "../../store/actions/supplier/suppliers";
import {
  getProductList,
  changeProductStatus,
} from "../../store/actions/product/products";
import {
  getAccountList,
  changeAccountStatus,
  CheckAdminPassword,
} from "../../store/actions/account/auth";
import {
  getInventoryList,
  changeInventoryStatus,
} from "../../store/actions/inventory/inventories";
import {
  getTransactionList,
  changeTransactionStatus,
} from "../../store/actions/transaction/transactions.js";
import {
  getVoucherList,
  changeVoucherStatus,
} from "../../store/actions/product/products";
import "react-accessible-accordion/dist/fancy-example.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import swal from "sweetalert";
import { CheckPassword } from "../../Helpers/functions";
import { TimeScale } from "chart.js";
let passwordVerified = false;
class Archive extends React.Component {
  state = {
    searchProduct: "",
    searchSupplier: "",
    searchAccount: "",
    searchInventory: "",
    searchTransaction: "",
    searchVoucher: "",
  };

  componentDidMount() {
    this.props.getSupplierList();
    this.props.getProductList();
    this.props.getAccountList();
    this.props.getInventoryList();
    this.props.getTransactionList();
    this.props.getVoucherList();
  }

  handleRetriveProduct = (ProductID) => {
    return (event) => {
      event.preventDefault();
      swal("To retrive this product?\n You need to type in your password:", {
        content: {
          element: "input",
          attributes: {
            placeholder: "Type your password",
            type: "password",
          },
        },
        icon: "info",
        buttons: {
          confirm: {
            text: "Confirm",
            visible: true,
            className: "",
            closeModal: true,
          },
          cancel: {
            text: "Cancel",
            value: "cancel",
            visible: true,
            className: "",
            closeModal: true,
          },
        },
      }).then((value) => {
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
                formData.append("status", true);
                this.props.changeProductStatus(ProductID, formData);
                swal("Successfully retrived product!", "", "success");
              } else {
                swal("Invalid password!", "", "error");
              }
            })
            .catch((err) => console.log(err));
        }
      });
    };
  };
  handleRetriveSupplier(supplierID) {
    return (event) => {
      event.preventDefault();

      swal("To retrive this supplier?\n You need to type in your password:", {
        content: {
          element: "input",
          attributes: {
            placeholder: "Type your password",
            type: "password",
          },
        },
        icon: "info",
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
      }).then((value) => {
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
                formData.append("status", true);
                this.props.changeSupplierStatus(supplierID, formData);
                swal("Successfully retrived supplier!", "", "success");
              } else {
                swal("Invalid password!", "", "error");
              }
            })
            .catch((err) => console.log(err));
        }
      });
    };
  }
  handleRetriveAccount(accountID) {
    return (event) => {
      event.preventDefault();

      swal("To retrive this account?\n You need to type in your password:", {
        content: {
          element: "input",
          attributes: {
            placeholder: "Type your password",
            type: "password",
          },
        },
        icon: "info",
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
      }).then((value) => {
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
                formData.append("status", true);
                this.props.changeAccountStatus(accountID, formData);
                swal("Successfully retrived account!", "", "success");
              } else {
                swal("Invalid password!", "", "error");
              }
            })
            .catch((err) => console.log(err));
        }
      });
    };
  }
  handleRetriveInventory(inventoryID) {
    return (event) => {
      event.preventDefault();
      swal("To retrive this inventory?\n You need to type in your password:", {
        content: {
          element: "input",
          attributes: {
            placeholder: "Type your password",
            type: "password",
          },
        },
        icon: "info",
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
      }).then((value) => {
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
                formData.append("status", true);
                this.props.changeInventoryStatus(inventoryID, formData);
                swal("Successfully retrived inventory!", "", "success");
              } else {
                swal("Invalid password!", "", "error");
              }
            })
            .catch((err) => console.log(err));
        }
      });
    };
  }
  handleRetriveTransaction(transactionID) {
    return (event) => {
      event.preventDefault();

      swal(
        "To retrive this transaction?\n You need to type in your password:",
        {
          content: {
            element: "input",
            attributes: {
              placeholder: "Type your password",
              type: "password",
            },
          },
          icon: "info",
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
                formData.append("status", true);
                this.props.changeTransactionStatus(transactionID, formData);
                swal("Successfully retrived transaction!", "", "success");
              } else {
                swal("Invalid password!", "", "error");
              }
            })
            .catch((err) => console.log(err));
        }
      });
    };
  }
  handleRetriveVoucher(voucherID) {
    return (event) => {
      event.preventDefault();

      swal("To retrive this voucher?\n You need to type in your password:", {
        content: {
          element: "input",
          attributes: {
            placeholder: "Type your password",
            type: "password",
          },
        },
        icon: "info",
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
      }).then((value) => {
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
                formData.append("status", true);
                this.props.changeVoucherStatus(voucherID, formData);
                swal("Successfully retrived voucher!", "", "success");
              } else {
                swal("Invalid password!", "", "error");
              }
            })
            .catch((err) => console.log(err));
        }
      });
    };
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    let lowercasedFilterProduct = this.state.searchProduct.toLowerCase();
    let lowercasedFilterSupplier = this.state.searchSupplier.toLowerCase();
    let lowercasedFilterAccount = this.state.searchAccount.toLowerCase();
    let lowercasedFilterInventory = this.state.searchInventory.toLowerCase();
    let lowercasedFilterTransaction =
      this.state.searchTransaction.toLowerCase();
    let lowercasedFilterVoucher = this.state.searchVoucher.toLowerCase();
    let filteredDataSupplier;
    let filteredDataProduct;
    let filteredDataAccounts;
    let filteredDataInventory;
    let filteredDataTransaction;
    let filteredDataVoucher;
    filteredDataSupplier = [];
    filteredDataSupplier = this.props.suppliers.filter((supplier) => {
      if (!supplier.status)
        return supplier.name
          .toString()
          .toLowerCase()
          .includes(lowercasedFilterSupplier);
    });
    filteredDataProduct = [];
    filteredDataProduct = this.props.products.filter((product) => {
      if (!product.status)
        return product.name
          .toString()
          .toLowerCase()
          .includes(lowercasedFilterProduct);
    });
    filteredDataAccounts = [];
    filteredDataAccounts = this.props.accounts.filter((account) => {
      if (!account.user.is_active && account.user.is_superuser)
        return account.user.username
          .toString()
          .toLowerCase()
          .includes(lowercasedFilterAccount);
    });

    filteredDataInventory = [];
    filteredDataInventory = this.props.inventories.filter((inventory) => {
      if (!inventory.status)
        return inventory.product_info.name
          .toString()
          .toLowerCase()
          .includes(lowercasedFilterInventory);
    });
    filteredDataTransaction = [];
    filteredDataTransaction = this.props.transactions.filter((trans) => {
      if (!trans.status)
        return trans.user_info.name
          .split(" ")[0]
          .toString()
          .toLowerCase()
          .includes(lowercasedFilterTransaction);
    });
    filteredDataVoucher = [];
    filteredDataVoucher = this.props.vouchers.filter((voucher) => {
      if (!voucher.status)
        return voucher.code
          .split(" ")[0]
          .toString()
          .toLowerCase()
          .includes(lowercasedFilterVoucher);
    });
    return (
      <>
        <div class="bg-gray-100 flex-1 mt-20 md:mt-14 pb-24 md:pb-5">
          <div class="bg-gray-800 pt-3">
            <div class="rounded-tl-3xl bg-gradient-to-r from-teal_custom to-gray-800 p-4 shadow text-2xl text-white">
              <h3 class="font-bold pl-2">Archives</h3>
            </div>
          </div>

          <div className="p-5 w-full">
            <div className="mx-auto shadow rounded">
              <Accordion allowMultipleExpanded={false} allowZeroExpanded={true}>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span class=" text-2xl font-medium ">Products</span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="bg-white flex flex-col lg:flex-row p-4 lg:p-8 justify-end items-start lg:items-stretch w-full">
                      <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                        <div className="lg:ml-6 flex items-start w-full">
                          <div className="text-white cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center">
                            <i class="fal fa-print fa-lg"></i>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                        <div className="lg:ml-6 flex items-center">
                          <div class="relative w-full">
                            <input
                              type="text"
                              name="searchProduct"
                              placeholder=" "
                              required
                              class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                              onChange={this.onChange}
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
                      <table className="min-w-full bg-white dark:bg-gray-800">
                        <thead>
                          <tr className="w-full h-16 border-gray-300 border-b py-8 text-left font-bold text-gray-500">
                            <th className="pl-14 pr-6 text-md">ID</th>
                            <th className=" pr-6 text-md">Product</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDataProduct.map((product) => (
                            <tr
                              key={product.id}
                              className="h-24 border-gray-300 dark:border-gray-200 border-b"
                            >
                              <td className="pl-12 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {product.id}
                              </td>
                              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {product.name}
                              </td>

                              <td className="pr-8 relative">
                                <div
                                  onClick={this.handleRetriveProduct(
                                    product.id
                                  )}
                                  className="cursor-pointer text-sm bg-teal_custom text-white px-3 py-3 font-normal hover:bg-gray-600 text-center"
                                >
                                  Retrive
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span class=" text-2xl font-medium">Suppliers</span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="bg-white flex flex-col lg:flex-row p-4 lg:p-8 justify-end items-start lg:items-stretch w-full">
                      <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                        <div className="lg:ml-6 flex items-start w-full">
                          <div className="text-white cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center">
                            <i class="fal fa-print fa-lg"></i>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                        <div className="lg:ml-6 flex items-center">
                          <div class="relative w-full">
                            <input
                              type="text"
                              name="searchSupplier"
                              placeholder=" "
                              required
                              class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                              onChange={this.onChange}
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
                            <th className=" pr-6 text-md">Supplier</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDataSupplier.map((supplier) => (
                            <tr
                              key={supplier.id}
                              className="h-24 border-gray-300 dark:border-gray-200 border-b"
                            >
                              <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {supplier.id}
                              </td>
                              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {supplier.name}
                              </td>
                              <td className="pr-8 relative">
                                <div
                                  onClick={this.handleRetriveSupplier(
                                    supplier.id
                                  )}
                                  className="cursor-pointer text-sm bg-teal_custom text-white px-3 py-3 font-normal hover:bg-gray-600 text-center"
                                >
                                  Retrive
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span class=" text-2xl font-medium">Accounts</span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="bg-white flex flex-col lg:flex-row p-4 lg:p-8 justify-end items-start lg:items-stretch w-full">
                      <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                        <div className="lg:ml-6 flex items-start w-full">
                          <div className="text-white cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center">
                            <i class="fal fa-print fa-lg"></i>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                        <div className="lg:ml-6 flex items-center">
                          <div class="relative w-full">
                            <input
                              type="text"
                              name="searchAccount"
                              placeholder=" "
                              required
                              class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                              onChange={this.onChange}
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
                            <th className=" pr-6 text-md">Username</th>
                            <th className=" pr-6 text-md">Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDataAccounts.map((account) => (
                            <tr
                              key={account.id}
                              className="h-24 border-gray-300 dark:border-gray-200 border-b"
                            >
                              <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {account.id}
                              </td>
                              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {account.user.username}
                              </td>

                              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {account.user.email}
                              </td>

                              <td className="pr-8 relative">
                                <div
                                  onClick={this.handleRetriveAccount(
                                    account.user.id
                                  )}
                                  className="cursor-pointer text-sm bg-teal_custom text-white px-3 py-3 font-normal hover:bg-gray-600 text-center"
                                >
                                  Retrive
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span class=" text-2xl font-medium">Inventories</span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="bg-white flex flex-col lg:flex-row p-4 lg:p-8 justify-end items-start lg:items-stretch w-full">
                      <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                        <div className="lg:ml-6 flex items-start w-full">
                          <div className="text-white cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center">
                            <i class="fal fa-print fa-lg"></i>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                        <div className="lg:ml-6 flex items-center">
                          <div class="relative w-full">
                            <input
                              type="text"
                              name="searchInventory"
                              placeholder=" "
                              required
                              class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                              onChange={this.onChange}
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
                            <th className=" pr-6 text-md">Product</th>
                            <th className="pl-14 pr-6 text-md">Supplier</th>
                            <th className=" pr-6 text-md">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDataInventory.map((inventory) => (
                            <tr
                              key={inventory.id}
                              className="h-24 border-gray-300 dark:border-gray-200 border-b"
                            >
                              <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {inventory.id}
                              </td>
                              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {inventory.product_info.name}
                              </td>
                              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {inventory.supplier_info.name}
                              </td>

                              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {inventory.created_at}
                              </td>

                              <td className="pr-8 relative">
                                <div
                                  onClick={this.handleRetriveInventory(
                                    inventory.id
                                  )}
                                  className="cursor-pointer text-sm bg-teal_custom text-white px-3 py-3 font-normal hover:bg-gray-600 text-center"
                                >
                                  Retrive
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span class=" text-2xl font-medium">Transactions</span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="bg-white flex flex-col lg:flex-row p-4 lg:p-8 justify-end items-start lg:items-stretch w-full">
                      <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                        <div className="lg:ml-6 flex items-start w-full">
                          <div className="text-white cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center">
                            <i class="fal fa-print fa-lg"></i>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                        <div className="lg:ml-6 flex items-center">
                          <div class="relative w-full">
                            <input
                              type="text"
                              name="searchTransaction"
                              placeholder=" "
                              required
                              class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                              onChange={this.onChange}
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
                            <th className=" pr-6 text-md">User</th>
                            <th className="pl-14 pr-6 text-md">Items</th>
                            <th className=" pr-6 text-md">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDataTransaction.map((trans) => (
                            <tr
                              key={trans.id}
                              className="h-24 border-gray-300 dark:border-gray-200 border-b"
                            >
                              <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {trans.id}
                              </td>

                              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {trans.user_info.name.split(" ")[0]}
                              </td>
                              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 w-3/12">
                                {trans.items.map((transac, index) => (
                                  <tr
                                    className={
                                      trans.items.length === 1
                                        ? "h-20 border-gray-300"
                                        : index + 1 === trans.items.length
                                        ? "h-20 border-gray-300"
                                        : "h-20 border-gray-300 border-b-2"
                                    }
                                  >
                                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 ">
                                      {transac.product.name}
                                      <div>
                                        ({transac.product_variation_info.color}/
                                        {transac.product_variation_info.size})
                                      </div>
                                    </td>
                                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 ">
                                      {transac.product.price}
                                    </td>
                                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 ">
                                      {transac.quantity}
                                    </td>
                                  </tr>
                                ))}
                              </td>
                              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {trans.created_at}
                              </td>

                              <td className="pr-8 relative">
                                <div
                                  onClick={this.handleRetriveTransaction(
                                    trans.id
                                  )}
                                  className="cursor-pointer text-sm bg-teal_custom text-white px-3 py-3 font-normal hover:bg-gray-600 text-center"
                                >
                                  Retrive
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span class=" text-2xl font-medium">Vouchers</span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="bg-white flex flex-col lg:flex-row p-4 lg:p-8 justify-end items-start lg:items-stretch w-full">
                      <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                        <div className="lg:ml-6 flex items-start w-full">
                          <div className="text-white cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center">
                            <i class="fal fa-print fa-lg"></i>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                        <div className="lg:ml-6 flex items-center">
                          <div class="relative w-full">
                            <input
                              type="text"
                              name="searchVoucher"
                              placeholder=" "
                              required
                              class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                              onChange={this.onChange}
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
                            <th className="pl-14 pr-6 text-md">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDataVoucher.map((voucher) => (
                            <tr
                              key={voucher.id}
                              className="h-24 border-gray-300 dark:border-gray-200 border-b"
                            >
                              <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {voucher.id}
                              </td>
                              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {voucher.code}
                              </td>
                              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                {voucher.value}
                              </td>

                              <td className="pr-8 relative">
                                <div
                                  onClick={this.handleRetriveVoucher(
                                    voucher.id
                                  )}
                                  className="cursor-pointer text-sm bg-teal_custom text-white px-3 py-3 font-normal hover:bg-gray-600 text-center"
                                >
                                  Retrive
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  suppliers: state.suppliers.suppliers,
  products: state.products.products,
  accounts: state.AuthReducer.accounts,
  inventories: state.inventories.inventories,
  transactions: state.transactions.transactions,
  vouchers: state.products.vouchers,
  AuthReducer: state.AuthReducer,
  AdminPasswordValidate: state.AuthReducer.AdminPasswordValidate,
});

export default connect(mapStateToProps, {
  getSupplierList,
  getProductList,
  getAccountList,
  getInventoryList,
  getTransactionList,
  getVoucherList,
  changeProductStatus,
  changeSupplierStatus,
  changeAccountStatus,
  changeInventoryStatus,
  changeTransactionStatus,
  changeVoucherStatus,
  CheckAdminPassword,
})(Archive);
