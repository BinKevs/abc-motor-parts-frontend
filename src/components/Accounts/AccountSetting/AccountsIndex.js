import React from "react";
import { connect } from "react-redux";
import {
  AddAccount,
  UpdateAccount,
  getAccountList,
  getAccount,
  changeAccountStatus,
} from "../../../store/actions/account/auth";
import AccountFormModal from "./AccountFormModal";
import { AccountTableExportModal } from "../Print/AccountTableExportModal";
import { Link } from "react-router-dom";
import swal from "sweetalert";
let AccountsItems = [];
let EditButtonIsClicked = false;
let ItemAdded = false;
class AccountsIndex extends React.Component {
  state = {
    search: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
    modal: false,
    IsAdmin: false,
    table_export_modal: false,
  };
  setSeeMore(transaction_items_id) {
    return (e) => {
      e.preventDefault();
      document.getElementById(transaction_items_id).classList.toggle("hidden");
    };
  }
  componentDidMount() {
    this.props.getAccountList();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.account !== prevProps.account) {
      const { id, username, email, first_name, last_name, IsAdmin } =
        this.props.account;
      this.setState({
        id,
        username,
        email,
        first_name,
        last_name,
        IsAdmin,
      });
      this.props.getAccountList();
    }
    if (ItemAdded === true) {
      this.props.getAccountList();
      console.log(this.props.accounts);
      ItemAdded = false;
    }
  }
  handleCheck = (e) => {
    this.setState({ IsAdmin: !this.state.IsAdmin });
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Submit the state value to the store actions-accounts-auth-register
  onSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      email,
      first_name,
      last_name,
      IsAdmin,
      password,
      password2,
    } = this.state;
    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      const newUser = {
        username,
        password,
        email,
        first_name,
        last_name,
        is_superuser: IsAdmin,
        is_active: true,
      };
      this.props.AddAccount(newUser);
    }
    this.ModalFunction();
    this.props.getAccountList();
  };

  onUpdateSubmit = (AccountID) => {
    return (event) => {
      event.preventDefault();
      const {
        username,
        email,
        first_name,
        last_name,
        IsAdmin,
        password,
        password2,
      } = this.state;
      if (password !== password2) {
        console.log("Passwords do not match");
      } else {
        const newUser = {
          username,
          email,
          is_superuser: IsAdmin,
          first_name,
          last_name,
          password,
          is_active: true,
        };
        this.props.UpdateAccount(AccountID, newUser);
      }
      ItemAdded = true;
      this.props.getAccountList();
      this.ModalFunction();
    };
  };
  // when edit button click this will fetch the supplier that will be edited and change the isEditButtonClicked status to true
  onEditCloseButton = (event) => {
    event.preventDefault();
    this.setState({
      name: "",
      address: "",
      phone_number: "",
      supplierID: 0,
    });
    EditButtonIsClicked = false;
    this.ModalFunction();
  };
  //this will toggle the add modal form
  onModalToggleAdd = (e) => {
    e.preventDefault();
    this.ModalFunction();
  };
  //this will toggle the edit modal form
  onModalToggleEdit(AccountID) {
    return (event) => {
      event.preventDefault();
      this.props.getAccount(AccountID);
      this.ModalFunction();
      EditButtonIsClicked = true;
      console.log(this.props.account);
    };
  }
  // function that called to open or close modal
  ModalFunction() {
    this.setState({ modal: !this.state.modal });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.getElementById("Body").classList.toggle("overflow-hidden");
  }
  OnToggleExportTable = (event) => {
    event.preventDefault();
    this.setState({ table_export_modal: !this.state.table_export_modal });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.getElementById("Body").classList.toggle("overflow-hidden");
  };
  handleArchiveAccount(accountID) {
    return (event) => {
      event.preventDefault();
      // swal("Do you really want to delete this?", {
      //   buttons: {
      //     catch: {
      //       text: "Yes",
      //       value: "delete",
      //     },
      //     cancel: "No",
      //   },
      // }).then((value) => {
      //   switch (value) {
      //     case "delete":
      //       const formData = new FormData();
      //       formData.append("status", false);
      //       this.props.changeAccountStatus(accountID, formData);
      //       swal(
      //         "Successfully deleted!",
      //         // "You can retrive it in the archives module.",
      //         "",
      //         "success"
      //       );
      //       break;
      //     default:
      //       break;
      //   }
      // });
      swal(
        "Are you sure you want to delete this Account?\n If you are sure, type in your password:",
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
        if (value === "Nicksstonecold2017") {
          // const formData = new FormData();
          // formData.append("status", false);
          // this.props.changeSupplierStatus(transactionID, formData);
          swal("Successfully deleted!", "", "success");
        } else if (value === "cancel") {
        } else {
          swal("Invalid password!", "", "error");
        }
      });
    };
  }
  render() {
    //destructuring the dictionary for searching/ fetching purposes
    console.log();
    AccountsItems = [this.props.accounts];
    this.props.accounts.map((account) =>
      AccountsItems.push({
        id: account.user.id,
        username: account.user.username,
        email: account.user.email,
        status: account.user.is_active,
        is_superuser: account.user.is_superuser,
        name: account.user.last_name + " " + account.user.first_name,
      })
    );
    //returning the filtered data from search
    const lowercasedFilter = this.state.search.toLowerCase();
    const filteredData = AccountsItems.filter((item) => {
      // return Object.keys(item).some((key) =>
      // 	item[key].toString().toLowerCase().includes(lowercasedFilter)
      // );
      if (item.status) return item;
    });
    return (
      <>
        <div class="bg-gray-100 flex-1 mt-20 md:mt-14 pb-24 md:pb-5">
          <div class="bg-gray-800 pt-3">
            <div
              class="rounded-tl-3xl bg-gradient-to-r
							from-teal_custom
							to-gray-800 p-4 shadow text-2xl text-white
"
            >
              <h3 class="font-bold pl-2">Accounts</h3>
            </div>
          </div>
          <div className="p-5 w-full">
            <div className="mx-auto bg-white dark:bg-gray-800 shadow rounded">
              <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-end items-start lg:items-stretch w-full">
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                  <div className="lg:ml-6 flex items-start w-full">
                    <div
                      onClick={this.OnToggleExportTable}
                      className="text-white cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center"
                    >
                      <i class="fal fa-print fa-lg"></i>
                    </div>
                    <div
                      onClick={this.onModalToggleAdd}
                      className="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center"
                    >
                      <i class="fa fa-user-plus fa-fw"></i>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                  {/* <div className="flex items-center lg:border-l lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6">
										<p
											className="text-base text-gray-600 dark:text-gray-400"
											id="page-view"
										>
											Viewing 1 - 20 of 60
										</p>
										<div
											className="text-gray-600 dark:text-gray-400 ml-2 border-transparent border cursor-pointer rounded mr-4"
											onclick="pageView(false)"
										>
											<i class="fad fa-angle-left fa-2x"></i>
										</div>
										<div
											className="text-gray-600 dark:text-gray-400 border-transparent border rounded focus:outline-none cursor-pointer"
											onclick="pageView(true)"
										>
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
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead>
                    <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
                      <th className="pl-14 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        Account ID
                      </th>
                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        Username
                      </th>
                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        Name
                      </th>
                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        Email
                      </th>
                      {/* <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        Status
                      </th> */}
                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        More
                      </th>
                      {/* <th className="space-x-2 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        						<span>Date</span>
                        						<i class="fal fa-arrow-up fa-lg"></i>
                        						<i class="fal fa-arrow-down"></i>
                    						</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((account) => (
                      <tr
                        key={account.id}
                        className="h-24 border-gray-300 dark:border-gray-200 border-b"
                      >
                        <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {account.id}
                        </td>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {account.username}
                        </td>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {account.name}
                        </td>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {account.email}
                        </td>
                        {/* <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {account.is_active ? "Active" : "Inactive"}{" "}
                          <strong>
                            {account.is_superuser ? "(Admin)" : ""}
                          </strong>
                        </td> */}
                        {/* <td className="pr-6 whitespace-no-wrap">
                        							<div className="flex items-center">
                            						<div className="h-8 w-8">
                               						 <img
                                    					src="https://tuk-cdn.s3.amazonaws.com/assets/components/advance_tables/at_1.png"
                                    					alt
                                    					className="h-full w-full rounded-full overflow-hidden shadow"
                                					/>
                            						</div>
                            						<p className="ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm">
                                					Carrie Anthony
                            							</p>
                       								 </div>
                    							</td> */}
                        <td className="pr-8 relative">
                          <button className="button-see-more text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none">
                            <div className="seeMore absolute left-0 top-0 mt-2 -ml-20 shadow-md z-10 w-32">
                              <ul className="bg-white dark:bg-gray-800 shadow rounded p-2">
                                <li
                                  // onClick={this.onModalToggle}
                                  onClick={this.onModalToggleEdit(account.id)}
                                  className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-teal_custom hover:text-white px-3 font-normal"
                                >
                                  Edit
                                </li>
                                <li
                                  onClick={this.handleArchiveAccount(
                                    account.id
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
        <AccountFormModal
          modal={this.state.modal}
          onModalToggleAdd={this.onModalToggleAdd}
          state={this.state}
          onChange={this.onChange}
          handleCheck={this.handleCheck}
          EditButtonIsClicked={EditButtonIsClicked}
          onEditCloseButton={this.onEditCloseButton}
          onSubmit={this.onSubmit}
          onUpdateSubmit={this.onUpdateSubmit}
        />
        <div
          class={
            this.state.table_export_modal ? "h-screen " : "h-screen hidden"
          }
        >
          <AccountTableExportModal
            OnToggleExportTable={this.OnToggleExportTable}
            accounts={filteredData}
          />
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  accounts: state.AuthReducer.accounts,
  account: state.AuthReducer.account,
  isAuthenticated: state.AuthReducer.isAuthenticated,
});

export default connect(mapStateToProps, {
  getAccountList,
  getAccount,
  AddAccount,
  UpdateAccount,
  changeAccountStatus,
})(AccountsIndex);
