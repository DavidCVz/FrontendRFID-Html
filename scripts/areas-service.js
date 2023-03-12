//const URL = 'http://localhost:5242/area';
console.log('ENTRA A AREAS SERVICE');


//Botones
let btnConsultarTodasAreas = document.querySelector('#btnConsultarTodoAreas');
let btnAgregarArea = document.getElementById('btnCrearArea');
let btnEliminarArea = document.getElementById('btnEliminarArea');
let btnBuscarArea = document.getElementById('btnBuscarArea');
let btnGuardarArea = document.getElementById('btnGuardarArea');

//Campos
let txtNombreAreaCrear = document.querySelector('#nombreAreaCrear');
let txtIdAreaCrear = document.querySelector('#idAreaCrear');
let txtIdAreaEliminar = document.querySelector('#idNombreAreaEliminar');
let txtidAreaModificar = document.querySelector('#idAreaModificar');
let txtnombreAreaModificar = document.querySelector('#nombreAreaModificar');

//Componentes del Html
let msjErrorAreas = document.querySelector('#msjErrorAreas');
let msjEliminarAreas = document.querySelector('#msjEliminarAreas');
let msjModificarArea = document.querySelector('#msjModificarArea');

//EVENTOS
btnConsultarTodasAreas.addEventListener('click', () => {
    obtenerAreas();
});

btnAgregarArea.addEventListener('click', () =>{
    console.log('CLICK AGREGAR AREA');
    //console.log(txtNombreAreaCrear.value);
    registrarArea();
});

btnEliminarArea.addEventListener('click', () => {
    eliminarArea();
});

btnBuscarArea.addEventListener('click', () => {
    obtenerArea();
});

btnGuardarArea.addEventListener('click', () => {
    
});


//FUNCIONES DE EVENTOS
async function obtenerAreas(){
    //Reset de mensajes
    msjErrorAreas.classList.remove('alert', 'alert-danger');
    msjErrorAreas.classList.innerHTML = '';
    
    // Dataset que contendra la info que se mostrara en la tabla
    let dataSetAreas = [];
    //$("#areas-table").dataTable().fnDestroy();

    // PETICION GET CON AXIOS *****************
    const { data, status } =  await api.get('/area',{});

    // PETICION GET CON FETCH *****************
    /*  // Realiza la petición en el endpoint
    const resultado = await fetch(URL);
    // Obtiene una instancia del resultado y lo transforma en Json
    const data = await resultado.json(); */    

    // Evalúa si la peticion regresó 200 OK
    if (status !== 200) {
        msjErrorAreas.classList.add('alert', 'alert-danger');
        msjErrorAreas.innerHTML = `<strong>Error ${status}:</strong> ${data.message}`;
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
    // PETICION GET CON AXIOS *****************
    const { data, status } =  await api.post('/area',{
        AreaID: parseInt(txtIdAreaCrear.value),
        Nombre: String(txtNombreAreaCrear.value),
    });

    // Realiza la petición POST en el endpoint USANDO FETCH --------------
    console.log(parseInt(txtIdAreaCrear.value));
    console.log(String(txtNombreAreaCrear.value));
/*     const resultado = await fetch(URL, {
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
    const data = await resultado.json(); */

    if (status !== 200) {
        console.log('ERROR: ' + status);
    }else{
        console.log({data});
    }

    // PETICION POST CON AXIOS
}

async function eliminarArea(){
    console.log('ENTRA A eliminar');
    console.log(`Valor del campo ${parseInt(txtIdAreaEliminar.value)}`);
    //Reset de mensajes
    msjEliminarAreas.classList.remove('alert', 'alert-danger' || 'alert-success');
    msjEliminarAreas.classList.innerHTML = '';

    console.log('/area/' + parseInt(txtIdAreaEliminar.value));
    // PETICION DELETE CON AXIOS *****************
    const { data, status } =  await api.delete('/area/' + parseInt(txtIdAreaEliminar.value)); //${parseInt(txtIdAreaEliminar.value)}
    console.log({status});
    if (status !== 200) {
        console.log('ERROR: ' + status);
        msjEliminarAreas.classList.add('alert', 'alert-danger');
        msjEliminarAreas.innerHTML = `<strong>Error ${status}:</strong> ${data.message}`;
    }else{
        console.log({data});
        msjEliminarAreas.classList.add('alert', 'alert-success');
        msjEliminarAreas.innerHTML = 'Area eliminada correctamente';
    }
}

async function obtenerArea(){
    //Reset de mensajes
    msjModificarArea.classList.remove('alert', 'alert-danger');
    msjModificarArea.classList.innerHTML = '';

    // PETICION GET CON AXIOS *****************
    const { data, status } =  await api.get(`/area/${parseInt(txtidAreaModificar.value)}`);

    console.log(status);
    if (status === 200) {
        txtnombreAreaModificar.value = data.nombre;
        console.log(data.nombre);
    }else{
        msjModificarArea.classList.add('alert', 'alert-danger');
        msjModificarArea.classList.innerHTML = `${data.message}`;
    }
}





