require('./bootstrap');
// importamos Swall
import Swal from 'sweetalert2';
/****** variables ******/
const btnAddContact = document.querySelector('#btnAddContact');
const bodyTable = document.querySelector('#bodyTable');
const telefonosContacto = document.querySelector('#telefonosContacto');

/****** Funciones ******/
// agregar contacto
const agregarContacto = async () => {
    // creamos el formulario
    const form = crearFormulario();
    // limpiamos los errores del formulario
    limpiarErrores( form );
    // validamos que el formulario no tenga registros vacios
    const validar = validarForm( form );
    // si la validacion es false notificamos el error
    if( validar == false ){
        notificacion( 'Error...!', 'Uno o mas campos estan vacios', 'error' );
    }else{
        // en caso de que no existan campos vacios realizamos la peticion
        const respuesta = await enviar( form );
        console.log( 'respuesta', respuesta )
        if( respuesta.status == true ){
            notificacion( 'Bien...!', 'Registro correcto', 'success' );
            consultarContactos();
        }else{
            notificacion( 'Error...!', 'Uno o mas campos tienen error', 'error' );
            notificarErrores( respuesta.errores );
        }
    }
}
// Metodo para enviar informacion
const enviar = async ( form ) => {
    try{
        const response = await axios.post("http://agenda-interesse.kame.house/api/users", form);
        const data = await response.data;
        // limpiiamos el formulario y cerramos la modal
        document.getElementById("formAddContact").reset();
        document.getElementById('btnCloseModal').click();
        return data;
    }catch (err) {
        // en caso de retornar un 422 de validacion del formulario
        // console.log(err.response.data)
        return err.response.data;
    }
}

// metodo para notificar errores en el formulario
const notificarErrores = ( errores ) => {
    for (let clave in errores){
        const elemento = `#${clave}`; 
        const elementoError = `#${clave}-validate`;
        document.querySelector(elemento).classList.add('is-invalid');
        document.querySelector(elementoError).innerHTML =errores[clave][0];
    }
}

// metodo para limpiarErrores del fomulario 
const limpiarErrores = ( form ) => {
    for (let clave in form){
        const elemento = `#${clave}`; 
        document.querySelector(elemento).classList.remove('is-invalid');
    }
}

// Metodo para crear la informacion del formulario
const crearFormulario = () => {
    const form = {
        'name': document.querySelector('#name').value.trim(),
        'email':document.querySelector('#email').value.trim(),
        'alias_number':document.querySelector('#alias_number').value.trim(),
        'number':document.querySelector('#number').value.trim(),
        'alias_direction':document.querySelector('#alias_direction').value.trim(),
        'direction':document.querySelector('#direction').value.trim(),
        'postal_code':document.querySelector('#postal_code').value.trim()
    }
    return form;
}

// metodo de swall
const notificacion = ( title, text, icon ) => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
    })
}

// Validamos que los ningun campo este vacio antes de enviar
// El metodo retorna falso si encuentra un valor vacio 
// Si no hay valores vacios retorna true.
const validarForm = ( form ) => {
    for (let clave in form){
        if( form[clave] == "" ){
            return false;
        }
    }
    return true;
}


// metodos
const consultarContactos = async () =>{
    const response = await axios.get("http://agenda-interesse.kame.house/api/users");
    const data = await response.data.data;
    if( data.length == 0 ){
        bodyTable.innerHTML = '';
    }else{
        crearFilas( data );
    }
}

const crearFilas = ( data ) => {
    let html = '';
    data.forEach( function(valor, indice, array) {
        html += `
            <tr>
                <td>${indice + 1}</td>
                <td>${data[indice].nombre}</td>
                <td>${data[indice].email}</td>
                <td>${data[indice].direccion.direccion}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" class="btnEliminar btn btn-danger" data-id="${data[indice].id}"><i class="fas fa-trash-alt"></i></button>
                        <button type="button" class="btnVerTelefonos btn btn-warning" data-id="${data[indice].id}" data-bs-toggle="modal" data-bs-target="#verTelefonos">
                        <i class="fas fa-eye"></i></button>
                        <button type="button" class="btnAgregarTelefono btn btn-success" data-id="${data[indice].id}"><i class="fas fa-plus-circle"></i></button>
                    </div>
                </td>
            </tr>
        `
        bodyTable.innerHTML = html;
        agregarEventosBotonesTabla();
    });
}
const agregarEventosBotonesTabla = () =>{
    // agregamos eventos a los botones
    var btnEliminar = document.getElementsByClassName("btnEliminar");
    var btnVerTelefonos = document.getElementsByClassName("btnVerTelefonos");
    var btnAgregarTelefono = document.getElementsByClassName("btnAgregarTelefono");
    for (var i = 0; i < btnEliminar.length; i++) {
        btnEliminar[i].addEventListener('click', eliminarRegistro, false);
    }
    for (var i = 0; i < btnVerTelefonos.length; i++) {
        btnVerTelefonos[i].addEventListener('click', verTelefonos, false);
    }
    for (var i = 0; i < btnAgregarTelefono.length; i++) {
        btnAgregarTelefono[i].addEventListener('click', agregarTelefonos, false);
    }
}
const eliminarRegistro = async (e) => {
    const response = await axios.delete(`http://agenda-interesse.kame.house/api/users/${e.target.dataset.id}`);
    const data = await response.data;
    if( data.status == true ){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro eliminado',
            showConfirmButton: false,
            timer: 1500
        })    
        consultarContactos();
    }
}
const verTelefonos = async (e) => {
    // http://agenda-interesse.kame.house/api/users/11
    const response = await axios.get(`http://agenda-interesse.kame.house/api/users/${e.target.dataset.id}`);
    const data = await response.data.data.telefonos;
    console.log(data)
    // pintamos los telefonos en la vista
    let html = '<ul class="list-group">';
    data.forEach( function(valor, indice, array) {
        html += `
        <li class="list-group-item">${data[indice].alias_numero}: ${data[indice].numero}</li>
        `
    });
    html += '</ul>';
    telefonosContacto.innerHTML = html;
}
const agregarTelefonos = (e) => {
    console.log( "agregar Telefonos" );
}

/****** AddEvents ******/
const addEventsListener = () =>{
    btnAddContact.addEventListener("click", agregarContacto);
}
// Iniciamos los eventos
addEventsListener();

// Consultamos los contactos de inicio
consultarContactos();
