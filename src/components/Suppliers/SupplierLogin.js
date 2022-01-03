import React from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getSupplierList } from "../../store/actions/supplier/suppliers";
import swal from "sweetalert";
import { URL_FOR_SUPPLIER_INVENTORY } from "../../Helpers/constant";
class SupplierLogin extends React.Component {
  state = {
    username: "",
    password: "",
  };

  componentDidMount() {
    this.props.getSupplierList();
    if (localStorage.getItem("Supplier") !== null) {
      this.props.history.push("/supplier/inventory");
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // Submit the state value to the store actions-accounts-auth-Login
  onSubmit = (e) => {
    e.preventDefault();

    if (
      this.props.suppliers.some(
        (supp) =>
          supp.username === this.state.username &&
          supp.password === this.state.password
      )
    ) {
      const SupplierLogin = this.props.suppliers.filter((supp) => {
        if (
          supp.username === this.state.username &&
          supp.password === this.state.password
        ) {
          return supp.name;
        }
      });
      localStorage.setItem("Supplier", SupplierLogin[0].name);
      // this.props.history.push("/supplier/inventory");
      window.location.href = URL_FOR_SUPPLIER_INVENTORY;
    } else {
      swal({
        title: "Authentication Failed",
        text: "We could not find an account with that username and password",
        icon: "error",
      });
    }
  };

  render() {
    return (
      <>
        <div class="flex min-h-screen bg-white">
          <div class="max-w-lg mx-auto my-auto px-4 py-5 shadow-none">
            <div class="text-left p-0">
              <div>
                <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                  ABC Motor Parts
                </h1>
              </div>

              <h1 class="text-gray-800 text-3xl font-medium mt-3">
                Supplier Account Login.
              </h1>
            </div>

            <form onSubmit={this.onSubmit} class="mt-9">
              <div class="relative z-0 w-full mb-5">
                <input
                  type="text"
                  name="username"
                  placeholder=" "
                  required
                  class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                  onChange={this.onChange}
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
                  placeholder=" "
                  required
                  class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                  onChange={this.onChange}
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
              <div class="mt-10">
                <button
                  type="submit"
                  class="py-3 bg-gray-800 text-white w-full rounded hover:bg-gray-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // AuthReducer: state.AuthReducer,
    suppliers: state.suppliers.suppliers,
  };
};
export default withRouter(
  connect(mapStateToProps, { getSupplierList })(SupplierLogin)
);
