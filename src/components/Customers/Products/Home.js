import React from "react";
import {
  getProductList,
  getCategoryList,
} from "../../../store/actions/product/products";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getTransactionItemList } from "../../../store/actions/transaction/transactions.js";
import noImageAvailable from "../../../no-image-available.png";
let transactionItemsFiltered = [];
class Home extends React.Component {
  componentDidMount() {
    this.props.getProductList();
    this.props.getCategoryList();
    this.props.getTransactionItemList();
    document.getElementById("slider-2").style.display = "none";
    document.getElementById("slider-3").style.display = "none";
    document.getElementById("slider-4").style.display = "none";
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  trimmedString(stringX) {
    if (stringX.length === 24) {
      return stringX;
    } else {
      return stringX.substring(0, 24) + "...";
    }
  }

  sliderButton1() {
    document.getElementById("slider-1").style.display = "block";
    document.getElementById("slider-2").style.display = "none";
    document.getElementById("slider-3").style.display = "none";
    document.getElementById("slider-4").style.display = "none";
    document.getElementById("sButton1").classList.add("bg-gray-800");
    document.getElementById("sButton2").classList.remove("bg-gray-800");
    document.getElementById("sButton3").classList.remove("bg-gray-800");
    document.getElementById("sButton4").classList.remove("bg-gray-800");
  }

  sliderButton2() {
    document.getElementById("slider-1").style.display = "none";
    document.getElementById("slider-2").style.display = "block";
    document.getElementById("slider-3").style.display = "none";
    document.getElementById("slider-4").style.display = "none";
    document.getElementById("sButton1").classList.remove("bg-gray-800");
    document.getElementById("sButton2").classList.add("bg-gray-800");
    document.getElementById("sButton3").classList.remove("bg-gray-800");
    document.getElementById("sButton4").classList.remove("bg-gray-800");
  }
  sliderButton3() {
    document.getElementById("slider-1").style.display = "none";
    document.getElementById("slider-2").style.display = "none";
    document.getElementById("slider-3").style.display = "block";
    document.getElementById("slider-4").style.display = "none";
    document.getElementById("sButton1").classList.remove("bg-gray-800");
    document.getElementById("sButton2").classList.remove("bg-gray-800");
    document.getElementById("sButton3").classList.add("bg-gray-800");
    document.getElementById("sButton4").classList.remove("bg-gray-800");
  }
  sliderButton4() {
    document.getElementById("slider-1").style.display = "none";
    document.getElementById("slider-2").style.display = "none";
    document.getElementById("slider-3").style.display = "none";
    document.getElementById("slider-4").style.display = "block";
    document.getElementById("sButton1").classList.remove("bg-gray-800");
    document.getElementById("sButton2").classList.remove("bg-gray-800");
    document.getElementById("sButton3").classList.remove("bg-gray-800");
    document.getElementById("sButton4").classList.add("bg-gray-800");
  }

  render() {
    let products = [];
    let filteredDataProduct = [];
    let temp = 0;
    this.props.products.map(
      (product) => (
        product.variation.map((p) => (temp += p.stock)),
        products.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          file_content: product.file_content,
          variation: temp,
          category: product.category_info.name,
          supplier: product.supplier_info.name,
          stock: product.stock,
          description: product.description,
          status: product.status,
        }),
        (temp = 0)
      )
    );

    transactionItemsFiltered = [];

    this.props.transaction_items.forEach(function (obj) {
      var productNameX = obj.product.name;
      if (!this[productNameX])
        transactionItemsFiltered.push((this[productNameX] = obj));
      else this[productNameX].quantity += obj.quantity;
    }, Object.create(null));
    filteredDataProduct = products.filter((item) => {
      if (transactionItemsFiltered.find((TIF) => TIF.product.id === item.id))
        return item;
    });

