import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProduct } from "../../../store/actions/product/products";
import { addToCart } from "../../../store/actions/cart/cartActions";
import ReactPlayer from "react-player";
import { getReviewList } from "../../../store/actions/product/products";
import { Rating } from "react-simple-star-rating";
import video1 from "../../../Group2.mp4";

let color = [];
let size = [];
let variantStock = 0;
let TempStock = 0;
let variant_id = "";
let weight = 0.0;
let rates = 0;
let count = 0;
class ProductDetails extends React.Component {
  state = {
    size: "",
    color: "",
    quantity: 0,
    video_link: "",
    product_rate: 0,
  };
  componentDidMount() {
    const productID = this.props.match.params.productID;
    this.props.getProduct(productID);
    this.props.getReviewList();
  }
  onChange = (e) => {
    if (e.target.name === "quantity") {
      if (e.target.value > variantStock) {
        this.setState({ [e.target.name]: parseInt(variantStock) });
      } else {
        this.setState({ [e.target.name]: parseInt(e.target.value) });
      }
    } else {
      if (e.target.name === "color") {
        this.setState({ [e.target.name]: e.target.value, size: "" });
        var dropDown = document.getElementById("size");
        dropDown.selectedIndex = 0;
      } else {
        this.setState({ [e.target.name]: e.target.value });
      }
    }
  };
  handleSubmitToCart(
    product_id,
    product_name,
    price,
    supplier,
    size,
    color,
    quantity,
    variant_id,
    weight
  ) {
    return (event) => {
      event.preventDefault();
      const product = {
        product_id,
        product_name,
        price,
        supplier,
        size,
        color,
        quantity,
        product_with_variation: variant_id,
        weight,
      };
      this.props.addToCart(product);
    };
  }
  static propTypes = {
    product: PropTypes.object.isRequired,
    getProduct: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
  };

  handleIncrementQuantity = (e) => {
    e.preventDefault();
    if (this.state.quantity >= variantStock) {
      this.setState({
        quantity: parseInt(variantStock),
      });
    } else {
      this.setState({
        quantity: parseInt(this.state.quantity + 1),
      });
    }
  };
  handleDecrementQuantity = (e) => {
    e.preventDefault();
    if (this.state.quantity === 0) {
      this.setState({
        quantity: parseInt(0),
      });
    } else {
      this.setState({
        quantity: parseInt(this.state.quantity - 1),
      });
    }
  };

  handleRightScroll = () => {
    document.getElementById("slider").scrollLeft += 120;
  };
  handleLeftScroll = () => {
    document.getElementById("slider").scrollLeft -= 120;
  };

