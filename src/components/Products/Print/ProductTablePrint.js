import React from "react";
import { HandleDecimalPlaces } from "../../../Helpers/functions";
let DateNow = Date().toLocaleString().split(" ");

export class ProductTablePrint extends React.PureComponent {
  render() {
    return (
      <div className="w-full p-10" id="productTable">
        <div class="mb-8 flex justify-between">
          <div>
            <h2 class="text-3xl font-bold mb-6 pb-2 tracking-wider uppercase">
              Product List
            </h2>

            <div class="mb-1 flex items-center">
              <label class="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">
                Issued By
              </label>
              <span class="mr-4 inline-block">:</span>OwnerUser
              {/* {this.props.user.last_name + ' ' + this.props.user.first_name} */}
            </div>
            <div class="mb-1 flex items-center">
              <label class="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">
                Issued Date
              </label>
              <span class="mr-4 inline-block">:</span>
              {DateNow[0] +
                " " +
                DateNow[1] +
                " " +
                DateNow[2] +
                " " +
                DateNow[3] +
                " " +
                DateNow[4]}
            </div>
          </div>
          <div class="pr-5">
            {/* <div class="w-32 h-32 mb-1 overflow-hidden">
							<img id="image2" class="object-cover w-20 h-20" />
						</div> */}
            <div>
              <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
              <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                ABC Motor Parts
              </h1>
            </div>
          </div>
        </div>
        <table
          id="Product-table"
          className="min-w-full bg-white dark:bg-gray-800"
        >
          <thead>
            <tr className="w-full h-16 border-gray-300 border-b py-8 text-left font-bold text-gray-500">
              <th className="pl-10 pr-4 text-md">ID</th>

              <th className="pr-4 text-md">Product</th>
              <th className="pr-4 text-md">(Variation) Stock</th>
              <th className="pr-4 text-md">Price</th>
              <th className="pr-4 text-md">Cost Price</th>
              <th className="pr-4 text-md">Profit</th>
              <th className=" pr-4 text-md">Category</th>
              <th className=" pr-4 text-md">Supplier</th>
              <th className="  pr-4 text-md">Description</th>
            </tr>
          </thead>
          <tbody>
            {this.props.filteredDataFrom.map((product) => (
              <tr key={product.id} className="h-24 border-gray-300 border-b">
                <td className="pl-12 text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                  {product.id}
                </td>

                <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                  {product.name}
                </td>
                <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 w-3/12">
                  {product.variation
                    ? product.variation.map((productVariation, index) => (
                        <tr
                          className={
                            product.variation.length === 1
                              ? "h-20 border-gray-300"
                              : index + 1 === product.variation.length
                              ? "h-20 border-gray-300"
                              : "h-20 border-gray-300 border-b-2"
                          }
                        >
                          <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                            <div>({productVariation.variation})</div>
                          </td>
                          <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                            {productVariation.stock}
                          </td>
                        </tr>
                      ))
                    : ""}
                </td>
                <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                  ₱{product.price}
                </td>
                <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                  ₱{product.cost_price}
                </td>
                <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                  ₱{HandleDecimalPlaces(product.price - product.cost_price)}
                </td>

                <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                  {product.category}
                </td>
                <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                  {product.supplier}
                </td>

                <td className="text-sm pr-4 whitespace-no-wrap text-gray-800">
                  <div className="w-full h-36 overflow-clip overflow-hidden">
                    {product.description}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
