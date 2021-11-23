import swal from "sweetalert";
import axios from "axios";
import { URL_IMPORT } from "./constant";
import { tokenConfig } from "../store/actions/account/auth";
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
export function HandleDecimalPlaces(Variable) {
  return Math.round((Variable + Number.EPSILON) * 100) / 100;
}

export function HandleSuccessMessages(Message, type) {
  return swal({
    title: Message + " Successfully",
    icon: type,
  });
}

export function Export2Doc(element, filename = "") {
  return (e) => {
    e.preventDefault();
    var preHtml =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + document.getElementById(element).innerHTML + postHtml;
    var blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    var url =
      "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

    filename = filename ? filename + ".doc" : "document.doc";

    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      downloadLink.href = url;

      downloadLink.download = filename;

      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  };
}

export const tokenCustomConfig = (token) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};

export function CheckPassword(UserID, data, token) {
  const promise = axios.put(
    URL_IMPORT + "/api/auth/CheckPassword/" + UserID + "/",
    data,
    tokenCustomConfig(token)
  );
  const dataPromise = promise.then((res) => res.data.password);
  return dataPromise;
}
