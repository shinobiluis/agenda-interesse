<!-- Modal -->
<div class="modal fade" id="editarUsuario" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editarUsuarioLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editarUsuarioLabel">Editar nombre y correo:</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formEditarUsuario" class="row">
                    <div class="col-sm-12">
                        <h5>Editar Nombre y correo.</h5>
                    </div>
                    <input type="hidden" id="user_id_edit" >
                    <div class="col-sm-6 mt-2 mb-2">
                        <label for="name-edit" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="name-edit" placeholder="Luis Eduardo">
                        <div id="name-validate-edit" class="invalid-feedback">
                        </div>
                    </div>
                    <div class="col-sm-6 mt-2 mb-2">
                        <label for="email-edit" class="form-label">Correo:</label>
                        <input type="text" class="form-control" id="email-edit" placeholder="correo@gmail.com">
                        <div id="email-validate-edit" class="invalid-feedback">
                        </div>
                    </div>
                    <hr>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="btnCloseEditUser" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" id="btnEditUser">Agregar</button>
            </div>
        </div>
    </div>
</div>
