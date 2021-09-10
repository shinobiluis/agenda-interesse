<!-- Modal -->
<div class="modal fade" id="agregarTelefonos" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="agregarTelefonosLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="agrearTelefonosLabel">Teléfonos:</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="agregarTelefono" class="row">
                    <div class="col-sm-12">
                        <h5>Teléfono.</h5>
                    </div>
                    <input type="hidden" id="user_id" >
                    <div class="col-sm-6 mt-2 mb-2">
                        <label for="alias_number-add" class="form-label">Alias</label>
                        <input type="text" class="form-control" id="alias_number-add" placeholder="Teléfono casa">
                        <div id="alias_number-validate-add" class="invalid-feedback">
                        </div>
                    </div>
                    <div class="col-sm-6 mt-2 mb-2">
                        <label for="number-add" class="form-label">Teléfono</label>
                        <input type="text" class="form-control" id="number-add" placeholder="5516122064">
                        <div id="number-validate-add" class="invalid-feedback">
                        </div>
                    </div>
                    <hr>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" id="btnAddNumber">Agregar</button>
            </div>
        </div>
    </div>
</div>
