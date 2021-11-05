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
import { loadUser, UpdateAccount } from "../../../store/actions/account/auth";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import ContactDetails from "./ContactDetails";
let NavButton = document.getElementsByClassName("NavButton");
let SectionPanelActive = document.getElementsByClassName("SectionPanelActive");
let NavButtonActive = document.getElementsByClassName("NavButtonActive");

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
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.region();
    // this.props.loadUser();
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
    const { first_name, last_name, username, email } = this.state;
    const formAccountInfoData = new FormData();
    formAccountInfoData.append("first_name", first_name);
    formAccountInfoData.append("last_name", last_name);
    formAccountInfoData.append("username", username);
    formAccountInfoData.append("email", email);
    this.props.UpdateAccount(97, formAccountInfoData);
    this.setState({
      edit_account_info: false,
    });
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
    console.log(this.props.AuthReducer.user);
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
                            <span
                              class="text-sm text-red-600 hidden"
                              id="error"
                            >
                              Email is required
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
                            <span
                              class="text-sm text-red-600 hidden"
                              id="error"
                            >
                              Username is required
                            </span>
                          </div>
                        </div>
                        <div className=" inline-block order-first md:order-last align-middle mx-auto md:mx-0">
                          <img
                            className="border-4 rounded-3xl"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuoovVYEMl5PlyrnrmjPY_0bH_k0RaXYByiMVOWeEhWeG9wxWP2ozVw0Ab51hiQzxErpo&usqp=CAU"
                            alt=""
                          />
                        </div>
                      </div>
                      <div class="mt-5 w-full md:w-1/2 flex justify-center">
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
                    <form class="mt-4">
                      <div class="relative z-0 w-full mb-5">
                        <input
                          type="password"
                          name="password"
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
  };
};
export default withRouter(
  connect(mapStateToProps, { loadUser, UpdateAccount })(AccountSetting)
);
