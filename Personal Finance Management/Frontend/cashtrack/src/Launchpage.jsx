import React from "react";
import { Link } from "react-router-dom";
import logo from './image/7.png';
import arrow from './image/right arrow.png';
import cashback from './image/group.png';
import secure from './image/speaker.png';
import deposit from './image/money.png';
import './Launchpage.css';
const Launchpage=()=>{
  return(<React.Fragment>
      <div className="launchpage">
        <div className="launchpage-titlebar">
          <div className="launchpage-cmpyname">
            <img src={logo} alt="" />
            <h1>Cashtrack</h1>
          </div>
          <div className="launchpage-options">
            <Link to='/signin'><button>Log in</button></Link>
            <Link to='/signup'><button>Sign Up for free</button></Link>
          </div>
        </div>
        <div className="launchpage-content-container">
          <div className="launchpage-content">
            <h1>Simplified Financial Tracking Application</h1>
            <p>Welcome! You&apos;re on the right path.Get started with FinTrack and take control of your expenses today!</p>
            <Link to='/signup'>
            <button>
                <div className="text">Sign Up for free</div>
                <div className="icon" ><img src={arrow} alt="" /></div>
            </button>
            </Link>
            <div className="launchpage-feature">
              <div className="launchpage-feature-card">
                  <img src={cashback} alt="" />
                  <p>Get rewarded up to 10% Cashback</p>
              </div>
              <div className="launchpage-feature-card">
                  <img src={secure} alt="" />
                  <p>Security & privacy guaranteed</p>
              </div>
              <div className="launchpage-feature-card">
                  <img src={deposit} alt="" />
                  <p>100% Refundable Deposits</p>
              </div>
            </div>
            </div>
        </div>
      </div>
  </React.Fragment>);
}
export default Launchpage;