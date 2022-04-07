const { Router } = require('express');
const axios = require('axios')
const { Recipes, Diet } = require( '../db');
const {
    YOUR_API_KEY
  } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
    const apiInfo = await apiUrl.data.results.map( recipes => {
        return { //sacar los valores que no quiero usar
            id: recipes.id, 
            name: recipes.title,
            image: recipes.image,
            diets: recipes.diets,
            summary: recipes.summary,
            spoonacularScore: recipes.spoonacularScore,
            healthScore: recipes.healthScore,
        }
    })
    return apiInfo
}

const getDbInfo = async () => {
    return await Recipes.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through :{
                attributes: []
            },
        }
    })
}


const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    let infoTotal = [...apiInfo, ...dbInfo] //concateno
    return infoTotal
}

//Como query trabaja igual, no hace falta pasarselo pero voy a estar trabajando con ?name=...
router.get('/', async (req, res) => {
    const name = req.query.name
    let recipesTotal = await getAllRecipes();
     if(name){
         let recipesName = await recipesTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
         recipesName.length?
         res.status(200).send(recipesName) :
         res.status(404).send('No existe el nombre de la receta')
     }
     else{
         res.status(200).send(recipesTotal)
     }
})

 router.get('/:id', async (req, res, next) => {
   try{
   const {id} = req.params
   let recipes
   if( id.length > 8 ) { //es mio 
   recipes = await Recipes.findByPk(id, {
    include: { model: Diet,
        attributes: ['name'],
        through :{
            attributes: []
        },}})
   console.log(recipes)
   res.send(recipes)
    } else { //es de la api
   const response= await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`)
   recipes =  await response.data
   const recipesId =  { //sacar los valores que no quiero usar
             id: recipes.id, 
             name: recipes.title,
             diets: recipes.diets,
             image: recipes.image,
             dishTypes: recipes.dishTypes,
             summary: recipes.summary,
             spoonacularScore: recipes.spoonacularScore,
             healthScore: recipes.healthScore,
             analyzedInstructions: recipes.analyzedInstructions[0]?.steps.map( e => {
                 return {
                    number: e.number,
                    step: e.step
                }
             })
         }
         res.send(recipesId)
    }
   } catch (error) { next (error)}
 })


router.delete('/', (req, res, next) => {
    res.send('soy delete de /recipes')
})

module.exports = router;

