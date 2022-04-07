import React from "react";
import s from './Card.module.css';
import foto from "../img/logo.png"
import {useState} from "react";

export default function Card({ id, name, image, diets, spoonacularScore}){
    // const [recipes, setRecipes] = useState([])
   
    // function handleDelete(el) {
    //     setRecipes([
    //         ...recipes,
    //         recipes.filter(() => el.id !== id)
    //     ]);
    //   }

if(id.length> 8){
    return(
                <div className={s.contenedor}>
        <div className={s.carta}>
        {/* <buttom className={s.botonx} onClick={() => handleDelete(el)}>x</buttom> */}
        <div className={s.nombre}>
            <h4>{name}</h4>
        </div>
            <img className={s.imag} src={foto} alt="img not found" />
        <div>
            <h5  className={s.diet}>Diets: {diets.map((d)=>" "+d.name)} </h5>
        </div>
            <h5 className={s.puntaje}>Score: {spoonacularScore}</h5>
            </div>
        </div>
    )
}else{
    return(
        <div className={s.contenedor}>
        <div className={s.carta}>

        <div className={s.nombre}>
            <h4>{name}</h4>
        </div>
            <img className={s.imag} src={image} alt="img not found" />
        <div>
            <h5 className={s.diet}>Diets: {diets + " "} </h5>
        </div>
            <h5 className={s.puntaje}>Score: {spoonacularScore}</h5>
            </div>
        </div>
    )
}
}