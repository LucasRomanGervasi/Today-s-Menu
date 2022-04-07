import React from "react";
import p from "./Paginado.module.css"

export default function Paginado({recipesPerPage, allRecipes, paginado}){
    const pageNumber = []

    for(let i=1; i<=Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumber.push(i) 
    }
    return(
       <div className={p.div}>
                {pageNumber && 
                pageNumber.map(number => (
                    <div className={p.paginado} key = {number}>
                    <button className={p.button} type= "submit" onClick={() => paginado(number)} value="Buscar"> {number}</button>
                    </div>
                ))}
        </div>
    )
}