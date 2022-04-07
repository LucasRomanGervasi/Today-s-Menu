const { Router } = require('express');
const axios = require('axios')
const { Recipes,Diet } = require( '../db');
const {
    YOUR_API_KEY
  } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res, next) => {
    return Recipes.findAll()
    .then((recipe) => {
    res.send('soy get de /recipe')
    })
    .catch((error) => {
        next(error)
    })
})

// __Ruta de creación de recetas__: debe contener
// - [ ] Un formulario __controlado__ con los siguientes campos
//   - Nombre
//   - Resumen del plato
//   - Puntuación
//   - Nivel de "comida saludable"
//   - Paso a paso
// - [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
// - [ ] Botón/Opción para crear una nueva receta

   
router.post('/', async (req, res, next) => {
    try{
        const {
            name,
            image,
            summary,
            spoonacularScore,
            healthScore,
            analyzedInstructions,
            diets,
            createdInDb} = req.body

    const createdRecipe = await Recipes.create({
        name,
        image,
        summary,
        spoonacularScore,
        healthScore,
        analyzedInstructions,
        createdInDb,
    })
        
          const diet = await Diet.findAll({
            where: { name: diets },
          });
          createdRecipe.addDiet(diet);
    
       console.log(createdRecipe)
        return res.json(createdRecipe);
   } catch(error) {
       next (error)
   }
})


module.exports = router;