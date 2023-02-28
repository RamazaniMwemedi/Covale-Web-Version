const { useState, useEffect } = require("react");
const { useDispatch } = require("react-redux");

const { allUsers } = require("../services/user");
const { addExploreColleagues } = require("../Redux/slices/colleagues");
const useExploreColleagus = (token) => {
  //   let token;

  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      allUsers(token).then((res) => {
        if (res) dispatch(addExploreColleagues(res));
      });
    }
    //   return users;
  }, [token]);
};

module.exports = {
  useExploreColleagus,
};
