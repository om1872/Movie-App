const { Router } = require('express');
const genre=require('../utils/genre').gen;
const { fetchData } = require('../utils/helper');

const route = Router();

// const API_KEY = "2c295a3ddb6df8ba0220d8ff90ea21ab";
const API_KEY=process.env.API_KEY;


module.exports=route;