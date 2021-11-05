import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
export default function ReviewsModal(props) {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div class="mx-auto max-w-screen-lg h-full">
      <div className="z-20 absolute top-0 right-0 bottom-0 left-0" id="modal">
        <div class="modal-overlay absolute w-full h-full z-25 bg-gray-900 opacity-50"></div>
        <div className="h-full overflow-auto w-full flex flex-col">
          <div className="m-2 md:m-12">
            <form onSubmit={props.handleSubmitReview(rating)} class="mt-9">
              <div className="relative p-4 md:p-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400 ">
                <div class="text-left p-0 mb-8">
                  <div>
                    <i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{" "}
                    <h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
                      ABC Motor Parts
                    </h1>
                  </div>

                  <h1 class="text-gray-800 text-3xl font-medium">
                    Rate Product
                  </h1>
                </div>
                <div className="flex justify-center space-x-8">
                  <div>
                    <img
                      className="h-24 border-gray-400 border-2 my-auto"
                      src={props.state.product_image}
                      alt=""
                    />
                  </div>
                  <div className="my-auto">{props.state.product_name}</div>
                </div>
                <div className="flex justify-center my-8">
                  <Rating
                    onClick={handleRating}
                    ratingValue={rating}
                    size={40}
                  />
                </div>
                <div class="flex flex-wrap -mx-3 mb-5">
                  <h2 class="px-4 pt-3 pb-2 text-gray-800">
                    Tell others what do you think about{" "}
                    {props.state.product_name}
                  </h2>
                  <div class="w-full md:w-full px-3 mb-2 mt-2">
                    <textarea
                      class="rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 placeholder-gray-700 focus:outline-none"
                      name="comment"
                      value={props.state.comment}
                      onChange={props.onChange}
                      placeholder="Type Your Review"
                      required
                    ></textarea>
                  </div>
                </div>
                {/* <div class="relative z-0 w-full mb-5">
                  <textarea
                    name="comment"
                    onChange={props.onChange}
                    placeholder=" "
                    required
                    class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
                  />
                  <label
                    for="comment"
                    class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                  >
                    Tell others what do you think about{" "}
                    {props.state.product_name}
                  </label>
                  <span class="text-sm text-red-600 hidden" id="error">
                    Comment is required
                  </span>
                </div> */}
                <div className="flex items-center justify-center w-full">
                  <button
                    type="submit"
                    className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-2 text-sm"
                  >
                    Submit
                  </button>
                  <button
                    onClick={props.handleToggleModalReviewClose}
                    className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                  >
                    Cancel
                  </button>
                </div>

                <div
                  onClick={props.handleToggleModalReviewClose}
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
  );
}
