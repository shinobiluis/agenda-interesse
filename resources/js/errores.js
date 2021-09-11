// metodo para limpiarErrores del fomulario 
export const limpiarErrores = ( form ) => {
    for (let clave in form){
        const elemento = `#${clave}`; 
        document.querySelector(elemento).classList.remove('is-invalid');
    }
}
// metodo para notificar errores en el formulario
export const notificarErrores = ( errores ) => {
    for (let clave in errores){
        const elemento = `#${clave}`; 
        const elementoError = `#${clave}-validate`;
        document.querySelector(elemento).classList.add('is-invalid');
        document.querySelector(elementoError).innerHTML =errores[clave][0];
    }
}
// metodo para notificar errores en el formulario al agregar un telefono
export const notificarErroresTelefono = ( errores ) => {
    for (let clave in errores){
        const elemento = `#${clave}-add`; 
        const elementoError = `#${clave}-validate-add`;
        document.querySelector(elemento).classList.add('is-invalid');
        document.querySelector(elementoError).innerHTML =errores[clave][0];
    }
}

// metodo para notificar errores en el formulario al editar usuario
export const notificarErroresEditarUsuario = ( errores ) => {
    for (let clave in errores){
        const elemento = `#${clave}-edit`; 
        const elementoError = `#${clave}-validate-edit`;
        document.querySelector(elemento).classList.add('is-invalid');
        document.querySelector(elementoError).innerHTML =errores[clave][0];
    }
}
