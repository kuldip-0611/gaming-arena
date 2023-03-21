import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchData, resetData } from "../features/userSlice";




const Searchbar = ({ handleRef }) => {
  const [value, setValue] = useState("");

  const uniqueTitle = [];
  const dispatch = useDispatch()

 /* Getting the users from the redux store. */
  const userTitle = useSelector((state) => {
    return state.user.users;
  });



  /* Filtering out the duplicates in the array. */
  userTitle.map((item) => {
    if (uniqueTitle.includes(item.title)) {
      return null;
    } else {
      uniqueTitle.push(item.title);
    }
    return item;
  });

  /**
   * The onSearch function takes in a searchTerm, sets the value of the searchTerm to the value of the
   * searchTerm, and then dispatches the fetchSearchData function with the searchTerm as an argument
   * @param searchTerm - The search term that the user has entered.
   */
  uniqueTitle.map((item) => console.log(item));

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    console.log(searchTerm);
    dispatch(fetchSearchData(searchTerm))

  };



  const handleFocus = () => {
    dispatch(resetData())
    handleRef()
  }

  return (
    <>
      <div className="search-container">
        <div className="search-inner">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={handleFocus}
          />

        </div>
        <div className="dropdown">
          {uniqueTitle.filter(item => {
            if (item === undefined) {
              return null
            }
            const searchTerm = value.toLowerCase();
            const title = item.toLowerCase();

            return searchTerm && title.startsWith(searchTerm) && title !== searchTerm


          })
            .map((item) => (
              <div onClick={() => onSearch(item)} className="dropdown-row">{item}</div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Searchbar;
