import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  getTransactionItemList,
  getTransactionListNotOrderByDate,
} from "../../store/actions/transaction/transactions.js";
import { getCategoryList } from "../../store/actions/product/products";
import DatePicker from "react-datepicker";
let transactionsDateSeparated = [];
let transactionPerItems = [];
let ThisDayTransactions = [];
let ThisMonthTransactions = [];
let LastMonthTransactions = [];
let ThisWeekTransactions = [];
let TransactionItemsCombineSameDate = [];
let ThisMonthTransactionsCombinedSameDate = [];
let LastMonthTransactionsCombinedSameDate = [];
let ThisDayTransactionsCombinedSameDate = [];
let ThisWeekTransactionsCombinedSameDate = [];
let DatesThisWeek = [];
let DatesBetweenInput = [];
let TransactionsBetweenDatesInput = [];
let TransactionsBetweenDatesInputCombinedSameDate = [];

var firstDayOfCurrentWeek;
var lastDayOfCurrentWeek;
let DateNow = Date().toLocaleString().split(" ");
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
class SalesReport extends React.Component {
  state = {
    StartingDate: "",
    EndingDate: "",
    category: "Select category",
    dropdown: false,
    occupied: false,
    occupiedDropDown: false,
  };

  componentDidMount() {
    this.props.getTransactionItemList();
    this.props.getTransactionListNotOrderByDate();
    this.props.getCategoryList();
  }
  handleCategory(CategoryName) {
    return (event) => {
      event.preventDefault();
      this.setState({
        category: CategoryName,
        dropdown: !this.state.dropdown,
        occupiedDropDown: true,
      });
    };
  }
  GetWeekDates() {
    let now = new Date();
    let dayOfWeek = now.getDay(); //0-6
    let numDay = now.getDate();

    let start = new Date(now); //copy
    start.setDate(numDay - dayOfWeek);
    start.setHours(0, 0, 0, 0);

    let end = new Date(now); //copy
    end.setDate(numDay + (7 - dayOfWeek));
    end.setHours(0, 0, 0, 0);

    return [start, end];
  }
  // getDates(startDate, endDate) {
  //   const dates = [];
  //   let currentDate = startDate;
  //   const addDays = function (days) {
  //     const date = new Date(this.valueOf());
  //     date.setDate(date.getDate() + days);
  //     return date;
  //   };
  //   while (currentDate < endDate) {
  //     currentDate = addDays.call(currentDate, 1);
  //     dates.push(currentDate);
  //   }
  //   return dates;
  // }
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
    // let [start, end] = this.GetWeekDates();
    // var StartDayOfTheWeek = new Date(start.toLocaleString());
    // var EndDayOfTheWeek = new Date(end.toLocaleString());

    transactionsDateSeparated = [];
    transactionPerItems = [];
    ThisMonthTransactions = [];
    LastMonthTransactions = [];
    ThisWeekTransactions = [];
    ThisDayTransactions = [];

    TransactionItemsCombineSameDate = [];
    ThisMonthTransactionsCombinedSameDate = [];
    LastMonthTransactionsCombinedSameDate = [];
    ThisDayTransactionsCombinedSameDate = [];
    ThisWeekTransactionsCombinedSameDate = [];

    DatesThisWeek = [];

    this.props.transactions
      .filter(
        (transac) => transac.order_status.includes("Complete") && transac.status
      )
      .map((filteredTransactionObject) =>
        transactionsDateSeparated.push({
          id: filteredTransactionObject.id,
          totalAmount: filteredTransactionObject.totalAmount,
          month: filteredTransactionObject.created_at.split(" ")[0],
          day: filteredTransactionObject.created_at.split(" ")[1],
          year: filteredTransactionObject.created_at.split(" ")[2],
          time: filteredTransactionObject.created_at.split(" ")[3],
          date:
            filteredTransactionObject.created_at.split(" ")[0] +
            " " +
            filteredTransactionObject.created_at.split(" ")[1] +
            " " +
            filteredTransactionObject.created_at.split(" ")[2],
        })
      );
    // Fetch staring and ending date
    var StartDay = new Date(this.state.StartingDate);
    var EndDay = new Date(this.state.EndingDate);
    DatesBetweenInput = [];
    TransactionsBetweenDatesInput = [];
    TransactionsBetweenDatesInputCombinedSameDate = [];
    const BetweenInputedDates = this.getDates(StartDay, EndDay);
    BetweenInputedDates.map((filterDate) =>
      DatesBetweenInput.push({
        month: filterDate.toString().split(" ")[1],
        day: filterDate.toString().split(" ")[2],
        year: filterDate.toString().split(" ")[3],
      })
    );

