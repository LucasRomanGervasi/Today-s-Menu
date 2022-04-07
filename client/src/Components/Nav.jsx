import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getNameRecipes } from "../Actions";
import { Link } from "react-router-dom";
import n from "./Nav.module.css"
import foto from "../img/logo.png"
import { FiSearch, FiHome } from "react-icons/fi";


export default function SearchBar(){
    const dispatch = useDispatch(); //Para poder despachar una acción 
    const [name, setName] = useState('') //Creo un estado local para ir escribiendo el nombre de la receta que quiero crear
    
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value) //Lo que escribe el usuario
    }

   
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameRecipes(name)) // name = lo que escribe el usuario
    }

return (
    <div className={n.conteiner}>
    <div className={n.botones}>
    <img className={n.foto} src={foto} />
    <h1 className={n.titulo}>TODAY'S MENU</h1>
    <div className={n.search }>
            <input
                className={n.serr}
                type = "text"
                placeholder = "Search recipe..."
                onChange = {(e)=> handleInputChange(e) }
                />
            <button className={n.button} type= "submit" onClick={(e) => handleSubmit(e)} value="Buscar"><FiSearch /></button>
            </div>
    <div className={n.nav}>
            <Link className={n.h} to="/home"><button className={n.hom}><FiHome/> Home</button ></Link>
            <Link to="/recipe"><button className={n.button}>Create your recipe</button></Link>
            <Link to="/contact"><button className={n.buttonco}>Contact</button></Link>
    </div>
        </div>
        </div>
)

}