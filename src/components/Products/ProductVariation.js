import React, { useState } from "react";

const ProductVariation = (props) => {
  const {
    handleModalProductVarationTable,
    handleModalProductVarationEditClose,
    handleModalProductVarationAddClose,
    handleModalToggleProductVarationEdit,
    onChange,
    handleUpdateProductVariation,
    handleAddProductVariation,
    handleModalProductVarationAdd,
  } = props;
  const {
    showModalProductVariation,
    showModalProductVariationAddEdit,
    product_variation,
    stockProductVariation,
    variantProductVariation,
    weightProductVariation,
    EditButtonProductVariationIsClicked,
    SKUProductVariation,
  } = props.state;

  return (
    <>
      <div class={showModalProductVariation ? "h-screen" : "h-screen hidden"}>
        <div class="mx-auto max-w-screen-lg h-full">
          <div
            className={
              showModalProductVariation
                ? "absolute top-0 bottom-0 left-0 right-0 animated fadeIn z-20"
                : "absolute top-0 bottom-0 left-0 right-0 animated fadeOut z-20"
            }
          >
            <div class="modal-overlay absolute w-full h-full z-25 bg-gray-900 opacity-50"></div>
            <div className="h-full overflow-auto w-full flex flex-col">
              <div className="m-2 md:m-12">
                <form onSubmit={handleUpdateProductVariation} class="mt-9">
                  <div className="relative p-4 md:p-8 bg-white dark:border-gray-700 shadow-md rounded border border-gray-400 ">
                    <div className="flex justify-between items-center">
                      <div class="text-left p-0 mb-8">
                        <div>
                          <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                          <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                            ABC Motor Parts
                          </h1>
                        </div>

                        <h1 class="text-gray-800 text-3xl font-medium">
                          Product Variation Setting
                        </h1>
                      </div>
                      <div
                        onClick={handleModalProductVarationAdd}
                        className="ml-4 text-white cursor-pointer bg-teal_custom hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center"
                      >
                        <i class="fal fa-plus fa-lg"></i>
                      </div>
                    </div>
                    <table className="md:min-w-full bg-white md:p-28 p-0">
                      <thead>
                        <tr className="h-16 border-gray-300 border-b py-8 text-left font-bold text-gray-500">
                          <th className="pl-14 pr-6 text-md">ID</th>
                          <th className="pl-14 pr-6 text-md">SKU</th>
                          <th className="  pr-6 text-md">Variant</th>
                          <th className=" pr-6 text-md">Weight</th>
                          <th className="  pr-6 text-md">Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product_variation.map((variation) => (
                          <tr
                            key={variation.id}
                            className="h-24 border-gray-300 dark:border-gray-200 border-b "
                          >
                            <td className="pl-12 text-sm pr-6 whitespace-no-wrap text-gray-800 ">
                              {variation.id}
                            </td>
                            <td className="pl-12 text-sm pr-6 whitespace-no-wrap text-gray-800 ">
                              {variation.SKU}
                            </td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 ">
                              {variation.variation}
                            </td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 ">
                              {variation.weight}
                            </td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 ">
                              {variation.stock}
                            </td>
                            <td className="text-gray-800">
                              <div
                                onClick={handleModalToggleProductVarationEdit(
                                  variation.id,
                                  variation.SKU,
                                  variation.stock,
                                  variation.variation,
                                  variation.weight
                                )}
                                className="shadow rounded p-2 text-center cursor-pointer  text-sm py-3 bg-teal_custom text-white px-3 font-normal"
                              >
                                Edit
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div
                      onClick={handleModalProductVarationTable}
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
      <div
        class={
          showModalProductVariationAddEdit ? "h-screen " : "h-screen hidden"
        }
      >
        <div class="mx-auto max-w-screen-lg h-full">
          <div
            className={
              showModalProductVariationAddEdit
                ? "absolute top-0 bottom-0 left-0 right-0 animated fadeIn z-20"
                : "absolute top-0 bottom-0 left-0 right-0 animated fadeOut z-20"
            }
          >
            <div class="modal-overlay absolute w-full h-full z-25 bg-gray-900 opacity-50"></div>
            <div className="h-full overflow-auto w-full flex flex-col">
              <div className="m-2 md:m-12">
                {/* onSubmit={onSubmitUpdateCategory} */}
                <form
                  onSubmit={
                    EditButtonProductVariationIsClicked
                      ? handleUpdateProductVariation
                      : handleAddProductVariation
                  }
                  class="mt-9"
                >
                  <div className="relative p-4 md:p-8 bg-white dark:border-gray-700 shadow-md rounded border border-gray-400 ">
                    <div class="text-left p-0 mb-8">
                      <div>
                        <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                        <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                          ABC Motor Parts
                        </h1>
                      </div>

                      <h1 class="text-gray-800 text-3xl font-medium">
                        {EditButtonProductVariationIsClicked
                          ? "Update "
                          : "Add "}
                        Product Variation Setting
                      </h1>
                    </div>
                    <div class="relative z-0 w-full mb-5">
                      <input
                        type="text"
                        name="SKUProductVariation"
                        required
                        value={SKUProductVariation}
                        onChange={onChange}
                        placeholder=" "
                        class={
                          "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                        }
                      />
                      <label
                        for="weight"
                        class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                      >
                        SKU
                      </label>
                      {/* <span class="text-sm text-red-600" id="error">
                          {ProductNameError}
                        </span> */}
                    </div>
                    <div class="relative z-0 w-full mb-5">
                      <input
                        type="text"
                        name="variantProductVariation"
                        required
                        value={variantProductVariation}
                        onChange={onChange}
                        placeholder=" "
                        class={
                          "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                        }
                      />
                      <label
                        for="variantProductVariation"
                        class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                      >
                        Variant Name
                      </label>
                      {/* <span class="text-sm text-red-600" id="error">
                          {ProductNameError}
                        </span> */}
                    </div>

                    <div class="relative z-0 w-full mb-5">
                      <input
                        type="number"
                        name="weightProductVariation"
                        required
                        value={weightProductVariation}
                        onChange={onChange}
                        placeholder=" "
                        class={
                          "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                        }
                      />
                      <label
                        for="weight"
                        class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                      >
                        Weight
                      </label>
                      {/* <span class="text-sm text-red-600" id="error">
                          {ProductNameError}
                        </span> */}
                    </div>
                    <div class="relative z-0 w-full mb-5">
                      <input
                        type="number"
                        name="stockProductVariation"
                        required
                        value={
                          stockProductVariation > 0 ? stockProductVariation : ""
                        }
                        onChange={onChange}
                        placeholder=" "
                        class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                      />
                      <label
                        for="stock"
                        class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                      >
                        Stock
                      </label>
                      <span class="text-sm text-red-600 hidden" id="error">
                        Stock is required
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
                          showModalProductVariationAddEdit
                            ? handleModalProductVarationEditClose
                            : handleModalProductVarationAddClose
                        }
                      >
                        Cancel
                      </button>
                    </div>
                    <div
                      onClick={
                        showModalProductVariationAddEdit
                          ? handleModalProductVarationEditClose
                          : handleModalProductVarationAddClose
                      }
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

export default ProductVariation;
