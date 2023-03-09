//const URL = 'http://localhost:5242/area';
let btnConsultarTodasAreas = document.querySelector('#btnConsultarTodoAreas');

btnConsultarTodasAreas.addEventListener('click', () => {
    let dataSetAreas = [];
    //$("#areas-table").dataTable().fnDestroy();

    fetch(URL)
        .then(res => res.json())
        .then(data => {

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
    });


});

