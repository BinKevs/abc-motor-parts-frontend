import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../store/actions/account/auth";
import DatePicker from "react-datepicker";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
class Registration extends React.Component {
  state = {
    username: "",
    email: "",
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
  };
  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  componentDidMount() {
    this.region();
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
        region: regionValue,
        province: provinceValue,
        city: cityValue,
        barangay: barangayValue,
        street,
        contact_number,
        birthdate: BirthInputDate,
      };
      this.props.register(newUser);
      console.log("Account created!");
    }
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
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
                    <span class="text-sm text-red-600 hidden" id="error">
                      Email is required
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
                    <span class="text-sm text-red-600 hidden" id="error">
                      Username is required
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
                    <span class="text-sm text-red-600 hidden" id="error">
                      Password is required
                    </span>
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
                    <span class="text-sm text-red-600 hidden" id="error">
                      Confirm Password is required
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
                  <input type="checkbox" class="border-0 mr-2" />
                  By creating an account you are agreeing to our{" "}
                  <div>
                    <a class="" href="#" target="_blank" data-test="Link">
                      {" "}
                      <span class="underline">Terms and Conditions</span>{" "}
                    </a>{" "}
                    and
                    <a class="" href="#" target="" data-test="Link">
                      {" "}
                      <span class="underline">Privacy Policy</span>{" "}
                    </a>
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
  };
};
export default connect(mapStateToProps, { register })(Registration);
