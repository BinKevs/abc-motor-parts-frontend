import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProductVariation } from "../../../store/actions/product/products";
import PropTypes from "prop-types";
import {
  removeFromCart,
  changeCartValue,
} from "../../../store/actions/cart/cartActions";
import swal from "sweetalert";
class CartIndex extends React.Component {
  static propTypes = {
    removeFromCart: PropTypes.func.isRequired,
    changeCartValue: PropTypes.func.isRequired,
    cartItems: PropTypes.array.isRequired,
  };
  state = {
    totalAmount: 0,
    Subtotal: 0,
    tax: 0,
    quantity: 0,
  };

  trimmedString(stringX) {
    if (stringX.length === 12) {
      return stringX;
    } else {
      return stringX.substring(0, 24) + "...";
    }
  }
  // When the quantity fields change, this function will change the quantity state value and take a item product id to be pass to store-actions-cartAction-
  // changeCartValue together with type,id(or the product id) and the value
  onChange(id) {
    return (event) => {
      this.props.changeCartValue("type", id, event.target.value);
      this.setState({ [this.state.quantity]: event.target.value });
    };
  }

  HandleDecimalPlaces = (Variable) => {
    return Math.round((Variable + Number.EPSILON) * 100) / 100;
  };

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  handleRedirect = (e) => {
    e.preventDefault();

    // this.props.cartItems.map(())
    // this.props.products.some((item) => val.name === item.name);

    this.props.cartItems.map((itemFromCart) =>
      this.props.product_variations.filter((itemProductVariation) => {
        if (itemProductVariation.id === itemFromCart.product_with_variation) {
          if (itemFromCart.quantity > itemProductVariation.stock) {
            swal(
              "Unfortunately " +
                itemFromCart.product_name +
                " is out of stock and it automatically be removed in your cart.",
              "",
              "info"
            );
            this.props.removeFromCart(itemFromCart);
          } else {
            this.props.handleCartShow();
            this.props.history.push("/checkout");
          }
        }
      })
    );
  };
  // On component load or the app load it will look for the cartItems values from cartReducer *The cartReducer is always check if there are any values from local storage and store it to state*
  // and this CDM get the props pass by cartReducer to render it and compute for totalAmount, sub amount and tax.
  componentDidMount() {
    let VariableTotalAmount = 0;
    let Variablequantity = 0;
    this.props.getProductVariation();
    this.props.cartItems.map(
      (item) => (
        (VariableTotalAmount += item.price * item.quantity),
        (Variablequantity += item.quantity)
      )
    );
    this.setState({
      totalAmount: this.HandleDecimalPlaces(VariableTotalAmount),
      Subtotal: this.HandleDecimalPlaces(
        (VariableTotalAmount -= VariableTotalAmount * 0.12)
      ),
      tax: this.HandleDecimalPlaces(VariableTotalAmount * 0.12),
      quantity: Variablequantity,
    });
  }
  // This component did update will watch over the props from cartReducer so if the user changes
  //the quantity or delete it the component will update what to render and compute the total amount, subtotal, and tax automatically
  componentDidUpdate(prevProps) {
    if (this.props.cartItems !== prevProps.cartItems) {
      let VariableTotalAmount = 0;
      let Variablequantity = 0;
      this.props.cartItems.map(
        (item) => (
          (VariableTotalAmount += item.price * item.quantity),
          (Variablequantity += parseInt(item.quantity))
        )
      );
      this.setState({
        totalAmount: this.HandleDecimalPlaces(VariableTotalAmount),
        Subtotal: this.HandleDecimalPlaces(
          (VariableTotalAmount -= VariableTotalAmount * 0.12)
        ),
        tax: this.HandleDecimalPlaces(VariableTotalAmount * 0.12),
        quantity: Variablequantity,
      });
    }
  }
  render() {
    const { cartItems, changeCartValue, removeFromCart, products } = this.props;
    const { Subtotal, tax, totalAmount, quantity } = this.state;
    // console.log(products, cartItems);
    return (
      <>
        <div class="fixed top-12 lg:right-3 lg:mx-4 -mt-4 w-full lg:w-2/5">
          <div class="flex shadow-lg my-10 h-cart">
            <div class="w-full bg-white px-10 py-5">
              <div class="flex justify-between border-b pb-8">
                <h1 class="font-semibold text-2xl">Shopping Cart</h1>
                <h2 class="font-semibold text-2xl">{quantity} Items</h2>
              </div>
              {cartItems.length > 0 ? (
                <>
                  {" "}
                  <div class="flex justify-between mt-5 mb-2">
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
                  <div className="max-h-64 overflow-y-scroll">
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
                              <div
                                href="#"
                                class="font-semibold cursor-pointer z-20 hover:text-red-500 text-gray-500 text-xs bg-gray-100"
                                onClick={() => removeFromCart(item)}
                              >
                                Remove
                              </div>
                            </div>
                          </div>

                          <div class="flex xl:flex-row lg:flex-col items-center justify-between w-full h-24 my-1">
                            <i
                              class="fal fa-minus xl:order-first lg:order-last fill-current text-gray-600 w-3"
                              onClick={() => {
                                changeCartValue("minus", item.product_id, item);
                              }}
                            ></i>
                            <input
                              class="mx-2 border text-center w-14 rounded-md"
                              type="text"
                              value={item.quantity}
                              onChange={this.onChange(item.product_id)}
                            />
                            <i
                              class="fal fa-plus xl:order-last lg:order-first fill-current text-gray-600 w-3"
                              onClick={() => {
                                changeCartValue("plus", item.product_id);
                              }}
                            ></i>
                          </div>
                          <span class="text-center w-full font-semibold text-sm pr-2 break-words">
                            ???{this.numberWithCommas(item.price)}
                          </span>
                          <span class="text-center w-full font-semibold text-sm break-words">
                            ???
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
                  <div className="flex flex-col border-t pt-8 gap-y-2">
                    <div class="flex justify-between">
                      <h1 class="font-semibold text-2xl">Total: </h1>
                      <h2 class="font-semibold text-2xl">
                        ???{this.numberWithCommas(totalAmount)}
                      </h2>
                    </div>

                    <button
                      onClick={this.handleRedirect}
                      class="
                    bg-teal_custom 
                    font-semibold
                    py-3
                    mt-2
                    text-sm text-white
                    uppercase
                    w-full
                    rounded-lg
                  "
                    >
                      Checkout
                    </button>
                  </div>
                </>
              ) : (
                <div className="mx-auto bg-white p-4">
                  <div className="text-center text-gray-500">
                    <img
                      src="https://www.clipartmax.com/png/full/92-924544_sign-in-empty-shopping-cart-icon.png"
                      className="w-48 mx-auto mb-4"
                      alt=""
                    />
                    <div className="font-semibold text-xl text-red-500">
                      Oops! Your cart is empty!
                    </div>
                    <div className="font-semibold text-lg">
                      Looks like you haven't added anything to your cart yet.
                    </div>
                  </div>
                </div>
              )}

              {/* <a
										href="#"
										class="flex font-semibold text-indigo-600 text-sm mt-10"
									>
										<svg
											class="fill-current mr-2 text-indigo-600 w-4"
											viewBox="0 0 448 512"
										>
											<path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
										</svg>
										Continue Shopping
									</a> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}

// get cartItems from cartReducer
const mapToStateToProps = (state) => ({
  product_variations: state.products.product_variations,
  cartItems: state.cartReducer.cartItems,
});
export default withRouter(
  connect(mapToStateToProps, {
    removeFromCart,
    changeCartValue,
    getProductVariation,
  })(CartIndex)
);
