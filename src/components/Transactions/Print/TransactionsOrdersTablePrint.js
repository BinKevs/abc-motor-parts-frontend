import React from "react";
let DateNow = Date().toLocaleString().split(" ");

export class TransactionsOrdersTablePrint extends React.PureComponent {
  render() {
    return (
      <div className="w-full p-10">
        <div class="mb-8 flex justify-between">
          <div>
            <h2 class="text-3xl font-bold mb-6 pb-2 tracking-wider uppercase">
              Transactions History
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
          id="Transactions-table"
          className="min-w-full bg-white dark:bg-gray-800"
        >
          <thead>
            <tr className="w-full h-16 border-gray-300 border-b py-8 text-left font-bold text-gray-500">
              <th className="pl-14 pr-6 text-md">User</th>
              <th className=" pr-6 text-md">Date</th>
              <th className="  pr-6 text-md">Product</th>
            </tr>
          </thead>
          <tbody>
            {this.props.TransactionsOrdersProps.map((trans) => (
              <tr key={trans.id} className="h-24 border-gray-300 border-b ">
                <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                  {trans.user_info.name}
                  <div className="my-2">{trans.address}</div>
                  <div>{trans.contact_number}</div>
                </td>
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                  {trans.created_at}
                </td>
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                  {trans.items.map((item, index) => (
                    <tr
                      key={item.id}
                      class={
                        trans.items.length === 1
                          ? "h-20 border-gray-300"
                          : index + 1 === trans.items.length
                          ? "h-20 border-gray-300"
                          : "h-20 border-gray-300 border-b-2"
                      }
                    >
                      <td class="px-4 py-3 text-sm font-semibold">
                        <div>{item.product.name}</div>
                        <div>
                          <p>
                            Variant : {item.product_variation_info.variation}
                          </p>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-sm font-semibold">
                        <div>{item.quantity} qty</div>
                      </td>
                    </tr>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
