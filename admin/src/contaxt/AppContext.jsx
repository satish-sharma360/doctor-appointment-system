import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) =>{


    const calculateAge = (dob) =>{
        const today = new Date();
        const birthDate = new Date(dob);

        let age  = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const formentDate = (item) => {
  if (typeof item !== 'string') {
    return item; // Or handle it another way, e.g. return '' or "Invalid date"
  }

  const parts = item.split('_');
  if (parts.length !== 3) {
    return item;
  }

  const [day, month, year] = parts;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthIndex = parseInt(month, 10) - 1;
  if (monthIndex < 0 || monthIndex > 11) {
    return item;
  }

  return `${day} ${monthNames[monthIndex]} ${year}`;
};

    const value = {
        calculateAge,
        formentDate,


    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider