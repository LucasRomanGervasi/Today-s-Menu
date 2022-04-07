const { Router } = require('express');
const axios = require('axios')
const { Recipes, Diet } = require( '../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    YOUR_API_KEY
  } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// acá la ruta de /types
// - Obtener todos los tipos de dieta posibles
// - En una primera instancia, cuando no exista ninguno, deberán precargar
//    la base de datos con los tipos de datos indicados por spoonacular 
//    [acá](https://spoonacular.com/food-api/docs#Diets)

const typesDiet = 
[
    //diets
"gluten free",
"ketogenic",
"vegetarian",
"lacto vegetarian",
"ovo vegetarian",
"lacto ovo vegetarian",
"vegan",
"dairy free",
"pescetarian",
"paleo",
"primal",
"low fodmap",
"whole 30"
]

router.get('/', async (req, res, next) => {
    const typesApi = typesDiet
        typesApi.forEach(el => {
            Diet.findOrCreate({ //Se fija si está, si está lo deja y sino lo crea
             where:{
                    name: el
                }
            })
        });
        const allDiets = await Diet.findAll()
        res.send(allDiets)
})

module.exports = router;