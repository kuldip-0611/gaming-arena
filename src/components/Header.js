
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOprtionData } from '../features/userSlice';



const Header = () => {
  const uniquePlatform = [];
  const dispatch = useDispatch();




 /**
  * A function that is called when the user selects an option from the dropdown menu. It prevents the
  * default action of the event, and then dispatches the fetchOptionData action with the value of the
  * option selected.
  * @param e - the event object
  */
  const handleSelect = (e) => {
    e.preventDefault()
    console.log(e.target.value)
 /* Getting the data from the redux store. */
    dispatch(fetchOprtionData(e.target.value))

  }



  const userData = useSelector(state => {
    return state.user.users
  })

 /* Filtering out the unique platform from the userData. */
  userData.map(item => {
    if (uniquePlatform.includes(item.platform)) {
      return null
    }
    else {
      uniquePlatform.push(item.platform)

    }
    return item

  })
  return (
    <div>
      <select id='mySelect' onChange={handleSelect}>
        <option value='All' >All</option>

        {

          /* This is a ternary operator. It is checking if the item is undefined, if it is, it returns
          null, if it is not, it returns the option. */
          uniquePlatform.map((item,index) => {
            if (item === undefined) {
              return null;
            }
            else {
              return (
                <option  value={item} key={index}> {item} </option>
              )

            }
          }
          )
        }

      </select>


    </div>
  )
}

export default Header
