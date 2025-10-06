import React ,{useState} from "react";
import Header from "./Header";
import Workspace from "./Workspace";
import Contents from "./Contents";
import "./Home.css";
const Home=()=>{
    const [buttonColor, setButtonColor] = useState('');

  const changeButtonColor = (color) => {
    setButtonColor(color);
  };
  const resetButtonColor = () => {
    setButtonColor(''); 
  };

  
    return(<React.Fragment>
        <div className="home">
        <div className="header">
            <Header buttonColor={buttonColor}
            onClearNotifications={resetButtonColor}  />
        </div>
        <div className="workspace">
            <Workspace />  
        </div>
        <div className="contents">
            <Contents 
            onNotificationAdded={changeButtonColor}
            onClearNotifications={resetButtonColor}
            />
        </div>
        </div>
    </React.Fragment>);
}
export default Home;