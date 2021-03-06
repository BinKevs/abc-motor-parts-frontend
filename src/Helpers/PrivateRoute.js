// import React from "react";
// import { connect } from "react-redux";
// import { Route, Redirect } from "react-router-dom";

// const PrivateRoute = ({ component: Component, auth, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) => {
//       console.log(auth);
// if (auth.isLoading) {
//   return (
//     <div className="">
//       <div
//         class={
//           !auth.is_superuser
//             ? "loader-add-on flex w-full justify-center justify-self-center text-gray-800"
//             : "loader-add-on flex w-full lg:w-4/5 justify-center justify-self-center text-gray-800"
//         }
//       >
//         <i class="far fa-motorcycle fa-2x px-3"></i>
//         <h1 class="font-Montserrat text-base">ABC Motor Parts</h1>
//       </div>
//       <div
//         className={
//           !auth.is_superuser
//             ? "loader-div flex w-full justify-center justify-self-center"
//             : "loader-div flex w-full lg:w-4/5 justify-center justify-self-center"
//         }
//       >
//         <span class="loader">
//           <span class="loader-inner"></span>
//         </span>
//       </div>
//     </div>
//   );
// }
//       if (!auth.isAuthenticated) {
//         return <Redirect to="/login/" />;
//       } else {
//         return <Component {...props} />;
//       }
//     }}
//   />
// );
// const mapStateToProps = (state) => ({
//   auth: state.AuthReducer,
// });
// export default connect(mapStateToProps)(PrivateRoute);
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "./utils";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login/" />
      }
    />
  );
};

export default PrivateRoute;
