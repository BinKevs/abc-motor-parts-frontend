import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { getProductList } from "../../store/actions/product/products";
import { getTransactionList } from "../../store/actions/transaction/transactions";
import { getTransactionItemList } from "../../store/actions/transaction/transactions.js";
let transactionItemsFiltered = [];
let transactionItemsFilteredResult = [];
let transactionsFilteredDateSeparated = [];
let transactionsDailyFiltered = [];
let monthlySalesTransaction = 0;
let dailySalesTransaction = 0;
let weeklySalesTransaction = 0;
let totalSalesTransaction = 0;

let monthlyProfitTransaction = 0;
let dailyProfitTransaction = 0;
let weeklyProfitTransaction = 0;
let totalProfitTransaction = 0;

let monthlySalesTransactionYesterday = 0;
let dailySalesTransactionYesterday = 0;
let weeklySalesTransactionYesterday = 0;

let monthlyProfitTransactionYesterday = 0;
let dailyProfitTransactionYesterday = 0;
let weeklyProfitTransactionYesterday = 0;

let ReorderProduct = 0;
let ZeroProduct = 0;
let ProductCount = 0;
let DateNow = Date().toLocaleString().split(" ");

var firstDayOfCurrentWeek;
var lastDayOfCurrentWeek;
var firstDayOfLastWeek;
var lastDayOfLastWeek;
var yesterday;
var lastMonth;
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
class DashboardIndex extends React.Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    transactions: PropTypes.array.isRequired,
    transaction_items: PropTypes.array.isRequired,
    getProductList: PropTypes.func.isRequired,
    getTransactionList: PropTypes.func.isRequired,
    getTransactionItemList: PropTypes.func.isRequired,
  };
  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
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
  // getting the props from product reducer, transaction list reducer, transaction item list reducer

  componentDidMount() {
    this.props.getProductList();
    this.props.getTransactionList();
    this.props.getTransactionItemList();
  }
  // addDays = function (days) {
  //   var dat = new Date(this.valueOf());
  //   dat.setDate(dat.getDate() + days);
  //   return dat;
  // };

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
    const currentMonth = new Date();
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    lastMonth = currentMonth.toLocaleString("default", {
      month: "short",
    });
    const today = new Date();
    const yesterdayDate = new Date(today);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    yesterday = yesterdayDate.toDateString();

    //last week start and last dates

    var d = new Date();
    var to = d.setTime(
      d.getTime() - (d.getDay() ? d.getDay() : 7) * 24 * 60 * 60 * 1000
    );
    var from = d.setTime(d.getTime() - 6 * 24 * 60 * 60 * 1000);
    lastDayOfLastWeek = new Date(to);
    firstDayOfLastWeek = new Date(from);

    //current start day and last day of this week.
    var curr = new Date();
    var first = curr.getDate() - curr.getDay() + 1;
    firstDayOfCurrentWeek = new Date(curr.setDate(first));
    lastDayOfCurrentWeek = new Date(curr.setDate(curr.getDate() + 6));
    // console.log(firstDayOfCurrentWeek, lastDayOfCurrentWeek);

    // console.log(firstDayOfCurrentWeek, lastDayOfCurrentWeek);
    // console.log(firstDayOfLastWeek, lastDayOfLastWeek);

    var dateForCurrentWeekArray = this.getDates(
      firstDayOfCurrentWeek,
      lastDayOfCurrentWeek
    );
    var dateForLastWeekArray = this.getDates(
      firstDayOfLastWeek,
      lastDayOfLastWeek
    );

    // console.log(dateForCurrentWeekArray);
    let transactionItems = [];

    if (this.props.AuthReducer.user)
      if (!this.props.AuthReducer.user.is_staff) {
        return <Redirect to="/Home" />;
      }
    const { transactions, products, transaction_items } = this.props;

    monthlySalesTransaction = 0;
    dailySalesTransaction = 0;
    weeklySalesTransaction = 0;
    totalSalesTransaction = 0;
    monthlyProfitTransaction = 0;
    dailyProfitTransaction = 0;
    weeklyProfitTransaction = 0;
    totalProfitTransaction = 0;
    ReorderProduct = 0;
    ZeroProduct = 0;
    ProductCount = 0;
    transactionsFilteredDateSeparated = [];
    transactionsDailyFiltered = [];
    monthlySalesTransactionYesterday = 0;
    dailySalesTransactionYesterday = 0;
    weeklySalesTransactionYesterday = 0;
    monthlyProfitTransactionYesterday = 0;
    dailyProfitTransactionYesterday = 0;
    weeklyProfitTransactionYesterday = 0;
    transactions
      .filter(
        (transac) => transac.order_status.includes("Complete") && transac.status
      )
      .map((filteredTransactionObject) =>
        transactionsFilteredDateSeparated.push({
          id: filteredTransactionObject.id,
          totalAmount: filteredTransactionObject.totalAmount,
          totalProfit: filteredTransactionObject.totalProfit,
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
    transactions
      .filter(
        (transac) => transac.order_status.includes("Complete") && transac.status
      )
      .map((filteredTransactionObject) =>
        filteredTransactionObject.items.map((filteredTransactionItemsObject) =>
          transactionItems.push(filteredTransactionItemsObject.product.id)
        )
      );
    // let [start, end] = this.GetWeekDates();

    var StartDayOfTheLastWeek = new Date(
      firstDayOfLastWeek.toLocaleString().split(",")[0]
    )
      .toString()
      .split(" ");
    var EndDayOfTheLastWeek = new Date(
      lastDayOfLastWeek.toLocaleString().split(",")[0]
    )
      .toString()
      .split(" ");

    for (var i = 0; i < transactionsFilteredDateSeparated.length; i++) {
      var month = transactionsFilteredDateSeparated[i].month;
      var day = transactionsFilteredDateSeparated[i].day;
      var year = transactionsFilteredDateSeparated[i].year;
      var date = transactionsFilteredDateSeparated[i].date;
      //Fetch total sales

      totalSalesTransaction += parseInt(
        transactionsFilteredDateSeparated[i].totalAmount
      );
      totalProfitTransaction += parseInt(
        transactionsFilteredDateSeparated[i].totalProfit
      );
      //Fetch montly sales
      if (year === DateNow[3]) {
        if (month === DateNow[1]) {
          monthlySalesTransaction += parseInt(
            transactionsFilteredDateSeparated[i].totalAmount
          );
          monthlyProfitTransaction += parseInt(
            transactionsFilteredDateSeparated[i].totalProfit
          );
          //Fetch daily sales
          if (day === DateNow[2]) {
            dailySalesTransaction += parseInt(
              transactionsFilteredDateSeparated[i].totalAmount
            );
            dailyProfitTransaction += parseInt(
              transactionsFilteredDateSeparated[i].totalProfit
            );
          }
        }
        if (month === lastMonth) {
          monthlySalesTransactionYesterday += parseInt(
            transactionsFilteredDateSeparated[i].totalAmount
          );
          monthlyProfitTransactionYesterday += parseInt(
            transactionsFilteredDateSeparated[i].totalProfit
          );
        }

        if (month === yesterday.split(" ")[1]) {
          if (day === yesterday.split(" ")[2]) {
            dailySalesTransactionYesterday += parseInt(
              transactionsFilteredDateSeparated[i].totalAmount
            );
            dailyProfitTransactionYesterday += parseInt(
              transactionsFilteredDateSeparated[i].totalProfit
            );
          }
        }
      }
      //Fetch Weekly
      for (let x = 0; x < dateForCurrentWeekArray.length; x++) {
        if (
          date.includes(
            dateForCurrentWeekArray[x].toString().split(" ")[1] +
              " " +
              dateForCurrentWeekArray[x].toString().split(" ")[2] +
              " " +
              dateForCurrentWeekArray[x].toString().split(" ")[3]
          )
          // dateForCurrentWeekArray[x].toLocaleString().includes(date)
        ) {
          weeklySalesTransaction += parseInt(
            transactionsFilteredDateSeparated[i].totalAmount
          );
          weeklyProfitTransaction += parseInt(
            transactionsFilteredDateSeparated[i].totalProfit
          );
        }
      }

      //Fetch Last Week
      for (let y = 0; y < dateForLastWeekArray.length; y++) {
        if (
          date.includes(
            dateForLastWeekArray[y].toString().split(" ")[1] +
              " " +
              dateForLastWeekArray[y].toString().split(" ")[2] +
              " " +
              dateForLastWeekArray[y].toString().split(" ")[3]
          )
          // dateForCurrentWeekArray[x].toLocaleString().includes(date)
        ) {
          weeklySalesTransactionYesterday += parseInt(
            transactionsFilteredDateSeparated[i].totalAmount
          );
          weeklyProfitTransactionYesterday += parseInt(
            transactionsFilteredDateSeparated[i].totalProfit
          );
        }
      }
    }
    //Fetch reorder product
    products
      .filter((prod) => parseInt(prod.stock) < 10)
      .map((product) => (ReorderProduct += 1));

    transactionItemsFiltered = [];
    transaction_items
      .filter((items) => transactionItems.includes(items.product.id))
      .map((filteredTransactionItemObject) =>
        transactionItemsFiltered.push({
          id: filteredTransactionItemObject.id,
          productName: filteredTransactionItemObject.product.name,
          quantity: filteredTransactionItemObject.quantity,
        })
      );
    transactionItemsFilteredResult = [];
    transactionItemsFiltered.forEach(function (obj) {
      var productNameX = obj.productName;
      if (!this[productNameX])
        transactionItemsFilteredResult.push((this[productNameX] = obj));
      else this[productNameX].quantity += obj.quantity;
    }, Object.create(null));

    return (
      <>
        <div className="flex-1 bg-gray-100 mt-28 md:mt-16 pb-24 md:pb-5">
          <div className="bg-gray-800 pt-3">
            <div
              className="
							rounded-tl-3xl
							bg-gradient-to-r
							from-teal_custom
							to-gray-800
							p-4
							shadow
							text-2xl text-white
						"
            >
              <h3 className="font-bold pl-2">Dashboard</h3>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div
                className="
								bg-white
								border-b-4 border-teal_custom
								rounded-lg
								shadow-xl
								p-5
							"
              >
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-green-600">
                      <i className="fa fa-wallet fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="font-bold uppercase text-gray-600">
                      Total Sales
                    </h5>
                    <h3 className="font-bold text-3xl">
                      ₱{this.numberWithCommas(totalSalesTransaction)}
                      {/* <span className="text-green-500">
                        <i className="fas fa-caret-up"></i>
                      </span> */}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div
                className="
								bg-white
								border-b-4 border-teal_custom
								rounded-lg
								shadow-xl
								p-5
							"
              >
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-green-600">
                      <i className="far fa-analytics fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="font-bold uppercase text-gray-600">
                      Total Profit
                    </h5>
                    <h3 className="font-bold text-3xl">
                      ₱{this.numberWithCommas(totalProfitTransaction)}
                      {/* <span className="text-green-500">
                        <i className="fas fa-caret-up"></i>
                      </span> */}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div
                className="
								bg-white
								border-b-4 border-teal_custom
								rounded-lg
								shadow-xl
								p-5
							"
              >
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div
                      className={`rounded-full p-5 ${
                        monthlySalesTransaction >
                        monthlySalesTransactionYesterday
                          ? "bg-green-600"
                          : "bg-red-600"
                      } `}
                    >
                      <i className="fad fa-calendar-alt fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="font-bold uppercase text-gray-600">
                      Monthly Sales ({DateNow[1]})
                    </h5>
                    <h3 className="font-bold text-3xl">
                      ₱{this.numberWithCommas(monthlySalesTransaction)}
                      <span
                        className={`${
                          monthlySalesTransaction >
                          monthlySalesTransactionYesterday
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        <i
                          className={`fas  ${
                            monthlySalesTransaction >
                            monthlySalesTransactionYesterday
                              ? "fa-caret-up"
                              : "fa-caret-down"
                          }`}
                        ></i>
                      </span>
                      <div className="text-sm text-gray-400">
                        Last {lastMonth} : ₱
                        {this.numberWithCommas(
                          monthlySalesTransactionYesterday
                        )}
                      </div>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div
                className="
								bg-white
								border-b-4 border-teal_custom
								rounded-lg
								shadow-xl
								p-5
							"
              >
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div
                      className={`rounded-full p-5 ${
                        monthlyProfitTransaction >
                        monthlyProfitTransactionYesterday
                          ? "bg-green-600"
                          : "bg-red-600"
                      } `}
                    >
                      <i className="fad fa-calendar-alt fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="font-bold uppercase text-gray-600">
                      Monthly Profit ({DateNow[1]})
                    </h5>

                    <h3 className="font-bold text-3xl">
                      ₱{this.numberWithCommas(monthlyProfitTransaction)}
                      <span
                        className={`${
                          monthlyProfitTransaction >
                          monthlyProfitTransactionYesterday
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        <i
                          className={`fas  ${
                            monthlyProfitTransaction >
                            monthlyProfitTransactionYesterday
                              ? "fa-caret-up"
                              : "fa-caret-down"
                          }`}
                        ></i>
                      </span>
                      <div className="text-sm text-gray-400">
                        Last {lastMonth} : ₱
                        {this.numberWithCommas(
                          monthlyProfitTransactionYesterday
                        )}
                      </div>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div
                className="
								bg-white
								border-b-4 border-teal_custom
								rounded-lg
								shadow-xl
								p-5
							"
              >
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div
                      className={`rounded-full p-5 ${
                        dailySalesTransaction > dailySalesTransactionYesterday
                          ? "bg-green-600"
                          : "bg-red-600"
                      } `}
                    >
                      <i className="fad fa-calendar-day fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="font-bold uppercase text-gray-600">
                      Daily Sales
                    </h5>

                    <h3 className="font-bold text-3xl">
                      ₱{this.numberWithCommas(dailySalesTransaction)}
                      <span
                        className={`${
                          dailySalesTransaction > dailySalesTransactionYesterday
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        <i
                          className={`fas  ${
                            dailySalesTransaction >
                            dailySalesTransactionYesterday
                              ? "fa-caret-up"
                              : "fa-caret-down"
                          }`}
                        ></i>
                      </span>
                      <div className="text-sm text-gray-400">
                        Yesterday{" "}
                        {yesterday.split(" ")[0] +
                          " " +
                          yesterday.split(" ")[1] +
                          " " +
                          yesterday.split(" ")[2] +
                          " " +
                          yesterday.split(" ")[3]}{" "}
                        : ₱
                        {this.numberWithCommas(dailySalesTransactionYesterday)}
                      </div>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div
                className="
								bg-white
								border-b-4 border-teal_custom
								rounded-lg
								shadow-xl
								p-5
							"
              >
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div
                      className={`rounded-full p-5 ${
                        dailyProfitTransaction > dailyProfitTransactionYesterday
                          ? "bg-green-600"
                          : "bg-red-600"
                      } `}
                    >
                      {" "}
                      <i className="fad fa-calendar-day fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="font-bold uppercase text-gray-600">
                      Daily Profit
                    </h5>

                    <h3 className="font-bold text-3xl">
                      ₱{this.numberWithCommas(dailyProfitTransaction)}
                      <span
                        className={`${
                          dailyProfitTransaction >
                          dailyProfitTransactionYesterday
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        <i
                          className={`fas  ${
                            dailyProfitTransaction >
                            dailyProfitTransactionYesterday
                              ? "fa-caret-up"
                              : "fa-caret-down"
                          }`}
                        ></i>
                      </span>
                      <div className="text-sm text-gray-400">
                        Yesterday{" "}
                        {yesterday.split(" ")[0] +
                          " " +
                          yesterday.split(" ")[1] +
                          " " +
                          yesterday.split(" ")[2] +
                          " " +
                          yesterday.split(" ")[3]}{" "}
                        : ₱
                        {this.numberWithCommas(dailyProfitTransactionYesterday)}
                      </div>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div
                className="
								bg-white
								border-b-4 border-teal_custom
								rounded-lg
								shadow-xl
								p-5
							"
              >
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div
                      className={`rounded-full p-5 ${
                        weeklySalesTransaction > weeklySalesTransactionYesterday
                          ? "bg-green-600"
                          : "bg-red-600"
                      } `}
                    >
                      {" "}
                      <i className="fad fa-calendar-week fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="font-bold uppercase text-gray-600">
                      Weekly Sales
                    </h5>

                    <h3 className="font-bold text-3xl">
                      ₱{this.numberWithCommas(weeklySalesTransaction)}
                      <span
                        className={`${
                          weeklySalesTransaction >
                          weeklySalesTransactionYesterday
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        <i
                          className={`fas  ${
                            weeklySalesTransaction >
                            weeklySalesTransactionYesterday
                              ? "fa-caret-up"
                              : "fa-caret-down"
                          }`}
                        ></i>
                      </span>
                      <div className="text-xs text-gray-400">
                        Last{" "}
                        {StartDayOfTheLastWeek[0] +
                          " " +
                          StartDayOfTheLastWeek[1] +
                          " " +
                          StartDayOfTheLastWeek[2] +
                          " " +
                          StartDayOfTheLastWeek[3]}{" "}
                        To{" "}
                        {EndDayOfTheLastWeek[0] +
                          " " +
                          EndDayOfTheLastWeek[1] +
                          " " +
                          EndDayOfTheLastWeek[2] +
                          " " +
                          EndDayOfTheLastWeek[3]}
                        : ₱
                        {this.numberWithCommas(weeklySalesTransactionYesterday)}
                      </div>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div
                className="
								bg-white
								border-b-4 border-teal_custom
								rounded-lg
								shadow-xl
								p-5
							"
              >
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div
                      className={`rounded-full p-5 ${
                        weeklyProfitTransaction >
                        weeklyProfitTransactionYesterday
                          ? "bg-green-600"
                          : "bg-red-600"
                      } `}
                    >
                      {" "}
                      <i className="fad fa-calendar-week fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="font-bold uppercase text-gray-600">
                      Weekly Profit
                    </h5>

                    <h3 className="font-bold text-3xl">
                      ₱{this.numberWithCommas(weeklyProfitTransaction)}
                      <span
                        className={`${
                          weeklyProfitTransaction >
                          weeklyProfitTransactionYesterday
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        <i
                          className={`fas  ${
                            weeklyProfitTransaction >
                            weeklyProfitTransactionYesterday
                              ? "fa-caret-up"
                              : "fa-caret-down"
                          }`}
                        ></i>
                      </span>
                      <div className="text-xs text-gray-400">
                        Last{" "}
                        {StartDayOfTheLastWeek[0] +
                          " " +
                          StartDayOfTheLastWeek[1] +
                          " " +
                          StartDayOfTheLastWeek[2] +
                          " " +
                          StartDayOfTheLastWeek[3]}{" "}
                        To{" "}
                        {EndDayOfTheLastWeek[0] +
                          " " +
                          EndDayOfTheLastWeek[1] +
                          " " +
                          EndDayOfTheLastWeek[2] +
                          " " +
                          EndDayOfTheLastWeek[3]}{" "}
                        : ₱
                        {this.numberWithCommas(
                          weeklyProfitTransactionYesterday
                        )}
                      </div>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div
                className="
								bg-white
								border-b-4 border-teal_custom
								rounded-lg
								shadow-xl
								p-5
							"
              >
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-red-600">
                      <i className="fad fa-layer-plus fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="font-bold uppercase text-gray-600">
                      Number of Products to be Reorder
                    </h5>
                    <h3 className="font-bold text-3xl">
                      {this.numberWithCommas(ReorderProduct)}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div
                className="
								bg-white
								border-b-4 border-teal_custom
								rounded-lg
								shadow-xl
								p-5
							"
              >
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-green-600">
                      <i className="fad fa-dolly-flatbed-empty fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="font-bold uppercase text-gray-600">
                      Number of Zero Stock Products
                    </h5>
                    <h3 className="font-bold text-3xl">
                      {this.numberWithCommas(ZeroProduct)}
                    </h3>
                  </div>
                </div>
              </div>
            </div> */}

            {/* <div className="w-1/2 mx-auto p-6 bg-white shadow-lg">
							<div className="relative w-full max-w-full flex-grow">
								<h6 className="uppercase text-gray-800 mb-1 text-xs font-semibold">
									Sales
								</h6>
								<h2 className="text-gray-800 text-xl font-semibold">Daily</h2>
							</div>
							<div className="chart">
								<Line
									data={{
										labels: transactionsDailyFiltered.map((x) => x.date),
										datasets: [
											{
												label:
													DateNow[0] +
													' ' +
													DateNow[1] +
													' ' +
													DateNow[2] +
													' ' +
													DateNow[3] +
													' Sales',
												fill: false,
												data: transactionsDailyFiltered.map(
													(x) => x.totalAmount
												),
												backgroundColor: '#5bc0de',
											},
										],
									}}
									options={{
										plugins: {
											legend: {
												labels: {
													// This more specific font property overrides the global property
													font: {
														size: 15,
													},
												},
												position: 'bottom',
												align: 'end',
											},
										},
										scales: {
											xAxes: [{}],
											yAxes: [
												{
													ticks: {
														min: 0,
													},
												},
											],
										},
									}}
								/>
							</div>
						</div> */}
            <div className="w-full md:w-6/12 overflow-x-auto p-5">
              <div className="bg-white border-b-4 border-red-600 rounded-lg shadow-xl p-5">
                <h2 className="text-red-600 text-2xl">
                  We're running out of stock in the following items
                </h2>
                <table className="min-w-full ">
                  <thead>
                    <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        Product Name
                      </th>
                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        Stock
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((prod) =>
                      prod.variation
                        .filter((prodvariation) => prodvariation.stock < 10)
                        .map((product) => (
                          <tr
                            key={prod.id}
                            className="h-24 border-gray-300 dark:border-gray-200 border-b"
                          >
                            <td className="text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal">
                              {prod.name}
                            </td>
                            <td className="text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal">
                              {product.stock}
                            </td>
                          </tr>
                        ))
                    )}
                    {/* {products
                      .filter((prod) => prod.stock < 10)
                      .map((product) => (
                        <tr
                          key={product.id}
                          className="h-24 border-gray-300 dark:border-gray-200 border-b"
                        >
                          <td className="text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal">
                            {product.name}
                          </td>
                          <td className="text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal">
                            {product.stock}
                          </td>
                        </tr>
                      ))} */}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full md:w-6/12 overflow-x-auto p-5">
              <div className="bg-white border-b-4 border-teal_custom rounded-lg shadow-xl p-5">
                <h2 className="text-gray-700 text-2xl">Top Selling Products</h2>
                <table className="min-w-full ">
                  <thead>
                    <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        Product name
                      </th>
                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        Number of sold items
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionItemsFilteredResult
                      .sort((a, b) => (a.quantity < b.quantity ? 1 : -1))
                      .slice(0, 9)
                      .map((item) => (
                        <tr
                          key={item.id}
                          className="h-24 border-gray-300 dark:border-gray-200 border-b"
                        >
                          <td className="text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal">
                            {item.productName}
                          </td>
                          <td className="text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal">
                            {item.quantity}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
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
  transactions: state.transactions.transactions,
  transaction_items: state.transactions.transaction_item_list,
  AuthReducer: state.AuthReducer,
});

export default connect(mapStateToProps, {
  getProductList,
  getTransactionList,
  getTransactionItemList,
})(DashboardIndex);
