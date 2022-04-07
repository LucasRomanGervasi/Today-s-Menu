import axios from "axios"
                                                                                                  

export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/api/recipes/')
        return dispatch({
        type: 'GET_RECIPES',
        payload: json.data
        })
    }}
export function getNameRecipes(name){
    return async function(dispatch){
      try{
        var json = await axios.get('http://localhost:3001/api/recipes/?name=' + name)
        return dispatch({
            type: 'GET_RECIPES_NAME',
            payload: json.data
        })
      }catch(error){
          console.log(error)
      }
     }
    }

export function getIdRecipes(id){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/api/recipes/' + id)
            return dispatch({
                type: 'GET_RECIPES_ID',
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function postRecipe(payload){
    return async function(dispatch){
    const response = await axios.post('http://localhost:3001/api/recipe/', payload)
    console.log(response)
    return response
}
}
export function getDiets(){
    return async function(dispatch){
        var info = await axios.get('http://localhost:3001/api/types/')
        return dispatch({
            type: 'GET_TYPE_DIETS',
            payload: info.data
        })
    }
}
export  function filterRecipes(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}  
export  function  filterRecipesByDiet (payload) {

    return {
        type: 'FILTER_BY_DIET',
        payload
    }
}  
export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByScore(payload){
    console.log(payload)
    return{
        type: 'ORDER_BY_SCORE',
        payload
    }
}



    
