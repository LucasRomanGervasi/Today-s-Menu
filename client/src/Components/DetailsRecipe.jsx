import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdRecipes } from "../Actions";
import { useEffect } from "react";
import d from "./DetailsRecipe.module.css"
import Nav from "./Nav"
import foto from "../img/logo.png"

//- [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// - [ ] Resumen del plato
// - [ ] Puntuación
// - [ ] Nivel de "comida saludable"
// - [ ] Paso a paso

export default function DetailsRecipe( props){
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getIdRecipes(props.match.params.id))
    },[dispatch])
    const myRecipe= useSelector((state) => state.details)
    if(myRecipe.createdInDb){
    return(
        <div>
            <Nav />
                <div className={d.container}>
                    <div className={d.nom}>
                    <h1>{myRecipe.name}</h1>
                    <img className={d.img}src={foto} ></img>
                    <h3>Score: {myRecipe.spoonacularScore}</h3>
                    <h3>Health Score: {myRecipe.healthScore}</h3>
                    <h3>Diets: {myRecipe.diets.map((e) => " "+e.name)} </h3>
                    </div>
                    <div className={d.data}>
                    <h3> Summary: </h3>
                    <p> {myRecipe.summary}</p>
                    <h3> Instruccions: </h3>
                    <p>{myRecipe.analyzedInstructions}</p>
                    </div>
               </div>
               </div>)
               }else{ return(
                <div>
                    <Nav />
                        <div className={d.container}>
                            <div className={d.nom}>
                            <h1>{myRecipe.name}</h1>
                            <img className={d.img}src={myRecipe.image} ></img>
                            <h3>Score: {myRecipe.spoonacularScore}</h3>
                            <h3>Health Score: {myRecipe.healthScore}</h3>
                            <h3>Dish Types: {myRecipe.dishTypes}</h3>
                            <h3>Diets: {myRecipe.diets} </h3>
                            </div>
                            <div className={d.data}>
                            <div className={d.p}>
                            <div className={d.s}>
                            <h3>Summary: </h3>
                            <p>{myRecipe.summary}</p>
                            </div>
                            <div className={d.i}>
                            <h3> Instruccions: </h3>
                            <p>{myRecipe.analyzedInstructions?.map((e) => " "+e.step)}</p>
                            </div>
                            </div>
                            </div>
                       </div>
                       </div>)
    }
}
