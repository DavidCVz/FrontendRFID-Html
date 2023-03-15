//const URL = 'http://localhost:5242/area';
console.log('ENTRA A AREAS SERVICE');

//Botones
let btnConsultarTodasAreas = document.querySelector('#btnConsultarTodoAreas');
let btnAgregarArea = document.getElementById('btnCrearArea');
let btnEliminarArea = document.getElementById('btnEliminarArea');
let btnBuscarArea = document.getElementById('btnBuscarArea');
let btnGuardarArea = document.getElementById('btnGuardarArea');
let btnResetBuscarArea = document.getElementById('btnResetBuscarArea');
let btnResetCrearArea = document.getElementById('btnResetCrearArea');

//Campos
let txtNombreAreaCrear = document.querySelector('#nombreAreaCrear');
let txtIdAreaCrear = document.querySelector('#idAreaCrear');
let txtIdAreaEliminar = document.querySelector('#idNombreAreaEliminar');
let txtidAreaModificar = document.querySelector('#idAreaModificar');
let txtnombreAreaModificar = document.querySelector('#nombreAreaModificar');

//Componentes del Html
let msjCrearArea = document.querySelector('#msjCrearArea');
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

btnResetCrearArea.addEventListener('click', () => {
    // Reset de mensajes
    msjCrearArea.classList.remove('alert', 'alert-danger' || 'alert-success');
    msjCrearArea.innerHTML = '';

    // Reset campos
    txtIdAreaCrear.value = '';
    txtNombreAreaCrear.value = '';
})

btnEliminarArea.addEventListener('click', () => {
    eliminarArea();
});

btnBuscarArea.addEventListener('click', () => {
    obtenerArea();
});

btnGuardarArea.addEventListener('click', () => {
    modificarArea();
});

btnResetBuscarArea.addEventListener('click', () => {
    // Reset de campos
    txtidAreaModificar.value = '';
    txtnombreAreaModificar.value = '';
    txtidAreaModificar.removeAttribute("readonly");

    // Reset de mensajes
    msjModificarArea.classList.remove('alert', 'alert-danger');
    msjModificarArea.innerHTML = '';
})


//FUNCIONES DE EVENTOS

async function registrarArea(){

    // Reset de mensajes
    msjCrearArea.classList.remove('alert', 'alert-danger' || 'alert-success');
    msjCrearArea.innerHTML = '';

    // PETICION POST CON AXIOS *****************
    const { data, status } =  await api.post('/area',{
        AreaID: parseInt(txtIdAreaCrear.value),
        Nombre: String(txtNombreAreaCrear.value),
    });

    if (status !== 200) {
        msjCrearArea.classList.add('alert', 'alert-danger');
        msjCrearArea.innerHTML = ('ERROR: ' + status);
        console.log('ERROR: ' + status);
    }else{
        msjCrearArea.classList.add('alert', 'alert-success');
        msjCrearArea.innerHTML = 'Area creada correctamente';
        console.log({data});
    }
    // Realiza la petición POST en el endpoint USANDO FETCH --------------
    /*const resultado = await fetch(URL, {
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
}


async function obtenerAreas(){
    //Reset de mensajes
    msjErrorAreas.classList.remove('alert', 'alert-danger');
    msjErrorAreas.innerHTML = '';
    
    // Dataset que contendra la info que se mostrara en la tabla
    let dataSetAreas = [];
    //$("#areas-table").dataTable().fnDestroy();

    // PETICION GET CON AXIOS *****************
    const { data, status } =  await api.get('/area',{}); 

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
    msjModificarArea.innerHTML = '';
    txtidAreaModificar.removeAttribute("readonly", "");

    // Revision de campo vacio
    if (txtidAreaModificar.value === '') { 
        msjModificarArea.classList.add('alert', 'alert-danger');
        msjModificarArea.innerHTML = `Por favor ingrese un <strong>Id</strong>`;
        return; 
    }

    // PETICION GET CON AXIOS *****************
    try{
        const {data, status} = await api.get(`/area/${parseInt(txtidAreaModificar.value)}`);

        switch(status){
            case 200:
                txtnombreAreaModificar.value = data.nombre;
                txtidAreaModificar.setAttribute("readonly", "");
                break;
            default:
                console.log(`Default: ${error} ---- ${error.response.status}`);
                break;
        }
    }catch(error){
        msjModificarArea.classList.add('alert', 'alert-danger');
        msjModificarArea.innerHTML = `<strong>Error ${error.response.status}:</strong> ${error.response.data}`;
    }
}

async function modificarArea(){
    //Reset de mensajes
    msjModificarArea.classList.remove('alert', 'alert-danger');
    msjModificarArea.innerHTML = '';

    // PETICION PUT CON AXIOS *****************
    try{
        const {data, status} = await api.put(`/area/${parseInt(txtidAreaModificar.value)}`, {
            Nombre: txtnombreAreaModificar.value,
        });

        switch(status){
            case 200:
                console.log('ENTRA A 200');
                console.log(data);
                msjModificarArea.classList.add('alert', 'alert-success');
                msjModificarArea.innerHTML = data;
                break;
            default:
                console.log(`Default: ${error} ---- ${error.response.status}`);
                break;
        }
    }catch(error){
        msjModificarArea.classList.add('alert', 'alert-danger');
        msjModificarArea.innerHTML = `<strong>Error ${error.response.status}:</strong> ${error.response.data}`;
    }
}
