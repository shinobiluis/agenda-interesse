// Validamos que los ningun campo este vacio antes de enviar
// El metodo retorna falso si encuentra un valor vacio 
// Si no hay valores vacios retorna true.
export const validarForm = ( form ) => {
    for (let clave in form){
        if( form[clave] == "" ){
            return false;
        }
    }
    return true;
}
