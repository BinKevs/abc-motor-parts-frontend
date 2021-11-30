import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { loadUser, UpdateAddress } from "../../../store/actions/account/auth";
import { addTransaction } from "../../../store/actions/transaction/transactions";
import { getTransactionList } from "../../../store/actions/transaction/transactions.js";
import {
  removeFromCart,
  changeCartValue,
  clearCart,
} from "../../../store/actions/cart/cartActions";
import AddressModal from "./AddressModal";
import VoucherModal from "./VoucherModal";
import { getVoucherList } from "../../../store/actions/product/products";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import swal from "sweetalert";
import { phone } from "phone";
import { URL_FOR_HOME } from "../../../Helpers/constant";
let shippingFee = 0;
let TotalAmountToPay = 0;
let totalProfit = 0;

let TotalWeight = 0;
let succeedingWeight = 0;
var options = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
let DateNow = new Date().toLocaleString("en-US", options);
class Checkout extends React.Component {
  state = {
    contact_number: "",
    showModalAddress: false,
    showModalVoucher: false,
    showModalEWallet: false,
    totalAmount: 0,
    amount_tendered: 0,
    change: -1,
    transanction_id: 0,
    TotalQuantity: 0,
    payment_method: "",
    voucher_code: "",
    voucher_id: 0,
    voucher_value: 0,
    voucher_error: "",
    currentScrollState: 0,
    regionData: [],
    provinceData: [],
    cityData: [],
    barangayData: [],
    regionValue: "",
    provinceValue: "",
    cityValue: "",
    barangayValue: "",
    regionCode: "",
    provinceCode: "",
    cityCode: "",
    barangayCode: "",
    street: "",
    ref_number_gcash: "",
    phone_number_gcash: "",
    ref_number_paymaya: "",
    phone_number_paymaya: "",
    contactNumberErrorGcash: false,
    contactNumberErrorPaymaya: false,
  };
  onChange = (e) => {
    if (e.target.name === "phone_number_gcash") {
      if (phone(e.target.value, { country: "PH" }).isValid) {
        this.setState({
          contactNumberErrorGcash: false,
        });
      } else {
        this.setState({
          contactNumberErrorGcash: true,
        });
      }
    } else if (e.target.name === "phone_number_paymaya") {
      if (phone(e.target.value, { country: "PH" }).isValid) {
        this.setState({
          contactNumberErrorPaymaya: false,
        });
      } else {
        this.setState({
          contactNumberErrorPaymaya: true,
        });
      }
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  trimmedString(stringX) {
    if (stringX.length === 12) {
      return stringX;
    } else {
      return stringX.substring(0, 24) + "...";
    }
  }
  HandleDecimalPlaces = (Variable) => {
    return Math.round((Variable + Number.EPSILON) * 100) / 100;
  };

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  componentDidMount() {
    this.props.getVoucherList();
    this.props.loadUser();
    TotalAmountToPay = Object.values(this.props.cartItems).reduce(
      (r, { price, quantity }) => parseFloat(r) + parseFloat(price * quantity),
      0
    );
    totalProfit = Object.values(this.props.cartItems).reduce(
      (r, { quantity, profit }) =>
        parseFloat(r) + parseFloat(profit * quantity),
      0
    );
    // this.setState({
    //   totalAmount: this.HandleDecimalPlaces(VariableTotalAmount + shippingFee),
    //   quantity: Variablequantity,
    // });

    this.region();
  }
  handleSubmitCashOnDelivery = (event) => {
    event.preventDefault();
    if (this.state.payment_method === "E-Wallet") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.setState({
        showModalEWallet: !this.state.showModalEWallet,
      });
    } else {
      let quantity = 0;
      this.props.cartItems.map((item) => (quantity += item.quantity));
      const address =
        this.props.AuthReducer.addresses.street +
        " " +
        this.props.AuthReducer.addresses.barangay +
        " " +
        this.props.AuthReducer.addresses.city +
        " " +
        this.props.AuthReducer.addresses.province +
        " " +
        this.props.AuthReducer.addresses.region;
      const contact_number = this.props.AuthReducer.contact_number;
      const action_done = "Transaction Added";
      const order_status = "Pending";

      const items = this.props.cartItems;
      const { payment_method, amount_tendered, change, voucher_id } =
        this.state;
      const data = {
        totalProfit: this.HandleDecimalPlaces(totalProfit),
        totalAmount: this.HandleDecimalPlaces(
          TotalAmountToPay - this.state.voucher_value
        ),
        shippingCost: this.HandleDecimalPlaces(shippingFee),
        quantity,
        items,
        action_done,
        payment_method,
        order_status,
        address,
        contact_number,
        voucher_status_details:
          "Redeemed by : " +
          this.props.AuthReducer.user.username +
          " at " +
          DateNow,
        voucher_id: voucher_id,
      };
      this.props.addTransaction(data);
      this.props.clearCart();
      this.props.history.push("/Home");
    }
  };
  handleSubmitGCash = (event) => {
    event.preventDefault();
    let quantity = 0;
    this.props.cartItems.map((item) => (quantity += item.quantity));
    const address =
      this.props.AuthReducer.addresses.street +
      " " +
      this.props.AuthReducer.addresses.barangay +
      " " +
      this.props.AuthReducer.addresses.city +
      " " +
      this.props.AuthReducer.addresses.province +
      " " +
      this.props.AuthReducer.addresses.region;
    const contact_number = this.props.AuthReducer.contact_number;
    const action_done = "Transaction Added";
    const order_status = "Pending (Checking Payment)";
    const items = this.props.cartItems;
    const {
      ref_number_gcash,
      phone_number_gcash,
      voucher_id,
      contactNumberErrorGcash,
    } = this.state;
    const payment_method_gcash =
      "Ref No. : " + ref_number_gcash + " Phone No. : " + phone_number_gcash;
    const data = {
      totalProfit: this.HandleDecimalPlaces(totalProfit),
      totalAmount: this.HandleDecimalPlaces(
        TotalAmountToPay - this.state.voucher_value
      ),
      shippingCost: this.HandleDecimalPlaces(shippingFee),
      quantity,
      items,
      action_done,
      payment_method: "Gcash",
      payment_details: payment_method_gcash,
      voucher_status_details:
        "Redeemed by : " +
        this.props.AuthReducer.user.username +
        " at " +
        DateNow,
      voucher_id: voucher_id,
      order_status,
      address,
      contact_number,
    };
    if (phone(phone_number_gcash, { country: "PH" }).isValid) {
      this.setState({
        contactNumberErrorGcash: false,
      });
    } else {
      this.setState({
        contactNumberErrorGcash: true,
      });
    }
    if (!contactNumberErrorGcash) {
      this.props.addTransaction(data);
      this.props.clearCart();
      this.props.history.push("/Home");
    }
  };
  handleSubmitPayMaya = (event) => {
    event.preventDefault();
    let quantity = 0;
    this.props.cartItems.map((item) => (quantity += item.quantity));
    const address =
      this.props.AuthReducer.addresses.street +
      " " +
      this.props.AuthReducer.addresses.barangay +
      " " +
      this.props.AuthReducer.addresses.city +
      " " +
      this.props.AuthReducer.addresses.province +
      " " +
      this.props.AuthReducer.addresses.region;
    const contact_number = this.props.AuthReducer.contact_number;
    const action_done = "Transaction Added";
    const order_status = "Pending (Checking Payment)";

    const items = this.props.cartItems;
    const {
      ref_number_paymaya,
      phone_number_paymaya,
      voucher_id,
      contactNumberErrorPaymaya,
    } = this.state;
    const payment_method_gcash =
      "Ref No. : " +
      ref_number_paymaya +
      " Phone No. : " +
      phone_number_paymaya;
    const data = {
      totalProfit: this.HandleDecimalPlaces(totalProfit),
      totalAmount: this.HandleDecimalPlaces(
        TotalAmountToPay - this.state.voucher_value
      ),
      shippingCost: this.HandleDecimalPlaces(shippingFee),
      quantity,
      items,
      action_done,
      payment_method: "Paymaya",
      payment_details: payment_method_gcash,
      voucher_status_details:
        "Redeemed by : " +
        this.props.AuthReducer.user.username +
        " at " +
        DateNow,
      voucher_id: voucher_id,
      order_status,
      address,
      contact_number,
    };
    if (phone(phone_number_paymaya, { country: "PH" }).isValid) {
      this.setState({
        contactNumberErrorPaymaya: false,
      });
    } else {
      this.setState({
        contactNumberErrorPaymaya: true,
      });
    }
    if (!contactNumberErrorPaymaya) {
      this.props.addTransaction(data);
      this.props.clearCart();
      this.props.history.push("/Home");
    }
  };

  handleUpdateContact = (event) => {
    event.preventDefault();
    const {
      regionValue,
      provinceValue,
      cityValue,
      barangayValue,
      street,
      contact_number,
    } = this.state;
    const data = {
      region: regionValue,
      province: provinceValue,
      city: cityValue,
      barangay: barangayValue,
      street,
      contact_number,
      address_id: this.props.AuthReducer.addresses.id,
    };
    this.props.UpdateAddress(this.props.AuthReducer.account.id, data);
    this.setState({
      showModalAddress: !this.state.showModalAddress,
      regionValue: "",
      provinceValue: "",
      cityValue: "",
      barangayValue: "",
      regionCode: "",
      provinceCode: "",
      cityCode: "",
      barangayCode: "",
      street: "",
      contact_number: "",
    });
  };
  handleModalContact = (e) => {
    e.preventDefault();
    const {
      street,
      barangay,
      city,
      province,
      region,
      barangay_code,
      city_code,
      province_code,
      region_code,
    } = this.props.AuthReducer.addresses;
    this.setState({
      showModalAddress: !this.state.showModalAddress,
      regionValue: region,
      provinceValue: province,
      cityValue: city,
      barangayValue: barangay,
      regionCode: region_code,
      provinceCode: province_code,
      cityCode: city_code,
      barangayCode: barangay_code,
      street: street,
    });
  };
  handleSubmitPaypal() {
    let quantity = 0;
    this.props.cartItems.map((item) => (quantity += item.quantity));
    const address =
      this.props.AuthReducer.addresses.street +
      " " +
      this.props.AuthReducer.addresses.barangay +
      " " +
      this.props.AuthReducer.addresses.city +
      " " +
      this.props.AuthReducer.addresses.province +
      " " +
      this.props.AuthReducer.addresses.region;

    const contact_number = this.props.AuthReducer.contact_number;
    const action_done = "Transaction Added";
    const order_status = "Pending";

    const items = this.props.cartItems;
    const { payment_method, amount_tendered, change, voucher_id } = this.state;
    const data = {
      totalAmount: TotalAmountToPay - this.state.voucher_value,
      shippingCost: shippingFee,
      quantity,
      items,
      action_done,
      payment_method: "Paypal",
      voucher_status_details:
        "Redeemed by : " +
        this.props.AuthReducer.user.username +
        " at " +
        DateNow,
      voucher_id: voucher_id,
      order_status,
      address,
      contact_number,
    };
    this.props.addTransaction(data);
    this.props.getTransactionList();
    this.props.clearCart();
    // this.props.history.push("/home");
  }
  handleModalEWallet = (e) => {
    e.preventDefault();
    this.setState({ showModalEWallet: !this.state.showModalEWallet });
  };

  handlePaymentMethod(PaymentMethod) {
    return (event) => {
      event.preventDefault();
      this.setState({ payment_method: PaymentMethod });
    };
  }

  handleModalVoucher = (e) => {
    e.preventDefault();

    this.setState({
      currentScrollState:
        window.pageYOffset || document.documentElement.scrollTop,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.setState({ showModalVoucher: !this.state.showModalVoucher });
  };
  handleVoucherApply = (e) => {
    e.preventDefault();

    let exist = this.props.vouchers.some(
      (voucher) =>
        this.state.voucher_code === voucher.code &&
        voucher.voucher_status_details === "Not yet redeemed"
    );
    if (exist) {
      let voucher_id = this.props.vouchers
        .filter(
          (voucher) =>
            this.state.voucher_code === voucher.code &&
            voucher.voucher_status_details === "Not yet redeemed"
        )
        .map((vouch) => vouch.id);
      let voucher_value = this.props.vouchers
        .filter(
          (voucher) =>
            this.state.voucher_code === voucher.code &&
            voucher.voucher_status_details === "Not yet redeemed"
        )
        .map((vouch) => vouch.value);
      this.setState({
        voucher_id: voucher_id,
        voucher_value: voucher_value,
        showModalVoucher: !this.state.showModalVoucher,
      });
      swal("Successfully applied voucher!", "", "success");
    } else {
      this.setState({
        showModalVoucher: !this.state.showModalVoucher,
      });
      swal("Voucher do not exist!", "", "info");
    }
    window.scrollTo({ top: this.state.currentScrollState, behavior: "smooth" });
  };

  region = () => {
    regions().then((response) => {
      this.setState({
        regionData: response,
      });
    });
  };

  province = (e) => {
    this.setState({
      regionValue: e.target.selectedOptions[0].text,
      regionCode: e.target.value,
    });
    provinces(e.target.value).then((response) => {
      this.setState({
        provinceData: response,
        cityData: [],
        barangayData: [],
      });
    });
  };

  city = (e) => {
    this.setState({
      provinceValue: e.target.selectedOptions[0].text,
      provinceCode: e.target.value,
    });
    cities(e.target.value).then((response) => {
      this.setState({
        cityData: response,
      });
    });
  };

  barangay = (e) => {
    this.setState({
      cityValue: e.target.selectedOptions[0].text,
      cityCode: e.target.value,
    });
    barangays(e.target.value).then((response) => {
      this.setState({
        barangayData: response,
      });
    });
  };

  brgy = (e) => {
    this.setState({
      barangayValue: e.target.selectedOptions[0].text,
      barangayCode: e.target.value,
    });
  };

  HandleShippingCost() {
    shippingFee = 0;
    TotalWeight = 0;
    succeedingWeight = 0;
    const { cartItems } = this.props;
    TotalWeight = Object.values(cartItems).reduce(
      (r, { weight, quantity }) =>
        parseFloat(r) + parseFloat(weight * quantity),
      0
    );
    const { region } = this.props.AuthReducer.addresses;
    if (region === "National Capital Region (NCR)") {
      if (TotalWeight <= 1) {
        shippingFee = 60;
      } else if (TotalWeight <= 3) {
        shippingFee = 80;
      } else {
        succeedingWeight = TotalWeight - 3;
        shippingFee = succeedingWeight * 25 + 80;
      }
    } else if (
      region === "Region I (Ilocos Region)" ||
      region === "Region II (Cagayan Valley)" ||
      region === "Region III (Central Luzon)" ||
      region === "Region IV-A (CALABARZON)" ||
      region === "Region IV-B (MIMAROPA)" ||
      region === "Region V (Bicol Region)" ||
      region === "Cordillera Administrative Region (CAR)"
    ) {
      if (TotalWeight <= 0.5) {
        shippingFee = 90;
      } else if (TotalWeight <= 1) {
        shippingFee = 110;
      } else if (TotalWeight <= 3) {
        shippingFee = 180;
      } else {
        succeedingWeight = TotalWeight - 3;
        shippingFee = succeedingWeight * 80 + 180;
      }
    } else if (
      region === "Region VI (Western Visayas)" ||
      region === "Region VII (Central Visayas)" ||
      region === "Region VIII (Eastern Visayas)"
    ) {
      if (TotalWeight <= 0.5) {
        shippingFee = 95;
      } else if (TotalWeight <= 1) {
        shippingFee = 110;
      } else if (TotalWeight <= 3) {
        shippingFee = 180;
      } else {
        succeedingWeight = TotalWeight - 3;
        shippingFee = succeedingWeight * 80 + 180;
      }
    } else if (
      region === "Region IX (Zamboanga Peninzula)" ||
      region === "Region X (Northern Mindanao)" ||
      region === "Region XI (Davao Region)" ||
      region === "Region XII (SOCCSKSARGEN)" ||
      region === "Autonomous Region in Muslim Mindanao (ARMM)" ||
      region === "Region XIII (Caraga)"
    ) {
      if (TotalWeight <= 0.5) {
        shippingFee = 100;
      } else if (TotalWeight <= 1) {
        shippingFee = 110;
      } else if (TotalWeight <= 3) {
        shippingFee = 180;
      } else {
        succeedingWeight = TotalWeight - 3;
        shippingFee = succeedingWeight * 80 + 180;
      }
    }
  }
  render() {
    let { totalAmount, regionData, provinceData, cityData, barangayData } =
      this.state;
    const { cartItems } = this.props;
    this.HandleShippingCost();
    if (this.state.payment_method === "Cash On Delivery") {
      shippingFee = this.HandleDecimalPlaces(
        shippingFee + TotalAmountToPay * 0.0275
      );
    }
    return (
      <>
        <div class="bg-gray-100 flex-1 mt-24 pb-24 md:pb-5">
          <div class="bg-gray-100 pt-3">
            <div class=" bg-gradient-to-r from-teal_custom to-gray-800 p-4 shadow text-2xl text-white text-center">
              <h3 class="font-bold">Checkout</h3>
            </div>
          </div>
          <div className="p-5 w-full">
            <section class="mx-auto p-6 rounded-lg shadow-lg bg-white">
              <div class="w-full mb-8">
                <div className="">
                  <div class="px-4 py-6 text-gray-800 text-3xl font-medium border-b border-gray-300">
                    Delivery Address
                  </div>

                  <div class="flex-row">
                    <div className="font-semibold  px-4 py-3">
                      <div className="text-md flex items-center justify-between">
                        <span> Address</span>
                        <div>
                          <button
                            onClick={this.handleModalContact}
                            class="bg-teal_custom hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-4"
                          >
                            <i class="fal fa-edit fa-lg mr-2"></i>
                            <span>Edit Contact Details</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <div class="px-4 py-3 text-sm font-semibold">
                        <label class="inline-flex items-center mt-3">
                          <span class="ml-2">
                            {this.props.AuthReducer.addresses
                              ? this.props.AuthReducer.addresses.street
                              : ""}
                            {this.props.AuthReducer.addresses
                              ? this.props.AuthReducer.addresses.barangay
                              : ""}
                            {this.props.AuthReducer.addresses
                              ? this.props.AuthReducer.addresses.city
                              : ""}
                            {this.props.AuthReducer.addresses
                              ? this.props.AuthReducer.addresses.province
                              : ""}
                            {this.props.AuthReducer.addresses
                              ? this.props.AuthReducer.addresses.region
                              : ""}
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="font-semibold  px-4 py-3">
                      <div className="text-md flex items-center justify-between">
                        <span>Contact number</span>
                      </div>

                      <div className="flex">
                        {/* <div class="px-4 py-3 mt-3">
                                  <label class="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="contact_number"
                                      class="form-radio h-5 w-5 text-red-600"
                                      value={contact_number.phone_number}
                                      onChange={this.onChange}
                                      checked={
                                        this.state.contact_number ===
                                        contact_number.phone_number
                                          ? true
                                          : false
                                      }
                                    />
                                    <span class="ml-2 text-gray-700 text-sm">
                                      {index === 0
                                        ? "Default Contact Number"
                                        : "Contact Number #" +
                                          parseInt(index + 1)}
                                    </span>
                                  </label>
                                </div> */}
                        <div class="px-4 py-3 text-sm font-semibold">
                          <label class="inline-flex items-center mt-3">
                            <span class="ml-2">
                              {this.props.AuthReducer.contact_number}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div class="px-4 py-3 border-t border-gray-300">
                    <form onSubmit={this.handleSubmitToPayment} class="mt-4">
                      <div class="mt-10">
                        <input
                          type="submit"
                          value="Confirm changes and proceed to payment"
                          class="py-3 px-3 bg-gray-800 text-white rounded hover:bg-gray-600"
                        />
                      </div>
                    </form>
                  </div> */}
                </div>
              </div>
            </section>
          </div>

          <div className="p-5 w-full">
            <section class="w-full mx-auto p-6 rounded-lg shadow-lg mt-12 bg-white">
              <div class="flex">
                <div class="w-full px-4 py-3">
                  <div class="flex justify-between border-b pb-8 ">
                    <h1 class="font-medium text-3xl">Products Ordered</h1>
                  </div>
                  <div class="flex justify-between mt-10 mb-5">
                    <h3 class="font-semibold text-gray-600 text-xs uppercase w-full">
                      Product Details
                    </h3>
                    <h3 class="font-semibold text-gray-600 text-xs uppercase w-full text-center">
                      Quantity
                    </h3>
                    <h3 class="font-semibold text-gray-600 text-xs uppercase w-full text-center">
                      Unit Price
                    </h3>
                    <h3 class="font-semibold text-gray-600 text-xs uppercase w-full text-center">
                      Sub Total
                    </h3>
                  </div>

                  <div className="max-h-72 overflow-y-scroll">
                    {cartItems.map((item) => (
                      <div class=" flex items-center justify-between hover:bg-gray-100 py-2">
                        <>
                          <div class="flex w-full">
                            <div class="HoverCartProductName flex flex-col justify-between flex-grow h-14 relative">
                              <span class="font-bold text-sm">
                                {/* {item.product_name} */}
                                {this.trimmedString(item.product_name)}
                                <div className="CartProductName bg-gray-100 absolute top-0 z-10 w-full">
                                  {item.product_name}
                                </div>
                              </span>
                              <span class="text-gray-600 text-sm">
                                {item.variation}
                              </span>
                              {/* <div
                                href="#"
                                class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                                onClick={() => removeFromCart(item)}
                              >
                                Remove
                              </div> */}
                            </div>
                          </div>

                          <span class="text-center w-full font-semibold text-sm pr-2 break-words">
                            {item.quantity}
                          </span>
                          <span class="text-center w-full font-semibold text-sm pr-2 break-words">
                            ₱{this.numberWithCommas(item.price)}
                          </span>
                          <span class="text-center w-full font-semibold text-sm break-words">
                            ₱
                            {this.numberWithCommas(
                              this.HandleDecimalPlaces(
                                item.price * item.quantity
                              )
                            )}
                          </span>
                        </>
                      </div>
                    ))}
                  </div>

                  {/* <div class="flex justify-between pt-8">
                    <h1 class="font-medium text-2xl">Shipping Fee:</h1>
                    <h1 class="font-semibold text-2xl">+ ₱{shippingFee}</h1>
                  </div> */}
                  <div className="flex flex-col pt-8 gap-y-2">
                    <div class="flex justify-between">
                      <h1 class="font-semibold text-2xl">Order Total: </h1>
                      <h2 class="font-semibold text-2xl">
                        ₱{this.numberWithCommas(TotalAmountToPay)}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="p-5 w-full">
            <section class="w-full mx-auto p-6 rounded-lg shadow-lg mt-12 bg-white">
              {/* <div class="w-full mb-8 rounded-lg shadow-lg "></div> */}

              <div class="">
                <div class="w-full px-4 py-3">
                  <div class="flex justify-between border-b pb-8">
                    <h1 class="font-medium text-3xl">Payment options</h1>
                  </div>
                  <div class="flex flex-col xl:flex-row items-center justify-between mt-5 mb-5 space-x-0 xl:space-x-3 space-y-3 xl:space-y-0">
                    <button
                      onClick={this.handlePaymentMethod("Cash On Delivery")}
                      class={
                        this.state.payment_method === "Cash On Delivery"
                          ? "space-x-1 w-full text-lg text-white transition-colors duration-150 rounded-lg bg-teal_custom"
                          : "space-x-1 w-full text-lg text-gray-700 transition-colors duration-150 border border-gray-500 rounded-lg focus:shadow-outline  "
                      }
                    >
                      <i class="block pt-3 far fa-money-bill-wave fa-lg"></i>
                      <span className="block pb-3 font-semibold">
                        Cash On Delivery
                      </span>
                    </button>
                    <button
                      onClick={this.handlePaymentMethod("E-Wallet")}
                      class={
                        this.state.payment_method === "E-Wallet"
                          ? "space-x-1 w-full text-lg text-white transition-colors duration-150 rounded-lg bg-teal_custom"
                          : "space-x-1 w-full text-lg text-gray-700 transition-colors duration-150 border border-gray-500 rounded-lg focus:shadow-outline  "
                      }
                    >
                      <i class="block pt-3 far fa-wallet fa-lg"></i>
                      <span className="block pb-3 font-semibold">E-Wallet</span>
                    </button>
                  </div>
                  <div className="mb-5">
                    <div className="flex flex-col space-y-6">
                      <div class="flex justify-between">
                        <h1 class="font-semibold text-2xl">Order Total: </h1>
                        <h2 class="font-semibold text-2xl">
                          ₱{this.numberWithCommas(TotalAmountToPay)}
                        </h2>
                      </div>
                      <div class="flex justify-between">
                        <h1 class="font-medium text-md">
                          Package Total Weight:
                        </h1>

                        <h1 class="font-semibold text-md">
                          {" "}
                          {this.HandleDecimalPlaces(TotalWeight)} Kg
                        </h1>
                      </div>
                      <div class="flex justify-between">
                        <h1 class="font-medium text-md">
                          3kg rate on your location:
                        </h1>
                        <h1 class="font-semibold text-md"> ₱ 180</h1>
                      </div>
                      <div
                        class={`flex justify-between ${
                          succeedingWeight > 0 ? "" : "hidden"
                        }`}
                      >
                        <h1 class="font-medium text-md">
                          Succeding kg / Cost:
                        </h1>
                        <h1 class="font-semibold text-md">
                          {" "}
                          {this.HandleDecimalPlaces(succeedingWeight)}kg / ₱{" "}
                          {this.numberWithCommas(
                            this.HandleDecimalPlaces(succeedingWeight * 80)
                          )}
                        </h1>
                      </div>
                      {this.state.payment_method === "Cash On Delivery" ? (
                        <div class="flex justify-between">
                          <h1 class="font-medium text-md">
                            Cash on delivery fee:
                          </h1>
                          <h1 class="font-semibold text-md">
                            {" "}
                            ₱{" "}
                            {this.numberWithCommas(
                              this.HandleDecimalPlaces(
                                TotalAmountToPay * 0.0275
                              )
                            )}
                          </h1>
                        </div>
                      ) : (
                        ""
                      )}
                      <div class="flex justify-between">
                        <h1 class="font-medium text-2xl">Shipping Fee:</h1>
                        <h1 class="font-semibold text-2xl">
                          ₱
                          {this.numberWithCommas(
                            this.HandleDecimalPlaces(shippingFee)
                          )}
                        </h1>
                      </div>
                      <div class="flex justify-between gap-x-5">
                        <div class="flex flex-col">
                          <h1 class="font-medium text-2xl">Gift Voucher</h1>
                          <button
                            onClick={this.handleModalVoucher}
                            class="bg-teal_custom hover:bg-gray-700 text-white font-bold py-2 my-2 px-4 rounded inline-flex items-center"
                          >
                            <i class="fal fa-plus fa-lg"></i>
                            <span>Select Gift Voucher</span>
                          </button>
                        </div>
                      </div>
                      {this.state.voucher_value > 0 ? (
                        <div class="flex justify-between gap-x-5">
                          <h1 class="font-medium text-2xl">Voucher:</h1>
                          <h1 class="font-semibold text-2xl">
                            - ₱{this.state.voucher_value}
                          </h1>
                        </div>
                      ) : (
                        ""
                      )}
                      <div class="flex justify-between">
                        <h1 class="font-semibold text-2xl">
                          Total Amount To Pay:{" "}
                        </h1>
                        <h2 class="font-semibold text-2xl">
                          ₱
                          {this.numberWithCommas(
                            this.HandleDecimalPlaces(
                              TotalAmountToPay +
                                shippingFee -
                                this.state.voucher_value
                            )
                          )}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-10">
                    <button
                      onClick={this.handleSubmitCashOnDelivery}
                      class="bg-teal_custom hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-xl"
                    >
                      <span>Place Order</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div
          class={this.state.showModalEWallet ? "h-screen " : "h-screen hidden"}
        >
          <div class="mx-auto max-w-screen-lg h-full">
            <div
              className="z-20 absolute top-0 right-0 bottom-0 left-0"
              id="modal"
            >
              <div class="modal-overlay absolute w-full h-full z-25 bg-gray-900 opacity-50"></div>
              <div className="h-full overflow-auto w-full flex flex-col">
                <div className="m-2 md:m-12">
                  <form class="mt-9">
                    <div className="relative p-4 md:p-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400 ">
                      <div class="text-left p-0 mb-8">
                        <div>
                          <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                          <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                            ABC Motor Parts
                          </h1>
                        </div>

                        <h1 class="text-gray-800 text-3xl font-medium">
                          E-Wallet Payment
                        </h1>
                      </div>
                      <div className="flex flex-col md:flex-row justify-center items-center px-auto">
                        <form className="flex flex-col items-center justify-center space-y-2 bg-white shadow-lg z-10 rounded-xl p-4 m-3 w-full md:w-2/5">
                          {/* <h1 class="text-blue-500 text-xl font-bold">Gcash</h1> */}
                          <img
                            src="https://orangemagazine.ph/wp-content/uploads/2020/05/GCash_Horizontal-Full-Blue-BG-3-1.png"
                            alt=""
                          />

                          <h1 class="text-gray-400 text-md font-medium">
                            Send your payment here
                          </h1>
                          <h1 class="text-gray-800 text-lg font-medium">
                            <span>09159156949</span>
                          </h1>
                          <input
                            className="w-full border rounded-md pl-4 py-2 focus:ring-0 focus:border-cyan-700"
                            type="text"
                            onChange={this.onChange}
                            name="ref_number_gcash"
                            required
                            value={this.state.ref_number_gcash}
                            placeholder="Reference Number"
                          />
                          <input
                            className="w-full border rounded-md pl-4 py-2 focus:ring-0 focus:border-cyan-700"
                            type="text"
                            onChange={this.onChange}
                            name="phone_number_gcash"
                            required
                            value={this.state.phone_number_gcash}
                            placeholder="Your Phone Number"
                          />
                          <span class="text-sm text-red-600" id="error">
                            {this.state.contactNumberErrorGcash
                              ? "Not a valid PH number"
                              : this.state.phone_number_gcash > 10
                              ? phone(this.state.phone_number_gcash, {
                                  country: "PH",
                                }).isValid
                                ? ""
                                : "Not a valid PH number"
                              : ""}
                          </span>
                          <input
                            type="submit"
                            onClick={this.handleSubmitGCash}
                            value="Submit"
                            className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-2 text-sm"
                          />
                        </form>
                        <div className="flex flex-col space-y-4 items-center justify-center bg-white shadow-lg z-10 rounded-xl p-4 m-3 w-full md:w-2/5">
                          {/* <h1 class="text-blue-500 text-xl font-bold">
                            <span className="text-blue-800"> Pay</span>Pal
                          </h1> */}
                          <img
                            src="https://iresis.files.wordpress.com/2021/06/paypal_logo.jpg"
                            alt=""
                          />

                          <PayPalButton
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                purchase_units: [
                                  {
                                    amount: {
                                      currency_code: "PHP",
                                      value: TotalAmountToPay.toString(),
                                    },
                                  },
                                ],
                                // application_context: {
                                //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
                                // }
                              });
                            }}
                            onApprove={(data, actions) => {
                              // Capture the funds from the transaction
                              this.handleSubmitPaypal();
                              return actions.order
                                .capture()
                                .then(function (details) {
                                  // Show a success message to your buyer
                                  // alert(
                                  //   "Transaction completed by " +
                                  //     details.payer.name.given_name
                                  // );

                                  // OPTIONAL: Call your server to save the transaction
                                  return fetch("/paypal-transaction-complete", {
                                    method: "post",
                                    body: JSON.stringify({
                                      orderID: data.orderID,
                                    }),
                                  }).then(function () {
                                    window.location.href = URL_FOR_HOME;
                                  });
                                });
                            }}
                          />
                        </div>
                        <form className="flex flex-col items-center justify-center space-y-2 bg-white shadow-lg z-10 rounded-xl p-4 m-3 w-full md:w-2/5">
                          {/* <h1 class="text-white text-xl font-bold">PayMaya</h1> */}
                          <img
                            src="https://1.bp.blogspot.com/-NWeX5tZvNh8/XbgOjEzDHHI/AAAAAAAABDY/i3mUsvPs_voc3AedE1QarN1tiQ-1z_95gCEwYBhgL/s1600/images.png"
                            alt=""
                          />
                          <h1 class="text-gray-400 text-md font-medium">
                            Send your payment here
                          </h1>
                          <h1 class="text-gray-800 text-lg font-medium">
                            <span>09159156949</span>
                          </h1>
                          <input
                            className="w-full border rounded-md pl-4 py-2 focus:ring-0 focus:border-cyan-700"
                            type="text"
                            onChange={this.onChange}
                            name="ref_number_paymaya"
                            required
                            value={this.state.ref_number_paymaya}
                            placeholder="Reference Number"
                          />
                          <input
                            className="w-full border rounded-md pl-4 py-2 focus:ring-0 focus:border-cyan-700"
                            type="text"
                            onChange={this.onChange}
                            name="phone_number_paymaya"
                            required
                            value={this.state.phone_number_paymaya}
                            placeholder="Your Phone Number"
                          />
                          <span class="text-sm text-red-600" id="error">
                            {this.state.contactNumberErrorPaymaya
                              ? "Not a valid PH number"
                              : this.state.phone_number_paymaya > 10
                              ? phone(this.state.phone_number_paymaya, {
                                  country: "PH",
                                }).isValid
                                ? ""
                                : "Not a valid PH number"
                              : ""}
                          </span>
                          <input
                            type="submit"
                            onClick={this.handleSubmitPayMaya}
                            value="Submit"
                            className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-2 text-sm"
                          />
                        </form>
                      </div>
                      <div
                        onClick={this.handleModalEWallet}
                        className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:text-gray-400 transition duration-150 ease-in-out"
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
        <AddressModal
          state={this.state}
          region={this.region}
          province={this.province}
          city={this.city}
          barangay={this.barangay}
          brgy={this.brgy}
          handleUpdateContact={this.handleUpdateContact}
          onChange={this.onChange}
          handleModalContact={this.handleModalContact}
        />
        <VoucherModal
          state={this.state}
          onChange={this.onChange}
          handleVoucherApply={this.handleVoucherApply}
          handleModalVoucher={this.handleModalVoucher}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    AuthReducer: state.AuthReducer,
    cartItems: state.cartReducer.cartItems,
    vouchers: state.products.vouchers,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    loadUser,
    addTransaction,
    clearCart,
    getTransactionList,
    getVoucherList,
    UpdateAddress,
  })(Checkout)
);