    console.log(filteredDataProduct);
    return (
      <>
        <div className="flex-1 w-full  lg:w-2/3 bg-gray-100 mt-20 md:mt-14 pb-24 md:pb-5">
          <div className="w-full mt-2 p-8 order-last lg:order-first">
            <div className="my-8">
              <div class="sliderAx h-auto">
                <div id="slider-1" class="container mx-auto">
                  <div
                    class="bg-cover bg-center h-auto text-white py-24 px-10 object-fill "
                    style={{
                      backgroundImage:
                        "url('https://f-static.motosport.com/motographics/images/home/all_storefront/2021/210801_2022NewGear/NewRiding_Heroa_desktop.jpg')",
                    }}
                  >
                    <div class="w-full text-center ">
                      <div className="bg-gray-100 w-full md:w-1/2 mx-auto">
                        <p class="font-bold text-md uppercase text-red-700 leading-8 ">
                          New
                        </p>
                        <p class="text-3xl uppercase text-black font-bold">
                          Hot new riding gear
                        </p>
                        <p class="text-lg text-gray-500 font-semibold mb-5 leading-none">
                          Purchase yours now
                        </p>
                        <Link
                          to="/products/Crash Protection"
                          class="bg-gray-900 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-teal_custom "
                        >
                          Shop now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>

                <div id="slider-2" class="container mx-auto">
                  <div
                    class="bg-cover bg-top  h-auto text-white py-24 px-10 object-fill "
                    style={{
                      backgroundImage:
                        "url('https://f-static.motosport.com/motographics/images/home/dirtbike/2021/210401_TopGear/Helmets_desktop.jpg')",
                    }}
                  >
                    <div class="w-full text-center border-4">
                      <div className="bg-gray-100 w-full md:w-1/2">
                        <p class="font-bold text-md uppercase text-red-700 leading-8 ">
                          New
                        </p>
                        <p class="text-3xl uppercase text-black font-bold">
                          Hot new riding gear
                        </p>
                        <p class="text-lg text-gray-500 font-semibold mb-5 leading-none">
                          Purchase yours now
                        </p>
                        <Link
                          to="/products/Crash Protection"
                          class="bg-gray-900 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-teal_custom "
                        >
                          Shop now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
                <div id="slider-3" class="container mx-auto">
                  <div
                    class="bg-cover bg-top  h-auto text-white py-24 px-10 object-fill "
                    style={{
                      backgroundImage:
                        "url('https://f-static.motosport.com/motographics/images/home/all_storefront/2021/210701_JulyUpdates/2022Oneal1_desktop.jpg')",
                    }}
                  >
                    <div class="w-full text-center p-10">
                      <div className="bg-gray-100 w-full">
                        <p class="font-bold text-md uppercase text-red-700 leading-8 ">
                          New to riding?
                        </p>
                        <p class="text-2xl uppercase text-black font-bold">
                          Check out these must have items to keep you safe
                          before you hop on your shiny bikes
                        </p>
                        <p class="text-lg text-gray-500 font-semibold mb-5 leading-none">
                          Purchase yours now
                        </p>
                        <Link
                          to="/products/Crash Protection"
                          class="bg-gray-900 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-teal_custom "
                        >
                          Shop now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
                <div id="slider-4" class="container mx-auto">
                  <div
                    class="bg-cover bg-top  h-auto text-white py-24 px-10 object-fill "
                    style={{
                      backgroundImage:
                        "url('https://pbs.twimg.com/media/ELtHrSDXsAEQaBG.jpg')",
                    }}
                  >
                    <div class="w-full text-center ">
                      <div className="bg-gray-100 w-full md:w-1/2 ">
                        <p class="font-bold text-md uppercase text-red-700 leading-8 ">
                          New items are here!
                        </p>
                        <p class="text-3xl uppercase text-black font-bold">
                          2022 Products are here!
                        </p>
                        <p class="text-lg text-gray-500 font-semibold mb-5 leading-none">
                          Purchase yours now
                        </p>
                        <Link
                          to="/products/All"
                          class="bg-gray-900 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-teal_custom "
                        >
                          Shop now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
              <div class="flex justify-center mx-auto pb-2 space-x-4">
                <button
                  id="sButton1"
                  onClick={this.sliderButton1}
                  class="bg-gray-400 rounded-full w-4 p-2"
                ></button>
                <button
                  id="sButton2"
                  onClick={this.sliderButton2}
                  class="bg-gray-400 rounded-full w-4 p-2"
                ></button>
                <button
                  id="sButton3"
                  onClick={this.sliderButton3}
                  class="bg-gray-400 rounded-full w-4 p-2"
                ></button>
                <button
                  id="sButton4"
                  onClick={this.sliderButton4}
                  class="bg-gray-400 rounded-full w-4 p-2"
                ></button>
              </div>
            </div>
            <main className={"my-8"}>
              <div className="container mx-auto px-6">
                <div
                  className="h-64 rounded-md overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://2yrh403fk8vd1hz9ro2n46dd-wpengine.netdna-ssl.com/wp-content/uploads/2020/01/24-Great-Retro-2020-Motorcycles-Moto-Guzzi-V9-Roamer.jpg')",
                  }}
                >
                  <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                    <div className="px-10 max-w-xl">
                      <h2 className="text-2xl text-white font-semibold">
                        Use "90off" on your first purchase
                      </h2>
                      <p className="mt-2 text-gray-400">As our</p>
                      <Link to="/products/All">
                        <button className="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                          <span>Shop Now</span>
                          <svg
                            className="h-5 w-5 mx-2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="md:flex mt-8 md:-mx-4">
                  <div
                    className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2"
                    style={{
                      backgroundImage:
                        "url('https://images.bikeshala.com/blog/C9A8E58287/how-to-clean-motorcycle-disc-brakes-caliper-with-degreasing-cleaner-1080x1080.png')",
                    }}
                  >
                    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                      <div className="px-10 max-w-xl">
                        <h2 className="text-2xl text-white font-semibold">
                          Brakes
                        </h2>
                        <p className="mt-2 text-gray-400">
                          After machining, they are media tumbled for a smooth
                          finish and then hard anodized for superior strength
                          and performance.
                        </p>
                        <Link to="/products/Brakes">
                          <button className="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            <span>Shop Now</span>
                            <svg
                              className="h-5 w-5 mx-2"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    className="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2"
                    style={{
                      backgroundImage:
                        "url('https://motorcyclebrave.com/wp-content/uploads/2020/08/Cost-of-changing-motorcycle-tires.jpg')",
                    }}
                  >
                    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                      <div className="px-10 max-w-xl">
                        <h2 className="text-2xl text-white font-semibold">
                          Tires and Wheels
                        </h2>
                        <p className="mt-2 text-gray-400">
                          Designed and tested to withstand the harshest
                          conditions. Its proven superior wear life and better
                          resistance to cutting and chipping make it the number
                          one choice for all terrain adventuring.
                        </p>
                        <Link to="/products/Tires and Wheels">
                          <button className="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            <span>Shop Now</span>
                            <svg
                              className="h-5 w-5 mx-2"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:flex mt-8 md:-mx-4">
                  <div
                    className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2"
                    style={{
                      backgroundImage:
                        "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdcJ1hrNsLwgJGlADY_ozgvkvGsp7kdEIH0LV0OpXUZiL5c1iaviWDvu6As26ZJz36Xh4&usqp=CAU')",
                    }}
                  >
                    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                      <div className="px-10 max-w-xl">
                        <h2 className="text-2xl text-white font-semibold">
                          Engine Parts and Accessories
                        </h2>
                        <p className="mt-2 text-gray-400">
                          Hand machined, carefully polished and bathed in
                          lustrous chrome, faceted edges catch and refract light
                          adding a dynamic design element to your engine.
                        </p>
                        <Link to="/products/Engine Parts and Accessories">
                          <button className="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            <span>Shop Now</span>
                            <svg
                              className="h-5 w-5 mx-2"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    className="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2"
                    style={{
                      backgroundImage:
                        "url('https://i.ytimg.com/vi/NswLOugfSTI/maxresdefault.jpg')",
                    }}
                  >
                    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                      <div className="px-10 max-w-xl">
                        <h2 className="text-2xl text-white font-semibold">
                          Exhaust
                        </h2>
                        <p className="mt-2 text-gray-400">
                          Solidly constructed from a highly polished 304 grade
                          stainless steel and with a lifetime warranty you can
                          guarantee it will look good on your bike for many
                          years to come.
                        </p>
                        <Link to="/products/Exhaust">
                          <button className="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            <span>Shop Now</span>
                            <svg
                              className="h-5 w-5 mx-2"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <Link to="/Categories" className="pt-3 cursor-pointer">
              <div class=" bg-teal_custom hover:bg-teal_custom_darker p-2 shadow text-xl text-white text-center w-full md:w-2/5 mx-auto">
                <h3 class="font-semibold ">See more categories</h3>
              </div>
            </Link>

            <div class="bg-gray-100 pt-4 mt-4 border-t-4 border-gray-700">
              <div class=" bg-gradient-to-r from-gray-300 to-gray-800 p-4 shadow text-2xl text-white text-center">
                <h3 class="font-bold">Top Products</h3>
              </div>
            </div>
            <div className="mt-8 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-5">
              {filteredDataProduct.map((product) => (
                <Link
                  className="cursor-pointer"
                  to={"/product/".concat(product.id + "/")}
                >
                  <div
                    className="rounded bg-white border-gray-200 shadow-md overflow-hidden relative hover:shadow-lg img-hover h-auto"
                    key={product.id}
                  >
                    {product.file_content[0] ? (
                      <img
                        src={product.file_content[0].image}
                        alt="stew"
                        className="h-32 sm:h-48 w-full object-cover imgg"
                      />
                    ) : (
                      <img
                        src={noImageAvailable}
                        alt="stew"
                        className="h-32 sm:h-48 w-full object-cover imgg"
                      />
                    )}

                    <div className="m-4 bodi">
                      <span className="font-bold">
                        {this.trimmedString(product.name)}
                      </span>
                      <span className="block text-gray-500 text-sm">
                        By {this.trimmedString(product.supplier)}
                      </span>
                    </div>

                    <div className="absolute top-0 ml-2 p-2 mt-2 bg-teal_custom text-white text-sm uppercase font-bold rounded-full ">
                      <i className="fad fa-tags fa-lg"></i>
                      <span>₱{this.numberWithCommas(product.price)}</span>
                    </div>
                    <div className="absolute bottom-0 right-2 ml-2 p-2 mb-2 text-gray-600  text-sm uppercase font-bold ">
                      {/* <span>({product.stock})</span> */}
                      {product.variation ? product.variation : ""}
                    </div>
                    <div className="product-tooltip absolute bottom-0 py-6 px-4 p-2 text-gray-800 text-sm uppercase font-bold">
                      <span>{product.name}</span>
                    </div>
                    <div className="middle">
                      <i className="fad fa-eye fa-3x"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="pt-3">
              <Link to="/products/All" className="pt-3 cursor-pointer">
                <div class="cursor-pointer bg-teal_custom hover:bg-teal_custom_darker p-2 shadow text-xl text-white text-center w-full md:w-2/5 mx-auto">
                  <h3 class="font-semibold ">See more products</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapToStateToProps = (state) => ({
  products: state.products.products,
  categories: state.products.categories,
  transaction_items: state.transactions.transaction_item_list,
});
export default connect(mapToStateToProps, {
  getCategoryList,
  getProductList,

  getTransactionItemList,
})(Home);
