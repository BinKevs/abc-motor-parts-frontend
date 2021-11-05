import React from 'react';
let DateNow = Date().toLocaleString().split(' ');

export class ProductTablePrint extends React.PureComponent {
	render() {
		return (
			<div className="w-full p-10">
				<div class="mb-8 flex justify-between">
					<div>
						<h2 class="text-3xl font-bold mb-6 pb-2 tracking-wider uppercase">
							Product List
						</h2>

						<div class="mb-1 flex items-center">
							<label class="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">
								Issued By :
							</label>
							<span class="mr-4 inline-block">:</span>
							{/* {this.props.user.last_name + ' ' + this.props.user.first_name} */}
						</div>
						<div class="mb-1 flex items-center">
							<label class="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">
								Issued Date
							</label>
							<span class="mr-4 inline-block">:</span>
							{DateNow[0] +
								' ' +
								DateNow[1] +
								' ' +
								DateNow[2] +
								' ' +
								DateNow[3] +
								' ' +
								DateNow[4]}
						</div>
					</div>
					<div class="pr-5">
						{/* <div class="w-32 h-32 mb-1 overflow-hidden">
							<img id="image2" class="object-cover w-20 h-20" />
						</div> */}
						<div>
							<i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{' '}
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
						<tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
							<th className="pl-12 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
								Item No.
							</th>
							<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4 w-1/5">
								Item Name
							</th>
							<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
								Price
							</th>
							<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4 w-2/12">
								Category{' '}
							</th>
							{/* <th className="space-x-2 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												<span>Date</span>
												<i class="fal fa-arrow-up fa-lg"></i>
												<i class="fal fa-arrow-down"></i>
											</th> */}
							<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
								Supplier
							</th>
							<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
								Stock
							</th>
						</tr>
					</thead>
					<tbody>
						{this.props.productProps.map((product) => (
							<tr
								key={product.id}
								className="h-24 border-gray-300 dark:border-gray-200 border-b"
							>
								<td className="pl-12 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
									{product.product_id}
								</td>
								<td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
									{product.name}
								</td>
								<td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
									{product.price}
								</td>

								<td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
									{product.category}
								</td>
								<td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
									{product.supplier}
								</td>
								<td className="pr-6 whitespace-no-wrap">
									<div className="flex items-center">
										<div
											className={
												product.stock >= 10
													? 'w-2 h-2 rounded-full bg-green-400'
													: 'w-2 h-2 rounded-full bg-red-400'
											}
										/>

										<p className="ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm">
											{product.stock}
										</p>
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
