import React from "react";


const HomePage = (props)=>{

   return(
    <div className="HP_Container">
      <div id="welcome">
        <nav>
          <span>SnapShot</span>

          <ul>
            <li><a href='#about'>About</a></li>
            <li><a href='#ourTeam'>Our Team</a></li>
            <li>LOGIN</li>
            <li>Signup</li>
          </ul>
        </nav>
        
        <div>
          <p>Travel planning made easier</p>
        </div>
      </div>

      {/* About */}
      <div id="about">

      </div>

      {/* Our Team */}
      <div id="ourTeam">

      </div>

    </div>
    
   )
}

export default HomePage;