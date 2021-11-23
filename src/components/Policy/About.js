import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
class About extends React.Component {
  render() {
    return (
      <>
        <div className="bg-white flex-1 mt-28 pb-24 md:pb-0">
          <div className="text-5xl my-10 font-bold text-center">
            ABC Motor Parts
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex content-center py-20">
              <img
                src="https://www.roadracingworld.com/wp-content/uploads/2020/01/Ducati_assemblyline_Multistrada_UC145657_High_1580419886-e1580419955613.jpg"
                className="rounded-3xl w-11/12 mx-auto my-auto"
                alt=""
              />
            </div>

            <div className="w-full md:w-1/2 text-xl my-auto font-semibold text-center px-28 flex content-center py-auto">
              ABC Motor Parts is about to enter its second year as the
              motorcycle industry's leader in selection, quality, knowledge, and
              customer service. ABC Motor Parts has been geared towards
              providing the finest service possible to motorcycle enthusiasts
              since its establishment in 2020. When you call for assistance or
              to make a purchase the old-fashioned way, you are actually
              speaking with someone who owns, rides, and repairs a dirt bike,
              street bike, ATV, or side-by-side.
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 text-xl my-auto font-semibold text-center px-28 flex content-center py-auto md:order-1 order-last">
              You can't even find a more knowledgeable team of more committed
              client base anywhere else, since those who rely on us for parts,
              riding gear, and casual wear understand that the loyalty is mutual
              with ABC Motor Parts.
            </div>
            <div className="w-full md:w-1/2 flex content-center py-20 md:order-last order-1">
              <img
                src="https://msmproduction.s3-eu-west-1.amazonaws.com/s3fs-public/3_19.jpg"
                className="rounded-3xl w-11/12 mx-auto my-auto"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:mb-0 mb-10">
            <div className="w-full md:w-1/2 flex content-center py-20">
              <img
                src="https://media.istockphoto.com/photos/the-engine-resolution-of-the-motorcycle-picture-id488965597?k=20&m=488965597&s=612x612&w=0&h=uvnj7uwKrQ_IGZDof-Ybj0Ba20JZbv5Y5YJ9FxJARPc="
                className="rounded-3xl w-11/12 mx-auto my-auto"
                alt=""
              />
            </div>

            <div className="w-full md:w-1/2 text-xl my-auto font-semibold text-center px-28 flex content-center py-auto">
              Furthermore, ABC Motor Parts economical price structure and large
              product range allow you to order everything from hard-to-find OEM
              parts to the most technologically modern motorbike and have it
              delivered to your house in days.
            </div>
          </div>

          <div
            class="bg-cover flex h-screen text-gray-800"
            style={{
              backgroundImage:
                "url('https://www.roadrunner.travel/wp/wp-content/uploads/0R5A0019-772x515.jpg')",
            }}
          >
            <div className="md:text-5xl text-xl font-bold text-center m-auto bg-white w-6/12 p-10 rounded-2xl bg-opacity-50">
              "We all have a shared interest in something called happiness."
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(connect()(About));
