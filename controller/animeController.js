const { Router } = require('express');
const genre=require('../utils/genre');
const { fetchData } = require('../utils/helper');

const route = Router();

const API_KEY=process.env.API_KEY;


module.exports=route;