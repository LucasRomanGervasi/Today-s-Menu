import React, { useState } from "react";
import { Link } from "react-router-dom";
import s from './LandingPage.module.css'
import foto from "../img/logo.png"


export default function LandingPage(){
    return (
        <div className={s.body}>
            <h1 className={s.welcome}>Welcome it's Today's Menu <img className={s.foto} src={foto} /></h1>
            <h2> In Today's Menu you will find the best recipes. You can also create your own personalized recipes
                 for each occasion. Press start to begin!</h2>
            <Link to="/home">
                <div className={s.ho}>
            <button className={s.home}>Start</button>
            </div>
            <div>
                <p>
                </p>
            </div>
            </Link>
        </div>
    )
}
