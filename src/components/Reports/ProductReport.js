import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Bar, Line } from "react-chartjs-2";
import {
  getProductList,
  getCategoryList,
} from "../../store/actions/product/products";
let filteredProducts = [];
let DateNow = Date().toLocaleString().split(" ");
class ProductReport extends React.Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    getProductList: PropTypes.func.isRequired,
  };
  state = {
    category: "Select category",
    dropdown: false,
    occupied: false,
  };
  componentDidMount() {
    this.props.getProductList();
    this.props.getCategoryList();
  }
  handleCategory(CategoryName) {
    return (event) => {
      event.preventDefault();
      this.setState({
        category: CategoryName,
        dropdown: !this.state.dropdown,
        occupied: true,
      });
    };
  }

  render() {
    filteredProducts = [];
    filteredProducts = this.props.products.filter((item) => {
      // return Object.keys(item).some((key) =>
      // 	item[key].toString().includes(lowercasedFilter)
      // );
      {
        return this.state.category !== ""
          ? item.category_info.name === this.state.category
          : item;
      }
    });
    console.log(filteredProducts);
    if (this.state.category === "Select category") {
      this.setState({
        occupied: false,
        category: "Select Category",
      });
    }
    return (
      <>
        <div class="flex-1 bg-gray-100 mt-28 md:mt-16 pb-24 md:pb-5">
          <div class="bg-gray-800 pt-3">
            <div
              class="
							rounded-tl-3xl
							bg-gradient-to-r
							from-teal_custom
							to-gray-800
							p-4
							shadow
							text-2xl text-white
						"
            >
              <h3 class="font-bold pl-2">Reports</h3>
            </div>
          </div>

          <div
            className={
              !this.state.occupied
                ? "mx-auto w-11/12 mt-6 relative"
                : "mx-auto w-11/12 mt-6 p-3"
            }
          >
            {!this.state.occupied ? (
              <>
                {/* <div class="absolute w-full h-full z-25 bg-gray-900 opacity-50"></div> */}
                <div class="absolute md:top-1/2 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 font-medium text-gray-900 text-center md:text-3xl text-sm">
                  <div>No data available!</div> Please select a starting date
                  and ending date in the upper right corner.
                </div>
              </>
            ) : (
              ""
            )}
            <div className="bg-white shadow-lg p-4">
              <div className="relative w-full max-w-full flex-grow">
                <h6 className="uppercase text-gray-600 mb-3 text-sm font-semibold">
                  Stocks
                </h6>

                <h2 className="text-gray-800 text-2xl font-semibold mr-5">
                  Stocks Overview
                  <div>Select Category :</div>
                </h2>
                <div class="flex flex-col">
                  <div class="flex flex-col items-start relative">
                    <div class="my-2 bg-white p-1 flex border border-gray-200 rounded ">
                      <input
                        value={this.state.category}
                        class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                      />
                      <div>
                        <button
                          onClick={() => {
                            this.setState({
                              category: "Select category",
                            });
                          }}
                          class="cursor-pointer w-6 h-full flex items-center text-gray-400 outline-none focus:outline-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-x w-4 h-4"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                      <div
                        onClick={() => {
                          this.setState({
                            dropdown: !this.state.dropdown,
                          });
                        }}
                        class="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 "
                      >
                        <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                          <i
                            class={
                              this.state.dropdown
                                ? "fad fa-angle-up"
                                : "fad fa-angle-down"
                            }
                          ></i>
                        </button>
                      </div>
                    </div>

                    <div
                      class={
                        this.state.dropdown
                          ? "absolute shadow top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto"
                          : "absolute shadow top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto hidden"
                      }
                    >
                      <div class="flex flex-col w-full">
                        {this.props.categories.map((category) => (
                          <div
                            onClick={this.handleCategory(category.name)}
                            class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
                          >
                            <div class="flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-teal-600 hover:text-teal-100 hover:border-teal-600">
                              <div class="w-full items-center flex">
                                <div class="mx-2 leading-6  ">
                                  {category.name}{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {/* <div class="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100 ">
										<div class="flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-teal-600 hover:text-teal-100 border-teal-600">
											<div class="w-full items-center flex">
												<div class="mx-2 leading-6  ">Javascript </div>
											</div>
										</div>
									</div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chart">
                <Bar
                  data={{
                    labels: filteredProducts.map((x) => x.name),
                    datasets: [
                      {
                        label: this.state.category + " Stocks",
                        fill: false,
                        data: filteredProducts.map((x) => x.variation[0].stock),
                        // backgroundColor: '#3AAFA9',
                        backgroundColor: "rgba(58, 175, 169, 0.3)",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                        align: "end",
                        labels: {
                          font: {
                            size: 15,
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  products: state.products.products,
  categories: state.products.categories,
});

export default connect(mapStateToProps, {
  getProductList,
  getCategoryList,
})(ProductReport);
