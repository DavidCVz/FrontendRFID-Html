//const URL = 'http://localhost:5242/Trabajador';
console.log('ENTRA A TRABAJADOR SERVICE');

// Variables
let datosAreas = [];
let datosTurnos = [];

//Botones
let btnConsultarTrabajadores = document.querySelector('#btnConsultarTrabajadores');
let btnRegistrarTrabajador = document.getElementById('btnCrearTrabajador');
let btnEliminarTrabajador = document.getElementById('btnEliminarTrabajador');

let btnBuscarTrabajador = document.getElementById('btnBuscarTrabajador');
let btnGuardarTrabajador = document.getElementById('btnGuardarTrabajador');

let btnResetBuscarTrabajador = document.getElementById('btnResetBuscarTrabajador');
let btnResetCrearTrabajador = document.getElementById('btnResetCrearTrabajador');

//Campos CREAR
let txtrfidCodeCrear = document.querySelector('#rfidCodeCrear');
let txtnombresTrabajadorCrear = document.querySelector('#nombresTrabajadorCrear');
let txtapellidoPaternoCrear = document.querySelector('#apellidoPaternoCrear');
let txtapellidoMaternoCrear = document.querySelector('#apellidoMaternoCrear');
let txtrfcCrear = document.querySelector('#rfcCrear');
let txtcurpCrear = document.querySelector('#curpCrear');
let txtemailCrear = document.querySelector('#emailCrear');

let listaAreasCrear = document.querySelector('#listaAreas');
let listaTurnosCrear = document.querySelector('#listaTurnos');

//Campos ELIMINAR
let txtidTrabajadorEliminar = document.querySelector('#idTrabajadorEliminar');

//Campos Modificar
let txtidTrabajadorModificar = document.querySelector('#idTrabajadorModificar');

let txtrfidCodeModificar = document.querySelector('#rfidCodeModificar');
let txtnombresTrabajadorModificar = document.querySelector('#nombresTrabajadorModificar');
let txtapellidoPaternoModificar = document.querySelector('#apellidoPaternoModificar');
let txtapellidoMaternoModificar = document.querySelector('#apellidoMaternoModificar');
let txtrfcModificar = document.querySelector('#rfcModificar');
let txtcurpModificar = document.querySelector('#curpModificar');
let txtemailModificar = document.querySelector('#emailModificar');

let listaAreas = document.querySelector('#listaAreas');
let listaTurnos = document.querySelector('#listaTurnos');
let listaAreasModificar = document.querySelector('#listaAreasModificar');
let listaTurnosModificar = document.querySelector('#listaTurnosModificar');

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

btnEliminarTrabajador.addEventListener('click', () => {
    eliminarTrabajador();
});

btnBuscarTrabajador.addEventListener('click', () => {
    obtenerTrabajadorModificar();
});

btnGuardarTrabajador.addEventListener('click', () => {
    modificarTrabajador();
});


//FUNCIONES DE EVENTOS

async function registrarTrabajador(){

    // Reset de mensajes
    msjCrearTrabajador.classList.remove('alert', 'alert-danger' || 'alert-success');
    msjCrearTrabajador.innerHTML = '';

    // PETICION POST CON AXIOS *****************
    const { data, status } =  await api.post('/Trabajador',{
        RfidCode: txtrfidCodeCrear.value,
        Nombres: txtnombresTrabajadorCrear.value,
        A_Paterno: txtapellidoPaternoCrear.value,
        A_Materno: txtapellidoMaternoCrear.value,
        Rfc: txtrfcCrear.value,
        Curp: txtcurpCrear.value,
        Email: txtemailCrear.value,
        AreaID: parseInt(listaAreasCrear.value),
        TipoTurnoID:parseInt(listaTurnosCrear.value),
    });

    if (status !== 200) {
        msjCrearTrabajador.classList.add('alert', 'alert-danger');
        msjCrearTrabajador.innerHTML = ('ERROR: ' + status);
        console.log('ERROR: ' + status);
    }else{
        msjCrearTrabajador.classList.add('alert', 'alert-success');
        msjCrearTrabajador.innerHTML = 'Trabajador registrado correctamente';
        console.log({data});
    }
}

