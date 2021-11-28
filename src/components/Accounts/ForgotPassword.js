import React from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { forgot_password } from "../../store/actions/account/auth";
import { withRouter } from "react-router";
import * as EmailValidator from "email-validator";
class ForgotPassword extends React.Component {
  componentDidMount() {
    // console.log(this.props);
  }
  state = {
    email: "",
    emailError: false,
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { email, emailError } = this.state;

    const newUser = {
      email,
    };
    if (EmailValidator.validate(email)) {
      this.setState({
        emailError: false,
      });
    } else {
      this.setState({
        emailError: true,
      });
    }

    if (!emailError) {
      this.props.forgot_password(newUser);
      this.setState({
        email: "",
      });
    }
  };
  onChange = (e) => {
    if (e.target.name === "email") {
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
    }
  };
  render() {
    return (
      <>
        <div className="flex min-h-screen bg-white">
          <div
            className="w-1/2 bg-cover md:block hidden"
            style={{
              backgroundImage:
                "url(https://wallpaperaccess.com/full/56139.jpg)",
            }}
          ></div>
          <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none ">
            <div className="flex h-screen">
              <div className="m-auto space-y-10">
                <div className="text-left">
                  <div>
                    <i className="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                    <h1 className="font-Montserrat text-gray-800 text-2xl inline-block">
                      ABC Motor Parts
                    </h1>
                  </div>
                </div>
                <div className="px-8 mb-4 text-center">
                  <h3 className="pt-4 mb-2 text-2xl font-Montserrat text-gray-800">
                    Forgot Your Password?
                  </h3>
                  <p className="mb-4 text-lg text-gray-700">
                    We get it, stuff happens. Just enter your email address
                    below and we'll send you a link to reset your password!
                  </p>
                </div>
                <form
                  onSubmit={this.onSubmit}
                  className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                >
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-lg font-bold text-gray-700"
                      for="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-4 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      name="email"
                      onChange={this.onChange}
                      value={this.state.email}
                      placeholder="Enter Email Address..."
                    />
                    <span class="text-sm text-red-600" id="error">
                      {this.state.emailError ? "Not a valid email" : ""}
                    </span>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-gray-800 rounded-full hover:bg-teal_custom focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Reset Password
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <Link
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      to="/register"
                    >
                      Create an Account!
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      to="/login"
                    >
                      Already have an account? Login!
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(connect(null, { forgot_password })(ForgotPassword));
