import React, { useState } from "react";

const CategoryModal = (props) => {
  const {
    categories,
    onChange,
    handleSubmitCategory,
    handleModalToggleCategoryEdit,
    handleModalCategoryEditClose,
    handleModalCategoryAdd,
    handleSubmitUpdateCategory,
  } = props;
  const {
    categoryName,
    showModalCategoryAddEdit,
    showModalCategoryTable,
    EditButtonCategoryIsClicked,
  } = props.state;
  return (
    <>
      <div class={showModalCategoryTable ? "h-screen " : "h-screen hidden"}>
        <div class="mx-auto max-w-screen-lg h-full">
          <div
            className="z-20 absolute top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <div class="modal-overlay absolute w-full h-full z-25 bg-gray-900 opacity-50"></div>
            <div className="h-full overflow-auto w-full flex flex-col">
              <div className="m-2 md:m-12">
                <form class="mt-9">
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
                          {EditButtonCategoryIsClicked ? "Update " : "Add "}{" "}
                          Categories Setting
                        </h1>
                      </div>
                      <div
                        onClick={handleModalCategoryAdd}
                        className="ml-4 text-white cursor-pointer bg-teal_custom hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center"
                      >
                        <i class="fal fa-plus fa-lg"></i>
                      </div>
                    </div>
                    <table className="min-w-full bg-white p-28">
                      <thead>
                        <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
                          <th className="pl-12 text-gray-600  font-normal pr-6 text-left text-sm ">
                            ID
                          </th>
                          <th className="text-gray-600  font-normal pr-6 text-left text-sm">
                            Category Name
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category) => (
                          <tr
                            key={category.id}
                            className="h-24 border-gray-300 dark:border-gray-200 border-b"
                          >
                            <td className="pl-12 text-sm pr-6 whitespace-no-wrap text-gray-800 ">
                              {category.id}
                            </td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 ">
                              {category.name}
                            </td>
                            <td className="text-gray-800">
                              <div
                                onClick={handleModalToggleCategoryEdit(
                                  category.id,
                                  category.name
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
                      onClick={props.handleModalCategory}
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
      <div class={showModalCategoryAddEdit ? "h-screen " : "h-screen hidden"}>
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
                    EditButtonCategoryIsClicked
                      ? handleSubmitUpdateCategory
                      : handleSubmitCategory
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
                        Categories Setting
                      </h1>
                    </div>

                    <div class="relative z-0 w-full mb-5">
                      <input
                        type="text"
                        name="categoryName"
                        required
                        value={categoryName}
                        onChange={onChange}
                        placeholder=" "
                        class={
                          "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                        }
                      />
                      <label
                        for="categoryName"
                        class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                      >
                        Category Name
                      </label>
                      {/* <span class="text-sm text-red-600" id="error">
                          {ProductNameError}
                        </span> */}
                    </div>
                    <div className="flex items-center justify-center w-full">
                      <button
                        type="submit"
                        className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-2 text-sm"
                      >
                        Submit
                      </button>
                      <button className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">
                        Cancel
                      </button>
                    </div>
                    <div
                      onClick={
                        EditButtonCategoryIsClicked
                          ? handleModalCategoryEditClose
                          : handleModalCategoryAdd
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

export default CategoryModal;
