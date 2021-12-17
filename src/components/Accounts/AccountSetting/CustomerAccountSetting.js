import React from "react";
import { connect } from "react-redux";
import {
  getAccountList,
  getAccount,
} from "../../../store/actions/account/auth";
import { getTransactionList } from "../../../store/actions/transaction/transactions.js";
import { AccountTableExportModal } from "../Print/AccountTableExportModal";
import CustomerAccountTransactionTable from "./CustomerAccountTransactionTable";
let AccountsItems = [];
class CustomerAccountSetting extends React.Component {
  state = {
    search: "",
    table_export_modal: false,
    showModalTransactionList: false,
    UserTransactions: [],
  };

  componentDidMount() {
    this.props.getAccountList();
    this.props.getTransactionList();
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleModalTransactionList(transactionID) {
    return (event) => {
      event.preventDefault();
      this.setState({
        showModalTransactionList: !this.state.showModalTransactionList,
        UserTransactions: this.props.transactions.filter(
          (transac) => transac.user === transactionID
        ),
      });
    };
  }
  handleModalTransactionListClose = (event) => {
    event.preventDefault();
    this.setState({
      showModalTransactionList: !this.state.showModalTransactionList,
      UserTransactions: [],
    });
  };

  OnToggleExportTable = (event) => {
    event.preventDefault();
    this.setState({ table_export_modal: !this.state.table_export_modal });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.getElementById("Body").classList.toggle("overflow-hidden");
  };

  render() {
    //destructuring the dictionary for searching/ fetching purposes
    AccountsItems = [];
    this.props.accounts.map((account) =>
      AccountsItems.push({
        id: account.user.id,
        username: account.user.username,
        email: account.user.email,
        status: account.user.is_active,
        is_superuser: account.user.is_superuser,
        name: account.user.last_name + " " + account.user.first_name,
        address:
          account.address.street +
          account.address.barangay +
          account.address.city +
          account.address.province +
          account.address.region,
        contact_number: account.contact_number,
      })
    );
    //returning the filtered data from search
    const lowercasedFilter = this.state.search.toLowerCase();
    const filteredData = AccountsItems.filter((account) => {
      // return Object.keys(item).some((key) =>
      // 	item[key].toString().toLowerCase().includes(lowercasedFilter)
      // );
      if (account.status && !account.is_superuser)
        return (
          account.username
            .toString()
            .toLowerCase()
            .includes(lowercasedFilter) ||
          account.name.toString().toLowerCase().includes(lowercasedFilter)
        );
    });
    return (
      <>
        <div class="bg-gray-100 flex-1 mt-20 md:mt-14 pb-24 md:pb-5">
          <div class="bg-gray-800 pt-3">
            <div
              class="rounded-tl-3xl bg-gradient-to-r
							from-teal_custom
							to-gray-800 p-4 shadow text-2xl text-white
"
            >
              <h3 class="font-bold pl-2">Customer/s</h3>
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
                  </div>
                </div>
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
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
                        Account ID
                      </th>
                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        Username
                      </th>
                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        Name
                      </th>

                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        Contact Details
                      </th>
                      <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        More
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((account) => (
                      <tr
                        key={account.id}
                        className="h-24 border-gray-300 dark:border-gray-200 border-b"
                      >
                        <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {account.id}
                        </td>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {account.username}
                        </td>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                          {account.name}
                        </td>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 space-y-2">
                          <div>{account.email}</div>
                          <div>{account.address}</div>
                          <div>{account.contact_number}</div>
                        </td>
                        <td className="pr-8 relative">
                          <button className="button-see-more text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none">
                            <div className="seeMore absolute left-0 top-0 mt-2 -ml-20 shadow-md z-10 w-32">
                              <ul className="bg-white dark:bg-gray-800 shadow rounded p-2">
                                <li
                                  onClick={this.handleModalTransactionList(
                                    account.id
                                  )}
                                  className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-teal_custom hover:text-white px-3 font-normal"
                                >
                                  See Transaction/s
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
                        </td>
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
          <AccountTableExportModal
            OnToggleExportTable={this.OnToggleExportTable}
            accounts={filteredData}
          />
        </div>
        <CustomerAccountTransactionTable
          state={this.state}
          handleModalTransactionListClose={this.handleModalTransactionListClose}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  accounts: state.AuthReducer.accounts,
  account: state.AuthReducer.account,
  isAuthenticated: state.AuthReducer.isAuthenticated,
  transactions: state.transactions.transactions,
});

export default connect(mapStateToProps, {
  getAccountList,
  getAccount,
  getTransactionList,
})(CustomerAccountSetting);
