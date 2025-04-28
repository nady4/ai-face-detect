import { useEffect } from "react";
import { UserType } from "../../types";
import apiUrl from "../utils/apiUrl";

export function useCheckLoginToken(
  setUser: React.Dispatch<React.SetStateAction<UserType>>
) {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch(`${apiUrl}/verify-token`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token: token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser({
              id: data.user.id,
              username: data.user.username,
              email: data.user.email,
              password: data.user.password,
              loggedIn: true,
            });
            localStorage.setItem("user", JSON.stringify(data.user));
          }
        })
        .catch((err) => console.log(err));
    }
  }, [setUser]);
}

export default useCheckLoginToken;
