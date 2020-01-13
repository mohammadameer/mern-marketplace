import { signout } from "./api-auth";

const auth = {
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    cb();
  },
  isAuthenticated() {
    if (typeof window == "undefined") return false;
    if (sessionStorage.getItem("jwt"))
      return JSON.parse(sessionStorage.getItem("jwt"));
    else return false;
  },
  signout(cb) {
    if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
    cb();
    signout().then(data => {
      document.cookie = "t=; expires=Thu, 01 jan 1970 00:00:00 UTC; path=/;";
    });
  },
  updateUser(user, cb) {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("jwt")) {
        let auth = JSON.parse(sessionStorage.getItem("jwt"));
        auth.user = user;
        sessionStorage.setItem("jwt", JSON.stringify(auth));
        cb();
      }
    }
  }
};

export default auth;
