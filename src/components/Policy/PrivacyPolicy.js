import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
class PrivacyPolicy extends React.Component {
  render() {
    return (
      <>
        <div className="bg-white flex-1 mt-28 pb-24 md:pb-5">
          <div>
            <div className="text-5xl my-10 font-bold text-center">
              PRIVACY POLICY
            </div>
            <div className="text-base font-medium leading-10 text-left mx-14">
              This Privacy Policy explains how information about you is
              collected, used and disclosed by shop. This Privacy Policy applies
              to information we collect across our brands when you use our
              websites.
            </div>
          </div>
          <div>
            <div className="text-5xl my-10 font-bold text-start ml-10">
              Collection of Information
            </div>
            <div className="text-base font-medium leading-10 text-left mx-14">
              <p>
                Information You Provide to Us We collect information you provide
                directly to us. For example, we collect information when you
                create an account, update your profile, post a review, make a
                purchase, communicate with us via third party social media
                sites, request customer support or otherwise communicate with
                us. The types of information we may collect about you include
                your name, password, email address, social media user names and
                handles, postal address, phone number, birthday, gender,
                interests, preferences, photos, product reviews, fit
                information, payment information and any other information you
                choose to provide.
              </p>
              <p>
                Information We Collect Automatically When You Use the Services
                When you use our shop, we automatically collect certain
                information, including:
              </p>
              <p>
                Transaction Information: We collect information in connection
                with each transaction you engage in or consider via the
                Services, including product details, purchase price and other
                transaction details
              </p>
              <p>
                Log Information: We collect log information in connection with
                your use of the Services, including the type of browser you use,
                access times, pages viewed, product interactions, your IP
                address and the page you visited before navigating to our
                Services.
              </p>
              <p>
                Location Information: We may collect precise location of your
                mobile device via our mobile apps in accordance with the
                permission process established by your mobile device operating
                system.
              </p>
              <p>
                Stored Information: We may access information you have stored on
                your mobile device via our mobile apps in accordance with the
                permission process established by your mobile device operating
                system. For example, with your permission, we may access photos
                or videos from your mobile device photo gallery.
              </p>
            </div>
            <div>
              <div className="text-5xl my-10 font-bold text-start ml-10 ml-10">
                Use of Information
              </div>
              <div className="text-base font-medium leading-10 text-left mx-14">
                <p>We use information about you as follows:</p>
                <p> Provide, maintain and improve our Services;</p>
                <p>
                  Provide and deliver the products and services you request,
                  process transactions and send you related information,
                  including confirmations and invoices;
                </p>
                <p>
                  {" "}
                  Send you technical notices, updates, security alerts and
                  support and administrative messages;
                </p>
                <p>
                  {" "}
                  Respond to your comments, questions and requests and provide
                  customer service;
                </p>
                <p>
                  Communicate with you about products, services, offers,
                  promotions, rewards, and events and other news and information
                  we think will be of interest to you;
                </p>
                <p>
                  {" "}
                  Monitor and analyze trends, usage and activities in connection
                  with our Services;
                </p>
                <p>
                  Detect, investigate and prevent fraudulent transactions and
                  other illegal activities and protect the rights and property
                  of shop.
                </p>
                <p>Personalize and improve your experience on our Services;</p>
                <p>
                  {" "}
                  Link or combine with other information we collect about you;
                  and
                </p>
                <p>
                  Carry out any other purpose described to you at the time the
                  information is collected
                </p>
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

export default withRouter(connect()(PrivacyPolicy));
