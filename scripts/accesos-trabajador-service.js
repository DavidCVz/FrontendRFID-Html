let txtrfidCodeAcceso = document.querySelector('#rfidCodeAcceso');
let msjRegistroAcceso = document.querySelector('#msjRegistroAcceso');

txtrfidCodeAcceso.addEventListener('input', () => {
    RegistrarAcceso();
});

async function RegistrarAcceso(){
    if (txtrfidCodeAcceso.value.length === 10) {
        await api.post('/EntradasSalidas',{
            RfidCode: txtrfidCodeAcceso.value,
        }).then((datos) => {
            console.log(datos);
            console.log(datos.data);
            if (datos.data === 1) {
                console.log('ENTRA A IF');
                console.log(txtrfidCodeAcceso);

                msjRegistroAcceso.classList.add('alert', 'alert-success');
                msjRegistroAcceso.innerHTML = `<strong>Acceso correcto</strong>`;

                txtrfidCodeAcceso.setAttribute("data-swal", "auto-close-rfid-success");
                // Mensaje de acceso satisfactorio
                txtrfidCodeAcceso.classList.add('trigger-swal');
                txtrfidCodeAcceso.value = '';
            }else{
                console.log('ENTRA A ELSE');
                msjRegistroAcceso.classList.add('alert', 'alert-danger');
                msjRegistroAcceso.innerHTML = `<strong>Tarjeta no valida</strong>`;
                txtrfidCodeAcceso.setAttribute("data-swal", "auto-close-rfid-warning");
                // Mensaje de acceso satisfactorio
                txtrfidCodeAcceso.classList.add('trigger-swal');
                txtrfidCodeAcceso.value = '';
            }
        });
    }else{
        msjRegistroAcceso.classList.remove('alert', 'alert-danger' || 'alert-success');
        msjRegistroAcceso.classList.innerHTML = '';

        txtrfidCodeAcceso.removeAttribute("data-swal");
        txtrfidCodeAcceso.classList.remove('trigger-swal');
    }
}

