import React from "react";
let DateNow = Date().toLocaleString().split(" ");

export class TransactionsTablePrint extends React.PureComponent {
  render() {
    return (
      <div className="w-full p-10" id="transactionTable">
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
              <th className="pl-10 pr-4 text-md">ID</th>
              <th className=" pr-4 text-md">User</th>
              <th className=" pr-4 text-md">Date</th>
              <th className="pr-4 text-md">
                <div className="text-center mb-5">Items</div>
                <div className="flex justify-between  whitespace-no-wrap">
                  <th className="text-sm pr-4 whitespace-no-wrap ">SKU</th>
                  <th className="text-sm pr-4 whitespace-no-wrap ">
                    Product Name
                  </th>
                  <th className="text-sm pr-4 whitespace-no-wrap ">
                    Retail Price
                  </th>
                  <th className="text-sm pr-4 whitespace-no-wrap ">
                    Cost Price
                  </th>
                </div>
              </th>
              <th className="pr-4 text-md">Total amount</th>
              <th className="pr-4 text-md">Total profit</th>
              <th className="pr-4 text-md">Mode of payment</th>
              <th className="pr-4 text-md">Payment details</th>
            </tr>
          </thead>

          <tbody>
            {this.props.TransactionsProps.map((transaction) => (
              <tr
                key={transaction.id}
                className="h-24 border-gray-300  border-b"
              >
                <td className="pl-10 text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                  {transaction.id}
                </td>
                <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                  {transaction.creator}
                  <div className="my-2">{transaction.address}</div>
                  <div>{transaction.contact_number}</div>
                </td>
                <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                  {transaction.created_at}
                </td>
                <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 w-3/12">
                  {transaction.items.map((transac, index) => (
                    <tr
                      className={
                        transaction.items.length === 1
                          ? "h-20 border-gray-300 flex justify-between"
                          : index + 1 === transaction.items.length
                          ? "h-20 border-gray-300 flex justify-between"
                          : "h-20 border-gray-300 border-b-2 flex justify-between"
                      }
                    >
                      <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 my-auto">
                        {transac.sku_id}
                      </td>
                      <td className="text-sm pr-4 whitespace-no-wrap overflow-ellipsis overflow-hidden text-gray-800 ">
                        {transac.product.name}
                        <div>({transac.product_variation_info.variation})</div>
                      </td>
                      <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 my-auto">
                        ₱{transac.product.cost_price}
                      </td>
                      <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 my-auto">
                        ₱{transac.product.price}
                      </td>
                    </tr>
                  ))}
                </td>

                <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                  ₱{transaction.totalAmount}
                </td>
                <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                  ₱{transaction.totalProfit}
                </td>

                <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                  {transaction.mode_of_payment}
                </td>
                <td className="text-sm pr-4 whitespace-no-wrap text-gray-800 ">
                  {transaction.payment_details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
