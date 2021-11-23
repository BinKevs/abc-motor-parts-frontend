import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { phone } from "phone";
const AccountFormModal = (props) => {
  const {
    username,
    email,
    first_name,
    last_name,
    old_password,
    password,
    password2,
    contact_number,
    regionData,
    provinceData,
    cityData,
    barangayData,
    BirthInputDate,
    birthdate,
    emailError,
    usernameError,
    ConfirmPasswordError,
    contactNumberError,
  } = props.state;
  const {
    onChange,
    handleAddAccount,
    EditButtonIsClicked,
    onEditCloseButton,
    onModalToggleAdd,
    modal,
    passwordError,
    province,
    region,
    city,
    barangay,
    brgy,
    onChangeDate,
    handleEditAccountInfoSubmit,
    handleChangePassword,
  } = props;
  return (
    <>
      <div class={modal ? "h-screen " : "h-screen hidden"}>
        <div class="mx-auto max-w-screen-lg h-full">
          <div
            className="z-20 absolute top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <div class="modal-overlay absolute w-full h-full z-25 bg-gray-800 opacity-50"></div>
            <div className="h-full overflow-auto w-full flex flex-col">
              <div className="m-2 md:m-12">
                <div className="relative p-4 md:p-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400 ">
                  <div class="text-left p-0 mb-8">
                    <div>
                      <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                      <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                        ABC Motor Parts
                      </h1>
                    </div>

                    <h1 class="text-gray-800 text-3xl font-medium">
                      {EditButtonIsClicked ? "Edit " : "Add "} Account
                    </h1>
                  </div>

                  {/* handleAddAccount={this.handleAddAccount}  */}
                  <form
                    onSubmit={handleAddAccount}
                    class={`mt-9 ${EditButtonIsClicked ? "hidden" : ""}`}
                  >
                    <div className="mt-9">
                      <div>
                        <div class="mt-5 flex justify-between space-x-2">
                          <div class="relative z-0 w-1/2 mb-5">
                            <input
                              type="text"
                              name="first_name"
                              onChange={onChange}
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
                            <span
                              class="text-sm text-red-600 hidden"
                              id="error"
                            >
                              First name is required
                            </span>
                          </div>
                          <div class="relative z-0 w-1/2 mb-5">
                            <input
                              type="text"
                              name="last_name"
                              onChange={onChange}
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
                            onChange={onChange}
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
                            {emailError ? "Not a valid email" : ""}
                          </span>
                        </div>
                        <div class="relative z-0 w-full mb-5">
                          <input
                            type="text"
                            name="username"
                            onChange={onChange}
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
                            {usernameError ? "Username not available" : ""}
                          </span>
                        </div>
                        <div class="relative z-0 w-full mb-5">
                          <input
                            type="password"
                            name="password"
                            onChange={onChange}
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
                            onChange={onChange}
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
                            {ConfirmPasswordError
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
                            onChange={onChange}
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
                            {contactNumberError
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
                              onChange={province}
                              onSelect={region}
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
                              onChange={city}
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
                              onChange={barangay}
                              required
                              name="city"
                              class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:border-cyan-700"
                              placeholder="City"
                            >
                              <option disabled>Select City</option>
                              {cityData &&
                                cityData.length > 0 &&
                                cityData.map((item) => (
                                  <option
                                    key={item.city_code}
                                    value={item.city_code}
                                  >
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
                              onChange={brgy}
                              required
                              name="brgy"
                              class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:border-cyan-700"
                              placeholder="Brgy"
                            >
                              <option disabled>Select Barangay</option>
                              {barangayData &&
                                barangayData.length > 0 &&
                                barangayData.map((item) => (
                                  <option
                                    key={item.brgy_code}
                                    value={item.brgy_code}
                                  >
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
                            onChange={onChange}
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
                          <label
                            for="BirthInputDate"
                            class="text-gray-800 mb-2"
                          >
                            Birth date
                          </label>
                          {/* <div>{this.state.Birtdate}</div> */}

                          <DatePicker
                            selected={BirthInputDate}
                            onChange={(date) => onChangeDate(date)}
                            value={BirthInputDate}
                            closeOnScroll={true}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
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
                            <span class="underline">
                              Terms and Conditions
                            </span>{" "}
                          </Link>{" "}
                          and
                          <Link to="/privacy-policy" target="_blank">
                            {" "}
                            <span class="underline">Privacy Policy</span>{" "}
                          </Link>
                        </div>
                      </span>
                    </div>

                    <div className="flex items-center justify-center w-full mt-10">
                      <button
                        type="submit"
                        className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-2 text-sm"
                      >
                        Submit
                      </button>
                      <button
                        className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                        onClick={
                          !EditButtonIsClicked
                            ? onModalToggleAdd
                            : onEditCloseButton
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                  <form
                    onSubmit={handleEditAccountInfoSubmit}
                    class={`mt-9 ${EditButtonIsClicked ? "" : "hidden"}`}
                  >
                    <div className="mt-9">
                      <div>
                        <div class="mt-5 flex justify-between space-x-2">
                          <div class="relative z-0 w-1/2 mb-5">
                            <input
                              type="text"
                              name="first_name"
                              onChange={onChange}
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
                            <span
                              class="text-sm text-red-600 hidden"
                              id="error"
                            >
                              First name is required
                            </span>
                          </div>
                          <div class="relative z-0 w-1/2 mb-5">
                            <input
                              type="text"
                              name="last_name"
                              onChange={onChange}
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
                            onChange={onChange}
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
                            {emailError ? "Not a valid email" : ""}
                          </span>
                        </div>
                        <div class="relative z-0 w-full mb-5">
                          <input
                            type="text"
                            name="username"
                            onChange={onChange}
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
                            {usernameError ? "Username not available" : ""}
                          </span>
                        </div>
                        <div class="flex flex-col w-full mb-5">
                          <label
                            for="BirthInputDate"
                            class="text-gray-800 mb-2"
                          >
                            Birth date
                          </label>
                          {/* <div>{this.state.Birtdate}</div> */}

                          <DatePicker
                            selected={BirthInputDate}
                            onChange={(date) => onChangeDate(date)}
                            value={BirthInputDate}
                            value={
                              BirthInputDate !== "" ? BirthInputDate : birthdate
                            }
                            closeOnScroll={true}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="Select Birth Date"
                            className="my-1 px-1 py-1 border-2 text-md rounded-l w-full text-center"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="inline-block md:font-sans text-sm text-gray-800">
                      <span class="inline-block">
                        <input type="checkbox" required class="border-0 mr-2" />
                        By creating an account you are agreeing to our{" "}
                        <div>
                          <Link to="/terms-conditions" target="_blank">
                            {" "}
                            <span class="underline">
                              Terms and Conditions
                            </span>{" "}
                          </Link>{" "}
                          and
                          <Link to="/privacy-policy" target="_blank">
                            {" "}
                            <span class="underline">Privacy Policy</span>{" "}
                          </Link>
                        </div>
                      </span>
                    </div>

                    <div className="flex items-center justify-start w-full mt-10">
                      <button
                        type="submit"
                        className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-4 text-sm"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  <form
                    handleAddAccount={handleAddAccount}
                    class={`mt-9 ${EditButtonIsClicked ? "" : "hidden"}`}
                  >
                    <div className="mt-9">
                      <h1 class="text-gray-800 text-3xl font-medium my-5">
                        Contact Details
                      </h1>
                      <div>
                        <div class="relative z-0 w-full mb-5">
                          <input
                            type="text"
                            name="contact_number"
                            value={contact_number}
                            onChange={onChange}
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
                            {contactNumberError
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
                              onChange={province}
                              onSelect={region}
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
                              onChange={city}
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
                              onChange={barangay}
                              required
                              name="city"
                              class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:border-cyan-700"
                              placeholder="City"
                            >
                              <option disabled>Select City</option>
                              {cityData &&
                                cityData.length > 0 &&
                                cityData.map((item) => (
                                  <option
                                    key={item.city_code}
                                    value={item.city_code}
                                  >
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
                              onChange={brgy}
                              required
                              name="brgy"
                              class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:border-cyan-700"
                              placeholder="Brgy"
                            >
                              <option disabled>Select Barangay</option>
                              {barangayData &&
                                barangayData.length > 0 &&
                                barangayData.map((item) => (
                                  <option
                                    key={item.brgy_code}
                                    value={item.brgy_code}
                                  >
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
                            onChange={onChange}
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
                      </div>
                    </div>
                    <div class="inline-block md:font-sans text-sm text-gray-800">
                      <span class="inline-block">
                        <input type="checkbox" required class="border-0 mr-2" />
                        By creating an account you are agreeing to our{" "}
                        <div>
                          <Link to="/terms-conditions" target="_blank">
                            {" "}
                            <span class="underline">
                              Terms and Conditions
                            </span>{" "}
                          </Link>{" "}
                          and
                          <Link to="/privacy-policy" target="_blank">
                            {" "}
                            <span class="underline">Privacy Policy</span>{" "}
                          </Link>
                        </div>
                      </span>
                    </div>

                    <div className="flex items-center justify-start w-full mt-10">
                      <button
                        type="submit"
                        className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-4 text-sm"
                      >
                        Submit
                      </button>
                    </div>
                  </form>

                  <form
                    onSubmit={handleChangePassword}
                    class={`mt-9 ${EditButtonIsClicked ? "" : "hidden"}`}
                  >
                    <h1 class="text-gray-800 text-3xl font-medium my-5">
                      Change Password
                    </h1>
                    <div class="relative z-0 w-full mb-5">
                      <input
                        type="password"
                        onChange={onChange}
                        name="old_password"
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
                        onChange={onChange}
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

                      {passwordError.map((err) => (
                        <div class="text-sm text-red-600" id="error">
                          {err.message}
                        </div>
                      ))}
                    </div>
                    <div class="relative z-0 w-full mb-5">
                      <input
                        type="password"
                        onChange={onChange}
                        name="password2"
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
                    <div className="flex items-center justify-start w-full mt-10">
                      <button
                        type="submit"
                        className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-4 text-sm"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  <div
                    className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:text-gray-400 transition duration-150 ease-in-out"
                    onClick={
                      !EditButtonIsClicked
                        ? onModalToggleAdd
                        : onEditCloseButton
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Close"
                      className="icon icon-tabler icon-tabler-x"
                      width={35}
                      height={35}
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={18} y1={6} x2={6} y2={18} />
                      <line x1={6} y1={6} x2={18} y2={18} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {})(AccountFormModal);
