//import "babel-polyfill"
import Person from './Person.js';
const $ = require('jquery')
require('./index.css');
let p = new Person('zhangsan', 20);
document.write(p.say());

$('.bd').append('<p>这是js生成的</p>');


console.log("working");