  handleClickHoverImage(ImageSrc) {
    return (event) => {
      event.preventDefault();
      if (ImageSrc.includes(".mp4")) {
        this.setState({
          video_link: ImageSrc,
        });
      } else {
        this.setState({
          video_link: "",
        });
        if (this.state.video_link === "") {
          document.getElementById("featured").src = document.getElementById(
            "featured"
          ).src = ImageSrc;
        }
      }
    };
  }
  render() {
    color = [{ color: "Open this to select color" }];
    size = [{ size: "Open this to select size" }];
    TempStock = 0;
    variantStock = 0;
    variant_id = "";
    weight = 0.0;
    rates = 0;
    count = 0;
    const { product } = this.props;
    this.props.reviews
      .filter((rev) => rev.product === product.id)
      .map(
        (filteredReview, index) => (
          (rates += filteredReview.star_rate), (count += 1)
        )
      );
    if (product.variation) {
      product.variation.map(
        (product) => (
          !color.find((o) => o.color === product.color)
            ? color.push({
                color: product.color,
              })
            : "",
          this.state.color !== ""
            ? this.state.color === product.color
              ? !size.find((o) => o.size === product.size)
                ? size.push({
                    size: product.size,
                  })
                : ""
              : ""
            : ""
        )
      );
    }

    if (this.state.color !== "" && this.state.size !== "") {
      if (product.variation) {
        product.variation.map((p) =>
          this.state.color === p.color && this.state.size === p.size
            ? ((variantStock = p.stock),
              (variant_id = p.id),
              (weight = p.weight))
            : ""
        );
      }
    }

    if (this.state.color !== "" && this.state.size !== "") {
      if (product.variation) {
        product.variation.map((p) =>
          this.state.color === p.color && this.state.size === p.size
            ? (TempStock = p.stock)
            : ""
        );
      }
    } else {
      if (product.variation) {
        product.variation.map((p) => (TempStock += p.stock));
      }
    }
    return (
      <>
        <section class="flex-1 w-full text-gray-700 body-font bg-white">
          <div class="px-5 mt-14 py-24 mx-auto">
            <div class="w-full flex flex-wrap">
              <div className="md:w-1/2 w-full">
                {product.file_content ? (
                  this.state.video_link === "" ? (
                    <img
                      alt="ecommerce"
                      id="featured"
                      class="w-full object-cover object-center rounded-3xl border-2 border-gray-400 h-60 md:h-80"
                      src={product.file_content[0].image}
                    />
                  ) : (
                    // <video width="340" height="240" controls>
                    //   <source src={this.state.video_link} type="video/mp4" />
                    //   Your browser does not support the video tag.
                    // </video>
                    <ReactPlayer
                      width="100%"
                      height="50%"
                      playing={true}
                      controls={true}
                      url={this.state.video_link}
                    />
                  )
                ) : (
                  ""
                )}

                <div className="relative w-full flex items-center">
                  <span
                    onClick={this.handleLeftScroll}
                    className="h-12 w-16 flex items-center justify-center text-gray-600"
                  >
                    <i class="fad fa-angle-left fa-3x"></i>
                  </span>
                  <div
                    id="slider"
                    className="w-full flex overflow-x-hidden space-x-4"
                  >
                    {/* <img
                      // onClick={this.handleClickHoverImage(
                      //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuOP3QcMLRg8bxBQRR6DGaHmSPzwolfRO7Qw&usqp=CAU"
                      // )}
                      className="rounded thumbnail max-h-28"
                      src={this.props.images[0]}
                    /> */}
                    {product.file_content
                      ? product.file_content.map((file_content) =>
                          file_content.image.includes(".mp4") ? (
                            <img
                              onClick={this.handleClickHoverImage(
                                file_content.image
                              )}
                              id="thumbnail"
                              className="object-cover object-center rounded-3xl thumbnail max-h-28"
                              src="https://img.flaticon.com/icons/png/512/3204/3204323.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"
                            />
                          ) : (
                            <img
                              onClick={this.handleClickHoverImage(
                                file_content.image
                              )}
                              id="thumbnail"
                              className="object-cover object-center rounded-3xl  thumbnail max-h-28"
                              src={file_content.image}
                            />
                          )
                        )
                      : ""}
                  </div>

                  <span
                    onClick={this.handleRightScroll}
                    className="h-12 w-16 flex items-center justify-center text-gray-600"
                  >
                    <i class="fad fa-angle-right fa-3x"></i>
                  </span>
                </div>
              </div>
              <div class="md:w-1/2 w-full md:pl-10 mt-0 md:mt-6">
                <h2 class="text-sm title-font text-gray-500 tracking-widest">
                  {product.supplier_info ? product.supplier_info.name : ""}
                </h2>

                <h1 class="text-gray-900 text-2xl title-font font-medium mb-1">
                  {product.name}
                </h1>

                <span class="text-gray-900 text-3xl title-font font-bold mb-1">
                  ₱{product.price}
                </span>
                <div class="flex mt-6 pb-5 border-t-2 border-gray-200 mb-5"></div>
                <div class="flex mb-4">
                  <span class="flex items-center">
                    <Rating ratingValue={Math.floor(rates / count)} size={20} />
                    <span class="text-gray-600 ml-3">
                      {count} {count > 1 ? "Reviews" : "Review"}
                    </span>
                  </span>
                  {/* */}
                  {/* <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                    <a class="text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a class="ml-2 text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a class="ml-2 text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span> */}
                </div>
                <p class="leading-relaxed">{product.description}</p>
                <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                <div class="border-b-2 border-gray-200 mb-5">
                  <div className="flex flex-col md:flex-row md:space-y-0 space-y-6 mt-6 items-center border-gray-600">
                    <div class="flex ml-6 items-center">
                      <span class="mr-3">Color</span>
                      {/* <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button class="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button> */}
                      <div class="relative">
                        <select
                          name="color"
                          onChange={this.onChange}
                          class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-teal_custom text-base pl-3 pr-10"
                        >
                          {/* <option value="" selected>
                            Open this to select color
                          </option> */}
                          {color
                            ? color.map((c) => (
                                <option value={c.color}>{c.color}</option>
                              ))
                            : ""}
                        </select>
                        <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-4 h-4"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div class="flex ml-6 items-center">
                      <span class="mr-3">Size</span>
                      <div class="relative">
                        <select
                          name="size"
                          id="size"
                          onChange={this.onChange}
                          // disabled={!this.state.color ? true : false}
                          class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-teal_custom text-base pl-3 pr-10"
                        >
                          {/* <option value="" selected>
                            Open this to select size
                          </option> */}
                          {size
                            ? size.map((s) => (
                                <option value={s.size}>{s.size}</option>
                              ))
                            : ""}
                        </select>
                        <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-4 h-4"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className=" ml-6 mt-6  pb-5 text-md font-medium text-gray-700">
                    {/* {this.state.color !== "" && this.state.size !== "" ? ( */}
                    <div className="flex items-center">
                      <span class="mr-3"> Stock : {TempStock}</span>
                      {/* {product.variation
                          ? product.variation.map((p) =>
                              this.state.color === p.color &&
                              this.state.size === p.size
                                ? p.stock
                                : ""
                            )
                          : ""} */}
                    </div>
                    {/* ) : (
                      ""
                    )} */}
                    <div class="custom-number-input mt-6 h-10 flex flex-col md:flex-row items-center">
                      {" "}
                      <span class="mr-3"> Quantity: </span>
                      <div class="flex flex-row h-10  rounded-md relative bg-transparent mt-1">
                        <button
                          onClick={this.handleDecrementQuantity}
                          class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                        >
                          <span class="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input
                          type="number"
                          class="outline-none focus:outline-none text-center border-4  bg-white font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                          name="quantity"
                          onChange={this.onChange}
                          value={this.state.quantity}
                        ></input>
                        <button
                          onClick={this.handleIncrementQuantity}
                          class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                        >
                          <span class="m-auto text-2xl font-thin">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex">
                  <button
                    class="flex ml-auto text-white bg-teal_custom border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded cursor-pointer"
                    onClick={this.handleSubmitToCart(
                      product.id,
                      product.name,
                      product.price,
                      this.props.supplier_name,
                      this.state.size,
                      this.state.color,
                      this.state.quantity,
                      variant_id,
                      weight
                    )}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col w-full space-y-5">
            {this.props.reviews.map((rev) =>
              rev.product === product.id ? (
                <div class="flex items-center mx-auto w-4/6 bg-white rounded-xl shadow-2xl">
                  {/* <div class="md:flex-shrink-0">
                    <img
                      class="h-48 w-full object-cover md:w-48"
                      src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=448&q=80"
                      alt="A cat"
                    />
                  </div> */}
                  <img
                    class="h-16 w-16 rounded-full mx-4"
                    src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=448&q=80"
                    alt="A cat"
                  />
                  <div class="m-4 w-full">
                    <div class="flex">
                      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold mr-4">
                        {rev.user_info.username}
                      </div>
                      <span class="flex items-center">
                        <Rating
                          // onClick={handleRating}
                          ratingValue={rev.star_rate}
                          size={20}
                        />
                      </span>
                    </div>
                    <p class="mt-1 text-md leading-tight font-medium text-black">
                      {rev.comment}
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </section>
      </>
    );
  }
}
const mapToStateToProps = (state) => ({
  product: state.products.product,
  supplier_name: state.products.supplier_name,
  images: state.products.images,
  reviews: state.products.reviews,
});
export default connect(mapToStateToProps, {
  getProduct,
  addToCart,
  getReviewList,
})(ProductDetails);
