import React from "react";
import {
    BrowserRouter as Routers,
    Link
} from 'react-router-dom'

export const Footer = () => {
 return<footer>
    <div id="Footer_Nevbar_Container">
        <Link to="/About_us"><p className="Footer_nevbar_Link">About us</p></Link>
        <Link to="/Community"><p className="Footer_nevbar_Link">Community</p></Link>
        <Link to="/How_to_Contact"><p className="Footer_nevbar_Link">How to Contact</p></Link>
        <Link to="/Notice"><p className="Footer_nevbar_Link">Notice</p></Link>
    </div>
 </footer>
}

export default Footer