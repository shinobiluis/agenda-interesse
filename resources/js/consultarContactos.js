import Swal from 'sweetalert2';
// metodos
export const consultarContactos = async () =>{
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
                        <button type="button" class="btnAgregarTelefono btn btn-success" data-id="${data[indice].id}" data-bs-toggle="modal" data-bs-target="#agregarTelefonos"><i class="fas fa-plus-circle"></i></button>
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
    document.querySelector('#user_id').value = e.target.dataset.id;
}
