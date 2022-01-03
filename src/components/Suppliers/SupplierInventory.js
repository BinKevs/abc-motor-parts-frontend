import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import swal from "sweetalert";
import {
  getInventoryList,
  deleteInventory,
  getInventory,
  addInventory,
  updateInventory,
  changeInventoryStatus,
} from "../../store/actions/inventory/inventories";
import ReplenishmentInventorySupplierModal from "./ReplenishmentInventorySupplierModal";
import { getSupplierList } from "../../store/actions/supplier/suppliers";
import {
  getProductList,
  getCategoryList,
} from "../../store/actions/product/products";
import DatePicker from "react-datepicker";

let inventories = [];
let filteredData = [];
let SupplierInLocalStorage = localStorage.getItem("Supplier");
class SupplierInventory extends React.Component {
  static propTypes = {
    inventories: PropTypes.array.isRequired,
    inventory: PropTypes.object.isRequired,
    getInventoryList: PropTypes.func.isRequired,
    getSupplierList: PropTypes.func.isRequired,
    getProductList: PropTypes.func.isRequired,
    deleteInventory: PropTypes.func.isRequired,
    updateInventory: PropTypes.func.isRequired,
    addInventory: PropTypes.func.isRequired,
  };
  state = {
    new_stock: 0,
    product: 0,
    supplier: 0,
    productVariation: 0,
    search: "",
    inventoryID: 0,
    modal: false,
    table_export_modal: false,
    InputDate: "",
    productForDropDownSelect: "",
    cost_price: "",
    price: "",
    stock_provided: "",
  };

