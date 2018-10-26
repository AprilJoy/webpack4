import Person from './Person.js';
const $ = require('jquery')
require('../css/index.css');
let p = new Person('zhangsan', 21);
document.write(p.say());

$('.bd').append('<p>这是js生成的</p>');


console.log("working-p");
