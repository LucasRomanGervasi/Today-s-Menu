import React from "react";
import Nav from './Nav'
import co from './Contact.module.css'
import { FaLinkedin, FaGithubSquare, } from "react-icons/fa";
import {SiGmail} from "react-icons/si";
import {MdPhoneIphone} from "react-icons/md";

export default function Contact(){
    return(
        <div>
            <Nav />
        <div className={co.container}>
                            <div className={co.nom}>
                            <h1>Hello!</h1>
                            <div>
                            <p>
                            I am is Lucas Gervasi and this is my first individual project created in 
                            Henry bootcamp called Today's Menu. You create it using the React, Redux, Node and Sequelize tools.
                            </p>
                            <p>
                            Thank you very much for stopping by Today's Menu. I leave my contacts
                            </p>
                            </div>
                            <div className={co.con}>
                            <div className={co.car}>
                            <h3>15-6802-0511</h3>
                            <MdPhoneIphone/>
                            </div>
                            <div className={co.car}>
                            <h3>gervasilucas22@gmail.com</h3>
                            <SiGmail />
                            </div>
                            <div className={co.car}>
                            <h3>Lucas Roman</h3>
                            <a href='https://github.com/LucasRomanGervasi'> <FaGithubSquare /></a>
                            </div>
                            <div className={co.car}> <h3>Lucas Roman Gervasi</h3>
                            <a href='https://www.linkedin.com/in/lucas-roman-gervasi-419463200/'> <FaLinkedin /></a>
                            </div>
                            </div>
                            </div>
        </div>
        </div>
    )
}