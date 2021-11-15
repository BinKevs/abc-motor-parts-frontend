import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/account/auth";
import React from "react";
import { loadUser } from "../../store/actions/account/auth";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import { getTransactionList } from "../../store/actions/transaction/transactions.js";
import CartIndex from "../Customers/Cart/CartIndex";
import { URL_IMPORT } from "../../Helpers/constant";
let Variablequantity = 0;
class MainLayout extends React.Component {
  state = {
    DashboardNavBtn: false,
    VoucherNavBtn: false,
    CustomerNavBtn: false,
    OrdersNavBtn: false,
    RefundNavBtn: false,
    ProductsNavBtn: true,
    ReportsNavBtn: false,
    ProductSettingNavBtn: false,
    InventoryNavBtn: false,
    SupplierNavBtn: false,
    TransactionsNavBtn: false,
    TransactionsItemsNavBtn: false,
    showButtonScroll: false,
    ArchiveNavBtn: false,
    SideButton: false,
    cartShow: false,
    dropDownSetting: false,
    quantity: 0,
  };

  componentDidMount() {
    Variablequantity = 0;

    window.addEventListener("scroll", this.handleScroll);
    // window.addEventListener('beforeunload', (ev) => {
    // 	ev.preventDefault();
    // 	swal('Write something here:', {
    // 		content: 'input',
    // 	}).then((value) => {
    // 		swal(`You typed: ${value}`);
    // 	});
    // });
    this.props.cartItems.map(
      (item) => (Variablequantity += parseInt(item.quantity))
    );
    this.setState({
      quantity: Variablequantity,
    });
    this.props.loadUser();
  }
  componentDidUpdate(prevProps, prevState) {
    Variablequantity = 0;
    if (prevProps.cartItems !== this.props.cartItems) {
      this.props.cartItems.map(
        (item) => (Variablequantity += parseInt(item.quantity))
      );
      this.setState({
        quantity: Variablequantity,
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    // window.addEventListener('beforeunload', (ev) => {
    // 	ev.preventDefault();
    // 	swal('Write something here:', {
    // 		content: 'input',
    // 	}).then((value) => {
    // 		swal(`You typed: ${value}`);
    // 	});
    // });
  }
  handleCartShow = () => {
    this.setState({
      cartShow: !this.state.cartShow,
    });
  };
  handleScroll = () => {
    if (!this.state.showButtonScroll && window.pageYOffset > 300) {
      this.setState({
        showButtonScroll: true,
      });
    } else if (this.state.showButtonScroll && window.pageYOffset <= 300) {
      this.setState({
        showButtonScroll: false,
      });
    }
  };

  setScrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  setActiveNav(NavBtn) {
    return (e) => {
      e.preventDefault();
      if (NavBtn === "DashboardNavBtn") {
        this.setState({
          DashboardNavBtn: true,
          OrdersNavBtn: false,
          RefundNavBtn: false,
          VoucherNavBtn: false,
          CustomerNavBtn: false,
          ProductsNavBtn: false,
          ReportsNavBtn: false,
          ProductSettingNavBtn: false,
          InventoryNavBtn: false,
          SupplierNavBtn: false,
          TransactionsNavBtn: false,
          TransactionsItemsNavBtn: false,
          ArchiveNavBtn: false,
        });
      } else if (NavBtn === "CustomerNavBtn") {
        this.setState({
          VoucherNavBtn: false,
          CustomerNavBtn: true,
          DashboardNavBtn: false,
          OrdersNavBtn: false,
          RefundNavBtn: false,
          ProductsNavBtn: false,
          ReportsNavBtn: false,
          ProductSettingNavBtn: false,
          InventoryNavBtn: false,
          SupplierNavBtn: false,
          TransactionsNavBtn: false,
          TransactionsItemsNavBtn: false,
          ArchiveNavBtn: false,
        });
      } else if (NavBtn === "VoucherNavBtn") {
        this.setState({
          VoucherNavBtn: true,
          CustomerNavBtn: false,
          DashboardNavBtn: false,
          OrdersNavBtn: false,
          RefundNavBtn: false,
          ProductsNavBtn: false,
          ReportsNavBtn: false,
          ProductSettingNavBtn: false,
          InventoryNavBtn: false,
          SupplierNavBtn: false,
          TransactionsNavBtn: false,
          TransactionsItemsNavBtn: false,
          ArchiveNavBtn: false,
        });
      } else if (NavBtn === "OrdersNavBtn") {
        this.setState({
          DashboardNavBtn: false,
          VoucherNavBtn: false,
          CustomerNavBtn: false,
          OrdersNavBtn: true,
          RefundNavBtn: false,
          ProductsNavBtn: false,
          ReportsNavBtn: false,
          ProductSettingNavBtn: false,
          InventoryNavBtn: false,
          SupplierNavBtn: false,
          TransactionsNavBtn: false,
          TransactionsItemsNavBtn: false,
          ArchiveNavBtn: false,
        });
      } else if (NavBtn === "RefundNavBtn") {
        this.setState({
          DashboardNavBtn: false,
          VoucherNavBtn: false,
          CustomerNavBtn: false,
          OrdersNavBtn: false,
          RefundNavBtn: true,
          ProductsNavBtn: false,
          ReportsNavBtn: false,
          ProductSettingNavBtn: false,
          InventoryNavBtn: false,
          SupplierNavBtn: false,
          TransactionsNavBtn: false,
          TransactionsItemsNavBtn: false,
          ArchiveNavBtn: false,
        });
      } else if (NavBtn === "ProductsNavBtn") {
        this.setState({
          DashboardNavBtn: false,
          VoucherNavBtn: false,
          CustomerNavBtn: false,
          OrdersNavBtn: false,
          RefundNavBtn: false,
          ProductsNavBtn: true,
          ReportsNavBtn: false,
          ProductSettingNavBtn: false,
          InventoryNavBtn: false,
          SupplierNavBtn: false,
          TransactionsNavBtn: false,
          TransactionsItemsNavBtn: false,
          ArchiveNavBtn: false,
        });
      } else if (NavBtn === "ReportsNavBtn") {
        this.setState({
          DashboardNavBtn: false,
          VoucherNavBtn: false,
          CustomerNavBtn: false,
          OrdersNavBtn: false,
          RefundNavBtn: false,
          ProductsNavBtn: false,
          ReportsNavBtn: true,
          ProductSettingNavBtn: false,
          InventoryNavBtn: false,
          SupplierNavBtn: false,
          TransactionsNavBtn: false,
          TransactionsItemsNavBtn: false,
          ArchiveNavBtn: false,
        });
      } else if (NavBtn === "ProductSettingNavBtn") {
        this.setState({
          DashboardNavBtn: false,
          VoucherNavBtn: false,
          CustomerNavBtn: false,
          OrdersNavBtn: false,
          RefundNavBtn: false,
          ProductsNavBtn: false,
          ReportsNavBtn: false,
          ProductSettingNavBtn: true,
          InventoryNavBtn: false,
          SupplierNavBtn: false,
          TransactionsNavBtn: false,
          TransactionsItemsNavBtn: false,
          ArchiveNavBtn: false,
        });
      } else if (NavBtn === "InventoryNavBtn") {
        this.setState({
          DashboardNavBtn: false,
          VoucherNavBtn: false,
          CustomerNavBtn: false,
          OrdersNavBtn: false,
          RefundNavBtn: false,
          ProductsNavBtn: false,
          ReportsNavBtn: false,
          ProductSettingNavBtn: false,
          InventoryNavBtn: true,
          SupplierNavBtn: false,
          TransactionsNavBtn: false,
          TransactionsItemsNavBtn: false,
          ArchiveNavBtn: false,
        });
      } else if (NavBtn === "SupplierNavBtn") {
        this.setState({
          DashboardNavBtn: false,
          OrdersNavBtn: false,
          RefundNavBtn: false,
          VoucherNavBtn: false,
          CustomerNavBtn: false,
          ProductsNavBtn: false,
          ReportsNavBtn: false,
          ProductSettingNavBtn: false,
          InventoryNavBtn: false,
          SupplierNavBtn: true,
          TransactionsNavBtn: false,
          TransactionsItemsNavBtn: false,
          ArchiveNavBtn: false,
        });
      } else if (NavBtn === "TransactionsNavBtn") {
        this.setState({
          DashboardNavBtn: false,
          OrdersNavBtn: false,
          RefundNavBtn: false,
          VoucherNavBtn: false,
          CustomerNavBtn: false,
          ProductsNavBtn: false,
          ReportsNavBtn: false,
          ProductSettingNavBtn: false,
          InventoryNavBtn: false,
          SupplierNavBtn: false,
          TransactionsNavBtn: true,
          TransactionsItemsNavBtn: false,
          ArchiveNavBtn: false,
        });
      } else if (NavBtn === "TransactionsItemsNavBtn") {
        this.setState({
          DashboardNavBtn: false,
          OrdersNavBtn: false,
          RefundNavBtn: false,
          ProductsNavBtn: false,
          VoucherNavBtn: false,
          CustomerNavBtn: false,
          ReportsNavBtn: false,
          ProductSettingNavBtn: false,
          InventoryNavBtn: false,
          SupplierNavBtn: false,
          TransactionsNavBtn: false,
          TransactionsItemsNavBtn: true,
          ArchiveNavBtn: false,
        });
      } else if (NavBtn === "ArchiveNavBtn") {
        this.setState({
          DashboardNavBtn: false,
          OrdersNavBtn: false,
          RefundNavBtn: false,
          ProductsNavBtn: false,
          VoucherNavBtn: false,
          CustomerNavBtn: false,
          ReportsNavBtn: false,
          ProductSettingNavBtn: false,
          InventoryNavBtn: false,
          SupplierNavBtn: false,
          TransactionsNavBtn: false,
          TransactionsItemsNavBtn: false,
          ArchiveNavBtn: true,
        });
      }
    };
  }

  handleLogout = (e) => {
    e.preventDefault();
    this.props.logout();
    window.location.href = "https://abc-motor-parts.herokuapp.com/login";
  };
  setDropDown = (e) => {
    e.preventDefault();
    this.setState({
      dropDownSetting: !this.state.dropDownSetting,
    });
  };
  setDropdownWithRedirect = (ComponentTogo) => {
    return (e) => {
      e.preventDefault();
      this.setState({
        dropDownSetting: !this.state.dropDownSetting,
      });
      this.props.getTransactionList();
      this.props.history.push(ComponentTogo);
      // window.location.href = "http://localhost:3000/"+ComponentTogo;
    };
  };
  render() {
    const {
      DashboardNavBtn,
      ProductsNavBtn,
      ReportsNavBtn,
      ProductSettingNavBtn,
      InventoryNavBtn,
      SupplierNavBtn,
      TransactionsNavBtn,
      TransactionsItemsNavBtn,
      OrdersNavBtn,
      RefundNavBtn,
      VoucherNavBtn,
      CustomerNavBtn,
      ArchiveNavBtn,
    } = this.state;

    return (
      <>
        <div
          className={
            !this.state.showButtonScroll
              ? "hidden "
              : "flex justify-center w-full"
          }
        >
          <div
            onClick={this.setScrollTop}
            className="text-white cursor-pointer hover:bg-teal_custom bg-gray-600 w-10 h-10 lg:w-14 lg:h-14 fixed bottom-24 lg:bottom-8  z-10 rounded flex items-center justify-center "
          >
            <i class="fad fa-arrow-up fa-2x"></i>
          </div>
        </div>
        <nav class="bg-gray-800 pt-2 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
          <div class="flex flex-wrap justify-between items-center">
            <Link
              to="/products/All"
              replace
              class="flex pt-2 w-1/2 md:w-1/3 justify-start text-white"
            >
              <i class="far fa-motorcycle fa-2x px-3 "></i>
              <h1 class="font-Montserrat text-base">ABC Motor Parts</h1>
            </Link>

            <div
              class="flex
						pt-2
						content-center
						w-1/3
						justify-end"
            >
              <div
                class="flex
							justify-around
							flex-none
							items-center"
              >
                <div class="relative inline-block space-x-4 lg:mr-2 py-2">
                  <div
                    onClick={this.handleCartShow}
                    // onMouseLeave={this.handleCartShow}
                    className={
                      this.props.AuthReducer.user
                        ? this.props.AuthReducer.user.is_staff
                          ? "hidden"
                          : "inline-block space-x-2 text-white cursor-pointer"
                        : ""
                    }
                  >
                    <i class="fad fa-shopping-cart"></i>
                    <span>Cart</span>
                    <span className="rounded-full px-1 bg-red-600">
                      {this.state.quantity}
                    </span>
                  </div>
                  <button
                    onClick={this.setDropDown}
                    class=" text-white focus:outline-none"
                  >
                    {" "}
                    <span class="pr-2">
                      <i class="fad fa-user-friends"></i>
                    </span>{" "}
                    Hi, User{" "}
                    <svg
                      class="h-3 fill-current inline"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </button>

                  <div
                    id="myDropdown"
                    class={`absolute bg-gray-800 text-white right-0 mt-3 p-3 overflow-auto z-30 w-36 ${
                      this.state.dropDownSetting ? "" : "invisible"
                    }`}
                  >
                    <div className="">
                      {this.props.AuthReducer.user ? (
                        this.props.AuthReducer.user.is_staff ? (
                          <>
                            <div
                              onClick={this.setDropdownWithRedirect(
                                "/accounts/settings/menu"
                              )}
                            >
                              <div class="p-2 hover:bg-gray-800 text-white text-sm hover:no-underline inline-block cursor-pointer">
                                Settings
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              onClick={this.setDropdownWithRedirect(
                                "/account/purchases"
                              )}
                            >
                              <div class="p-2 hover:bg-gray-800 text-white text-sm hover:no-underline inline-block cursor-pointer">
                                Purchases
                              </div>
                            </div>
                            <div
                              onClick={this.setDropdownWithRedirect(
                                "/account/settings"
                              )}
                            >
                              <div class="p-2 hover:bg-gray-800 text-white text-sm hover:no-underline inline-block cursor-pointer">
                                Account
                              </div>
                            </div>
                          </>
                        )
                      ) : (
                        ""
                      )}
                      {/* {this.props.AuthReducer.is_superuser ? (
												<Link
													to="/registerAccount"
													class="p-2 hover:bg-gray-800 text-white text-sm hover:no-underline inline-block"
												>
													<i class="fa fa-user-plus fa-fw"></i> Create User
												</Link>
											) : (
												''
											)} */}
                      {/* <div class="border border-gray-800"></div> */}
                      {/* {!this.props.AuthReducer.isAuthenticated ? (
												<Link
													to="Login"
													class="p-2 hover:bg-gray-800 text-white text-sm hover:no-underline inline-block"
												>
													<i class="fas fa-sign-in-alt fa-fw"></i> Login
												</Link>
											) : ( */}
                      <div
                        onClick={this.handleLogout}
                        class="p-2 hover:bg-gray-800 text-white text-sm hover:no-underline inline-block cursor-pointer"
                      >
                        Logout
                      </div>
                      {/* )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div
          className={
            this.props.AuthReducer.user
              ? this.props.AuthReducer.user.is_staff
                ? "hidden fixed w-full z-10 top-12 bg-gradient-to-r from-gray-800 to-teal_custom_darker "
                : "fixed w-full z-10 top-12 bg-gradient-to-r from-gray-800 to-teal_custom_darker "
              : ""
          }
        >
          <div className="container mx-auto px-6 py-3">
            <nav className={"flex justify-center items-center mt-4"}>
              {/* flex-col sm:flex-row */}
              <div className="flex text-lg font-semibold tracking-wide">
                <Link
                  to="/Home"
                  className="text-white hover:underline mx-3 mt-0 "
                >
                  Home
                </Link>
                <Link
                  to="/products/All"
                  className="text-white hover:underline mx-3 mt-0"
                >
                  Shop
                </Link>

                <Link
                  to="/Categories"
                  className=" text-white hover:underline mx-3 mt-0"
                >
                  Categories
                </Link>

                <div className=" text-white hover:underline mx-3 mt-0">
                  About
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div class="relative flex flex-col lg:flex-row bg-gray-800">
          {this.props.AuthReducer.user ? (
            this.props.AuthReducer.user.is_staff ? (
              <div class="shadow-xl h-16 fixed bottom-0 lg:relative lg:h-screen w-full lg:w-48 z-10 bg-gray-800">
                <div class="lg:mt-20 overflow-x-scroll md:overflow-x-hidden lg:w-48 lg:fixed lg:left-0 lg:top-0 text-left bg-gray-800">
                  <ul
                    id="NavDiv"
                    class="flex flex-row lg:flex-col py-0 lg:py-3 px-1 lg:px-2 text-center lg:text-left"
                  >
                    <li
                      class="mr-3 flex-1 NavBtn"
                      onClick={this.setActiveNav("DashboardNavBtn")}
                    >
                      <Link
                        to="/dashboard"
                        class={
                          DashboardNavBtn
                            ? "MainLayoutNav MainLayoutNavActive"
                            : "MainLayoutNav"
                        }
                      >
                        <i className="fas fa-chart-line pr-0 lg:pr-3"></i>
                        <span
                          class={
                            DashboardNavBtn
                              ? "MainLayoutNav2 MainLayoutNavActive2"
                              : "MainLayoutNav2"
                          }
                        >
                          Dashboard
                        </span>
                      </Link>
                    </li>
                    <li
                      class="mr-3 flex-1 NavBtn"
                      onClick={this.setActiveNav("OrdersNavBtn")}
                    >
                      <Link
                        to="/transactions/queuing"
                        class={
                          OrdersNavBtn
                            ? "MainLayoutNav MainLayoutNavActive"
                            : "MainLayoutNav"
                        }
                      >
                        <i className="fal fa-bags-shopping pr-0 lg:pr-3"></i>
                        <span
                          class={
                            OrdersNavBtn
                              ? "MainLayoutNav2 MainLayoutNavActive2"
                              : "MainLayoutNav2"
                          }
                        >
                          Orders
                        </span>
                      </Link>
                    </li>
                    <li
                      class="mr-3 flex-1 NavBtn"
                      onClick={this.setActiveNav("RefundNavBtn")}
                    >
                      <Link
                        to="/refunds"
                        class={
                          RefundNavBtn
                            ? "MainLayoutNav MainLayoutNavActive"
                            : "MainLayoutNav"
                        }
                      >
                        <i className="fad fa-undo-alt pr-0 lg:pr-3"></i>
                        <span
                          class={
                            RefundNavBtn
                              ? "MainLayoutNav2 MainLayoutNavActive2"
                              : "MainLayoutNav2"
                          }
                        >
                          Refund/Return
                        </span>
                      </Link>
                    </li>
                    {/* <li
                      class="mr-3 flex-1 NavBtn"
                      onClick={this.setActiveNav("ProductsNavBtn")}
                    >
                      <Link
                        to="/products"
                        class={
                          ProductsNavBtn
                            ? "MainLayoutNav MainLayoutNavActive"
                            : "MainLayoutNav"
                        }
                      >
                        <i className="fas fa-cart-plus pr-0 lg:pr-3"></i>
                        <span
                          class={
                            ProductsNavBtn
                              ? "MainLayoutNav2 MainLayoutNavActive2"
                              : "MainLayoutNav2"
                          }
                        >
                          Products
                        </span>
                      </Link>
                    </li> */}
                    <li
                      class="mr-3 flex-1 NavBtn"
                      onClick={this.setActiveNav("ReportsNavBtn")}
                    >
                      <div
                        class={
                          ReportsNavBtn
                            ? "MainLayoutNav MainLayoutNavActive"
                            : "MainLayoutNav"
                        }
                      >
                        <i class="fas fa-file-alt  pr-0 lg:pr-3 "></i>
                        <span
                          class={
                            ReportsNavBtn
                              ? "MainLayoutNav2 MainLayoutNavActive2"
                              : "MainLayoutNav2"
                          }
                        >
                          Reports
                        </span>
                      </div>
                    </li>
                    <li
                      class={
                        ReportsNavBtn
                          ? "mr-3 flex-1 flex-col ml-10"
                          : "mr-3 flex-1 hidden"
                      }
                      onClick={this.setActiveNav("ReportsNavBtn")}
                    >
                      <div className="flex justify-start ">
                        <Link
                          to="/reports/sales"
                          class={
                            "py-3 text-white no-underline hover:text-white border-b-2 border-gray-800  hover:border-teal_custom"
                          }
                        >
                          <i class="fad fa-money-check-edit pr-0 lg:pr-3 "></i>

                          <span
                            class={
                              "pb-1 lg:pb-0 text-xs lg:text-base text-gray-400 hover:text-white  block lg:inline-block"
                            }
                          >
                            Sales
                          </span>
                        </Link>
                      </div>

                      <div className="flex justify-start ">
                        <Link
                          to="/reports/inventories"
                          class={
                            "py-3 text-white no-underline hover:text-white border-b-2 border-gray-800  hover:border-teal_custom"
                          }
                        >
                          <i class="fad fa-dolly-flatbed-alt  pr-0 lg:pr-3 "></i>
                          <span
                            class={
                              "pb-1 lg:pb-0 text-xs lg:text-base text-gray-400 hover:text-white  block lg:inline-block"
                            }
                          >
                            Inventory
                          </span>
                        </Link>
                      </div>
                      <div className="flex justify-start ">
                        <Link
                          to="/reports/products"
                          class={
                            "py-3 text-white no-underline hover:text-white border-b-2 border-gray-800  hover:border-teal_custom"
                          }
                        >
                          <i class="fas fa-file-alt  pr-0 lg:pr-3 "></i>
                          <span
                            class={
                              "pb-1 lg:pb-0 text-xs lg:text-base text-gray-400 hover:text-white  block lg:inline-block"
                            }
                          >
                            Stocks
                          </span>
                        </Link>
                      </div>
                    </li>
                    <li
                      class="mr-3 flex-1 NavBtn"
                      onClick={this.setActiveNav("ProductSettingNavBtn")}
                    >
                      <Link
                        to="/admin/products/settings"
                        class={
                          ProductSettingNavBtn
                            ? "MainLayoutNav MainLayoutNavActive"
                            : "MainLayoutNav"
                        }
                      >
                        <i className="fas fa-sliders-h pr-0 lg:pr-3"></i>

                        <div
                          class={
                            ProductSettingNavBtn
                              ? "MainLayoutNav2 MainLayoutNavActive2"
                              : "MainLayoutNav2"
                          }
                        >
                          Product Setting
                        </div>
                      </Link>
                    </li>
                    <li
                      class="mr-3 flex-1 NavBtn"
                      onClick={this.setActiveNav("InventoryNavBtn")}
                    >
                      <Link
                        to="/inventories"
                        class={
                          InventoryNavBtn
                            ? "MainLayoutNav MainLayoutNavActive"
                            : "MainLayoutNav"
                        }
                      >
                        <i className="fad fa-dolly-flatbed-alt pr-0 lg:pr-3"></i>
                        <span
                          class={
                            InventoryNavBtn
                              ? "MainLayoutNav2 MainLayoutNavActive2"
                              : "MainLayoutNav2"
                          }
                        >
                          Inventory
                        </span>
                      </Link>
                    </li>
                    <li
                      class="mr-3 flex-1 NavBtn"
                      onClick={this.setActiveNav("SupplierNavBtn")}
                    >
                      <Link
                        to="/supplier"
                        class={
                          SupplierNavBtn
                            ? "MainLayoutNav MainLayoutNavActive"
                            : "MainLayoutNav"
                        }
                      >
                        <i className="fas fa-clipboard-list pr-0 lg:pr-3"></i>
                        <span
                          class={
                            SupplierNavBtn
                              ? "MainLayoutNav2 MainLayoutNavActive2"
                              : "MainLayoutNav2"
                          }
                        >
                          Supplier
                        </span>
                      </Link>
                    </li>
                    <li
                      class="mr-3 flex-1 NavBtn"
                      onClick={this.setActiveNav("TransactionsNavBtn")}
                    >
                      <Link
                        to="/transactions"
                        class={
                          TransactionsNavBtn
                            ? "MainLayoutNav MainLayoutNavActive"
                            : "MainLayoutNav"
                        }
                      >
                        <i className="fas fa-coins pr-0 lg:pr-3"></i>
                        <span
                          class={
                            TransactionsNavBtn
                              ? "MainLayoutNav2 MainLayoutNavActive2"
                              : "MainLayoutNav2"
                          }
                        >
                          Transactions
                        </span>
                      </Link>
                    </li>
                    {/* <li
                      class="mr-3 flex-1 NavBtn"
                      onClick={this.setActiveNav("TransactionsItemsNavBtn")}
                    >
                      <Link
                        to="/transactions/items"
                        class={
                          TransactionsItemsNavBtn
                            ? "MainLayoutNav MainLayoutNavActive"
                            : "MainLayoutNav"
                        }
                      >
                        <i className="fas fa-coins pr-0 lg:pr-3"></i>
                        <span
                          class={
                            TransactionsItemsNavBtn
                              ? "pb-1 lg:pb-0 text-xs align-middle lg:text-base text-white  block lg:inline-block"
                              : "pb-1 lg:pb-0 text-xs align-middle lg:text-base text-gray-400 hover:text-white block lg:inline-block"
                          }
                        >
                          Transaction <div>Item's History</div>
                        </span>
                      </Link>
                    </li> */}
                    <li
                      class="mr-3 flex-1 NavBtn"
                      onClick={this.setActiveNav("VoucherNavBtn")}
                    >
                      <Link
                        to="/vouchers"
                        class={
                          VoucherNavBtn
                            ? "MainLayoutNav MainLayoutNavActive"
                            : "MainLayoutNav"
                        }
                      >
                        <i className="fad fa-percent pr-0 lg:pr-3"></i>
                        <span
                          class={
                            VoucherNavBtn
                              ? "pb-1 lg:pb-0 text-xs align-middle lg:text-base text-white  block lg:inline-block"
                              : "pb-1 lg:pb-0 text-xs align-middle lg:text-base text-gray-400 hover:text-white block lg:inline-block"
                          }
                        >
                          Vouchers
                        </span>
                      </Link>
                    </li>
                    <li
                      class="mr-3 flex-1 NavBtn"
                      onClick={this.setActiveNav("CustomerNavBtn")}
                    >
                      <Link
                        to="/customer-setting"
                        class={
                          CustomerNavBtn
                            ? "MainLayoutNav MainLayoutNavActive"
                            : "MainLayoutNav"
                        }
                      >
                        <i className="fad fa-users pr-0 lg:pr-3"></i>

                        <span
                          class={
                            CustomerNavBtn
                              ? "pb-1 lg:pb-0 text-xs align-middle lg:text-base text-white  block lg:inline-block"
                              : "pb-1 lg:pb-0 text-xs align-middle lg:text-base text-gray-400 hover:text-white block lg:inline-block"
                          }
                        >
                          Customers
                        </span>
                      </Link>
                    </li>
                    <li
                      class="mr-3 flex-1 NavBtn"
                      onClick={this.setActiveNav("ArchiveNavBtn")}
                    >
                      <Link
                        to="/archive"
                        class={
                          ArchiveNavBtn
                            ? "block py-1 lg:py-3 pl-1 align-middle text-teal_custom no-underline border-b-2 border-teal_custom"
                            : "block py-1 lg:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-teal_custom"
                        }
                      >
                        <i className="fal fa-archive pr-0 lg:pr-3"></i>
                        <span
                          class={
                            ArchiveNavBtn
                              ? "pb-1 lg:pb-0 text-xs lg:text-base text-white  block lg:inline-block"
                              : "pb-1 lg:pb-0 text-xs lg:text-base text-gray-400 hover:text-white block lg:inline-block"
                          }
                        >
                          Archive
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          <div className={!this.state.cartShow ? "hidden" : "z-10"}>
            <div
              onClick={this.handleCartShow}
              class="fixed w-full h-full bg-gray-900 opacity-50"
            ></div>
            <CartIndex handleCartShow={this.handleCartShow} />
          </div>
          <div
            onClick={this.setDropDown}
            class={`fixed w-full h-full bg-gray-900 opacity-50 z-10 ${
              this.state.dropDownSetting ? "" : "hidden"
            }`}
          ></div>
          {this.props.children}
        </div>

        <footer
          className={
            this.props.AuthReducer.user
              ? this.props.AuthReducer.user.is_staff
                ? "hidden bg-gray-800 pt-6 sm:mt-6 "
                : "bg-gray-800 pt-6 sm:mt-6 "
              : ""
          }
        >
          <div class="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
            <div class="p-5 w-1/2 sm:w-4/12 md:w-3/12">
              <div class="text-md uppercase text-gray-400 font-medium mb-6">
                Navigation
              </div>

              <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-md font-medium duration-700"
              >
                Home
              </a>
              <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-md font-medium duration-700"
              >
                Shop
              </a>
              <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-md font-medium duration-700"
              >
                Categories
              </a>
              <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-md font-medium duration-700"
              >
                About
              </a>
            </div>

            <div class="p-5 w-1/2 sm:w-4/12 md:w-3/12">
              <div class="text-md uppercase text-gray-400 font-medium mb-6">
                Categories
              </div>

              <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-md font-medium duration-700"
              >
                Engine Parts and Accessories
              </a>
              <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-md font-medium duration-700"
              >
                Exhaust
              </a>
              <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-md font-medium duration-700"
              >
                Fuel and Air
              </a>
              <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-md font-medium duration-700"
              >
                Drive
              </a>
              <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-md font-medium duration-700"
              >
                Brakes
              </a>
              <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-md font-medium duration-700"
              >
                Drive
              </a>
            </div>

            <div class="p-5 w-1/2 sm:w-4/12 md:w-3/12">
              <div class="text-md uppercase text-gray-400 font-medium mb-6">
                Policy
              </div>

              <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-md font-medium duration-700"
              >
                Terms of Use
              </a>
              <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-md font-medium duration-700"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-md font-medium duration-700"
              >
                Shipping Policy
              </a>
            </div>

            <div class="p-5 w-1/2 sm:w-4/12 md:w-3/12">
              <div class="text-md uppercase text-gray-400 font-medium mb-6">
                Developers
              </div>

              <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-md font-medium duration-700"
              >
                Buenaseda, Kevin Bryan
              </a>
              <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-md font-medium duration-700"
              >
                Lamera, Chountal Louise
              </a>
              <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-md font-medium duration-700"
              >
                Mancio, Cedrick
              </a>
            </div>
          </div>

          <div class="pt-2">
            <div
              class="flex pb-5 px-3 m-auto pt-5 
            border-t border-gray-500 text-gray-400 text-sm 
            flex-col md:flex-row max-w-6xl"
            >
              <div class="mt-2">
                Copyright 2021 ABC motor parts. All Rights Reserved.
              </div>

              <div class="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
                <a href="#" class="w-6 mx-1">
                  <i class="fab fa-facebook-square"></i>
                </a>
                <a href="#" class="w-6 mx-1">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="w-6 mx-1">
                  <i class="fab fa-youtube"></i>
                </a>
                <a href="#" class="w-6 mx-1">
                  <i class="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    AuthReducer: state.AuthReducer,
    cartItems: state.cartReducer.cartItems,
  };
};
export default withRouter(
  connect(mapStateToProps, { logout, loadUser, getTransactionList })(MainLayout)
);
