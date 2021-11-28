import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register, getAccountList } from "../../store/actions/account/auth";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import swal from "sweetalert";
import * as EmailValidator from "email-validator";
import { phone } from "phone";
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
class Registration extends React.Component {
  state = {
    username: "",
    email: "",
    contact_number: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
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
    usernameError: false,
    emailError: false,
    contactNumberError: false,
    passwordError: "",
    ConfirmPasswordError: "",
  };
  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  componentDidMount() {
    this.region();
    this.props.getAccountList();
  }
  // Submit the state value to the store actions-accounts-auth-register
  onSubmit = (e) => {
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
      this.props.register(newUser);
    }
  };

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
    if (this.props.isAuthenticated) {
      return <Redirect to="/Home" />;
    }
    const { username, email, first_name, last_name, password, password2 } =
      this.state;

    const { regionData, provinceData, cityData, barangayData, contact_number } =
      this.state;

    return (
      <>
        <div class="flex min-h-screen bg-white">
          <div
            class="w-1/2 bg-cover md:block hidden"
            style={{
              backgroundImage:
                "url(https://wallpaperaccess.com/full/56139.jpg)",
            }}
          ></div>
          <div class="md:w-1/2 max-w-lg mx-auto my-auto px-4 py-5 shadow-none">
            <div class="text-left p-0">
              <div>
                <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                  ABC Motor Parts
                </h1>
              </div>

              <h1 class="text-gray-800 text-3xl font-medium">
                Create your Account here.
              </h1>
            </div>

            <form onSubmit={this.onSubmit} class="mt-9">
              <div className="">
                <div>
                  <div class="mt-5 flex justify-between space-x-2">
                    <div class="relative z-0 w-1/2 mb-5">
                      <input
                        type="text"
                        name="first_name"
                        onChange={this.onChange}
                        value={first_name}
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
                      <span class="text-sm text-red-600 hidden" id="error">
                        First name is required
                      </span>
                    </div>
                    <div class="relative z-0 w-1/2 mb-5">
                      <input
                        type="text"
                        name="last_name"
                        onChange={this.onChange}
                        value={last_name}
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
                      <span class="text-sm text-red-600 hidden" id="error">
                        Last name is required
                      </span>
                    </div>
                  </div>

                  <div class="relative z-0 w-full mb-5">
                    <input
                      type="text"
                      name="email"
                      onChange={this.onChange}
                      value={email}
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
                    </span>
                  </div>
                  <div class="relative z-0 w-full mb-5">
                    <input
                      type="text"
                      name="username"
                      onChange={this.onChange}
                      value={username}
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
                      {this.state.usernameError ? "Username not available" : ""}
                    </span>
                  </div>
                  <div class="relative z-0 w-full mb-5">
                    <input
                      type="password"
                      name="password"
                      onChange={this.onChange}
                      value={password}
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
                      name="password2"
                      onChange={this.onChange}
                      value={password2}
                      placeholder=" "
                      required
                      class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                    />
                    <label
                      for="name"
                      class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                    >
                      Confirm Password
                    </label>
                    <span class="text-sm text-red-600" id="error">
                      {this.state.ConfirmPasswordError
                        ? "Password and Confirm Password do not match"
                        : ""}
                    </span>
                  </div>
                </div>
                <h1 class="text-gray-800 text-3xl font-medium my-5">
                  Contact Details
                </h1>
                <div>
                  <div class="relative z-0 w-full mb-5">
                    <input
                      type="text"
                      name="contact_number"
                      value={contact_number}
                      onChange={this.onChange}
                      placeholder=" "
                      required
                      class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                    />
                    <label
                      for="contact_number"
                      class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                    >
                      Contact Number
                    </label>
                    <span class="text-sm text-red-600" id="error">
                      {this.state.contactNumberError
                        ? "Not a valid PH number"
                        : contact_number.length > 10
                        ? phone(contact_number, { country: "PH" }).isValid
                          ? ""
                          : "Not a valid PH number"
                        : ""}
                    </span>
                  </div>
                  <div class="relative z-0 w-full mb-5">
                    <label class="block my-2">Select Region</label>
                    <div class="relative inline-block w-full text-gray-700">
                      <select
                        onChange={this.province}
                        onSelect={this.region}
                        required
                        name="region"
                        class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:border-cyan-700"
                        placeholder="Region"
                      >
                        <option disabled>Select Region</option>
                        {regionData &&
                          regionData.length > 0 &&
                          regionData.map((item) => (
                            <option
                              key={item.region_code}
                              value={item.region_code}
                            >
                              {item.region_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div class="relative z-0 w-full mb-5">
                    <label class="block my-2">Select Province</label>
                    <div class="relative inline-block w-full text-gray-700">
                      <select
                        onChange={this.city}
                        required
                        name="province"
                        class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:border-cyan-700"
                        placeholder="Province"
                      >
                        <option disabled>Select Province</option>
                        {provinceData &&
                          provinceData.length > 0 &&
                          provinceData.map((item) => (
                            <option
                              key={item.province_code}
                              value={item.province_code}
                            >
                              {item.province_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div class="relative z-0 w-full mb-5">
                    <label class="block my-2">Select City</label>
                    <div class="relative inline-block w-full text-gray-700">
                      <select
                        onChange={this.barangay}
                        required
                        name="city"
                        class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:border-cyan-700"
                        placeholder="City"
                      >
                        <option disabled>Select City</option>
                        {cityData &&
                          cityData.length > 0 &&
                          cityData.map((item) => (
                            <option key={item.city_code} value={item.city_code}>
                              {item.city_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div class="relative z-0 w-full mb-5">
                    <label class="block my-2">Select Brgy</label>
                    <div class="relative inline-block w-full text-gray-700">
                      <select
                        onChange={this.brgy}
                        required
                        name="brgy"
                        class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:border-cyan-700"
                        placeholder="Brgy"
                      >
                        <option disabled>Select Barangay</option>
                        {barangayData &&
                          barangayData.length > 0 &&
                          barangayData.map((item) => (
                            <option key={item.brgy_code} value={item.brgy_code}>
                              {item.brgy_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div class="relative z-0 w-full mb-5">
                    <input
                      type="text"
                      name="street"
                      onChange={this.onChange}
                      placeholder=" "
                      required
                      class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                    />
                    <label
                      for="name"
                      class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                    >
                      House No., Street name, Building. Subd
                    </label>
                  </div>
                  <div class="flex flex-col w-full mb-5">
                    <label for="BirthInputDate" class="text-gray-800 mb-2">
                      Birth date
                    </label>
                    <div>{this.state.Birtdate}</div>

                    <DatePicker
                      selected={this.state.BirthInputDate}
                      onChange={(date) =>
                        this.setState({ BirthInputDate: date })
                      }
                      value={this.state.BirthInputDate}
                      closeOnScroll={true}
                      placeholderText="Select Birth Date"
                      className="my-1 px-1 py-1 border-2 text-md rounded-l w-full text-center"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-6 inline-block p-5 md:font-sans text-sm text-gray-800">
                <span class="inline-block">
                  <input type="checkbox" required class="border-0 mr-2" />
                  By creating an account you are agreeing to our{" "}
                  <div>
                    <Link to="/terms-conditions" target="_blank">
                      {" "}
                      <span class="underline">Terms and Conditions</span>{" "}
                    </Link>{" "}
                    and
                    <Link to="/privacy-policy" target="_blank">
                      {" "}
                      <span class="underline">Privacy Policy</span>{" "}
                    </Link>
                  </div>
                </span>
              </div>

              <div class="mt-10">
                <input
                  type="submit"
                  value="Create Account"
                  class="py-3 bg-gray-800 text-white w-full rounded hover:bg-gray-600"
                />
              </div>
            </form>
            <a class="" href="/login" data-test="Link">
              <span class="block p-5 text-center text-gray-800 text-sm">
                Already have an account?
              </span>
            </a>
          </div>
        </div>
      </>
    );
  }
}
//get the isAuthenticated value from store-reducer-accounts-auth
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    accounts: state.AuthReducer.accounts,
  };
};
export default connect(mapStateToProps, { register, getAccountList })(
  Registration
);
