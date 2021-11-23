import React from "react";
import { HandleDecimalPlaces } from "../../../Helpers/functions";
let DateNow = Date().toLocaleString().split(" ");

export class RefundTablePrint extends React.PureComponent {
  render() {
    return (
      <div className="w-full p-10" id="refundTable">
        <div class="mb-8 flex justify-between">
          <div>
            <h2 class="text-3xl font-bold mb-6 pb-2 tracking-wider uppercase">
              Refund List
            </h2>

            <div class="mb-1 flex items-center">
              <label class="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">
                Issued By :
              </label>
              <span class="mr-4 inline-block">: OwnerUser</span>
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
              <th className="pl-14 pr-6 text-md">Transaction Item ID</th>
              <th className="pr-6 text-md">User</th>
              <th className="pr-6 text-md">Product</th>
              <th className="pr-6 text-md">Date</th>
              <th className="pr-6 text-md">Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.filteredDataFromMain.map((refund) => (
              <tr key={refund.id} className="h-24 border-gray-300 border-b ">
                <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                  {refund.id}
                </td>
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                  {refund.user_info.name}
                </td>
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                  <div>{refund.transaction_item.product.name}</div>
                  <div>
                    <p>
                      Variant :{" "}
                      {refund.transaction_item.product_variation_info.variation}
                    </p>
                  </div>
                </td>

                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                  {refund.created_at}
                </td>
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                  {refund.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
