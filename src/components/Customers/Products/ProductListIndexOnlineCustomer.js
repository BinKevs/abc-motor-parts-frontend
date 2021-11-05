import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import {
  getProductList,
  deleteProduct,
  getCategoryList,
} from "../../../store/actions/product/products";
import { addToCart } from "../../../store/actions/cart/cartActions";
import { Link } from "react-router-dom";
import noImageAvailable from "../../../no-image-available.png";

class ProductListIndexOnlineCustomer extends React.Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    getProductList: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
  };
  state = {
    search: "",
    category: this.props.match.params.categoryName,
  };

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  trimmedString(stringX) {
    if (stringX.length === 24) {
      return stringX;
    } else {
      return stringX.substring(0, 24) + "...";
    }
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  handleCategoryFiltering = (categoryName) => {
    return (event) => {
      event.preventDefault();
      this.setState({ category: categoryName });
    };
  };
  handleClearFilter = (event) => {
    event.preventDefault();
    this.setState({ category: "" });
  };
  componentDidMount() {
    this.props.getProductList();
    this.props.getCategoryList();
  }
  handleRightScroll = () => {
    document.getElementById("slider").scrollLeft += 120;
  };
  handleLeftScroll = () => {
    document.getElementById("slider").scrollLeft -= 120;
  };

  render() {
    let products = [];
    let filteredDataProduct = [];
    let temp = 0;
    this.props.products.map(
      (product) => (
        product.variation.map((p) => (temp += p.stock)),
        products.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          file_content: product.file_content,
          variation: temp,
          category: product.category_info.name,
          supplier: product.supplier_info.name,
          stock: product.stock,
          description: product.description,
          status: product.status,
        }),
        (temp = 0)
      )
    );

    const SearchFilter = this.state.search.toLowerCase();
    const categoryFilter = this.state.category.toLowerCase();

    filteredDataProduct = products.filter((item) => {
      if (item.status) {
        if (
          SearchFilter === "" &&
          (categoryFilter === "" || categoryFilter === "all")
        ) {
          return item;
        } else {
          return (
            item.category.toString().toLowerCase().includes(categoryFilter) &&
            item.name.toString().toLowerCase().includes(SearchFilter)
          );
        }
      }
    });

    return (
      <>
        <div className="flex-1 w-full  lg:w-2/3 bg-gray-100 mt-20 md:mt-14 pb-24 md:pb-5">
          <div className="w-full mt-2 p-8 order-last lg:order-first">
            <header>
              <div className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-end w-full"></div>
                </div>

                <div className={"relative mt-6 max-w-lg mx-auto"}>
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>

                  <input
                    className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
                    type="text"
                    name="search"
                    placeholder="Search"
                    onChange={this.onChange}
                    value={this.state.search}
                  />
                </div>
              </div>
            </header>

            <div
              className={
                "relative flex items-center mt-3 border-t-4 border-b-4"
              }
            >
              <span
                onClick={this.handleLeftScroll}
                className="h-12 w-16 flex items-center justify-center text-gray-600"
              >
                <i className="fal fa-chevron-left fa-2x"></i>
              </span>
              <div
                id="slider"
                className="w-full flex overflow-x-hidden space-x-4"
              >
                {this.props.categories.map((category) => (
                  <button
                    onClick={this.handleCategoryFiltering(category.name)}
                    className={
                      this.state.category === category.name
                        ? "text-white px-4 bg-teal-600 rounded-full hover:bg-gray-800 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none whitespace-nowrap h-14 my-2 border-gray-900 border-2"
                        : "text-white px-4 bg-gray-800 rounded-full hover:bg-teal-800 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none whitespace-nowrap h-10 my-auto"
                    }
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <span
                onClick={this.handleRightScroll}
                className="h-12 w-16 flex items-center justify-center text-gray-600"
              >
                <i className="fal fa-chevron-right fa-2x"></i>
              </span>
            </div>
            {this.state.category === "" || this.state.category === "All" ? (
              ""
            ) : (
              <div className="flex gap-x-4 mt-4 flex-col md:flex-row w-1/3">
                <div className="text-xl text-gray-900 font-semibold ">
                  <span className="text-gray-500">Filtering : </span>{" "}
                  {this.state.category}
                </div>
                <button
                  onClick={this.handleClearFilter}
                  class="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded my-auto"
                >
                  Clear Filter
                </button>
              </div>
            )}

            <div className="mt-8 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-5">
              {filteredDataProduct.map((product) => (
                <Link
                  className="cursor-pointer"
                  to={"/product/".concat(product.id + "/")}
                >
                  <div
                    className="rounded bg-white border-gray-200 shadow-md overflow-hidden relative hover:shadow-lg img-hover h-auto"
                    key={product.id}
                  >
                    {product.file_content[0] ? (
                      <img
                        src={product.file_content[0].image}
                        alt="stew"
                        className="h-32 sm:h-48 w-full object-cover imgg"
                      />
                    ) : (
                      <img
                        src={noImageAvailable}
                        alt="stew"
                        className="h-32 sm:h-48 w-full object-cover imgg"
                      />
                    )}

                    <div className="m-4 bodi">
                      <span className="font-bold">
                        {this.trimmedString(product.name)}
                      </span>
                      <span className="block text-gray-500 text-sm">
                        By {this.trimmedString(product.supplier)}
                      </span>
                    </div>

                    <div className="absolute top-0 ml-2 p-2 mt-2 bg-teal_custom text-white text-sm uppercase font-bold rounded-full ">
                      <i className="fad fa-tags fa-lg"></i>
                      <span>₱{this.numberWithCommas(product.price)}</span>
                    </div>
                    <div className="absolute bottom-0 right-2 ml-2 p-2 mb-2 text-gray-600  text-sm uppercase font-bold ">
                      {/* <span>({product.stock})</span> */}
                      {product.variation ? product.variation : ""}
                    </div>
                    <div className="product-tooltip absolute bottom-0 py-6 px-4 p-2 text-gray-800 text-sm uppercase font-bold">
                      <span>{product.name}</span>
                    </div>
                    <div className="middle">
                      <i className="fad fa-eye fa-3x"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapToStateToProps = (state) => ({
  products: state.products.products,
  isLoading: state.products.isLoading,
  categories: state.products.categories,
});
export default connect(mapToStateToProps, {
  getCategoryList,
  getProductList,
  deleteProduct,
  addToCart,
})(ProductListIndexOnlineCustomer);
