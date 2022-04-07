const { Router } = require('express');
const recipesRouter = require('./Recipes');
const typesRouter = require('./Types');
const recipeRouter= require('./Recipe')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipesRouter) // /api/recipe/*
router.use('/types', typesRouter) // /api/types/*
router.use('/recipe', recipeRouter) // /api/recipe/


module.exports = router;
