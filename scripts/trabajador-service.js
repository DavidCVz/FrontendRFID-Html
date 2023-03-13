//const URL = 'http://localhost:5242/Trabajador';
console.log('ENTRA A TRABAJADOR SERVICE');

//Botones
let btnConsultarTrabajadores = document.querySelector('#btnConsultarTrabajadores');
let btnRegistrarTrabajador = document.getElementById('btnCrearTrabajador');
let btnEliminarTrabajador = document.getElementById('btnEliminarTrabajador');
let btnBuscarTrabajador = document.getElementById('btnBuscarTrabajador');
let btnGuardarTrabajador = document.getElementById('btnGuardarTrabajador');
let btnResetBuscarTrabajador = document.getElementById('btnResetBuscarTrabajador');
let btnResetCrearTrabajador = document.getElementById('btnResetCrearTrabajador');

//Campos
let txtNombreTrabajadorCrear = document.querySelector('#nombreTrabajadorCrear');
let txtIdTrabajadorCrear = document.querySelector('#idTrabajadorCrear');
let txtIdTrabajadorEliminar = document.querySelector('#idNombreTrabajadorEliminar');
let txtidTrabajadorModificar = document.querySelector('#idTrabajadorModificar');
let txtnombreTrabajadorModificar = document.querySelector('#nombreTrabajadorModificar');
let listaAreaCrear = document.querySelector('#listaAreaCrear');
let listaTurnoCrear = document.querySelector('#listaTurnoCrear');

//Componentes del Html
let msjCrearTrabajador = document.querySelector('#msjCrearTrabajador');
let msjErrorTrabajadores = document.querySelector('#msjErrorTrabajadores');
let msjEliminarTrabajadores = document.querySelector('#msjEliminarTrabajadores');
let msjModificarTrabajador = document.querySelector('#msjModificarTrabajador');

//EVENTOS
btnConsultarTrabajadores.addEventListener('click', () => {
    obtenerTrabajadores();
});

btnRegistrarTrabajador.addEventListener('click', () =>{
    console.log('CLICK REGISTRAR TRABAJADOR');
    //console.log(txtNombreTrabajadorCrear.value);
    registrarTrabajador();
});

btnResetCrearTrabajador.addEventListener('click', () => {
    // Reset de mensajes
    msjCrearTrabajador.classList.remove('alert', 'alert-danger' || 'alert-success');
    msjCrearTrabajador.innerHTML = '';

    // Reset campos
    txtIdTrabajadorCrear.value = '';
    txtNombreTrabajadorCrear.value = '';
});

btnEliminarTrabajador.addEventListener('click', () => {
    eliminarTrabajador();
});

btnBuscarTrabajador.addEventListener('click', () => {
    obtenerTrabajador();
});

btnGuardarTrabajador.addEventListener('click', () => {
    modificarTrabajador();
});

btnResetBuscarTrabajador.addEventListener('click', () => {
    // Reset de campos
    txtidTrabajadorModificar.value = '';
    txtnombreTrabajadorModificar.value = '';
    txtidTrabajadorModificar.removeAttribute("readonly");

    // Reset de mensajes
    msjModificarTrabajador.classList.remove('alert', 'alert-danger');
    msjModificarTrabajador.innerHTML = '';
});


//FUNCIONES DE EVENTOS

async function registrarTrabajador(){

    // Reset de mensajes
    msjCrearTrabajador.classList.remove('alert', 'alert-danger' || 'alert-success');
    msjCrearTrabajador.innerHTML = '';

    // PETICION POST CON AXIOS *****************
    const { data, status } =  await api.post('/Trabajador',{
        TrabajadorID: parseInt(txtIdTrabajadorCrear.value),
        Nombre: String(txtNombreTrabajadorCrear.value),
    });

    if (status !== 200) {
        msjCrearTrabajador.classList.add('alert', 'alert-danger');
        msjCrearTrabajador.innerHTML = ('ERROR: ' + status);
        console.log('ERROR: ' + status);
    }else{
        msjCrearTrabajador.classList.add('alert', 'alert-success');
        msjCrearTrabajador.innerHTML = 'Trabajador creada correctamente';
        console.log({data});
    }
}

async function cargarListaAreasTurnos (listaArea, listaTurno) {
    // Lista las Trabajadores de la BD
    //const {areaData, areaStatus} 
    let dataArea = await api.get('/Area'); 
    if (dataArea.status === 200) {
        dataArea.data.forEach(registro => {
            listaArea.innerHTML += `
                <option value="${registro.areaID}">${registro.nombre}</option>
            `;
        });
    }

    // Lista los turnos de la BD
    //const {turnoData, turnoStatus} 
    let dataTurno = await api.get('/TipoTurno',{}); 
    if (dataTurno.status === 200) {
        dataTurno.data.forEach(registro => {
            console.log(registro);
            listaTurno.innerHTML += `
                <option value="${registro.tipoTurnoID}">${registro.nombre}</option>
            `;
        });
    }
}