  componentDidMount() {
    this.props.getInventoryList();
    this.props.getSupplierList();
    this.props.getProductList();
    this.props.getCategoryList();
    if (SupplierInLocalStorage === null) {
      this.props.history.push("/supplier/login");
    }
  }
  onChange = (e) => {
    if (e.target.name === "product") {
      let cost_price = this.props.products
        .filter((productItem) => productItem.id === parseInt(e.target.value))
        .map((a) => a.cost_price)[0];
      let price = this.props.products
        .filter((productItem) => productItem.id === parseInt(e.target.value))
        .map((a) => a.price)[0];
      this.setState({
        cost_price: cost_price,
        price: price,
      });
    }
    this.setState({ [e.target.name]: e.target.value });
    // else{
    //   this.setState({ [e.target.name]: e.target.value });
    // }
  };
  // this will be passed to the form add component
  // when this function called it will get the state values and pass it
  // to addInventory action and it called the getInventoryList where it updated the current list
  // and clear the state for adding a new inventory
  // handleSubmitAddInventory = (event) => {
  //   event.preventDefault();
  //   const {
  //     new_stock,
  //     product,
  //     supplier,
  //     productVariation,
  //     cost_price,
  //     price,
  //   } = this.state;
  //   const action_done = "Inventory Added";
  //   const inventory = {
  //     new_stock,
  //     product,
  //     supplier,
  //     action_done,
  //     productVariation,
  //     cost_price,
  //     price,
  //   };
  //   this.props.addInventory(inventory);
  //   this.setState({
  //     new_stock: 0,
  //     product: 0,
  //     supplier: 0,
  //     inventoryID: 0,
  //     productVariation: 0,
  //   });
  //   this.ModalFunction();
  // };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.inventory !== prevProps.inventory) {
      const { new_stock, product, supplier, id, product_variation_info } =
        this.props.inventory;
      this.setState({
        new_stock,
        product,
        supplier,
        inventoryID: id,
        productVariation: product_variation_info.product_variation_id,
      });
      // this.props.getInventoryList();
    }
  }

  // When Updating this will sent the new stock, product and supplier together with id
  // to the updateInventory in the action and reset the state.
  handleSubmitUpdateInventory = (InventoryID) => {
    return (event) => {
      event.preventDefault();
      const { stock_provided, product, productVariation, supplier } =
        this.state;
      const inventory = {
        supplier,
        product,
        productVariation,
        stock_provided,
        order_status: "Responded",
      };
      this.props.updateInventory(InventoryID, inventory);
      this.setState({
        new_stock: 0,
        product: 0,
        supplier: 0,
        inventoryID: 0,
      });
      this.ModalFunction();
    };
  };

  // when edit button click this will fetch the supplier that will be edited and change the isEditButtonClicked status to true
  onEditCloseButton = (event) => {
    event.preventDefault();
    this.setState({
      new_stock: 0,
      product: 0,
      supplier: 0,
      inventoryID: 0,
    });
    this.ModalFunction();
  };
  //this will toggle the add modal form
  onModalToggleAdd = (e) => {
    e.preventDefault();
    this.ModalFunction();
  };

  onModalToggleRespondModal(InventoryID) {
    return (event) => {
      event.preventDefault();
      this.props.getInventory(InventoryID);

      this.ModalFunction();
    };
  }
  // function that called to open or close modal
  ModalFunction() {
    this.setState({ modal: !this.state.modal });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  onLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("Supplier");
    this.props.history.push("/supplier/login");
  };
  render() {
    const { InputDate, search, productForDropDownSelect } = this.state;
    // destructure the inventories that came from the reducer so it will be easier to filter and show
    inventories = [];
    filteredData = [];
    this.props.inventories.map((inventory) =>
      inventory.status &&
      inventory.supplier_info.name === SupplierInLocalStorage
        ? inventories.push({
            id: inventory.id,
            supplier: inventory.supplier_info.name,
            product: inventory.product_info.name,
            product_variation: inventory.product_variation_info.variation,
            SKU: inventory.product_variation_info.SKU,
            new_stock: inventory.new_stock,
            created_at: inventory.created_at,
            stock_provided: inventory.stock_provided,
            order_status: inventory.order_status,
          })
        : ""
    );
    // This will filter the data from inventories array filtered at the top
    const lowercasedFilter = search.toLowerCase();

    filteredData = inventories.filter((item) => {
      return item.product.toString().toLowerCase().includes(lowercasedFilter);
    });
    if (InputDate === "") {
      filteredData = inventories.filter((item) => {
        return item.product.toString().toLowerCase().includes(lowercasedFilter);
      });
    } else {
      if (InputDate === null) {
        filteredData = inventories.filter((item) => {
          return item.product
            .toString()
            .toLowerCase()
            .includes(lowercasedFilter);
        });
      } else {
        let InputDateDateSeparated = InputDate.toString().split(" ");
        filteredData = inventories.filter((item) => {
          return item.created_at
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
      filteredData = inventories.filter((item) => {
        return (
          item.created_at
            .toString()
            .includes(
              InputDateDateSeparated[1] +
                " " +
                InputDateDateSeparated[2] +
                " " +
                InputDateDateSeparated[3]
            ) &&
          item.product.toString().toLowerCase().includes(lowercasedFilter)
        );
      });
    }
    // if (InputDate !== null) {
    // 	let InputDateDateSeparated = InputDate.toString().split(' ');
    // 	if (InputDate === '') {
    // 		if (productForDropDownSelect !== '') {
    // 			if (productForDropDownSelect === 'Select Product') {
    // 				filteredData = inventories.filter((item) => {
    // 					return Object.keys(item).some((key) =>
    // 						item[key].toString().includes('')
    // 					);
    // 				});
    // 			} else {
    // 				filteredData = inventories.filter((item) => {
    // 					return Object.keys(item).some((key) =>
    // 						item[key].toString().includes(productForDropDownSelect)
    // 					);
    // 				});
    // 			}
    // 		}
    // 	} else {
    // 		filteredData = inventories.filter((item) => {
    // 			return Object.keys(item).some((key) =>
    // 				item[key]
    // 					.toString()
    // 					.includes(
    // 						InputDateDateSeparated[1] +
    // 							' ' +
    // 							InputDateDateSeparated[2] +
    // 							' ' +
    // 							InputDateDateSeparated[3]
    // 					)
    // 			);
    // 		});
    // 	}
    // }

    return (
      <>
        <div class="bg-gray-100 flex-1">
          <div class="bg-gray-800 pt-3">
            <div
              class="
				rounded-tl-3xl
				bg-gradient-to-r
				from-teal_custom
				to-gray-800
				p-4
				shadow
				text-2xl text-white flex justify-between
			"
            >
              <h3 class="font-bold pl-2 text-2xl md:text-5xl">
                Supplier Inventory Module
              </h3>
              <h3
                onClick={this.onLogout}
                class="font-bold text-md md:text-2xl my-auto cursor-pointer hover:text-teal_custom"
              >
                Logout
              </h3>
            </div>
          </div>
          <div className="md:p-20 w-full">
            <div className="mx-auto bg-white dark:bg-gray-800 shadow rounded">
              <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-end items-start lg:items-stretch w-full">
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-start">
                  <h1 class="font-bold text-4xl ">Current Orders</h1>
                  {/* <div className="lg:ml-6 flex items-start w-full">
                    <div
                      onClick={this.OnToggleExportTable}
                      className="text-white cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center"
                    >
                      <i class="fal fa-print fa-lg"></i>
                    </div>
                    <div
                      onClick={this.onModalToggleAdd}
                      className="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center"
                    >
                      <i class="fal fa-plus fa-lg"></i>
                    </div>
                  </div> */}
                </div>
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                  {/* <div className="flex items-center lg:border-l lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6">
                    <p
                      className="text-base text-gray-600 dark:text-gray-400"
                      id="page-view"
                    >
                      Viewing 1 - 20 of 60
                    </p>
                    <div className="text-gray-600 dark:text-gray-400 ml-2 border-transparent border cursor-pointer rounded mr-4">
                      <i class="fad fa-angle-left fa-2x"></i>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 border-transparent border rounded focus:outline-none cursor-pointer">
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
                        value={search}
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
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="w-full h-16 border-gray-300 border-b py-8 text-left font-bold text-gray-500">
                      <th className="pl-14 pr-6 text-md">ID</th>
                      <th className=" pr-6 text-md">Product</th>
                      <th className="  pr-6 text-md">Stock Requested</th>

                      {/* <th className="pr-6 text-md">Supplier</th> */}
                      <th className="pr-6 text-md w-2/12">
                        {" "}
                        <div>Date : </div>
                        <DatePicker
                          selected={InputDate}
                          onChange={(date) =>
                            this.setState({ InputDate: date })
                          }
                          value={InputDate}
                          closeOnScroll={true}
                          placeholderText="Select Date"
                          className="my-1 px-1 py-1 border-2 rounded-l"
                        />
                      </th>
                      {/* <th className="pr-6 text-md">More</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData
                      .filter((item) => {
                        return item.order_status
                          .toString()
                          .toLowerCase()
                          .includes("pending");
                      })
                      .map((inventory) => (
                        <tr
                          key={inventory.id}
                          className="h-24 border-gray-300 dark:border-gray-200 border-b"
                        >
                          <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            {inventory.id}
                          </td>
                          <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            <div>{inventory.product}</div>(
                            {inventory.product_variation})
                            <div>({inventory.SKU})</div>
                          </td>
                          <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            {inventory.new_stock}
                          </td>

                          {/* <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {inventory.supplier}
                        </td> */}
                          <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            {inventory.created_at}
                          </td>
                          <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            <div
                              onClick={this.onModalToggleRespondModal(
                                inventory.id
                              )}
                              className="cursor-pointer text-sm leading-3 py-3 bg-teal_custom text-center hover:bg-gray-400  text-white px-3 font-normal rounded-lg"
                            >
                              Respond
                            </div>
                          </td>
                          {/* <td className="pr-8 relative">
                          <button className="button-see-more text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none">
                            <div className="seeMore absolute left-0 top-0 mt-2 -ml-20 shadow-md z-10 w-32">
                              <ul className="bg-white shadow rounded p-2">
                                <li
                                  onClick={this.onModalToggleEdit(inventory.id)}
                                  className="cursor-pointer text-gray-600  text-sm leading-3 py-3 hover:bg-teal_custom hover:text-white px-3 font-normal"
                                >
                                  Edit
                                </li>
                                <li
                                  onClick={this.handleArchiveInventory(
                                    inventory.id
                                  )}
                                  className="cursor-pointer text-sm leading-3 py-3 hover:bg-red-500 hover:text-white px-3 font-normal"
                                >
                                  Delete
                                </li>
                              </ul>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
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
          <div className="md:p-20 w-full">
            <div className="mx-auto bg-white dark:bg-gray-800 shadow rounded">
              <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-end items-start lg:items-stretch w-full">
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-start">
                  <h1 class="font-bold text-4xl ">Inventory History</h1>
                </div>
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                  {/* <div className="flex items-center lg:border-l lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6">
                    <p
                      className="text-base text-gray-600 dark:text-gray-400"
                      id="page-view"
                    >
                      Viewing 1 - 20 of 60
                    </p>
                    <div className="text-gray-600 dark:text-gray-400 ml-2 border-transparent border cursor-pointer rounded mr-4">
                      <i class="fad fa-angle-left fa-2x"></i>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 border-transparent border rounded focus:outline-none cursor-pointer">
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
                        value={search}
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
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="w-full h-16 border-gray-300 border-b py-8 text-left font-bold text-gray-500">
                      <th className="pl-14 pr-6 text-md">ID</th>
                      <th className=" pr-6 text-md">Product</th>
                      <th className="  pr-6 text-md">Stock Requested</th>
                      <th className="  pr-6 text-md">Stock Supplied</th>
                      {/* <th className="pr-6 text-md">Supplier</th> */}
                      <th className="pr-6 text-md w-2/12">
                        {" "}
                        <div>Date : </div>
                        <DatePicker
                          selected={InputDate}
                          onChange={(date) =>
                            this.setState({ InputDate: date })
                          }
                          value={InputDate}
                          closeOnScroll={true}
                          placeholderText="Select Date"
                          className="my-1 px-1 py-1 border-2 rounded-l"
                        />
                      </th>
                      {/* <th className="pr-6 text-md">More</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData
                      .filter((item) => {
                        return item.order_status
                          .toString()
                          .toLowerCase()
                          .includes("responded");
                      })
                      .map((inventory) => (
                        <tr
                          key={inventory.id}
                          className="h-24 border-gray-300 dark:border-gray-200 border-b"
                        >
                          <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            {inventory.id}
                          </td>
                          <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            <div>{inventory.product}</div>(
                            {inventory.product_variation})
                            <div>({inventory.SKU})</div>
                          </td>
                          <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            {inventory.new_stock}
                          </td>
                          <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            {inventory.stock_provided}
                          </td>
                          {/* <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {inventory.supplier}
                        </td> */}
                          <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            {inventory.created_at}
                          </td>

                          {/* <td className="pr-8 relative">
                          <button className="button-see-more text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none">
                            <div className="seeMore absolute left-0 top-0 mt-2 -ml-20 shadow-md z-10 w-32">
                              <ul className="bg-white shadow rounded p-2">
                                <li
                                  onClick={this.onModalToggleEdit(inventory.id)}
                                  className="cursor-pointer text-gray-600  text-sm leading-3 py-3 hover:bg-teal_custom hover:text-white px-3 font-normal"
                                >
                                  Edit
                                </li>
                                <li
                                  onClick={this.handleArchiveInventory(
                                    inventory.id
                                  )}
                                  className="cursor-pointer text-sm leading-3 py-3 hover:bg-red-500 hover:text-white px-3 font-normal"
                                >
                                  Delete
                                </li>
                              </ul>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
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
        <ReplenishmentInventorySupplierModal
          modal={this.state.modal}
          onModalToggleAdd={this.onModalToggleAdd}
          state={this.state}
          onChange={this.onChange}
          suppliers={this.props.suppliers}
          products={this.props.products}
          handleSubmitUpdateInventory={this.handleSubmitUpdateInventory}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  AuthReducer: state.AuthReducer,
  inventories: state.inventories.inventories,
  inventory: state.inventories.inventory,
  suppliers: state.suppliers.suppliers,
  products: state.products.products,
  categories: state.products.categories,
});

export default connect(mapStateToProps, {
  addInventory,
  getSupplierList,
  getProductList,
  getInventoryList,
  getInventory,
  deleteInventory,
  updateInventory,
  getCategoryList,
  changeInventoryStatus,
})(SupplierInventory);