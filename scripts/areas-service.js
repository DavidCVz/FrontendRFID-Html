//const URL = 'http://localhost:5242/area';
console.log('ENTRA A AREAS SERVICE');

//https://axios-http.com/docs/config_defaults
const api = axios.create({
    basURL: 'http://localhost:5242/area',
});

//Botones
let btnConsultarTodasAreas = document.querySelector('#btnConsultarTodoAreas');
let btnAgregarArea = document.getElementById('btnCrearArea');

//Campos
let txtNombreAreaCrear = document.querySelector('#nombreAreaCrear');
let txtIdAreaCrear = document.querySelector('#idAreaCrear');

//Componentes del Html
let msjErrorAreas = document.querySelector('#msjErrorAreas');

//EVENTOS
btnConsultarTodasAreas.addEventListener('click', () => {
    obtenerTodasAreas();
});

btnAgregarArea.addEventListener('click', () =>{
    console.log('CLICK AGREGAR AREA');
    //console.log(txtNombreAreaCrear.value);
    registrarArea();
});


//FUNCIONES DE EVENTOS
async function obtenerTodasAreas(){
    //Reset de mensajes
    msjErrorAreas.classList.remove('alert', 'alert-danger');
    msjErrorAreas.classList.innerHTML = '';
    
    //
    let dataSetAreas = [];
    //$("#areas-table").dataTable().fnDestroy();
    
    // Realiza la petición en el endpoint
    const resultado = await fetch(URL);
    // Obtiene una instancia del resultado y lo transforma en Json
    const data = await resultado.json();
    
    // Evalúa si la peticion regresó 200 OK
    if (resultado.status !== 200) {
        msjErrorAreas.classList.add('alert', 'alert-danger');
        msjErrorAreas.innerHTML = `<strong>Error ${resultado.status}:</strong> ${data.message}`;
    }else{
        data.forEach(registro => {
            dataSetAreas.push(Object.values(registro));
        });
        
        let tablaAreas = $('#areas-table').DataTable( {
            data: dataSetAreas,
            columns: [
            { title: "Id Area" },
            { title: "Nombre" },
            ],
            "bDestroy": true
        });
    }
}

async function registrarArea(){
    // Realiza la petición POST en el endpoint USANDO FETCH --------------
    console.log(parseInt(txtIdAreaCrear.value));
    console.log(String(txtNombreAreaCrear.value));
    const resultado = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            AreaID: parseInt(txtIdAreaCrear.value),
            Nombre: String(txtNombreAreaCrear.value),
        }),
    }).catch(error => {console.log(error)});
    console.log("Termina FETCh");
    const data = await resultado.json();

    if (resultado.status !== 200) {
        console.log('ERROR: ' + resultado.status);
    }else{
        console.log({data});
    }

    // PETICION POST CON AXIOS
}

