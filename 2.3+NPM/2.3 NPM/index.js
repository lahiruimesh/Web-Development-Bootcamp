import {randomSupervillain} from 'supervillains';
import {randomSuperhero} from 'superheroes';

var generateName = require('sillyname');
var sillyName = generateName();

console.log(`My name is ${sillyName}.`);

var superheroes = randomSuperhero();
console.log(`Your superhero name is: ${superheroes}`);


var villName = randomSupervillain();

console.log(`Your supervillain name is: ${villName}`);