    for (var i = 0; i < transactionsDateSeparated.length; i++) {
      var month = transactionsDateSeparated[i].month;
      var day = transactionsDateSeparated[i].day;
      var year = transactionsDateSeparated[i].year;
      for (var y = 0; y < DatesBetweenInput.length; y++) {
        var monthSearching = DatesBetweenInput[y].month;
        var daySearching = DatesBetweenInput[y].day;
        var yearSearching = DatesBetweenInput[y].year;
        if (
          monthSearching === month &&
          daySearching === day &&
          yearSearching === year
        ) {
          TransactionsBetweenDatesInput.push({
            totalAmount: transactionsDateSeparated[i].totalAmount,
            date:
              transactionsDateSeparated[i].day +
              " " +
              transactionsDateSeparated[i].month +
              " " +
              transactionsDateSeparated[i].year,
          });
        }
      }
    }
    //Fetch weekly sales

    var curr = new Date();
    var first = curr.getDate() - curr.getDay() + 1;
    firstDayOfCurrentWeek = new Date(curr.setDate(first));
    lastDayOfCurrentWeek = new Date(curr.setDate(curr.getDate() + 6));

    var WeeklyDates = this.getDates(
      firstDayOfCurrentWeek,
      lastDayOfCurrentWeek
    );

    WeeklyDates.map((filterDate) =>
      DatesThisWeek.push({
        month: filterDate.toString().split(" ")[1],
        day: filterDate.toString().split(" ")[2],
        year: filterDate.toString().split(" ")[3],
      })
    );
    for (var i = 0; i < transactionsDateSeparated.length; i++) {
      var date = transactionsDateSeparated[i].date;
      for (let x = 0; x < WeeklyDates.length; x++) {
        if (
          date.includes(
            WeeklyDates[x].toString().split(" ")[1] +
              " " +
              WeeklyDates[x].toString().split(" ")[2] +
              " " +
              WeeklyDates[x].toString().split(" ")[3]
          )
          // dateForCurrentWeekArray[x].toLocaleString().includes(date)
        ) {
          ThisWeekTransactions.push({
            totalAmount: transactionsDateSeparated[i].totalAmount,
            date: new Date(
              transactionsDateSeparated[i].day +
                " " +
                transactionsDateSeparated[i].month +
                " " +
                transactionsDateSeparated[i].year
            ),
          });
        }
      }
    }
    // for (var i = 0; i < transactionsDateSeparated.length; i++) {
    //   var month = transactionsDateSeparated[i].month;
    //   var day = transactionsDateSeparated[i].day;
    //   var year = transactionsDateSeparated[i].year;
    //   for (var y = 0; y < DatesThisWeek.length; y++) {
    //     var monthSearching = DatesThisWeek[y].month;
    //     var daySearching = DatesThisWeek[y].day;
    //     var yearSearching = DatesThisWeek[y].year;
    //     if (
    //       monthSearching === month &&
    //       daySearching === day &&
    //       yearSearching === year
    //     ) {
    //       ThisWeekTransactions.push({
    //         totalAmount: transactionsDateSeparated[i].totalAmount,
    //         date: new Date(
    //           transactionsDateSeparated[i].day +
    //             " " +
    //             transactionsDateSeparated[i].month +
    //             " " +
    //             transactionsDateSeparated[i].year
    //         ),
    //       });
    //     }
    //   }
    // }
    for (var i = 0; i < transactionsDateSeparated.length; i++) {
      var month = transactionsDateSeparated[i].month;
      var day = transactionsDateSeparated[i].day;
      var year = transactionsDateSeparated[i].year;
      //Fetch montly sales
      if (year === DateNow[3]) {
        if (month === DateNow[1]) {
          // DateNow[1]
          ThisMonthTransactions.push({
            totalAmount: transactionsDateSeparated[i].totalAmount,
            date:
              transactionsDateSeparated[i].month +
              " " +
              transactionsDateSeparated[i].day,
          });
          //Fetch daily sales
          if (day === DateNow[2]) {
            // DateNow[2]
            if (
              parseInt(transactionsDateSeparated[i].time.split(":")[0]) < 12
            ) {
              ThisDayTransactions.push({
                totalAmount: transactionsDateSeparated[i].totalAmount,
                date:
                  transactionsDateSeparated[i].time.split(":")[0] +
                  ":" +
                  transactionsDateSeparated[i].time.split(":")[1] +
                  " AM",
              });
            } else {
              if (
                parseInt(transactionsDateSeparated[i].time.split(":")[0]) === 12
              ) {
                ThisDayTransactions.push({
                  totalAmount: transactionsDateSeparated[i].totalAmount,
                  date:
                    parseInt(transactionsDateSeparated[i].time.split(":")[0]) +
                    ":" +
                    transactionsDateSeparated[i].time.split(":")[1] +
                    " PM",
                });
              } else {
                ThisDayTransactions.push({
                  totalAmount: transactionsDateSeparated[i].totalAmount,
                  date:
                    parseInt(transactionsDateSeparated[i].time.split(":")[0]) -
                    12 +
                    ":" +
                    transactionsDateSeparated[i].time.split(":")[1] +
                    " PM",
                });
              }
            }
          }
        }
        if (month === "Jun") {
          LastMonthTransactions.push({
            totalAmount: transactionsDateSeparated[i].totalAmount,
            date:
              transactionsDateSeparated[i].month +
              " " +
              transactionsDateSeparated[i].day,
          });
        }
      }
    }

