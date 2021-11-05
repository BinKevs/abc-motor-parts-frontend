import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTransactionItemList } from "../../store/actions/transaction/transactions.js";
import { getProductList } from "../../store/actions/product/products";
import DatePicker from "react-datepicker";

import { TransactionItemsTableExportModal } from "./Print/TransactionItemsTableExportModal";
let TransactionItems = [];
let filteredData = [];
class TransactionItemsSettingIndex extends React.Component {
  static propTypes = {
    transaction_items: PropTypes.array.isRequired,
    getTransactionItemList: PropTypes.func.isRequired,
  };
  state = {
    search: "",
    InputDate: "",
    productForDropDownSelect: "",
    table_export_modal: false,
  };
  // setSeeMore(transaction_items_id) {
  //   return (e) => {
  //     e.preventDefault();
  //     document.getElementById(transaction_items_id).classList.toggle("hidden");
  //   };
  // }

  componentDidMount() {
    this.props.getTransactionItemList();
    this.props.getProductList();
  }
  OnToggleExportTable = (event) => {
    event.preventDefault();
    this.setState({ table_export_modal: !this.state.table_export_modal });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.getElementById("Body").classList.toggle("overflow-hidden");
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { InputDate } = this.state;
    filteredData = [];
    //destructuring the dictionary for searching/ fetching purposes
    TransactionItems = [];
    this.props.transaction_items.map((trans) =>
      TransactionItems.push({
        id: trans.id,

        productName: trans.product.name,
        productPrice: trans.product.price,
        transactionDate: trans.transaction_date.created_at,
        quantity: trans.quantity,
      })
    );
    // returning the filtered data from search
    const lowercasedFilter = this.state.search.toLowerCase();

    filteredData = TransactionItems.filter((item) => {
      return item.productName
        .toString()
        .toLowerCase()
        .includes(lowercasedFilter)
        .toString()
        .toLowerCase()
        .includes(lowercasedFilter);
    });
    if (InputDate === "") {
      filteredData = TransactionItems.filter((item) => {
        return item.productName
          .toString()
          .toLowerCase()
          .includes(lowercasedFilter);
      });
    } else {
      if (InputDate === null) {
        filteredData = TransactionItems.filter((item) => {
          return item.productName
            .toString()
            .toLowerCase()
            .includes(lowercasedFilter);
        });
      } else {
        let InputDateDateSeparated = InputDate.toString().split(" ");
        filteredData = TransactionItems.filter((item) => {
          return item.transactionDate
            .toString()
            .includes(
              InputDateDateSeparated[1] +
                " " +
                InputDateDateSeparated[2] +
                " " +
                InputDateDateSeparated[3]
            );
        });
      }
    }
    if (lowercasedFilter !== "" && InputDate !== null && InputDate !== "") {
      let InputDateDateSeparated = InputDate.toString().split(" ");
      filteredData = TransactionItems.filter((item) => {
        return (
          item.transactionDate
            .toString()
            .includes(
              InputDateDateSeparated[1] +
                " " +
                InputDateDateSeparated[2] +
                " " +
                InputDateDateSeparated[3]
            ) &&
          item.productName.toString().toLowerCase().includes(lowercasedFilter)
        );
      });
    }

    return (
      <>
        <div class="bg-gray-100 flex-1 mt-20 md:mt-14 pb-24 md:pb-5">
          <div class="bg-gray-800 pt-3">
            <div class="rounded-tl-3xl bg-gradient-to-r from-teal_custom to-gray-800 p-4 shadow text-2xl text-white">
              <h3 class="font-bold pl-2">Transaction Items</h3>
            </div>
          </div>
          <div className="p-5 w-full">
            <div className="mx-auto bg-white dark:bg-gray-800 shadow rounded">
              <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-end items-start lg:items-stretch w-full">
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                  <div className="lg:ml-6 flex items-start w-full">
                    <div
                      onClick={this.OnToggleExportTable}
                      className="text-white cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center"
                    >
                      <i class="fal fa-print fa-lg"></i>
                    </div>
                    {/* <div className="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center">
											<i class="fal fa-plus fa-lg"></i>
										</div> */}
                  </div>
                </div>
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                  {/* <div className="flex items-center lg:border-l lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6">
                    <p
                      className="text-base text-gray-600 dark:text-gray-400"
                      id="page-view"
                    >
                      Viewing 1 - 20 of 60
                    </p>
                    <div
                      className="text-gray-600 dark:text-gray-400 ml-2 border-transparent border cursor-pointer rounded mr-4"
                      onclick="pageView(false)"
                    >
                      <i class="fad fa-angle-left fa-2x"></i>
                    </div>
                    <div
                      className="text-gray-600 dark:text-gray-400 border-transparent border rounded focus:outline-none cursor-pointer"
                      onclick="pageView(true)"
                    >
                      <i class="fad fa-angle-right fa-2x"></i>
                    </div>
                  </div> */}
                  <div className="lg:ml-6 flex items-center">
                    <div class="relative w-full">
                      <input
                        type="text"
                        name="search"
                        placeholder=" "
                        required
                        class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                        onChange={this.onChange}
                        value={this.state.search}
                      />
                      <label
                        for="search"
                        class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                      >
                        Search
                      </label>
                    </div>
                    <i class="fad fa-search fa-lg"></i>
                  </div>
                </div>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead>
                    <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
                      <th className="pl-14 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        Transaction Item ID
                      </th>
                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        Product Name{" "}
                        {/* <select
													onChange={this.onChange}
													name="productForDropDownSelect"
													class="w-full h-8 border rounded-lg text-xs my-2"
												>
													<option>Select Product</option>
													{this.props.products.map((productFetch) => (
														<option value={productFetch.name}>
															{productFetch.name}{' '}
														</option>
													))}
												</select> */}
                      </th>
                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        Price
                      </th>
                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4 w-2/12 ">
                        <div>Date</div>
                        <DatePicker
                          selected={this.state.InputDate}
                          onChange={(date) =>
                            this.setState({ InputDate: date })
                          }
                          value={this.state.InputDate}
                          closeOnScroll={true}
                          placeholderText="Select Date"
                          className="my-1 px-1 py-1 border-2 rounded-l"
                        />
                      </th>
                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        Quantity
                      </th>
                      {/* <th className="space-x-2 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        						<span>Date</span>
                        						<i class="fal fa-arrow-up fa-lg"></i>
                        						<i class="fal fa-arrow-down"></i>
                    						</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item) => (
                      <tr
                        key={item.id}
                        className="h-24 border-gray-300 dark:border-gray-200 border-b"
                      >
                        <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {item.id}
                        </td>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {item.productName}
                        </td>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {item.productPrice}
                        </td>
                        {/* <td className="pr-6 whitespace-no-wrap">
                        							<div className="flex items-center">
                            						<div className="h-8 w-8">
                               						 <img
                                    					src="https://tuk-cdn.s3.amazonaws.com/assets/components/advance_tables/at_1.png"
                                    					alt
                                    					className="h-full w-full rounded-full overflow-hidden shadow"
                                					/>
                            						</div>
                            						<p className="ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm">
                                					Carrie Anthony
                            							</p>
                       								 </div>
                    							</td> */}
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {item.transactionDate}
                        </td>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {item.quantity}
                        </td>
                        {/* <td className="pr-8 relative">
													<div
														id={item.id}
														className="mt-8 absolute left-0 -ml-12 shadow-md z-10 hidden w-32"
													>
														<ul className="bg-white dark:bg-gray-800 shadow rounded py-1">
															<li
																
																className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal"
															>
																Edit
															</li>
															<li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
																Delete
															</li>
														</ul>
													</div>
													<button className="text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															onClick={this.setSeeMore(item.id)}
															className="icon icon-tabler icon-tabler-dots-vertical dropbtn"
															width={28}
															height={28}
															viewBox="0 0 24 24"
															strokeWidth="1.5"
															stroke="currentColor"
															fill="none"
															strokeLinecap="round"
															strokeLinejoin="round"
														>
															<path stroke="none" d="M0 0h24v24H0z" />
															<circle cx={12} cy={12} r={1} />
															<circle cx={12} cy={19} r={1} />
															<circle cx={12} cy={5} r={1} />
														</svg>
													</button>
												</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div
          class={
            this.state.table_export_modal ? "h-screen " : "h-screen hidden"
          }
        >
          <TransactionItemsTableExportModal
            OnToggleExportTable={this.OnToggleExportTable}
            TransactionItems={filteredData}
          />
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  transaction_items: state.transactions.transaction_item_list,
  products: state.products.products,
});

export default connect(mapStateToProps, {
  getTransactionItemList,
  getProductList,
})(TransactionItemsSettingIndex);
