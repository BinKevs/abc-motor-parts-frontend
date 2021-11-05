import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
const ProductModal = (props) => {
  const {
    suppliers,
    categories,
    onChange,
    handleSubmitAddProduct,
    handleSubmitUpdateProduct,
    EditButtonProductIsClicked,
    handleEditCloseButtonProduct,
    handleModalToggleAddProduct,
    handleLeftScroll,
    handelRightScroll,
    handleRemoveImage,
    showProductModal,
    handleModalProductVarationTable,
  } = props;
  const {
    productName,
    description,
    price,
    categoryID,
    supplierID,
    stock,
    size,
    color,
    productID,
    ProductNameError,
    weight,
    image,
    urlFile,
    file_content,

    product_name_attribute,
    size_attribute,
    color_attribute,
  } = props.state;
  return (
    <>
      {/* <CSSTransition in={showProductModal} timeout={500} classNames="alert" unmountOnExit> */}
      <div class={showProductModal ? "h-screen" : "h-screen hidden "}>
        <div class="mx-auto max-w-screen-lg h-full">
          <div
            className={
              showProductModal
                ? "absolute top-0 bottom-0 left-0 right-0 animated fadeIn z-20"
                : "absolute top-0 bottom-0 left-0 right-0 animated fadeOut z-20"
            }
          >
            <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div className="h-full overflow-auto w-full flex flex-col">
              <div className="m-2 md:m-12">
                <form
                  onSubmit={
                    !EditButtonProductIsClicked
                      ? handleSubmitAddProduct
                      : handleSubmitUpdateProduct(productID)
                  }
                >
                  <div className="relative p-4 md:p-8 bg-white shadow-md rounded border border-gray-400 w-full">
                    <div className="flex items-center justify-start w-full">
                      <div class="text-left p-0 mb-8 w-full">
                        <div>
                          <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                          <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                            ABC Motor Parts
                          </h1>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between md:items-center">
                          <h1 class="text-gray-800 text-3xl font-medium">
                            {!EditButtonProductIsClicked ? "Add " : "Update "}
                            Product
                          </h1>
                          <div>
                            {EditButtonProductIsClicked ? (
                              <div className="w-full flex justify-start my-5">
                                <div
                                  onClick={handleModalProductVarationTable}
                                  className="flex md:ml-4 bg-teal_custom text-white cursor-pointer h-12 rounded items-center justify-center px-3"
                                >
                                  <i class="fal fa-sliders-v mr-2"></i>
                                  <div>Variation Setting</div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div class="relative z-0 w-full mb-5">
                        <input
                          type="text"
                          name="productName"
                          required
                          value={productName}
                          onChange={onChange}
                          placeholder=" "
                          class={
                            ProductNameError !== ""
                              ? "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-red-600 text-red-600"
                              : "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                          }
                        />
                        <label
                          for="productName"
                          class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                        >
                          Name
                        </label>
                        <span class="text-sm text-red-600" id="error">
                          {ProductNameError}
                        </span>
                      </div>
                      {!EditButtonProductIsClicked ? (
                        <div>
                          <div class="relative z-0 w-full mb-5">
                            <input
                              type="text"
                              name="size"
                              required
                              value={size}
                              onChange={onChange}
                              placeholder=" "
                              class={
                                "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                              }
                            />
                            <label
                              for="size"
                              class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                            >
                              Size
                            </label>
                            {/* <span class="text-sm text-red-600" id="error">
                          {ProductNameError}
                          </span> */}
                          </div>
                          <div class="relative z-0 w-full mb-5">
                            <input
                              type="text"
                              name="color"
                              required
                              value={color}
                              onChange={onChange}
                              placeholder=" "
                              class={
                                "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                              }
                            />
                            <label
                              for="color"
                              class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                            >
                              Color
                            </label>
                            {/* <span class="text-sm text-red-600" id="error">
                          {ProductNameError}
                          </span> */}
                          </div>
                          <div className="pt-3 pb-2 text-gray-800">
                            Stock-keeping unit(SKU)
                          </div>
                          <div class="mt-5 flex flex-col md:flex-row justify-center space-x-0 md:space-x-2">
                            <div class="mb-5">
                              <input
                                className="w-full border rounded-md pl-4 py-2 focus:ring-0 focus:border-cyan-700"
                                type="text"
                                name="product_name_attribute"
                                value={product_name_attribute}
                                placeholder="Product name"
                              />
                            </div>
                            <span className="text-2xl font-bold">-</span>
                            <div class="mb-5">
                              <input
                                className="w-full border rounded-md pl-4 py-2 focus:ring-0 focus:border-cyan-700"
                                type="text"
                                name="size_attribute"
                                value={size_attribute}
                                placeholder="Size attribute"
                              />
                            </div>
                            <span className="text-2xl font-bold">-</span>
                            <div class="mb-5">
                              <input
                                className="w-full border rounded-md pl-4 py-2 focus:ring-0 focus:border-cyan-700"
                                type="text"
                                name="color_attribute"
                                value={color_attribute}
                                placeholder="Color attribute"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div class="flex flex-wrap -mx-3 mb-5">
                        <h2 class="px-4 pt-3 pb-2 text-gray-800">
                          Description
                        </h2>
                        <div class="w-full md:w-full px-3 mb-2 mt-2">
                          <textarea
                            class="rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 placeholder-gray-700 focus:outline-none"
                            name="description"
                            onChange={onChange}
                            value={description}
                            placeholder="Type Your Description"
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div class="relative z-0 mb-5 space-y-4 border-4 rounded-2xl p-2">
                        <label class="block">Image</label>
                        {!EditButtonProductIsClicked ? (
                          <>
                            <input
                              class="pt-3 pb-2 block w-full px-2 mt-0 text-gray-700 focus:ring-0 active:border-cyan-700 "
                              id="file_content"
                              type="file"
                              multiple
                              name="file_content"
                              required
                              onChange={onChange}
                            />
                            {urlFile === [] ? (
                              <div className="relative flex items-center">
                                <span
                                  onClick={handleLeftScroll}
                                  className="h-12 w-16 flex items-center justify-center text-gray-600"
                                >
                                  <i class="fad fa-angle-left fa-3x"></i>
                                </span>
                                <div
                                  id="slider"
                                  className="flex overflow-x-hidden space-x-4"
                                >
                                  {urlFile.map((url, index) =>
                                    url.type.includes("video") ? (
                                      <>
                                        <div className="img-hover relative">
                                          <div className="w-64">
                                            <video
                                              width="400"
                                              height="300"
                                              controls
                                            >
                                              <source
                                                src={url.file}
                                                type="video/mp4"
                                              />
                                              Your browser does not support HTML
                                              video.
                                            </video>
                                          </div>
                                          <button
                                            onClick={handleRemoveImage(index)}
                                            className="middle"
                                          >
                                            <i class="far fa-trash-alt fa-3x"></i>
                                          </button>{" "}
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="img-hover relative ">
                                          <img
                                            alt="product image"
                                            class="object-cover h-55 w-64 max-w-none border-4 rounded-3xl imgg"
                                            src={url.file}
                                          />
                                          <button
                                            onClick={handleRemoveImage(index)}
                                            className="middle"
                                          >
                                            <i class="far fa-trash-alt fa-3x"></i>
                                          </button>{" "}
                                        </div>
                                      </>
                                    )
                                  )}
                                </div>

                                <span
                                  onClick={handelRightScroll}
                                  className="h-12 w-16 flex items-center justify-center text-gray-600"
                                >
                                  <i class="fad fa-angle-right fa-3x"></i>
                                </span>
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          <>
                            <div className="relative flex items-center">
                              <span
                                onClick={handleLeftScroll}
                                className="h-12 w-16 flex items-center justify-center text-gray-600"
                              >
                                <i class="fad fa-angle-left fa-3x"></i>
                              </span>
                              <div
                                id="slider"
                                className="overflow-x-hidden flex space-x-4"
                              >
                                {file_content
                                  ? file_content.map((url, index) =>
                                      url.image.includes(".mp4") ? (
                                        <>
                                          <div className="img-hover relative">
                                            <div className="w-64">
                                              <video
                                                width="400"
                                                height="300"
                                                controls
                                              >
                                                <source
                                                  src={url.image}
                                                  type="video/mp4"
                                                />
                                                Your browser does not support
                                                HTML video.
                                              </video>
                                            </div>
                                            <button
                                              onClick={handleRemoveImage(index)}
                                              className="middle"
                                            >
                                              <i class="fad fa-trash-alt fa-3x"></i>
                                            </button>{" "}
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div className="img-hover relative ">
                                            <img
                                              alt="product image"
                                              class="object-cover h-55 w-64 max-w-none border-4 rounded-3xl imgg"
                                              src={url.image}
                                            />
                                            <button
                                              onClick={handleRemoveImage(index)}
                                              className="middle"
                                            >
                                              <i class="far fa-trash-alt fa-3x"></i>
                                            </button>{" "}
                                          </div>
                                        </>
                                      )
                                    )
                                  : ""}
                              </div>

                              <span
                                onClick={handelRightScroll}
                                className="h-12 w-16 flex items-center justify-center text-gray-600"
                              >
                                <i class="fad fa-angle-right fa-3x"></i>
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                      {/* <div class="w-full mb-5">
												<button className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-2 text-sm">
													Add Category
												</button>
											</div> */}
                      <div class="relative z-0 w-full mb-5">
                        <label class="block my-2">Select Category</label>
                        <div class="relative inline-block w-full text-gray-700">
                          {/* <input
														type="text"
														placeholder="Search"
														class="pt-3 pb-2 block w-full border-gray-200"
													/> */}
                          <select
                            onChange={onChange}
                            name="categoryID"
                            required
                            class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:border-cyan-700"
                          >
                            {categoryID === 0 ? (
                              <option selected>
                                Open this to select category
                              </option>
                            ) : (
                              ""
                            )}

                            {categories.map((categoryItem) => (
                              <option
                                selected={
                                  categoryItem.id === categoryID
                                    ? "selected"
                                    : ""
                                }
                                value={categoryItem.id}
                                key={categoryItem.id}
                              >
                                {categoryItem.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div class="relative z-0 w-full mb-5">
                        <label class="block my-2">Select Supplier</label>
                        <div class="relative inline-block w-full text-gray-700">
                          <select
                            onChange={onChange}
                            name="supplierID"
                            required
                            class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:border-cyan-700"
                            placeholder="Regular input"
                          >
                            {supplierID === 0 ? (
                              <option selected>
                                Open this to select supplier
                              </option>
                            ) : (
                              ""
                            )}
                            {suppliers.map((supplierItem) => (
                              <option
                                selected={
                                  supplierItem.id === supplierID
                                    ? "selected"
                                    : ""
                                }
                                value={supplierItem.id}
                                className="text-dark"
                                key={supplierItem.id}
                              >
                                {supplierItem.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {!EditButtonProductIsClicked ? (
                        <>
                          <div class="relative z-0 w-full mb-5">
                            <input
                              type="number"
                              name="weight"
                              required
                              value={weight}
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
                              name="stock"
                              required
                              onChange={onChange}
                              value={stock > 0 ? stock : ""}
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
                            <span
                              class="text-sm text-red-600 hidden"
                              id="error"
                            >
                              Stock is required
                            </span>
                          </div>
                        </>
                      ) : (
                        ""
                      )}

                      <div class="relative z-0 w-full mb-5">
                        <input
                          type="number"
                          name="price"
                          required
                          onChange={onChange}
                          value={price > 0 ? price : ""}
                          onChange={onChange}
                          placeholder=" "
                          class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                        />
                        <label
                          for="number"
                          class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                        >
                          Price
                        </label>
                        <span class="text-sm text-red-600 hidden" id="error">
                          Price is required
                        </span>
                      </div>
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
                          !EditButtonProductIsClicked
                            ? handleModalToggleAddProduct
                            : handleEditCloseButtonProduct
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
														onClick={() => showModal(!showProductModal)}
													>
														Open Modal
													</button>
												</div> */}
                    </div>
                    <div
                      className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:text-gray-400 transition duration-150 ease-in-out"
                      onClick={
                        !EditButtonProductIsClicked
                          ? handleModalToggleAddProduct
                          : handleEditCloseButtonProduct
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
      {/* </CSSTransition> */}
    </>
  );
};
ProductModal.propTypes = {
  handleSubmitAddProduct: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  suppliers: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};
export default connect(null, {})(ProductModal);
