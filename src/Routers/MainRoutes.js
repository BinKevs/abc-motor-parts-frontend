import { Route, Switch } from "react-router-dom";
// import ProductListIndex from '../components/Products/ProductListIndex';
import PurchasesIndex from "../components/Customers/Purchases/Purchases";
import ProductListIndexOnlineCustomer from "../components/Customers/Products/ProductListIndexOnlineCustomer";
import ProductDetails from "../components/Customers/Products/ProductDetails";
import Home from "../components/Customers/Products/Home";
import Categories from "../components/Customers/Products/Categories";
import AccountSetting from "../components/Customers/Accounts/AccountSetting";
import Checkout from "../components/Customers/Checkout/Checkout";

import TransactionOrders from "../components/Transactions/TransactionOrders";

import ProductListIndex from "../components/Products/ProductListIndex";
import ProductSetting from "../components/Products/ProductSetting";
import CheckoutIndex from "../components/Products/Checkout/CheckoutIndex";
import VoucherSetting from "../components/Vouchers/VoucherSetting";
import RefundsIndex from "../components/Refunds/RefundsIndex";

import DashboardIndex from "../components/Dashboard/dashboard";

import InventorySetting from "../components/Inventories/InventorySetting";

import SupplierSetting from "../components/Suppliers/SupplierSetting";
import Archive from "../components/Archives/Archive";

import TransactionSetting from "../components/Transactions/TransactionSetting";
import TransactionItemsSetting from "../components/Transactions/TransactionItemsSetting";

import ReportIndex from "../components/Reports/ReportIndex";
import ProductReport from "../components/Reports/ProductReport";
import SalesReport from "../components/Reports/SalesReport";
import InventoriesReport from "../components/Reports/InventoriesReport";

import ActivityLog from "../components/Accounts/ActivityLog";
import AttendanceLog from "../components/Accounts/AttendanceLog";
import AccountsIndex from "../components/Accounts/AccountSetting/AccountsIndex";
import AccountSettingsMenu from "../components/Accounts/AccountSetting/AccountSettingsMenu";
import CustomerAccountSetting from "../components/Accounts/AccountSetting/CustomerAccountSetting";

import PrivateRoute from "../Helpers/PrivateRoute";
function MainBaseRouter() {
  return (
    <>
      <Switch>
        <PrivateRoute
          exact
          path="/products/:categoryName"
          component={ProductListIndexOnlineCustomer}
        />
        <PrivateRoute
          exact
          path="/product/:productID"
          component={ProductDetails}
        />
        <PrivateRoute exact path="/Home" component={Home} />
        <PrivateRoute exact path="/Categories" component={Categories} />

        <PrivateRoute exact path="/vouchers" component={VoucherSetting} />
        <PrivateRoute exact path="/refunds" component={RefundsIndex} />

        <PrivateRoute
          exact
          path="/account/settings"
          component={AccountSetting}
        />
        <PrivateRoute
          exact
          path="/account/purchases"
          component={PurchasesIndex}
        />

        <PrivateRoute exact path="/checkout" component={Checkout} />

        <PrivateRoute
          exact
          path="/transactions/queuing"
          component={TransactionOrders}
        />

        {/* <PrivateRoute exact path="/checkout" component={CheckoutIndex} /> */}
        <PrivateRoute
          exact
          path="/admin/products/settings"
          component={ProductSetting}
        />
        {/* <PrivateRoute exact path="/products" component={ProductListIndex} /> */}

        <PrivateRoute exact path="/dashboard" component={DashboardIndex} />

        <PrivateRoute exact path="/inventories" component={InventorySetting} />

        <PrivateRoute exact path="/supplier" component={SupplierSetting} />
        <PrivateRoute exact path="/archive" component={Archive} />

        <PrivateRoute
          exact
          path="/transactions"
          component={TransactionSetting}
        />
        <PrivateRoute
          exact
          path="/transactions/items"
          component={TransactionItemsSetting}
        />

        {/* <PrivateRoute exact path="/reports" component={ReportIndex} /> */}
        <PrivateRoute
          exact
          path="/reports/inventories"
          component={InventoriesReport}
        />
        <PrivateRoute
          exact
          path="/reports/products"
          component={ProductReport}
        />
        <PrivateRoute exact path="/reports/sales" component={SalesReport} />

        <PrivateRoute
          exact
          path="/customer-setting"
          component={CustomerAccountSetting}
        />
        <PrivateRoute exact path="/activity_log" component={ActivityLog} />
        <PrivateRoute exact path="/attendance_log" component={AttendanceLog} />
        <PrivateRoute exact path="/accounts" component={AccountsIndex} />
        <PrivateRoute
          exact
          path="/accounts/settings/menu"
          component={AccountSettingsMenu}
        />
      </Switch>
    </>
  );
}

export default MainBaseRouter;
