import React from "react";
import { Link, withRouter } from "react-router-dom";
class Categories extends React.Component {
  render() {
    return (
      <>
        <div className="flex-1 w-full  lg:w-2/3 bg-gray-100 mt-20 md:mt-14 pb-24 md:pb-5">
          <div className="w-full mt-2 p-8 order-last lg:order-first">
            <main className={"my-8"}>
              <div className="container mx-auto px-6">
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
                          <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
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
                          <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
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
                          <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
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
                          <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
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
                        "url('https://f-static.motosport.com/motographics/images/home/all_storefront/2021/210801_2022NewGear/2022Gear_FoxMX2_desktop.jpg')",
                    }}
                  >
                    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                      <div className="px-10 max-w-xl">
                        <h2 className="text-2xl text-white font-semibold">
                          Crash Protection
                        </h2>
                        <p className="mt-2 text-gray-400">
                          Cycle gear, parts, apparel and accessories that
                          absolutely offer the best in comfort, quality and
                          protection every time you ride. Security, quality and
                          protection you can trus
                        </p>
                        <Link to="/products/Crash Protection">
                          <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
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
                        "url('https://bikeadvice.in/wp-content/uploads/2014/08/Royal-Enfield-Continental-GT-Pics-paioli-shock-absorber-1280x720.jpg')",
                    }}
                  >
                    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                      <div className="px-10 max-w-xl">
                        <h2 className="text-2xl text-white font-semibold">
                          Suspension
                        </h2>
                        <p className="mt-2 text-gray-400">
                          Proprietary spring designs to their own
                          industry-leading standards. Each series of Shock
                          Spring is designed for your specific brand / model
                          shock. The Factory Connection Shock Spring's fitment
                          to each shock body is the absolute best in the
                          industry.
                        </p>
                        <Link to="/products/Suspension">
                          <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
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
                        "url('https://images.bikeshala.com/blog/49A6CD6073/motorcycle-worn-chain-sprocket-symptoms-lasting-tips-guide-800x800.webp')",
                    }}
                  >
                    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                      <div className="px-10 max-w-xl">
                        <h2 className="text-2xl text-white font-semibold">
                          Drive
                        </h2>
                        <p className="mt-2 text-gray-400">
                          All internal precision ground components are assembled
                          using high-temperature, high load bearing moly grease
                          to ensure maximum internal lubrication; engineered to
                          provide superior performance.
                        </p>
                        <Link to="/products/Drive">
                          <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
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
                        "url('https://www.advpulse.com/wp-content/uploads/2016/06/amber-filters-motorcycle-driving-lights.jpg')",
                    }}
                  >
                    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                      <div className="px-10 max-w-xl">
                        <h2 className="text-2xl text-white font-semibold">
                          Lights
                        </h2>
                        <p className="mt-2 text-gray-400">
                          Highest grade materials including very high
                          temperature copper windings, rubber seal, lead wires
                          and connectors.
                        </p>
                        <Link to="/products/Lights">
                          <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
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
          </div>
        </div>
      </>
    );
  }
}

export default Categories;
