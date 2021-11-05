import React, { useState } from "react";

const AddressModal = (props) => {
  const {
    region,
    province,
    city,
    barangay,
    brgy,
    handleUpdateContact,
    onChange,
    handleModalContact,
    address,
  } = props;
  const {
    showModalAddress,
    regionData,
    provinceData,
    cityData,
    barangayData,
    contact_number,
  } = props.state;

  return (
    <>
      <div class={showModalAddress ? "h-screen " : "h-screen hidden"}>
        <div class="mx-auto max-w-screen-lg h-full">
          <div
            className="z-20 absolute top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <div class="modal-overlay absolute w-full h-full z-25 bg-gray-900 opacity-50"></div>
            <div className="h-full overflow-auto w-full flex flex-col">
              <div className="m-2 md:m-12">
                <form onSubmit={handleUpdateContact(address.id)} class="mt-9">
                  <div className="relative p-4 md:p-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400 ">
                    <div class="text-left p-0 mb-8">
                      <div>
                        <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                        <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                          ABC Motor Parts
                        </h1>
                      </div>

                      <h1 class="text-gray-800 text-3xl font-medium">
                        Address
                      </h1>
                    </div>
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

                    <div className="flex items-center justify-center w-full">
                      <button
                        type="submit"
                        className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-2 text-sm"
                      >
                        Submit
                      </button>
                      <button
                        onClick={handleModalContact}
                        className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                      >
                        Cancel
                      </button>
                    </div>

                    <div
                      onClick={handleModalContact}
                      className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:text-gray-400 transition duration-150 ease-in-out"
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressModal;
