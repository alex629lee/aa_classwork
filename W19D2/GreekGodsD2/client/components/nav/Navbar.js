import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div className="navbar"> 
      <Link to="/">Gods</Link>
      <Link to="/abodes">Abodes</Link>
      <Link to="/emblems">Emblems</Link>
      <Link to="/new">Create</Link> 

    </div>
  )


}

export default Navbar;