    //Sales per product

    //Destructuring for the ease of sorting which is which is sold
    console.log(this.props.transaction_items);
    this.props.transaction_items.map((filteredTransactionItemObject) =>
      transactionPerItems.push({
        id: filteredTransactionItemObject.id,
        productName: filteredTransactionItemObject.product.name,
        quantity: filteredTransactionItemObject.quantity,
        category: filteredTransactionItemObject.product.category_info.name,
      })
    );

    // //Compiling every transaction made per item
    transactionPerItems.forEach(function (obj) {
      var productNameX = obj.productName;
      if (!this[productNameX])
        TransactionItemsCombineSameDate.push((this[productNameX] = obj));
      else this[productNameX].quantity += obj.quantity;
    }, Object.create(null));
    const lowercasedFilter = this.state.category;
    const filteredData = TransactionItemsCombineSameDate.filter((item) => {
      // return Object.keys(item).some((key) =>
      // 	item[key].toString().includes(lowercasedFilter)
      // );
      {
        return lowercasedFilter !== ""
          ? item.category === lowercasedFilter
          : item;
      }
    });
    ThisMonthTransactions.forEach(function (obj) {
      var dateX = obj.date;
      if (!this[dateX])
        ThisMonthTransactionsCombinedSameDate.push((this[dateX] = obj));
      else
        this[dateX].totalAmount =
          parseInt(this[dateX].totalAmount) + parseInt(obj.totalAmount);
    }, Object.create(null));
    LastMonthTransactions.forEach(function (obj) {
      var dateX = obj.date;
      if (!this[dateX])
        LastMonthTransactionsCombinedSameDate.push((this[dateX] = obj));
      else
        this[dateX].totalAmount =
          parseInt(this[dateX].totalAmount) + parseInt(obj.totalAmount);
    }, Object.create(null));

    ThisDayTransactions.forEach(function (obj) {
      var dateX = obj.date;
      if (!this[dateX])
        ThisDayTransactionsCombinedSameDate.push((this[dateX] = obj));
      else
        this[dateX].totalAmount =
          parseInt(this[dateX].totalAmount) + parseInt(obj.totalAmount);
    }, Object.create(null));

    ThisWeekTransactions.forEach(function (obj) {
      var dateX = obj.date;
      if (!this[dateX])
        ThisWeekTransactionsCombinedSameDate.push((this[dateX] = obj));
      else
        this[dateX].totalAmount =
          parseInt(this[dateX].totalAmount) + parseInt(obj.totalAmount);
    }, Object.create(null));
    TransactionsBetweenDatesInput.forEach(function (obj) {
      var dateX = obj.date;
      if (!this[dateX])
        TransactionsBetweenDatesInputCombinedSameDate.push((this[dateX] = obj));
      else
        this[dateX].totalAmount =
          parseInt(this[dateX].totalAmount) + parseInt(obj.totalAmount);
    }, Object.create(null));

