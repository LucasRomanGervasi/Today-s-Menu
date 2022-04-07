import React from "react";
import { useState, useEffect, useDebugValue } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes, orderByName ,filterRecipesByDiet , orderByScore, filterRecipes} from "../Actions/index";
import Card from "./Card"
import Paginado from "./Paginado";
import Nav from "./Nav";
import h from "./Home.module.css"
import foto from "../img/logo.png"
import { FiRefreshCcw } from "react-icons/fi";

export default function Home() {
    const dispatch = useDispatch() //Uso useDispatch() para despues poder despachar acciones en la constante dispatch 
    const allRecipes = useSelector((state) => state.recipes) //guardo en la constante allRecipes y le meto todo lo qye está en el estado recipes
    const [order, setOrden] = useState('')

    //paginado
    const [currentPage, setCurrentPage] = useState(1) //Página actual
    const [recipesPerPage, setRecipesPerPage] = useState(9) //Cuantas recipes vienen por pagina
    const indexOfLastRecipe = currentPage * recipesPerPage //9 
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage //0
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe); //no incluye el ultimo, va del indice 0 a 8 osea 9 recetas

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)   
}

useEffect (() => {
    dispatch(getRecipes()) //Acá despacho la acción
},[dispatch]) //Se le agrega un arreglo como segundo paramentro para que no se genere un bucle infinito ([dispatch] --> ejecutalo siempre y cuando tengas dispatch)

//Reloed Recipes
     function handleClick(e){
         e.preventDefault(); 
    dispatch(getRecipes()); //le paso toda la acción cuando hagan click en Reoled Recipes
}

//Filtrado por dieta
    function handleFilterDiet(e){
        e.preventDefault();
        dispatch(filterRecipesByDiet(e.target.value))
}

//Ordenamiento por asc y desc
    function handleOrder(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
}

//Ordenamiento por score
    function handleScore(e){
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
        console.log(setOrden)
    }

//Filtrado por las recetas creadas y de las api
    function handleInDb(e){
        dispatch(filterRecipes(e.target.value))
    }

    return (
        <div className={h.bod} >
            <link rel="chef.png" href="../img/chef.png"/>
        <Nav/>
        <div className={h.filtros}>
        <button className={h.but} onClick={(e) => handleClick(e)}><FiRefreshCcw/> Reload recipes</button>
    <div>
        <select className={h.select}  onChange={e => handleOrder(e)}> 
            <option value= 'asc'> Sort A-Z</option> 
            <option value='desc'> Sort Z-A</option>
        </select> 
    </div>
    <div>
        <select className={h.select} onChange={e => handleFilterDiet(e)}>
            <option value="diet">All diets</option>
            <option value="gluten free">Gluten Free </option>
            <option value="dairy free">Dairy Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="lacto vegetarian">Lacto Vegetarian</option>
            <option value="ovo vegetarian">Ovo Vegetarian</option>
            <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescetarian">Pescetarian</option>
            <option value="paleo">Paleo</option>
            <option value="primal">Primal</option>
            <option value="low fodmap">Low Fodmap</option>
            <option value="whole 30">Whole 30</option>
        </select>
    </div>
    <div>
    <select className={h.select} onChange={(e)=> handleScore(e)}>
           <option value="spoonacularScore">Best score</option>
           <option value="spoonacularScoree">Worst score</option>
    </select>
        </div>
        <div>
            <select className={h.select} onChange={(e)=> handleInDb(e)}>
                <option value="Api">Recipes</option>
                <option value="Db">Recipes created</option>
            </select>
        </div>
            </div>
        <div className={h.paginado}>
    <Paginado
    recipesPerPage= {recipesPerPage}
    allRecipes = {allRecipes.length}
    paginado = {paginado}
    />
    </div>
    <div className={h.div}>
    {  currentRecipes?.map( (el) => {
           return(
                 <div className={h.container}>
               <Link to={'/home/' + el.id}> {/* Meto todo en un Link para poder apretar en la carta y que te lleve al detalle de la carta */}
                 <Card id={el.id} name={el.name} image={el.image? el.image: <img src={foto}/>} diets={el.diets} spoonacularScore={el.spoonacularScore} key={el.id}/>
               </Link>
                 </div>
        );
    })}
    </div>
    <Paginado
    recipesPerPage= {recipesPerPage}
    allRecipes = {allRecipes.length}
    paginado = {paginado}
    />
    </div>
)
}

