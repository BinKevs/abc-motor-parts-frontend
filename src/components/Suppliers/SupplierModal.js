import React from "react";
import { connect } from "react-redux";
const SupplierModal = (props) => {
  const {
    name,
    address,
    phone_number,
    supplierID,
    SupplierNameError,
    SupplierPhoneNumberError,
  } = props.state;
  const {
    onChange,
    handleSubmitAddSupplier,
    EditButtonIsClicked,
    handleEditCloseModal,
    handleUpdateSubmitSupplier,
    handleAddToggleModal,
    modal,
  } = props;
  return (
    <>
      <div class={modal ? "h-screen " : "h-screen hidden"}>
        <div class="mx-auto max-w-screen-lg h-full">
          <div
            className="z-20 absolute top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <div class="modal-overlay absolute w-full h-full z-25 bg-gray-900 opacity-50"></div>
            <div className="h-full overflow-auto w-full flex flex-col">
              <div className="m-2 md:m-12">
                <form
                  onSubmit={
                    !EditButtonIsClicked
                      ? handleSubmitAddSupplier
                      : handleUpdateSubmitSupplier(supplierID)
                  }
                  class="mt-9"
                >
                  <div className="relative p-4 md:p-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400 ">
                    <div class="text-left p-0 mb-8">
                      <div>
                        <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                        <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                          ABC Motor Parts
                        </h1>
                      </div>

                      <h1 class="text-gray-800 text-3xl font-medium">
                        {!EditButtonIsClicked ? "Add" : "Update"} Supplier
                      </h1>
                    </div>
                    <div className="">
                      <div class="relative z-0 w-full mb-5">
                        <input
                          type="text"
                          name="name"
                          onChange={onChange}
                          value={name}
                          placeholder=" "
                          required
                          class={
                            SupplierNameError !== ""
                              ? "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-red-600 text-red-600"
                              : "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                          }
                        />
                        <label
                          for="name"
                          class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                        >
                          Name
                        </label>
                        <span class="text-sm text-red-600" id="error">
                          {SupplierNameError}
                        </span>
                      </div>
                      <div class="relative z-0 w-full mb-5">
                        <input
                          type="text"
                          name="username"
                          onChange={onChange}
                          // value={name}
                          placeholder=" "
                          required
                          class={
                            SupplierNameError !== ""
                              ? "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-red-600 text-red-600"
                              : "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                          }
                        />
                        <label
                          for="name"
                          class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                        >
                          Username
                        </label>
                        <span class="text-sm text-red-600" id="error">
                          {SupplierNameError}
                        </span>
                      </div>
                      <div class="relative z-0 w-full mb-5">
                        <input
                          type="password"
                          name="password"
                          onChange={onChange}
                          // value={name}
                          placeholder=" "
                          required
                          class={
                            SupplierNameError !== ""
                              ? "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-red-600 text-red-600"
                              : "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                          }
                        />
                        <label
                          for="name"
                          class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                        >
                          Password
                        </label>
                        <span class="text-sm text-red-600" id="error">
                          {SupplierNameError}
                        </span>
                      </div>
                      <div class="relative z-0 w-full mb-5">
                        <textarea
                          name="address"
                          onChange={onChange}
                          value={address}
                          placeholder=" "
                          required
                          class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                        />
                        <label
                          for="address"
                          class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                        >
                          Address
                        </label>
                        <span class="text-sm text-red-600 hidden" id="error">
                          Address is required
                        </span>
                      </div>
                    </div>
                    <div class="relative z-0 w-full mb-5">
                      <input
                        type="tel"
                        name="phone_number"
                        onChange={onChange}
                        value={phone_number}
                        placeholder=" "
                        required
                        class={
                          SupplierPhoneNumberError !== ""
                            ? "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-red-600 text-red-600"
                            : "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                        }
                      />
                      <label
                        for="telephone"
                        class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                      >
                        Telephone
                      </label>
                      <span class="text-sm text-red-600" id="error">
                        {SupplierPhoneNumberError}
                      </span>
                    </div>
                    <div className="flex items-center justify-center w-full">
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
                            ? handleAddToggleModal
                            : handleEditCloseModal
                        }
                      >
                        Cancel
                      </button>
                      {/* <div
													className="w-full flex justify-center py-12 items-center"
													id="button"
												>
													<button
														className="focus:outline-none mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
														onClick={() => showModal(!modal)}
													>
														Open Modal
													</button>
												</div> */}
                    </div>

                    <div
                      className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:text-gray-400 transition duration-150 ease-in-out"
                      onClick={
                        !EditButtonIsClicked
                          ? handleAddToggleModal
                          : handleEditCloseModal
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {})(SupplierModal);
