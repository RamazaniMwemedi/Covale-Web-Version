import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { allUsers } from "../services/user";
import { addExploreColleagues } from "../Redux/slices/colleagues";
export const useExploreColleagus = (token: string) => {
  //   let token;

  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      allUsers(token).then((res: any) => {
        if (res) dispatch(addExploreColleagues(res));
      });
    }
    //   return users;
  }, [token]);
};

const modul = {
  useExploreColleagus,
};
export default modul;
