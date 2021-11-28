import React from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reset_password } from "../../store/actions/account/auth";
import { withRouter } from "react-router";
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
class ResetPassword extends React.Component {
  state = {
    password: "",
    password2: "",
    passwordError: "",
    ConfirmPasswordError: "",
  };
  componentDidMount() {
    const tokenID = this.props.match.params.token;
    this.setState({
      token: tokenID,
    });
  }
  onChange = (e) => {
    if (e.target.name === "password") {
      passwordError = schema.validate(e.target.value, { details: true });
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
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { token, password, password2, ConfirmPasswordError, passwordError } =
      this.state;

    const newUser = {
      token,
      password,
    };

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

    if (!ConfirmPasswordError && !passwordError) {
      this.props.reset_password(newUser);
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
              <div className="m-auto space-y-10 w-4/5">
                <div className="text-left">
                  <div>
                    <i className="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                    <h1 className="font-Montserrat text-gray-800 text-2xl inline-block">
                      ABC Motor Parts
                    </h1>
                  </div>
                </div>
                <div className="px-8 mb-4 text-center ">
                  <h3 className="pt-4 mb-2 text-2xl font-Montserrat text-gray-800">
                    Set your password
                  </h3>
                </div>
                <form
                  onSubmit={this.onSubmit}
                  className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                >
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      for="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="password"
                      name="password"
                      onChange={this.onChange}
                      value={this.state.password}
                      placeholder=" "
                      required
                    />
                    {passwordError.map((err) => (
                      <div class="text-sm text-red-600" id="error">
                        {err.message}
                      </div>
                    ))}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      for="password"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="password"
                      name="password2"
                      onChange={this.onChange}
                      value={this.state.password2}
                      placeholder=" "
                      required
                    />
                    <span class="text-sm text-red-600" id="error">
                      {this.state.ConfirmPasswordError
                        ? "Password and Confirm Password do not match"
                        : ""}
                    </span>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-gray-800 rounded-full hover:bg-teal_custom focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Continue
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(connect(null, { reset_password })(ResetPassword));
