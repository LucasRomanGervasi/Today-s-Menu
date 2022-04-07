

const initialState =  {
    recipes : [],
    allRecipes: [],
    type: [],
    details:{},
}
export default function rootReducer(state = initialState, action){
    switch (action.type) {
            case 'GET_RECIPES':
                return {
                    ...state,
                    recipes: action.payload, //agregame en el estado recipes que es un estado vacio, todo lo que me mande la action GET_RECIPES
                    allRecipes: action.payload //agregame en el estado allRecipes que es un estado vacio, todo lo que me mande la action GET_RECIPES
        }
            case 'GET_RECIPES_NAME':
                return{
                    ...state,
                    recipes: action.payload,
                }
            case 'GET_RECIPES_ID':
                return{
                    ...state,
                    details: action.payload
                }
            case 'POST_RECIPE':
                return{
                    ...state
                }
            case 'GET_TYPE_DIETS':
                return{
                    ...state,
                    type: action.payload
                }
                case 'FILTER_BY_DIET':
                    const allRecipes1 = state.allRecipes
                    const dietFiltered = action.payload === 'diet' ? state.allRecipes : allRecipes1.filter((e) => e.diets?.some((e) => e === action.payload || e.name === action.payload ))
                    return {
                  ...state,
                  recipes: dietFiltered
        }
            case 'FILTER_CREATED':
                const allRecipes2= state.allRecipes
                const apiFiltered = action.payload === 'Db' ? allRecipes2.filter( (el) => el.createdInDb) : allRecipes2.filter((el) => !el.createdInDb)
                return{
                    ...state,
                    recipes: apiFiltered
                }
            case 'ORDER_BY_NAME':
                let orderArr = action.payload === 'asc'?
                state.recipes.sort(function (a, b) {
                    if (a.name > b.name){
                        return 1;
                    }
                    if (b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function (a, b) {
                    if (a.name > b.name){
                        return -1;
                    }
                    if (b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    recipes: orderArr
        }   
            case 'ORDER_BY_SCORE':
                 let scoreArr = action.payload === "spoonacularScore"?
                state.recipes.sort(function(a, b) {
                    if (a.spoonacularScore > b.spoonacularScore ){
                        return -1;
                    }
                    if (b.spoonacularScore > a.spoonacularScore ){
                        return 1;
                    }
                    return 0;
                  })  :
                    state.recipes.sort(function (a, b) {
                        if (a.spoonacularScore > b.spoonacularScore ){
                            return 1;
                        }
                        if (b.spoonacularScore > a.spoonacularScore ){
                            return -1;
                        }
                        return 0;
                    })
                return {
                    ...state,
                    recipes: scoreArr
                }
              default: return state;
            }
        }