async function cargarListaAreasTurnos (listaArea1, listaTurno1, listaArea2, listaTurno2) {
    // Lista las Trabajadores de la BD
    //const {areaData, areaStatus} 
    let dataArea = await api.get('/Area'); 
    if (dataArea.status === 200) {
        dataArea.data.forEach(registro => {
            listaArea1.innerHTML += `
                <option value="${registro.areaID}">${registro.nombre}</option>
            `;
            listaArea2.innerHTML += `
                <option value="${registro.areaID}">${registro.nombre}</option>
            `;
        });
    }

    // Lista los turnos de la BD
    //const {turnoData, turnoStatus} 
    let dataTurno = await api.get('/TipoTurno',{}); 
    if (dataTurno.status === 200) {
        dataTurno.data.forEach(registro => {
            listaTurno1.innerHTML += `
                <option value="${registro.tipoTurnoID}">${registro.nombre}</option>
            `;
            listaTurno2.innerHTML += `
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
            //console.log((datosAreas[registro.areaID].areaID - 1));
            registro.areaID = datosAreas[(registro.areaID - 1)].nombre;
            registro.tipoTurnoID = datosTurnos[(registro.tipoTurnoID - 1)].nombre;
            dataSetTrabajadores.push(Object.values(registro));
        });
        
        let tablaTrabajadores = $('#Trabajadores-table').DataTable( {
            data: dataSetTrabajadores,
            columns: [
            { title: "Id Trabajador" },
            { title: "Area" },
            { title: "Turno" },
            { title: "Código RFID" },
            { title: "Nombre" },
            { title: "Apellido paterno" },
            { title: "Apellido materno" },
            { title: "RFC" },
            { title: "CURP" },
            { title: "Email" },
            ],
            "bDestroy": true
        });
    }
}

async function eliminarTrabajador(){
    console.log('ENTRA A eliminar');
    console.log(`Valor del campo ${parseInt(txtidTrabajadorEliminar.value)}`);
    //Reset de mensajes
    msjEliminarTrabajadores.classList.remove('alert', 'alert-danger' || 'alert-success');
    msjEliminarTrabajadores.classList.innerHTML = '';

    console.log('/Trabajador/' + parseInt(txtidTrabajadorEliminar.value));
    // PETICION DELETE CON AXIOS *****************
    const { data, status } =  await api.delete('/Trabajador/' + txtidTrabajadorEliminar.value); //${parseInt(txtIdTrabajadorEliminar.value)}
    console.log({status});
    if (status !== 200) {
        console.log('ERROR: ' + status);
        msjEliminarTrabajadores.classList.add('alert', 'alert-danger');
        msjEliminarTrabajadores.innerHTML = `<strong>Error ${status}:</strong> ${data.message}`;
    }else{
        msjEliminarTrabajadores.classList.add('alert', 'alert-success');
        msjEliminarTrabajadores.innerHTML = 'Trabajador eliminada correctamente';
    }
}

async function obtenerTrabajadorModificar(){
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
        const {data, status} = await api.get(`/Trabajador/${txtidTrabajadorModificar.value}`);
        console.log(data);
        switch(status){
            case 200:
                txtrfidCodeModificar.value = data.rfidCode;
                txtnombresTrabajadorModificar.value = data.nombres;
                txtapellidoPaternoModificar.value = data.a_Paterno;
                txtapellidoMaternoModificar.value = data.a_Materno;
                txtrfcModificar.value = data.rfc;
                txtcurpModificar.value = data.curp;
                txtemailModificar.value = data.email;
                listaAreasModificar.value = data.areaID;
                listaTurnosModificar.value = data.tipoTurnoID;                
                txtidTrabajadorModificar.setAttribute("readonly", "");
                break;
            default:
                console.log(`Default: ${error} ---- ${error.response.status}`);
                break;
        }
    }catch(error){
        console.log(error);
        msjModificarTrabajador.classList.add('alert', 'alert-danger');
        msjModificarTrabajador.innerHTML = `<strong>Error ${error}:</strong> ${error}`;
    }
}

async function modificarTrabajador(){
    //Reset de mensajes
    msjModificarTrabajador.classList.remove('alert', 'alert-danger');
    msjModificarTrabajador.innerHTML = '';

    // PETICION PUT CON AXIOS *****************
    try{
        const {data, status} = await api.put(`/Trabajador/${parseInt(txtidTrabajadorModificar.value)}`, {
            Nombres: txtnombresTrabajadorModificar.value,
            AreaID: listaAreasModificar.value,
            TipoTurnoID: listaTurnosModificar.value,
            RfidCode: txtrfidCodeModificar.value,
            A_Paterno: txtapellidoPaternoModificar.value,
            A_Materno: txtapellidoMaternoModificar.value,
            Rfc: txtrfcModificar.value,
            Curp: txtcurpModificar.value,
            Email: txtemailModificar.value,
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
        msjModificarTrabajador.innerHTML = `<strong>Error ${error}:</strong> ${error}`;
    }
}

// FUNCIONES SIMPLES ***********************************************

btnResetCrearTrabajador.addEventListener('click', () => {
    // Reset de mensajes
    msjCrearTrabajador.classList.remove('alert', 'alert-danger' || 'alert-success');
    msjCrearTrabajador.innerHTML = '';

    // Reset campos
    txtrfidCodeCrear.value = '';
    txtnombresTrabajadorCrear.value = '';
    txtapellidoPaternoCrear.value = '';
    txtapellidoMaternoCrear.value = '';
    txtrfcCrear.value = '';
    txtcurpCrear.value = '';
    txtemailCrear.value = '';
    listaAreaCrear.value = 1;
    listaTurnoCrear.value = 1;

});

btnResetBuscarTrabajador.addEventListener('click', () => {
    // Reset de campos
    txtidTrabajadorModificar.removeAttribute("readonly");

    txtidTrabajadorModificar.value = '';
    txtrfidCodeModificar.value = '';
    txtnombresTrabajadorModificar.value = '';
    txtapellidoPaternoModificar.value = '';
    txtapellidoMaternoModificar.value = '';
    txtrfcModificar.value = '';
    txtcurpModificar.value = '';
    txtemailModificar.value = '';
    listaAreaModificar.value = 1;
    listaTurnoModificar.value = 1;

    // Reset de mensajes
    msjModificarTrabajador.classList.remove('alert', 'alert-danger');
    msjModificarTrabajador.innerHTML = '';
});

async function obtenerDatosAreas(){
    const { data, status } =  await api.get('/area',{}); 
    data.forEach(element => {
        datosAreas.push(element);
    });
};

async function obtenerDatosTurnos(){
    const { data, status } =  await api.get('/tipoturno',{}); 
    data.forEach(element => {
        datosTurnos.push(element);
    });
}

const mostrarAreas = () => {
    console.log(datosAreas);
}

const mostrarTurnos = () => {
    console.log(datosTurnos);
}

window.onload = () => {
    cargarListaAreasTurnos(listaAreas, listaTurnos, listaAreasModificar, listaTurnosModificar);
    obtenerDatosAreas();
    mostrarAreas();
    obtenerDatosTurnos();
    mostrarTurnos();
}

