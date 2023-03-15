console.log('Funcionando');

//CONEXION CON AXIOS
const api = axios.create({
	baseURL: 'http://localhost:5242'
});

//CONEXION CON FETCH
//const URL = 'http://localhost:5242/area';

/* fetch(URL)
    .then(res => res.json())
    .then(data => {
        //console.log({data});
        //console.log(data);
    }); */

/* fetch(URL)
    .then(res => {
        res.json()
        console.log({res});
        if (res.status !== 200) {
            console.log('ERROR 40X');
            msjErrorAreas.classList.add('alert', 'alert-danger');
            msjErrorAreas.innerHTML = `<strong>Error ${res.status}:</strong>`;
        }
        return;
    })
    .then(data => {
        console.log('DATOS CORRECTOS');
        console.log(data.resultados[0]);
    }); */

