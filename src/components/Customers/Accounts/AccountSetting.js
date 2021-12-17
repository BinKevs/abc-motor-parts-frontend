import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadUser,
  UpdateAccount,
  ChangePassword,
  UpdateAddress,
  getAccountList,
} from "../../../store/actions/account/auth";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import ContactDetails from "./ContactDetails";
import DatePicker from "react-datepicker";
import swal from "sweetalert";
import { phone } from "phone";
import * as EmailValidator from "email-validator";
let NavButton = document.getElementsByClassName("NavButton");
let SectionPanelActive = document.getElementsByClassName("SectionPanelActive");
let NavButtonActive = document.getElementsByClassName("NavButtonActive");
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

class AccountSetting extends React.Component {
  state = {
    edit_account_info: false,
    contact_number: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
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
    profile_image: "",
    profile_image_file: "",
    old_password: "",
    password: "",
    password2: "",
    usernameError: false,
    emailError: false,
    contactNumberError: false,
    emailExistError: false,
    contact_numberExistError: false,
    passwordError: "",
    ConfirmPasswordError: "",
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

  // onChange = (e) => {
  //   if (e.target.name === "profile_image_file") {
  //     this.setState({
  //       profile_image: URL.createObjectURL(e.target.files[0]),
  //       [e.target.name]: e.target.files,
  //     });
  //   }
  //   else if (e.target.name === "password") {
  //     passwordError = schema.validate(e.target.value, { details: true });
  //     this.setState({
  //       [e.target.name]: e.target.value,
  //     });
  //   } else {
  //     this.setState({
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  // };
  onChange = (e) => {
    if (e.target.name === "username") {
      if (e.target.value === this.props.AuthReducer.user.username) {
        this.setState({
          usernameError: false,
        });
      } else {
        if (
          this.props.accounts.some(
            (acc) => acc.user.username === e.target.value
          )
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
      }
    } else if (e.target.name === "profile_image_file") {
      this.setState({
        profile_image: URL.createObjectURL(e.target.files[0]),
        [e.target.name]: e.target.files,
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
      if (e.target.value === this.props.AuthReducer.user.email) {
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
      if (e.target.value === this.props.AuthReducer.contact_number) {
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
  componentDidUpdate(prevProps, prevState) {
    if (this.props.AuthReducer.user != prevProps.AuthReducer.user) {
      this.setState({
        first_name: this.props.AuthReducer.user
          ? this.props.AuthReducer.user.first_name
          : "",
        last_name: this.props.AuthReducer.user
          ? this.props.AuthReducer.user.last_name
          : "",
        username: this.props.AuthReducer.user
          ? this.props.AuthReducer.user.username
          : "",
        email: this.props.AuthReducer.user
          ? this.props.AuthReducer.user.email
          : "",
        birthdate: this.props.AuthReducer
          ? this.props.AuthReducer.birthdate
          : "",
        profile_image: this.props.AuthReducer
          ? this.props.AuthReducer.profile_image
          : "",
      });
    }
  }
  componentDidMount() {
    this.region();
    this.props.loadUser();
    this.props.getAccountList();
    this.setState({
      first_name: this.props.AuthReducer.user
        ? this.props.AuthReducer.user.first_name
        : "",
      last_name: this.props.AuthReducer.user
        ? this.props.AuthReducer.user.last_name
        : "",
      username: this.props.AuthReducer.user
        ? this.props.AuthReducer.user.username
        : "",
      email: this.props.AuthReducer.user
        ? this.props.AuthReducer.user.email
        : "",
      birthdate: this.props.AuthReducer ? this.props.AuthReducer.birthdate : "",
      profile_image: this.props.AuthReducer
        ? this.props.AuthReducer.profile_image
        : "",
    });
  }
  handleEditAccountInfoToggle = (event) => {
    event.preventDefault();
    this.setState({
      edit_account_info: true,
    });
  };
  handleEditAccountInfoSubmit = (event) => {
    event.preventDefault();
    const {
      first_name,
      last_name,
      username,
      email,
      BirthInputDate,
      profile_image_file,
      usernameError,
      emailError,
      emailExistError,
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
    if (profile_image_file !== "") {
      formAccountInfoData.append("profile_image", profile_image_file[0]);
    }
    formAccountInfoData.append("account", this.props.AuthReducer.account.id);
    if (!username === this.props.AuthReducer.user.username) {
      if (this.props.accounts.some((acc) => username === acc.user.username)) {
        this.setState({
          usernameError: true,
        });
      } else {
        this.setState({
          usernameError: false,
        });
        // this.props.getAccountList();
      }
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
    if (this.props.AuthReducer.user.email === email) {
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
      this.props.UpdateAccount(
        this.props.AuthReducer.user.id,
        formAccountInfoData
      );
      this.setState({
        edit_account_info: false,
      });
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
        this.props.ChangePassword(this.props.AuthReducer.user.id, formPassword);
      }
    }
  };
  handleToggleNavButton = (DivTarget) => {
    return (event) => {
      event.preventDefault();
      for (var i = 0; i < NavButton.length; i++) {
        if (NavButtonActive.length > 0) {
          NavButtonActive[0].classList.remove("NavButtonActive");
          SectionPanelActive[0].classList.add("hidden");
          SectionPanelActive[0].classList.remove("SectionPanelActive");
        }
        event.target.classList.add("NavButtonActive");
        document
          .getElementsByClassName(DivTarget)[0]
          .classList.add("SectionPanelActive");
        document
          .getElementsByClassName(DivTarget)[0]
          .classList.remove("hidden");
      }
    };
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
      });
    }
    if (contact_number !== "") {
      formContactNumber.append("contact_number", contact_number);
      if (
        phone(contact_number, { country: "PH" }).isValid &&
        !contact_numberExistError
      ) {
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
        });
      } else {
        this.setState({
          contactNumberError: true,
        });
      }
    }

    if (contact_number === this.props.AuthReducer.contact_number) {
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
    console.log(this.props.AuthReducer);
    return (
      <>
        {" "}
        <div class="bg-gray-100 flex-1 mt-24 pb-24 md:pb-5">
          <div class="bg-gray-100 pt-3">
            <div class=" bg-gradient-to-r from-teal_custom to-gray-800 p-4 shadow text-2xl text-white text-center">
              <h3 class="font-bold">Account Setting</h3>
            </div>
          </div>
          <div className="space-y-5 w-full">
            <section class="mx-auto p-2">
              <div class="w-full overflow-hidden shadow-lg bg-white p-1">
                <nav class="flex flex-col justify-evenly sm:flex-row">
                  <button
                    onClick={this.handleToggleNavButton("ProfilePanel")}
                    class="NavButton NavButtonActive"
                  >
                    Profile
                  </button>
                  <button
                    onClick={this.handleToggleNavButton("ContactPanel")}
                    class="NavButton"
                  >
                    Contact Details
                  </button>
                  <button
                    onClick={this.handleToggleNavButton("PasswordPanel")}
                    class="NavButton"
                  >
                    Password
                  </button>
                </nav>
              </div>
            </section>
            <section class="mx-auto px-5 mt-5 ProfilePanel SectionPanelActive">
              <div class="w-full rounded-lg shadow-lg ">
                <div className="bg-white">
                  <form class="">
                    <div className="p-4">
                      <div class="px-4 py-6 text-gray-800 text-3xl font-medium border-b border-gray-300 mb-10">
                        Edit your account here
                      </div>
                      <div className="flex flex-col md:flex-row justify-around">
                        <div
                          className={
                            this.state.edit_account_info ? "" : "text-gray-400"
                          }
                        >
                          <div class="mt-5 flex flex-col md:flex-row justify-between space-x-0 md:space-x-2">
                            <div class="relative z-0 w-full md:w-1/2 mb-5">
                              <input
                                type="text"
                                name="first_name"
                                disabled={!this.state.edit_account_info}
                                value={
                                  this.state.first_name
                                    ? this.state.first_name
                                    : ""
                                }
                                onChange={this.onChange}
                                placeholder=" "
                                required
                                class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                              />
                              <label
                                for="name"
                                class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                              >
                                First name
                              </label>
                              <span
                                class="text-sm text-red-600 hidden"
                                id="error"
                              >
                                First name is required
                              </span>
                            </div>
                            <div class="relative z-0 w-full md:w-1/2 mb-5">
                              <input
                                type="text"
                                name="last_name"
                                disabled={!this.state.edit_account_info}
                                value={
                                  this.state.last_name
                                    ? this.state.last_name
                                    : ""
                                }
                                onChange={this.onChange}
                                placeholder=" "
                                required
                                class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                              />
                              <label
                                for="last_name"
                                class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                              >
                                Last name
                              </label>
                              <span
                                class="text-sm text-red-600 hidden"
                                id="error"
                              >
                                Last name is required
                              </span>
                            </div>
                          </div>
                          <div class="relative z-0 w-full mb-5">
                            <input
                              type="text"
                              name="email"
                              disabled={!this.state.edit_account_info}
                              value={this.state.email ? this.state.email : ""}
                              onChange={this.onChange}
                              placeholder=" "
                              required
                              class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                            />
                            <label
                              for="name"
                              class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                            >
                              Email
                            </label>

                            <span class="text-sm text-red-600" id="error">
                              {this.state.emailError ? "Not a valid email" : ""}
                              <div>
                                {this.state.emailExistError
                                  ? "Email not available"
                                  : ""}
                              </div>
                            </span>
                          </div>
                          <div class="relative z-0 w-full mb-5">
                            <input
                              type="text"
                              name="username"
                              disabled={!this.state.edit_account_info}
                              value={
                                this.state.username ? this.state.username : ""
                              }
                              onChange={this.onChange}
                              placeholder=" "
                              required
                              class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                            />
                            <label
                              for="name"
                              class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                            >
                              Username
                            </label>
                            <span class="text-sm text-red-600" id="error">
                              {this.state.usernameError
                                ? "Username not available"
                                : ""}
                            </span>
                          </div>
                          <div class="flex flex-col w-full mb-5">
                            <label
                              for="BirthInputDate"
                              class="text-gray-500 mb-2"
                            >
                              Birth date
                            </label>
                            {/* <div>{this.state.birthdate}</div> */}

                            <DatePicker
                              disabled={!this.state.edit_account_info}
                              selected={this.state.BirthInputDate}
                              onChange={(date) =>
                                this.setState({ BirthInputDate: date })
                              }
                              value={
                                this.state.BirthInputDate !== ""
                                  ? this.state.BirthInputDate
                                  : this.state.birthdate
                              }
                              closeOnScroll={true}
                              placeholderText="Select Birth Date"
                              className="my-1 px-1 py-1 border-2 text-md rounded-l w-full text-center"
                            />
                          </div>
                        </div>
                        <div className=" inline-block order-first md:order-last align-middle mx-auto md:mx-0">
                          <img
                            className="border-4 rounded-3xl mx-auto w-80"
                            src={this.state.profile_image}
                            alt=""
                          />
                          {this.state.edit_account_info ? (
                            <label class="flex flex-col items-center px-2 py-2 bg-gray-400 text-white rounded-md shadow-md border-2 uppercase font-semibold cursor-pointer">
                              <span class="mt-2 text-base leading-normal">
                                Change profile picture
                              </span>
                              <input
                                onChange={this.onChange}
                                name="profile_image_file"
                                type="file"
                                class="hidden"
                              />
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div class="mb-5 w-full md:w-1/2 flex justify-center items-center">
                        {this.state.edit_account_info ? (
                          <button
                            onClick={this.handleEditAccountInfoSubmit}
                            class="py-3 bg-gray-800 text-white w-1/5 rounded hover:bg-gray-600"
                          >
                            Submit
                          </button>
                        ) : (
                          <button
                            onClick={this.handleEditAccountInfoToggle}
                            class="py-3 bg-gray-800 text-white w-1/5 rounded hover:bg-gray-600"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
            <ContactDetails
              state={this.state}
              region={this.region}
              province={this.province}
              city={this.city}
              barangay={this.barangay}
              brgy={this.brgy}
              onChange={this.onChange}
              AuthReducer={this.props.AuthReducer}
              handleUpdateContact={this.handleUpdateContact}
            />
            <section class="mx-auto px-5 PasswordPanel hidden">
              <div class="w-full mb-8 rounded-lg shadow-lg ">
                <div className="bg-white p-4">
                  <div class="px-4 py-3 border-gray-300">
                    <div class="text-left p-0 mt-4">
                      <h1 class="px-4 py-6 text-gray-800 text-3xl font-medium border-b border-gray-300">
                        Change your password here
                      </h1>
                    </div>
                    <form onSubmit={this.handleChangePassword} class="mt-4">
                      <div class="relative z-0 w-full mb-5">
                        <input
                          type="password"
                          onChange={this.onChange}
                          name="old_password"
                          value={this.state.old_password}
                          placeholder=" "
                          required
                          class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                        />
                        <label
                          for="old_password"
                          class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                        >
                          Current Password
                        </label>
                        <span class="text-sm text-red-600 hidden" id="error">
                          Password is required
                        </span>
                      </div>
                      <div class="relative z-0 w-full mb-5">
                        <input
                          type="password"
                          onChange={this.onChange}
                          name="password"
                          value={this.state.password}
                          placeholder=" "
                          required
                          class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                        />
                        <label
                          for="name"
                          class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                        >
                          Password
                        </label>

                        {passwordError.map((err) => (
                          <div class="text-sm text-red-600" id="error">
                            {err.message}
                          </div>
                        ))}
                      </div>
                      <div class="relative z-0 w-full mb-5">
                        <input
                          type="password"
                          onChange={this.onChange}
                          name="password2"
                          value={this.state.password2}
                          placeholder=" "
                          required
                          class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                        />
                        <label
                          for="password2"
                          class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                        >
                          Confirm Password
                        </label>
                        <span class="text-sm text-red-600 hidden" id="error">
                          Confirm Password is required
                        </span>
                      </div>
                      <div class="mt-10">
                        <input
                          type="submit"
                          value="Submit"
                          class="py-3 bg-gray-800 text-white w-1/5 rounded hover:bg-gray-600"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AuthReducer: state.AuthReducer,
    accounts: state.AuthReducer.accounts,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    loadUser,
    UpdateAccount,
    ChangePassword,
    UpdateAddress,
    getAccountList,
  })(AccountSetting)
);
