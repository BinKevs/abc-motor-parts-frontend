import React, { useState } from "react";
import { phone } from "phone";
const ContactDetails = (props) => {
  const { onChange, handleUpdateContact, region, province } = props;
  const {
    contact_number,
    contactNumberError,
    contact_numberExistError,
    address,
    regionData,
  } = props.state;
  return (
    <>
      <section class="mx-auto px-5 ContactPanel hidden">
        <div class="w-full mb-8 rounded-lg shadow-lg ">
          <div className="bg-white p-4">
            <div class="px-4 py-3 border-gray-300">
              <div class="text-left p-0 mt-4">
                <h1 class="px-4 py-6 text-gray-800 text-3xl font-medium border-b border-gray-300">
                  Contact Details
                </h1>
              </div>

              <form onSubmit={handleUpdateContact} class="mt-4">
                <div className="my-5">
                  <div className="text-gray-400 text-xl">
                    Current phone number
                  </div>
                  <label class="my-5">
                    <span class="ml-2">{props.AuthReducer.contact_number}</span>
                  </label>
                </div>{" "}
                <div class="relative z-0 w-full mb-5">
                  <input
                    type="number"
                    name="contact_number"
                    value={contact_number}
                    onChange={onChange}
                    placeholder=" "
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
                    {contact_numberExistError
                      ? "Contact number not available"
                      : ""}
                  </span>
                </div>
                <div className="my-5">
                  <div className="text-gray-400 text-xl">Current Address</div>
                  <label class="my-5">
                    <span class="ml-2">
                      {props.AuthReducer.addresses
                        ? props.AuthReducer.addresses.address
                        : ""}{" "}
                    </span>
                  </label>
                </div>
                <div class="relative z-0 w-full mb-5">
                  <label class="block my-2">Select Region</label>
                  <div class="relative inline-block w-full text-gray-700">
                    <select
                      onChange={province}
                      onSelect={region}
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
                {/* 
                <div class="relative z-0 w-full mb-5">
                  <label class="block my-2">Select Province</label>
                  <div class="relative inline-block w-full text-gray-700">
                    <select
                      onChange={city}
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
                      onChange={brgy}
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
                </div> */}
                <div class="relative z-0 w-full mb-5">
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={onChange}
                    placeholder=" "
                    class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                  />
                  <label
                    for="name"
                    class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                  >
                    House No., Street name, Building. Subd, Brgy, City,
                    Province, Region
                  </label>
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
    </>
  );
};

export default ContactDetails;
