import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout";

import MainBaseRouter from "./Routers/MainRoutes";

import store from "./store/store";
import Login from "./components/Accounts/Login";
import Registration from "./components/Accounts/Registration";

import { useEffect } from "react";
import { loadUser } from "./store/actions/account/auth";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            {/* <Route exact path="/" component={Login} /> */}
            <Route exact path="/login" component={Login} />

            <Route exact path="/register" component={Registration} />

            <MainLayout>
              <MainBaseRouter />
            </MainLayout>
            {/* <ReviewLayout>
							<ReviewBaseRouter />
						</ReviewLayout> */}
          </Switch>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
