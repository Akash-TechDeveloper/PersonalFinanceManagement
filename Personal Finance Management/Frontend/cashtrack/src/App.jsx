import React from "react";
import Body from "./Body";
import { UserProvider } from "./UserContext";
const App=()=>{
  return(<React.Fragment>
    <UserProvider>
      <Body/>
      </UserProvider>
  </React.Fragment>);
}
export default App;