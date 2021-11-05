import React from "react";
import { Link } from "react-router-dom";
// const AccountSettingsMenu = (props) => {
class AccountSettingsMenu extends React.Component {
  render() {
    return (
      <>
        <div class="flex-1 mt-16 md:pb-5 bg-gray-100 pb-24 ">
          <div class="bg-gray-800 pt-3">
            <div class="rounded-tl-3xl bg-gradient-to-r from-teal_custom to-gray-800 p-4 shadow text-2xl text-white">
              <h3 class="font-bold pl-2">Account settings</h3>
            </div>
          </div>

          <div class="flex flex-col md:flex-row h-5/6 items-center">
            {/* <Link
              to="/attendance_log"
              class="cursor-pointer w-full xl:w-1/3 p-6"
            >
              <div class="bg-white rounded-md shadow-md hover:shadow-2xl active:bg-gray-700 p-5">
                <div class="flex flex-col items-center">
                  <div class="flex-shrink pr-4">
                    <div class="rounded-full py-7 px-5 bg-gray-800">
                      <i class="fal fa-clipboard-user fa-3x fa-inverse"></i>
                    </div>
                  </div>
                  <div class="flex-1 text-center py-4">
                    <span class="font-bold text-3xl">Attendance Log</span>
                  </div>
                </div>
              </div>
            </Link> */}
            <Link
              to="/activity_log"
              class="cursor-pointer w-full  xl:w-1/2 p-6"
            >
              <div class="bg-white rounded-md shadow-md hover:shadow-2xl active:bg-gray-700 p-5">
                <div class="flex flex-col items-center">
                  <div class="flex-shrink pr-4">
                    <div class="rounded-full py-7 px-5 bg-gray-800">
                      <i class="fal fa-clipboard fa-3x fa-inverse"></i>
                    </div>
                  </div>
                  <div class="flex-1 text-center py-4">
                    <span class="font-bold text-3xl">Activity Log</span>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/accounts" class="cursor-pointer w-full  xl:w-1/2 p-6">
              <div class="bg-white rounded-md shadow-md hover:shadow-2xl active:bg-gray-700 p-5">
                <div class="flex flex-col items-center">
                  <div class="flex-shrink pr-4">
                    <div class="rounded-full py-7 px-5 bg-gray-800">
                      <i class="fad fa-users-class fa-3x fa-inverse"></i>
                    </div>
                  </div>
                  <div class="flex-1 text-center py-4">
                    <span class="font-bold text-3xl">Accounts</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
export default AccountSettingsMenu;
