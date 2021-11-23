import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
class ReturnPolicy extends React.Component {
  render() {
    return (
      <>
        <div className="bg-white flex-1 mt-28 pb-24 md:pb-5">
          <div>
            <div className="text-5xl my-10 font-bold text-center">
              Return/Refund Policy
            </div>
            <div className="text-base font-medium leading-10 text-left mx-14">
              All return/refund are valid within 15 days from order date, be in
              new unused condition and include original product packaging.
            </div>
          </div>
          <div>
            <div className="text-5xl my-10 font-bold text-start ml-10">
              Return/Refund Instructions :
            </div>
            <div className="text-base font-medium leading-10 text-left mx-14">
              <p>Sign in to your account.</p>
              <p>
                Request a return/refund on the order status, you must provide a
                description and video as a proof of the damage/wrong items.
              </p>
              <p>Wait for the response regarding on the concern.</p>
              <p>
                You can contact our shop using the chat with the live agent for
                more information.
              </p>
            </div>
            <div>
              <div className="text-5xl my-10 font-bold text-start ml-10 ml-10">
                Refunds :
              </div>
              <div className="text-base font-medium leading-10 text-left mx-14">
                Refunds are credited back to your original method of payment. If
                the original method of payment is unavailable, we will issue
                your refund in the form of store credit. It can take 3 to 5
                business days to process a return after it arrives at our
                distribution center. You'll receive an email confirmation when
                your return is received.
              </div>
            </div>
            <div>
              <div className="text-5xl my-10 font-bold text-start ml-10 ml-10">
                Further Details :
              </div>
              <div className="text-base font-medium leading-10 text-left mx-14">
                <p>
                  Shop is not responsible for any damage or loss of returned
                  packages and we suggest that you insure the returned
                  package(s) through the carrier.{" "}
                </p>
                <p>
                  We cannot process refunds on damaged items; damaged items will
                  be returned to the customer via ninjavan shipping.
                </p>
                <p>
                  {" "}
                  Before sending any item(s), you must go through the online
                  return process regardless of reason.
                </p>
                <p>
                  Please note that third-party shipper, ninjavan, may add
                  charges to normal shipping costs.{" "}
                </p>
                <p>The shop does not reimburse these charges. </p>
                <p>
                  Parts that have been installed (or damaged while attempting to
                  install) and/or used in any manner will not be accepted for
                  return.
                </p>
                <p>
                  Electrical items such as the following may not be returned:
                  Bulbs, Fuel Control Unit, Ignitions, Rev Boxes, Snorkel
                  Intake, Spark Plug, Stators
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(connect()(ReturnPolicy));