async function obtenerTrabajadores(){
    //Reset de mensajes
    msjErrorTrabajadores.classList.remove('alert', 'alert-danger');
    msjErrorTrabajadores.innerHTML = '';
    
    // Dataset que contendra la info que se mostrara en la tabla
    let dataSetTrabajadores = [];

    // PETICION GET CON AXIOS *****************
    const { data, status } =  await api.get('/Trabajador',{}); 

    // Evalúa si la peticion regresó 200 OK
    if (status !== 200) {
        msjErrorTrabajadores.classList.add('alert', 'alert-danger');
        msjErrorTrabajadores.innerHTML = `<strong>Error ${status}:</strong> ${data.message}`;
    }else{
        data.forEach(registro => {
            dataSetTrabajadores.push(Object.values(registro));
        });
        
        let tablaTrabajadores = $('#Trabajadores-table').DataTable( {
            data: dataSetTrabajadores,
            columns: [
            { title: "Id Trabajador" },
            { title: "Nombre" },
            ],
            "bDestroy": true
        });
    }
}


async function eliminarTrabajador(){
    console.log('ENTRA A eliminar');
    console.log(`Valor del campo ${parseInt(txtIdTrabajadorEliminar.value)}`);
    //Reset de mensajes
    msjEliminarTrabajadores.classList.remove('alert', 'alert-danger' || 'alert-success');
    msjEliminarTrabajadores.classList.innerHTML = '';

    console.log('/Trabajador/' + parseInt(txtIdTrabajadorEliminar.value));
    // PETICION DELETE CON AXIOS *****************
    const { data, status } =  await api.delete('/Trabajador/' + parseInt(txtIdTrabajadorEliminar.value)); //${parseInt(txtIdTrabajadorEliminar.value)}
    console.log({status});
    if (status !== 200) {
        console.log('ERROR: ' + status);
        msjEliminarTrabajadores.classList.add('alert', 'alert-danger');
        msjEliminarTrabajadores.innerHTML = `<strong>Error ${status}:</strong> ${data.message}`;
    }else{
        console.log({data});
        msjEliminarTrabajadores.classList.add('alert', 'alert-success');
        msjEliminarTrabajadores.innerHTML = 'Trabajador eliminada correctamente';
    }
}

async function obtenerTrabajador(){
    //Reset de mensajes
    msjModificarTrabajador.classList.remove('alert', 'alert-danger');
    msjModificarTrabajador.innerHTML = '';
    txtidTrabajadorModificar.removeAttribute("readonly", "");

    // Revision de campo vacio
    if (txtidTrabajadorModificar.value === '') { 
        msjModificarTrabajador.classList.add('alert', 'alert-danger');
        msjModificarTrabajador.innerHTML = `Por favor ingrese un <strong>Id</strong>`;
        return; 
    }

    // PETICION GET CON AXIOS *****************
    try{
        const {data, status} = await api.get(`/Trabajador/${parseInt(txtidTrabajadorModificar.value)}`);

        switch(status){
            case 200:
                txtnombreTrabajadorModificar.value = data.nombre;
                txtidTrabajadorModificar.setAttribute("readonly", "");
                break;
            default:
                console.log(`Default: ${error} ---- ${error.response.status}`);
                break;
        }
    }catch(error){
        msjModificarTrabajador.classList.add('alert', 'alert-danger');
        msjModificarTrabajador.innerHTML = `<strong>Error ${error.response.status}:</strong> ${error.response.data}`;
    }
}

async function modificarTrabajador(){
    //Reset de mensajes
    msjModificarTrabajador.classList.remove('alert', 'alert-danger');
    msjModificarTrabajador.innerHTML = '';

    // PETICION PUT CON AXIOS *****************
    try{
        const {data, status} = await api.put(`/Trabajador/${parseInt(txtidTrabajadorModificar.value)}`, {
            Nombre: txtnombreTrabajadorModificar.value,
        });

        switch(status){
            case 200:
                console.log('ENTRA A 200');
                console.log(data);
                msjModificarTrabajador.classList.add('alert', 'alert-success');
                msjModificarTrabajador.innerHTML = data;
                break;
            default:
                console.log(`Default: ${error} ---- ${error.response.status}`);
                break;
        }
    }catch(error){
        msjModificarTrabajador.classList.add('alert', 'alert-danger');
        msjModificarTrabajador.innerHTML = `<strong>Error ${error.response.status}:</strong> ${error.response.data}`;
    }
}


window.onload = () => {
    cargarListaAreasTurnos(listaAreaCrear, listaTurnoCrear);
}

