import React from 'react' 
import './Fotter.css'
import Fotter_logo from '../Assets/logo_big.png'
import ig_icon from '../Assets/instagram_icon.png'
import pi_icon from '../Assets/pintester_icon.png'
import WA_icon from '../Assets/whatsapp_icon.png'



const Fotter = ()=>{
    return(
        <div className='fotter'>
           <div className="fotter_logo">
            <img src={Fotter_logo} alt="logo" />
            <p>SHOPPER</p>
           </div>
           <ul className='fotter_links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
           </ul>
           <div className="fotter-social-icons">
            <div className="footer-icons-contanier">
                <img src={ig_icon} alt="" />
            </div>
            <div className="footer-icons-contanier">
                <img src={pi_icon} alt="" />
            </div>
            <div className="footer-icons-contanier">
                <img src={WA_icon} alt="" />
            </div>
           </div>
           <div className="footer-cobyright">
            <hr />
            <p>Cobyright @ 2025 - All Right Reserved by ziad.</p>
           </div>
        </div>
    )
}

export default Fotter;