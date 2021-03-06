import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Bar, Line } from "react-chartjs-2";
import { getInventoryListNotOrderByDate } from "../../store/actions/inventory/inventories.js";
import DatePicker from "react-datepicker";
import ReactToPrint from "react-to-print";
let DateNow = Date().toLocaleString().split(" ");
let InventoriesDateSeparated = [];
let InventoriesBewtweenDatesInput = [];
let InventoriesBewtweenDatesArray = [];

let InventoriesBetweenDatesInputCombinedSameDate = [];
class InventoriesReport extends React.Component {
  static propTypes = {
    inventories: PropTypes.array.isRequired,
    getInventoryList: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  state = {
    StartingDate: "",
    EndingDate: "",
    occupied: false,
  };
  componentDidMount() {
    this.props.getInventoryListNotOrderByDate();
  }
  getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(currentDate);
      currentDate = currentDate.addDays(1);
    }
    return dateArray;
  }

  render() {
    InventoriesDateSeparated = [];
    InventoriesBewtweenDatesInput = [];
    InventoriesBetweenDatesInputCombinedSameDate = [];
    InventoriesBewtweenDatesArray = [];
    console.log(this.props.inventories);
    this.props.inventories.map((filteredInventoryObject) =>
      InventoriesDateSeparated.push({
        id: filteredInventoryObject.id,
        added_stock: filteredInventoryObject.new_stock,
        product: filteredInventoryObject.product_info.name,
        supplier: filteredInventoryObject.supplier_info.name,
        month: filteredInventoryObject.created_at.split(" ")[0],
        day: filteredInventoryObject.created_at.split(" ")[1],
        year: filteredInventoryObject.created_at.split(" ")[2],
        time: filteredInventoryObject.created_at.split(" ")[3],
        date:
          filteredInventoryObject.created_at.split(" ")[0] +
          " " +
          filteredInventoryObject.created_at.split(" ")[1] +
          " " +
          filteredInventoryObject.created_at.split(" ")[2],
      })
    );

    var StartDay = new Date(this.state.StartingDate);
    var EndDay = new Date(this.state.EndingDate);
    var BetweenDates = this.getDates(StartDay, EndDay);

    for (var i = 0; i < InventoriesDateSeparated.length; i++) {
      var date = InventoriesDateSeparated[i].date;
      for (let x = 0; x < BetweenDates.length; x++) {
        if (
          date.includes(
            BetweenDates[x].toString().split(" ")[1] +
              " " +
              BetweenDates[x].toString().split(" ")[2] +
              " " +
              BetweenDates[x].toString().split(" ")[3]
          )
        ) {
          InventoriesBewtweenDatesArray.push({
            id: InventoriesDateSeparated[i].id,
            added_stock: InventoriesDateSeparated[i].added_stock,
            product: InventoriesDateSeparated[i].product,
            supplier: InventoriesDateSeparated[i].supplier,
            date: InventoriesDateSeparated[i].date,
          });
          InventoriesBewtweenDatesInput.push({
            added_stock: InventoriesDateSeparated[i].added_stock,
            date:
              InventoriesDateSeparated[i].day +
              " " +
              InventoriesDateSeparated[i].month +
              " " +
              InventoriesDateSeparated[i].year,
          });
        }
      }
    }

    InventoriesBewtweenDatesInput.forEach(function (obj) {
      var dateX = obj.date;
      if (!this[dateX])
        InventoriesBetweenDatesInputCombinedSameDate.push((this[dateX] = obj));
      else
        this[dateX].added_stock =
          parseInt(this[dateX].added_stock) + parseInt(obj.added_stock);
    }, Object.create(null));

    if (this.state.EndingDate === null) {
      this.setState({
        occupied: false,
        EndingDate: "",
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
          <div className="w-11/12 mx-auto">
            <ReactToPrint
              trigger={() => {
                // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                // to the root node of the returned component as it will be overwritten.
                return (
                  <div className="text-white cursor-pointer bg-teal_custom hover:bg-gray-600 w-1/4 text-xl rounded ml-2 mt-5 text-center p-2">
                    Print
                  </div>
                );
              }}
              content={() => this.inventory}
            />{" "}
          </div>
          <div
            className={
              !this.state.occupied
                ? "mx-auto w-11/12 mt-6 relative"
                : "mx-auto w-11/12 mt-6 p-3"
            }
            ref={(el) => (this.inventory = el)}
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

            <div className="bg-white shadow-lg p-4 ">
              <div className="relative w-full max-w-full flex-grow">
                <h6 className="uppercase text-gray-600 mb-1 text-sm font-semibold">
                  Inventories
                </h6>
                <div className="mx-auto w-11/12 mt-6 flex flex-col md:flex-row justify-start space-x-3">
                  <h2 className="text-gray-800 mb-2 text-2xl font-semibold mr-5">
                    Between
                  </h2>
                  <div class="flex">
                    <span class="text-sm  border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap">
                      Start:
                    </span>
                    <DatePicker
                      selected={this.state.StartingDate}
                      onChange={(date) => this.setState({ StartingDate: date })}
                      value={this.state.StartingDate}
                      closeOnScroll={true}
                      placeholderText="Starting Date"
                      className="px-4 py-2 border-2 rounded-r"
                    />
                  </div>
                  <div class="flex">
                    <span class="text-sm  border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap">
                      End:
                    </span>
                    <DatePicker
                      selected={this.state.EndingDate}
                      onChange={(date) =>
                        this.setState({ EndingDate: date, occupied: true })
                      }
                      value={this.state.EndingDate}
                      closeOnScroll={true}
                      placeholderText="Ending Date"
                      className="px-4 py-2 border-2 rounded-r"
                    />
                  </div>
                </div>
              </div>
              <div className="chart">
                <Bar
                  data={{
                    labels: InventoriesBetweenDatesInputCombinedSameDate.map(
                      (x) => x.date
                    ),
                    datasets: [
                      {
                        // label:
                        // 	this.state.StartingDate.toString().split(' ')[1] +
                        // 	' ' +
                        // 	this.state.StartingDate.toString().split(' ')[2] +
                        // 	' ' +
                        // 	this.state.StartingDate.toString().split(' ')[3] +
                        // 	' ' +
                        // 	' to ' +
                        // 	this.state.EndingDate.toString().split(' ')[1] +
                        // 	' ' +
                        // 	this.state.EndingDate.toString().split(' ')[2] +
                        // 	' ' +
                        // 	this.state.EndingDate.toString().split(' ')[3] +
                        // 	' ' +
                        // 	' Added Stock',
                        label: "Added Stock",
                        fill: true,
                        data: InventoriesBetweenDatesInputCombinedSameDate.map(
                          (x) => x.added_stock
                        ),
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

              <table className="min-w-full bg-white">
                <thead>
                  <tr className="w-full h-16 border-gray-300 border-b py-8 text-left font-bold text-gray-500">
                    <th className="pl-14 pr-6 text-md">ID</th>
                    <th className=" pr-6 text-md">Product</th>
                    <th className="pr-6 text-md">Date</th>
                    <th className="  pr-6 text-md">Stock Added</th>
                    <th className="pr-6 text-md">Supplier</th>
                  </tr>
                </thead>
                <tbody>
                  {InventoriesBewtweenDatesArray.map((inventory) => (
                    <tr
                      key={inventory.id}
                      className="h-24 border-gray-300 dark:border-gray-200 border-b"
                    >
                      <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {inventory.id}
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {inventory.product}
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {inventory.date}
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {inventory.new_stock}
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {inventory.supplier}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  inventories: state.inventories.inventories,
});

export default connect(mapStateToProps, {
  getInventoryListNotOrderByDate,
})(InventoriesReport);
