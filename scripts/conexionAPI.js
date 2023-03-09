console.log('Funcionando');

const URL = 'http://localhost:5242/area';


fetch(URL)
    .then(res => res.json())
    .then(data => {
        //console.log({data});
        console.log(data[0].nombre);
    });

