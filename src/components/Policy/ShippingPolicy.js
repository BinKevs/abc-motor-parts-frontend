import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
class ShippingPolicy extends React.Component {
  render() {
    return (
      <>
        <div className="bg-white flex-1 mt-28 pb-24 md:pb-5">
          <div className="text-5xl my-10 font-bold text-center">
            Ninjavan Shipping Policy
          </div>
          <div>
            <div className="text-4xl my-10 font-bold text-start ml-10">
              Privacy Policy
            </div>
            <div className="text-base font-medium leading-10 text-left mx-14">
              <p>
                At Ninja Van Philippines, we take your privacy seriously. We are
                committed to complying with all data protection laws as are
                applicable to us. This Policy sets out how Ninja Van manages,
                collects, uses and discloses Personal Data belonging to you.
                This Policy also sets out the purposes for which Ninja Van
                collects, uses and discloses such Personal Data.
              </p>
              <p>
                Ninja Van is committed to complying with the Republic Act 10173
                or the Data Privacy Act of 2012, and its implementing rules and
                regulations.
              </p>{" "}
              <p>
                You must only submit to us, our authorised agent or the
                Platform, information which is accurate and not misleading and
                you must keep it up to date and inform us of changes (more
                information below). We reserve the right to request for
                documentation to verify the information provided by you.
              </p>{" "}
              <p>
                We will only be able to collect your personal information if you
                voluntarily submit the information to us. If you choose not to
                submit your personal information to us or subsequently withdraw
                your consent to our use of your personal information, we may not
                be able to provide you with our Services. You may access and
                update your personal information submitted to us at any time as
                described below.{" "}
              </p>{" "}
              <p>
                If you provide personal information of any third party to us, we
                assume that you have obtained the required consent from the
                relevant third party to share and transfer his/her personal
                information to us.
              </p>
            </div>
            <div>
              <div className="text-3xl my-10 font-bold text-start ml-10">
                What does Ninja Van do?
              </div>
              <div className="text-base font-medium leading-10 text-left mx-14">
                Ninja Van is a third party logistics service provider. Our main
                business activity involves performing deliveries on behalf of
                both online and offline retailers / merchants (“Shippers”) to
                individuals, like yourself, who have purchased goods / products
                from these Shippers (“Individual Recipients”).
              </div>
            </div>
            <div>
              <div className="text-3xl my-10 font-bold text-start ml-10">
                What Personal Data does this Policy cover?
              </div>
              <div className="text-base font-medium leading-10 text-left mx-14">
                <p>
                  {" "}
                  When you create a Ninja Van account, or otherwise provide us
                  with your personal information through the Platform, the
                  personal information we collect may include:
                </p>

                <p>Name (including first and last);</p>
                <p>Delivery Address (including residential and workplace);</p>
                <p>Email Address;</p>
                <p>Telephone Number;</p>
                <p>
                  Information concerning the products purchased (including
                  product description, quantity and billing information); and
                </p>
                <p>
                  Any other information that may be reasonably required to
                  facilitate the delivery of products to you and other
                  Individual Recipients.
                </p>
              </div>
            </div>
            <div>
              <div className="text-3xl my-10 font-bold text-start ml-10">
                How does Ninja Van obtain Personal Data?
              </div>
              <div className="text-base font-medium leading-10 text-left mx-14">
                Because Ninja Van is a third party logistics service provider,
                we receive your Personal Data and Personal Data of other
                Individual Recipients from Shippers or other third party service
                providers that have engaged our services. Ninja Van may also,
                from time to time, contact you by email, over the phone or in
                person, to request for additional information that is reasonably
                required to facilitate the delivery of products to you. In such
                cases, by providing any Personal Data directly to Ninja Van, you
                shall be deemed to have consented to the terms of this Policy,
                including the purposes set out in this Policy for which Ninja
                Van collects, uses and discloses your Personal Data.
              </div>
            </div>
            <div>
              <div className="text-3xl my-10 font-bold text-center">
                For Full Policy Visit Ninjavan Policy
              </div>
              <div className="text-xl my-10 font-bold text-center">
                <a
                  href="https://www.ninjavan.co/en-ph/privacy-policy"
                  target="_blank"
                >
                  https://www.ninjavan.co/en-ph/privacy-policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(connect()(ShippingPolicy));
