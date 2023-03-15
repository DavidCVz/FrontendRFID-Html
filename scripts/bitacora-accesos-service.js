console.log('ENTRA A BITACORAS DE ACCESOS');

// BOTONES
let btnConsultarBitacoraAccesos = document.querySelector('#btnConsultarBitacoraAccesos');
let btnConsultarActividadTrabajador = document.querySelector('#btnConsultarActividadTrabajador');
let btnResetBuscarTrabajador = document.querySelector('#btnResetBuscarTrabajador');

// CAMPOS
let txtidTrabajadorConsultar = document.querySelector('#idTrabajadorConsultar');

// COMPONENTES
let msjErrorBitacoras = document.querySelector('#msjErrorBitacoras');
let dataSetBitacoraAccesos = [];
let dataSetBitacoraAccesosTrabajador = [];

// EVENTOS
btnConsultarBitacoraAccesos.addEventListener('click', () => {
    ConsultaBitacoraAccesos();
});

btnConsultarActividadTrabajador.addEventListener('click', () => {
    ConsultarActividadTrabajador();
});


// FUNCIONES
async function ConsultaBitacoraAccesos(){
    const { data, status } =  await api.get('/entradasSalidas',{}); 

    // Evalúa si la peticion regresó 200 OK
    if (status !== 200) {
        msjErrorBitacoras.classList.add('alert', 'alert-danger');
        msjErrorBitacoras.innerHTML = `<strong>Error ${status}:</strong> ${data.message}`;
    }else{
        data.forEach(registro => {
            registro.entrada = registro.entrada === 1 ? 'Entrada' : 'Salida';
            dataSetBitacoraAccesosTrabajador.push(Object.values(registro));
        });

        let tablaBitacoras = $('#bitacora-accesos-table').DataTable( {
            data: dataSetBitacoraAccesosTrabajador,
            columns: [
                { title: "No." },
                { title: "Id trabajador" },
                { title: "Código RFID" },
                { title: "Nombre" },
                { title: "Apellido paterno" },
                { title: "Apellido materno" },
                { title: "RFC" },
                { title: "Fecha" },
                { title: "Turno" },
                { title: "Area" },
                { title: "Registro" },
            ],
            "bDestroy": true
        });
    }
}

async function ConsultarActividadTrabajador(){
    const { data, status } =  await api.get(`/EntradasSalidas/historialtrabajador?page=${1}&id=${txtidTrabajadorConsultar.value}`,{});
    
    // Evalúa si la peticion regresó 200 OK
    if (status !== 200) {
        msjErrorBitacoras.classList.add('alert', 'alert-danger');
        msjErrorBitacoras.innerHTML = `<strong>Error ${status}:</strong> ${data.message}`;
    }else{
        data.resultados.forEach(registro => {
            console.log(registro.entrada);
            registro.entrada = registro.entrada === true ? 'Entrada' : 'Salida';
            dataSetBitacoraAccesos.push(Object.values(registro));
        });
        
        let tablaBitacoras = $('#accesos-trabajador-table').DataTable( {
            data: dataSetBitacoraAccesos,
            columns: [
                { title: "No." },
                { title: "Id trabajador" },
                { title: "Código RFID" },
                { title: "Nombre" },
                { title: "Apellido paterno" },
                { title: "Apellido materno" },
                { title: "RFC" },
                { title: "Fecha" },
                { title: "Turno" },
                { title: "Area" },
                { title: "Registro" },
            ],
            "bDestroy": true
        });
    }
}