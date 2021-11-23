import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
class TermsAndCondition extends React.Component {
  render() {
    return (
      <>
        <div className="bg-white flex-1 mt-28 pb-24 md:pb-5">
          <div className="text-5xl my-10 font-bold text-center">
            TERMS OF USE
          </div>
          <div className="text-lg my-10 font-bold text-center">
            These Terms of Use apply to your access to and use of the websites,
          </div>
          <div>
            <div className="text-4xl my-10 font-bold text-start ml-10">
              Eligibility
            </div>
            <div className="text-base font-medium leading-10 text-left mx-14">
              <p>
                You must be at least 13 years of age to use our Services. If you
                are under 18 years of age (or the age of legal majority where
                you live), you may only use our Services under the supervision
                of a parent or legal guardian who agrees to be bound by these
                Terms. If you are a parent or legal guardian of a user under the
                age of 18 (or the age of legal majority), you agree to these
                Terms and to be fully responsible for the acts or omissions of
                such user
              </p>
            </div>
            <div>
              <div className="text-3xl my-10 font-bold text-start ml-10">
                User Accounts
              </div>
              <div className="text-base font-medium leading-10 text-left mx-14">
                You will need to register for an account to access some or all
                of our Services. If you register for an account, you must
                provide accurate account information and promptly update this
                information if it changes. You must maintain the security of
                your account and account credentials and promptly notify us if
                you discover or suspect that someone has accessed your account
                without your permission. If you permit others to access the
                Services through your account, you are responsible for the
                activities of those users. We reserve the right to reclaim
                screen names on behalf of businesses or individuals that hold
                legal claim, including trademark rights, in those screen names.
              </div>
            </div>
            <div>
              <div className="text-3xl my-10 font-bold text-start ml-10">
                Terms of Sale
              </div>
              <div className="text-base font-medium leading-10 text-left mx-14">
                <div className="text-lg my-10 font-bold text-start">
                  Availability and Pricing
                </div>
                <p>
                  All products offered for sale are subject to availability and
                  we reserve the right to impose quantity limits on any order or
                  reject all or any part of an order without prior notice.
                  Prices for products are subject to change at any time, but
                  changes will not affect any order for products you have
                  already placed. Purchases are also subject to our price
                  matching policy and sale items policy.
                </p>
                <div className="text-lg my-10 font-bold text-start">Taxes</div>
                <p>
                  You are responsible for any applicable sales, use, duty,
                  customs or other governmental taxes, levies or fees (Taxes)
                  due with respect to your purchase of products or services
                  through our Services. We will collect applicable Taxes if we
                  determine we have a duty to collect Taxes. We will present an
                  estimate of Taxes we collect at checkout, except where we have
                  clearly stated in writing that a price includes Taxes. The
                  actual Taxes charged may be adjusted from the amount shown at
                  checkout.
                </p>
                <div className="text-lg my-10 font-bold text-start">
                  Payment.
                </div>
                <p>
                  Only valid payment methods acceptable to us may be used to
                  complete a purchase. You represent and warrant that you are
                  authorized to use your designated payment method. You
                  authorize us to charge your designated payment method for the
                  total amount of your order (including any applicable taxes and
                  shipping and handling charges). If any of the products in your
                  order are unavailable, we will only charge the prices, Taxes
                  and other applicable charges associated with the products that
                  are included in the shipment.
                </p>
                <div className="text-lg my-10 font-bold text-start">
                  Shipping; Risk of Loss.
                </div>
                <p>
                  You agree to pay any shipping and handling charges shown at
                  the time you make a purchase. We reserve the right to
                  increase, decrease, add or eliminate shipping and handling
                  charges from time to time, but we will provide notice of the
                  changes applicable to you before you make your purchase. Any
                  delivery dates or times shown as part of the checkout process
                  are estimates only and are not guaranteed. Unless we state
                  otherwise in writing via the Services, risk of loss or damage
                  to a product passes to you upon delivery of the product to our
                  designated carrier.
                </p>
                <div className="text-lg my-10 font-bold text-start">
                  Returns
                </div>
                <p>
                  Please see our Return Policy for information about returning
                  products purchased via our Services
                </p>
                <div className="text-lg my-10 font-bold text-start">Errors</div>
                <p>
                  In the event of an error, we reserve the right to correct the
                  error and revise your order accordingly (which includes
                  charging the correct price) or to cancel the order and refund
                  any amount charged.
                </p>
              </div>
            </div>
            <div>
              <div className="text-3xl my-10 font-bold text-start ml-10">
                Limited License
              </div>
              <div className="text-base font-medium leading-10 text-left mx-14">
                Our Services, including the product descriptions, text,
                graphics, images, photographs, videos, illustrations,
                trademarks, trade names, service marks, logos, slogans and other
                content contained therein, are owned by or licensed to the ABC
                motor shop.
              </div>
            </div>
            <div>
              <div className="text-3xl my-10 font-bold text-start ml-10">
                User Content
              </div>
              <div className="text-base font-medium leading-10 text-left mx-14">
                Our Services may allow you and other users to create, post,
                store or share content, including messages, text, product
                reviews, photos, videos, audio and other materials
                (collectively, "User Content").
              </div>
            </div>
            <div>
              <div className="text-3xl my-10 font-bold text-start ml-10">
                Prohibited Conduct
              </div>
              <div className="text-base font-medium leading-10 text-left mx-14">
                You agree that you will not violate any applicable law,
                contract, intellectual property or other thirdparty right or
                commit a tort, and you are solely responsible for your conduct
                while accessing or using our Site. You will not:  Engage in any
                harassing, threatening, intimidating, spamming, predatory or
                stalking conduct;  Use or attempt to use another users account
                without authorization from that user;  Use our Services in any
                manner that could interfere with, disrupt, negatively affect or
                inhibit other users from fully enjoying our Site or that could
                damage, disable, overburden or impair the functioning of our
                Site in any manner;  Attempt to circumvent any
                content-filtering techniques we employ or attempt to access any
                feature or area of our Services that you are not authorized to
                access;  Develop or use any applications that interact with our
                Services without our prior written consent;  Use any data
                mining, robots or other data gathering or extraction methods in
                connection with the Services;  Bypass or ignore instructions
                contained in any robots.txt file we provide that controls
                automated access to portions of our Services; or  Use our
                Services in any illegal, fraudulent or other unauthorized
                manner, or engage in, encourage or promote any activity that
                violates these Terms.
              </div>
            </div>
            <div>
              <div className="text-3xl my-10 font-bold text-start ml-10">
                Prohibited Content
              </div>
              <div className="text-base font-medium leading-10 text-left mx-14">
                You may not create, post, store or share any User Content that:
                 Is unlawful, libelous, defamatory, obscene, pornographic,
                indecent, lewd, suggestive, harassing, threatening, invasive of
                privacy or publicity rights, abusive, inflammatory, misleading
                or fraudulent;  Would constitute, encourage or provide
                instructions for a criminal offense, violate the rights of any
                party or otherwise create liability or violate any applicable
                law;  Infringes any patent, trademark, trade secret, copyright
                or other intellectual or proprietary right of any party; 
                Contains or depicts any statements, remarks or claims that do
                not reflect your honest views and experiences;  Impersonates,
                or misrepresents your affiliation with, any person or entity; 
                Fails to clearly and prominently disclose any material
                connections you may have with us.  Contains any unsolicited
                promotions, political campaigning, advertising or solicitations;
                 Contains any viruses, corrupted data or other harmful,
                disruptive or destructive files or content; or  Is, in our sole
                judgment, objectionable or that restricts or inhibits any other
                person from using or enjoying our Services, or that may expose
                the shop or others to any harm or liability of any type
              </div>
            </div>
            <div>
              <div className="text-3xl my-10 font-bold text-start ml-10">
                Hyperlinks
              </div>
              <div className="text-base font-medium leading-10 text-left mx-14">
                You may create a text hyperlink to our Services for
                noncommercial purposes, provided such link does not portray the
                shop or any of its products or services in a false, misleading,
                derogatory or otherwise defamatory manner and provided further
                that the linking site does not contain any adult or illegal
                material or any material that is offensive, harassing or
                otherwise objectionable. This limited permission may be revoked
                at any time. You will not use the shop logo or other proprietary
                graphic of the shop to link to our Services without our express
                written permission.
              </div>
            </div>
            <div>
              <div className="text-3xl my-10 font-bold text-start ml-10">
                Feedback
              </div>
              <div className="text-base font-medium leading-10 text-left mx-14">
                Any questions, comments, suggestions, ideas, original or
                creative materials or other information you submit about shop or
                our products or Services (collectively, Feedback), is
                non-confidential and shop will be entitled to the unrestricted
                use and dissemination of Feedback for any purpose, commercial or
                otherwise, without acknowledgment or compensation to you.
              </div>
            </div>
            <div>
              <div className="text-3xl my-10 font-bold text-center">
                Copyright Complaints
              </div>
              <div className="text-base font-medium leading-10 text-left mx-14">
                We have a policy of limiting access to our Services and
                terminating the accounts of users who infringe the intellectual
                property rights of others.
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(connect()(TermsAndCondition));