    if (this.state.EndingDate === null) {
      this.setState({
        occupied: false,
        EndingDate: "",
      });
    }
    if (this.state.category === "Select category") {
      this.setState({
        occupiedDropDown: false,
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

          <div className="mx-auto w-11/12 mt-6 p-3">
            <div className="bg-white shadow-lg p-4">
              <div className="relative w-full max-w-full flex-grow">
                <h6 className="uppercase text-gray-600 mb-1 text-sm font-semibold">
                  Sales
                </h6>
                <h2 className="text-gray-800 mb-2 text-2xl font-semibold">
                  Daily
                </h2>
              </div>
              <div className="chart">
                <Bar
                  data={{
                    labels: ThisDayTransactionsCombinedSameDate.map(
                      (x) => x.date
                    ),
                    datasets: [
                      {
                        label:
                          DateNow[0] +
                          " " +
                          DateNow[1] +
                          " " +
                          DateNow[2] +
                          " " +
                          DateNow[3] +
                          " Sales",
                        fill: false,
                        data: ThisDayTransactionsCombinedSameDate.map(
                          (x) => x.totalAmount
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
            </div>
          </div>
          <div className="mx-auto w-11/12 mt-6 p-3">
            <div className="bg-white shadow-lg p-4">
              <div className="relative w-full max-w-full flex-grow">
                <h6 className="uppercase text-gray-600 mb-1 text-sm font-semibold">
                  Sales
                </h6>
                <h2 className="text-gray-800 mb-2 text-2xl font-semibold">
                  Weekly
                </h2>
              </div>
              <div className="chart">
                <Bar
                  data={{
                    labels: ThisWeekTransactionsCombinedSameDate.map(
                      (x) => x.date.toString().split(" ")[0]
                    ),
                    datasets: [
                      {
                        label: "This week Sales",
                        fill: false,
                        data: ThisWeekTransactionsCombinedSameDate.map(
                          (x) => x.totalAmount
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
            </div>
          </div>
          <div className="mx-auto w-11/12 mt-6 p-3">
            <div className="bg-white shadow-lg p-4">
              <div className="relative w-full max-w-full flex-grow">
                <h6 className="uppercase text-gray-600 mb-1 text-sm font-semibold">
                  Sales
                </h6>
                <h2 className="text-gray-800 mb-2 text-2xl font-semibold">
                  Monthly
                </h2>
              </div>
              <div className="chart">
                <Bar
                  data={{
                    // labels: [
                    // 	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    // 	18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                    // ],
                    labels: ThisMonthTransactionsCombinedSameDate.map(
                      (x) => x.date
                    ),
                    datasets: [
                      {
                        label: DateNow[1] + " " + DateNow[3] + " Sales",
                        fill: false,
                        data: ThisMonthTransactionsCombinedSameDate.map(
                          (x) => x.totalAmount
                        ),
                        // backgroundColor: '#3AAFA9',
                        backgroundColor: "rgba(58, 175, 169, 0.3)",
                      },
                    ],
                  }}
                  // LastMonthTransactionsCombinedSameDate
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

          <div
            className={
              !this.state.occupiedDropDown
                ? "mx-auto w-11/12 mt-6 relative"
                : "mx-auto w-11/12 mt-6 p-3"
            }
          >
            {!this.state.occupiedDropDown ? (
              <>
                {/* <div class="absolute w-full h-full z-25 bg-gray-900 opacity-50"></div> */}
                <div class="absolute md:top-1/2 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 font-medium text-gray-900 text-center md:text-3xl text-sm">
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
                  Transactions
                </h6>

                <h2 className="text-gray-800 text-2xl font-semibold mr-5">
                  Sales Overview Per Product Item <div> Select Category :</div>
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
                    labels: filteredData.map((x) => x.productName),
                    datasets: [
                      {
                        label: this.state.category + " Sales",
                        fill: false,
                        data: filteredData.map((x) => x.quantity),
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
                <h6 className="uppercase text-gray-600 mb-1 text-sm font-semibold">
                  Sales
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

                  {/* <button
										type="submit"
										class="text-white bg-gray-800 px-4 py-2 rounded"
									>
										Fetch Sale
									</button> */}
                </div>
              </div>
              <div className="chart">
                <Bar
                  data={{
                    labels: TransactionsBetweenDatesInputCombinedSameDate.map(
                      (x) => x.date
                    ),
                    datasets: [
                      {
                        label: DateNow[1] + " " + DateNow[3] + " Sales",
                        fill: false,
                        data: TransactionsBetweenDatesInputCombinedSameDate.map(
                          (x) => x.totalAmount
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
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  transaction_items: state.transactions.transaction_item_list,
  transactions: state.transactions.transactions,
  categories: state.products.categories,
});

export default connect(mapStateToProps, {
  getTransactionItemList,
  getTransactionListNotOrderByDate,
  getCategoryList,
})(SalesReport);
