import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import {postRecipe, getDiets} from "../Actions";
import Nav from "./Nav";
import c from "./CreateRecipe.module.css"
import {FiUpload, FiTrash2} from "react-icons/fi";

function validate(input){
    let errors = {};
     if (typeof input.name === 'number' || !input.name  ) {
        errors.name = "Complete name"
    } if (!input.summary ){
        errors.summary="Complete summary"
    } if (!input.analyzedInstructions ){
        errors.analyzedInstructions="Complete Instructions"
    }
    if(input.spoonacularScore > 100 || input.spoonacularScore<0 || !input.spoonacularScore  ){
        errors.spoonacularScore = "Enter your level from 1 to 100"
    }
    if(input.healthScore > 100 || input.healthScore < 0 || !input.healthScore){
        errors.healthScore = "Enter your level health from 1 to 100"
    }
    return errors 
}

export default function CreateRecipe(){
    const dispatch = useDispatch()
    const type = useSelector((state) => state.type)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
            name:"",
            image: "",
            summary : "",
            spoonacularScore: "",
            healthScore: "",
            analyzedInstructions : "",
            diets: []
        })
        
        //me traigo la accion de todas las dietas
        useEffect(() => {
         dispatch(getDiets());
        }, [])

        //Agrego en el estado local
        function handleChange(e){
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        }
        
        //Para borrar las dietas, seteo en un arreglo vacio
        function handleClick(e){
            e.preventDefault();
            setInput({
                diets: []
            })
        }
        
        //Agrego las dietas
        function handleSelect(e){
            e.preventDefault();
            setInput({
                ...input,
                diets:[...input.diets, e.target.value]
            })
            console.log(input)
        }

        function handleSubmit(e){
            e.preventDefault();
            dispatch(postRecipe(input))
            setInput({
                name:"",
                image: "",
                summary : "",
                spoonacularScore: "",
                healthScore: "",
                analyzedInstructions : "",
                diets: [],
            })
            setErrors(validate({
                ...input,
                [e.target.value]: e.target.value
            }))
        }
        return (
            <div className={c.bod}>
            <Nav/>
            <div className={c.crea} >
            <h1 >Create your recipe!</h1>
            </div>
            <div className={c.div}>
            <form onSubmit={(e) => handleSubmit(e)}> 
            <div className={c.for}>
                <div className={c.name}>
                    <label>Name:</label>
                    <input className={c.isc}
                        type="text"
                        value={input.name}
                        name="name"
                        placeholder="Name..."
                        onChange={(e) => handleChange(e)}
                        />
                        {errors.name && (
                           <p className={c.errors}>{errors.name}</p>
                            )}
                    </div>
                    <div className={c.summary}>
                    <label>Summary:</label>
                    <input className={c.isc}
                        type="text"
                        value={input.summary}
                        name="summary"
                        placeholder="Summary..."
                        onChange={(e) => handleChange(e)}
                        /> {errors.summary && (
                            <p className={c.errors}>{errors.summary}</p>
                            )}
                    </div>
                    <div className={c.score}>
                    <label>Score:</label>
                    <input className={c.isc}
                        type="number" 
                        value={input.spoonacularScore}
                        name="spoonacularScore"
                        placeholder="Score 1-100..."
                        onChange={(e) => handleChange(e)}
                        />
                         {errors.spoonacularScore && (
                             <p className={c.errors}>{errors.spoonacularScore}</p>
                             )}
                    </div>
                    <div className={c.hescore}>
                    <label>Health Score:</label>
                    <input className={c.isc}
                        type="number"
                        value={input.healthScore}
                        name="healthScore"
                        placeholder="Health score 1-100..."
                        onChange={(e) => handleChange(e)}    
                        />
                         {errors.healthScore && (
                            <p className={c.errors}>{errors.healthScore}</p>
                            )}
                    </div>
                    <div className={c.inst}>
                    <label>Instructions:</label>
                    <input className={c.isc}
                        type="text"
                        value={input.analyzedInstructions}
                        name="analyzedInstructions"
                        placeholder="Instructions..."
                        onChange={(e) => handleChange(e)}
                        />
                         {errors.analyzedInstructions&& (
                            <p className={c.errors}>{errors.analyzedInstructions}</p>
                            )}
                </div>
                <div className={c.die}> 
                <label>Diets: </label>
                <select className={c.select} onChange={(e) => handleSelect(e)}> 
                    {type.map((di) => (
                        <option value={di.name} >{di.name}</option>
                        ))}
    
                </select>
                </div>
                <h4 className={c.die}>
                { input.diets.map(el =>  el + " - ")}
                </h4>
                        <button className={c.btn} onClick={(e) => handleClick(e)}><FiTrash2/>Delete diets</button>
                        </div>
                <div className={c.di}>
                <button className={c.bt} onSubmit={(e) => handleSubmit(e)} type="submit"> 
                <FiUpload/> Send recipe!</button>
                </div>
            </form>
                </div>
        </div>
    )
}