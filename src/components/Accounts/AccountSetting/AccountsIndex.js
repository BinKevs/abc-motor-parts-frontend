import React from "react";
import { connect } from "react-redux";
import {
  AddAccount,
  UpdateAccount,
  getAccountList,
  getAccount,
  changeAccountStatus,
  createAdminAccount,
  ChangeAdminAccountPassword,
  UpdateAdminAccount,
  UpdateAddress,
} from "../../../store/actions/account/auth";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import AccountFormModal from "./AccountFormModal";
import { AccountTableExportModal } from "../Print/AccountTableExportModal";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { CheckPassword } from "../../../Helpers/functions";
import { phone } from "phone";
import * as EmailValidator from "email-validator";
var passwordValidator = require("password-validator");
var schema = new passwordValidator();
schema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces();
let passwordError = [];
let AccountsItems = [];
let EditButtonIsClicked = false;
class AccountsIndex extends React.Component {
  state = {
    account_id: "",
    account_user_id: "",
    search: "",
    username: "",
    email: "",
    editing_email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
    modal: false,
    table_export_modal: false,
    contact_number: "",
    regionData: [],
    provinceData: [],
    cityData: [],
    barangayData: [],
    regionValue: "",
    provinceValue: "",
    cityValue: "",
    barangayValue: "",
    regionCode: "",
    provinceCode: "",
    cityCode: "",
    barangayCode: "",
    street: "",
    BirthInputDate: "",
    birthdate: "",
    emailError: false,
    emailExistError: false,
    usernameError: false,
    ConfirmPasswordError: false,
    contactNumberError: false,
    contact_numberExistError: false,
    editing_contact_number: "",
    current_address: "",
  };
  convert(str) {
    if (str === "") {
      return "";
    } else {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return (
        [date.getFullYear(), mnth, day].join("-") +
        " " +
        [date.getHours(), date.getMinutes(), date.getSeconds()].join(":")
      );
    }
  }
  setSeeMore(transaction_items_id) {
    return (e) => {
      e.preventDefault();
      document.getElementById(transaction_items_id).classList.toggle("hidden");
    };
  }
  componentDidMount() {
    this.region();
    this.props.getAccountList();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.account !== prevProps.account) {
      this.setState({
        account_id: this.props.account.id,
        account_user_id: this.props.account.user.id,
        first_name: this.props.account
          ? this.props.account.user.first_name
          : "",
        last_name: this.props.account ? this.props.account.user.last_name : "",
        username: this.props.account ? this.props.account.user.username : "",
        email: this.props.account ? this.props.account.user.email : "",
        birthdate: this.props.account ? this.props.account.birthdate : "",
        editing_email: this.props.account ? this.props.account.user.email : "",
        editing_contact_number: this.props.account
          ? this.props.account.contact_number
          : "",
        current_address: this.props.account ? this.props.account.address : "",
      });
      // this.props.getAccountList();
    }
  }

  onChange = (e) => {
    if (e.target.name === "password") {
      passwordError = schema.validate(e.target.value, { details: true });
      this.setState({
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === "username") {
      if (
        this.props.accounts.some((acc) => acc.user.username === e.target.value)
      ) {
        this.setState({
          usernameError: true,
        });
      } else {
        this.setState({
          usernameError: false,
        });
      }
      this.setState({
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === "password2") {
      if (this.state.password !== e.target.value) {
        this.setState({
          ConfirmPasswordError: true,
        });
      } else {
        this.setState({
          ConfirmPasswordError: false,
        });
      }
      this.setState({
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === "email") {
      if (e.target.value === this.state.editing_email) {
        this.setState({
          emailExistError: false,
        });
      } else {
        if (
          this.props.accounts.some((acc) => acc.user.email === e.target.value)
        ) {
          this.setState({
            emailExistError: true,
          });
        } else {
          this.setState({
            emailExistError: false,
          });
        }
      }

      if (EmailValidator.validate(e.target.value)) {
        this.setState({
          emailError: false,
        });
      } else {
        this.setState({
          emailError: true,
        });
      }
      this.setState({
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === "contact_number") {
      if (e.target.value === this.state.editing_contact_number) {
        this.setState({
          contact_numberExistError: false,
        });
      } else {
        if (
          this.props.accounts.some(
            (acc) => e.target.value === acc.contact_number
          )
        ) {
          this.setState({
            contact_numberExistError: true,
          });
        } else {
          this.setState({
            contact_numberExistError: false,
          });
        }
      }
      if (phone(e.target.value, { country: "PH" }).isValid) {
        this.setState({
          contactNumberError: false,
        });
      } else {
        this.setState({
          contactNumberError: true,
        });
      }
      this.setState({
        [e.target.name]: e.target.value,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };
  handleUpdateContact = (event) => {
    event.preventDefault();
    const {
      regionValue,
      provinceValue,
      cityValue,
      barangayValue,
      street,
      contact_number,
      contact_numberExistError,
    } = this.state;
    const formContactNumber = new FormData();
    if (regionValue !== "") {
      formContactNumber.append("region", regionValue);
      formContactNumber.append("province", provinceValue);
      formContactNumber.append("city", cityValue);
      formContactNumber.append("barangay", barangayValue);
      formContactNumber.append("street", street);
      formContactNumber.append(
        "address_id",
        this.props.AuthReducer.addresses.id
      );

      this.props.UpdateAddress(
        this.props.AuthReducer.account.id,
        formContactNumber
      );
      this.setState({
        regionValue: "",
        provinceValue: "",
        cityValue: "",
        barangayValue: "",
        regionCode: "",
        provinceCode: "",
        cityCode: "",
        barangayCode: "",
        street: "",
        contact_number: "",
        contactNumberError: false,
        contact_numberExistError: false,
        modal: false,
      });
    }
    if (contact_number !== "") {
      formContactNumber.append("contact_number", contact_number);
      if (
        phone(contact_number, { country: "PH" }).isValid &&
        !contact_numberExistError
      ) {
        this.props.UpdateAddress(this.state.account_id, formContactNumber);
        this.setState({
          regionValue: "",
          provinceValue: "",
          cityValue: "",
          barangayValue: "",
          regionCode: "",
          provinceCode: "",
          cityCode: "",
          barangayCode: "",
          street: "",
          contact_number: "",
          contactNumberError: false,
          contact_numberExistError: false,
          modal: false,
        });
      } else {
        this.setState({
          contactNumberError: true,
        });
      }
    }

    if (contact_number === this.state.editing_contact_number) {
      this.setState({
        contact_numberExistError: false,
      });
    } else {
      if (
        this.props.accounts.some((acc) => contact_number === acc.contact_number)
      ) {
        this.setState({
          contact_numberExistError: true,
        });
      } else {
        this.setState({
          contact_numberExistError: false,
        });
      }
    }
  };
  handleChangePassword = (event) => {
    event.preventDefault();
    const { old_password, password, password2 } = this.state;
    if (password !== password2) {
      swal(
        "Password and confirm password do not match. Please try again.",
        "",
        "error"
      );
      this.setState({
        password: "",
        password2: "",
      });
    } else {
      if (schema.validate(password)) {
        const formPassword = new FormData();
        formPassword.append("old_password", old_password);
        formPassword.append("new_password", password2);
        this.props.ChangeAdminAccountPassword(
          this.props.AuthReducer.user.id,
          formPassword
        );
        this.setState({
          old_password: "",
          password: "",
          password2: "",
        });
        this.ModalFunction();
      }
    }
  };
  handleEditAccountInfoSubmit = (event) => {
    event.preventDefault();
    const {
      first_name,
      last_name,
      username,
      email,
      BirthInputDate,
      usernameError,
      emailError,
      account_user_id,
      account_id,
      emailExistError,
      editing_email,
    } = this.state;
    const formAccountInfoData = new FormData();
    formAccountInfoData.append("first_name", first_name);
    formAccountInfoData.append("last_name", last_name);
    formAccountInfoData.append("username", username);
    formAccountInfoData.append("email", email);
    formAccountInfoData.append("status", true);
    if (BirthInputDate !== "") {
      formAccountInfoData.append("birthdate", this.convert(BirthInputDate));
    }
    formAccountInfoData.append("account", account_id);
    // if (username === this.props.AuthReducer.user.username) {
    //   this.setState({
    //     usernameError: false,
    //   });
    // } else {
    //   if (this.props.accounts.some((acc) => username === acc.user.username)) {
    //     this.setState({
    //       usernameError: true,
    //     });
    //   } else {
    //     this.setState({
    //       usernameError: false,
    //     });
    //     this.props.getAccountList();
    //   }
    // }

    if (EmailValidator.validate(email)) {
      this.setState({
        emailError: false,
      });
    } else {
      this.setState({
        emailError: true,
      });
    }
    if (editing_email === email) {
      this.setState({
        emailExistError: false,
      });
    } else {
      if (this.props.accounts.some((acc) => acc.user.email === email)) {
        this.setState({
          emailExistError: true,
        });
      } else {
        this.setState({
          emailExistError: false,
        });
      }
    }
    if (!usernameError && !emailError && !emailExistError) {
      this.props.UpdateAdminAccount(account_user_id, formAccountInfoData);
      this.ModalFunction();
      // this.props.getAccountList();
    }
  };

  handleAddAccount = (e) => {
    e.preventDefault();
    const {
      username,
      email,
      first_name,
      last_name,
      password,
      password2,
      regionValue,
      provinceValue,
      cityValue,
      barangayValue,
      street,
      contact_number,
      BirthInputDate,
      usernameError,
      ConfirmPasswordError,
      passwordError,
      emailError,
      contactNumberError,
    } = this.state;

    const newUser = {
      username,
      password,
      email,
      first_name,
      last_name,
      region: regionValue,
      province: provinceValue,
      city: cityValue,
      barangay: barangayValue,
      street,
      contact_number,
      birthdate: BirthInputDate,
    };
    if (this.props.accounts.some((acc) => acc.user.username === username)) {
      this.setState({
        usernameError: true,
      });
    } else {
      this.setState({
        usernameError: false,
      });
    }
    if (password !== password2) {
      this.setState({
        ConfirmPasswordError: true,
      });
    } else {
      this.setState({
        ConfirmPasswordError: false,
      });
    }
    if (schema.validate(password)) {
      this.setState({
        passwordError: false,
      });
    } else {
      this.setState({
        passwordError: false,
      });
    }
    if (EmailValidator.validate(email)) {
      this.setState({
        emailError: false,
      });
    } else {
      this.setState({
        emailError: true,
      });
    }

    if (phone(contact_number, { country: "PH" }).isValid) {
      this.setState({
        contactNumberError: false,
      });
    } else {
      this.setState({
        contactNumberError: true,
      });
    }
    if (
      !usernameError &&
      !ConfirmPasswordError &&
      !passwordError &&
      !emailError &&
      !contactNumberError
    ) {
      this.props.createAdminAccount(newUser);
    }
    this.ModalFunction();
  };
  // onUpdateSubmit = (AccountID) => {
  //   return (event) => {
  //     event.preventDefault();
  //     const { username, email, first_name, last_name, password, password2 } =
  //       this.state;
  //     if (password !== password2) {
  //       console.log("Passwords do not match");
  //     } else {
  //       const newUser = {
  //         username,
  //         email,
  //         first_name,
  //         last_name,
  //         password,
  //         is_active: true,
  //       };
  //       this.props.UpdateAccount(AccountID, newUser);
  //     }

  //     this.props.getAccountList();
  //     this.ModalFunction();
  //   };
  // };
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
    };
  }
  // function that called to open or close modal
  ModalFunction() {
    this.setState({ modal: !this.state.modal });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  OnToggleExportTable = (event) => {
    event.preventDefault();
    this.setState({ table_export_modal: !this.state.table_export_modal });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  handleArchiveAccount(accountID) {
    return (event) => {
      event.preventDefault();

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
                this.props.changeAccountStatus(accountID, formData);
                swal("Successfully deleted account!", "", "success");
              } else {
                swal("Invalid password!", "", "error");
              }
            })
            .catch((err) => console.log(err));
        }
      });
    };
  }
  onChangeDate = (date) => {
    this.setState({
      BirthInputDate: date,
    });
  };
  region = () => {
    regions().then((response) => {
      this.setState({
        regionData: response,
      });
    });
  };

  province = (e) => {
    this.setState({
      regionValue: e.target.selectedOptions[0].text,
      regionCode: e.target.value,
    });
    provinces(e.target.value).then((response) => {
      this.setState({
        provinceData: response,
        cityData: [],
        barangayData: [],
      });
    });
  };

  city = (e) => {
    this.setState({
      provinceValue: e.target.selectedOptions[0].text,
      provinceCode: e.target.value,
    });
    cities(e.target.value).then((response) => {
      this.setState({
        cityData: response,
      });
    });
  };

  barangay = (e) => {
    this.setState({
      cityValue: e.target.selectedOptions[0].text,
      cityCode: e.target.value,
    });
    barangays(e.target.value).then((response) => {
      this.setState({
        barangayData: response,
      });
    });
  };

  brgy = (e) => {
    this.setState({
      barangayValue: e.target.selectedOptions[0].text,
      barangayCode: e.target.value,
    });
  };
  render() {
    //destructuring the dictionary for searching/ fetching purposes
    console.log(this.props.account);
    AccountsItems = [];
    this.props.accounts.map((account) =>
      AccountsItems.push({
        id: account.user.id,
        account_id: account.id,
        username: account.user.username,
        email: account.user.email,
        status: account.user.is_active,
        is_superuser: account.user.is_superuser,
        name: account.user.last_name + " " + account.user.first_name,
      })
    );

    const lowercasedFilter = this.state.search.toLowerCase();
    const filteredData = AccountsItems.filter((item) => {
      if (item.is_superuser)
        if (item.status)
          return (
            item.username.toString().toLowerCase().includes(lowercasedFilter) ||
            item.email.toString().toLowerCase().includes(lowercasedFilter)
          );
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

                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        More
                      </th>
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

                        <td className="pr-8 relative">
                          <button className="button-see-more text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none">
                            <div className="seeMore absolute left-0 top-0 mt-2 -ml-20 shadow-md z-10 w-32">
                              <ul className="bg-white dark:bg-gray-800 shadow rounded p-2">
                                <li
                                  onClick={this.onModalToggleEdit(
                                    account.account_id
                                  )}
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
          EditButtonIsClicked={EditButtonIsClicked}
          onEditCloseButton={this.onEditCloseButton}
          handleAddAccount={this.handleAddAccount}
          passwordError={passwordError}
          province={this.province}
          region={this.region}
          city={this.city}
          barangay={this.barangay}
          brgy={this.brgy}
          onChangeDate={this.onChangeDate}
          handleEditAccountInfoSubmit={this.handleEditAccountInfoSubmit}
          handleChangePassword={this.handleChangePassword}
          handleUpdateContact={this.handleUpdateContact}
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
  AuthReducer: state.AuthReducer,
});

export default connect(mapStateToProps, {
  getAccountList,
  getAccount,
  AddAccount,
  UpdateAccount,
  changeAccountStatus,
  createAdminAccount,
  ChangeAdminAccountPassword,
  UpdateAdminAccount,
  UpdateAddress,
})(AccountsIndex);
