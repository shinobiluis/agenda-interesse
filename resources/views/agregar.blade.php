<!-- Button trigger modal -->
<div class="wrapperAddContact">
    <button type="button" class="btn btn-primary rounded-circle" data-bs-toggle="modal" data-bs-target="#agregarContacto">
        +
    </button>
</div>
<!-- Modal -->
<div class="modal fade" id="agregarContacto" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="agregarContactoLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="agregarContactoLabel">Agregar contacto.</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formAddContact" class="row">
                    <div class="col-sm-12">
                        <h5>Contacto.</h5>
                    </div>
                    <div class="col-sm-6 mt-2 mb-2">
                        <label for="name" class="form-label">Nombre</label>
                        <input type="text" class="form-control " id="name" placeholder="Nombre">
                        <div id="name-validate" class="invalid-feedback">
                        </div>
                    </div>
                    <div class="col-sm-6 mt-2 mb-2">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="name@example.com">
                        <div id="email-validate" class="invalid-feedback">
                        </div>
                    </div>
                    <hr>
                    <div class="col-sm-12">
                        <h5>Teléfono.</h5>
                    </div>
                    <div class="col-sm-6 mt-2 mb-2">
                        <label for="alias_number" class="form-label">Alias</label>
                        <input type="text" class="form-control" id="alias_number" placeholder="Teléfono casa">
                        <div id="alias_number-validate" class="invalid-feedback">
                        </div>
                    </div>
                    <div class="col-sm-6 mt-2 mb-2">
                        <label for="number" class="form-label">Teléfono</label>
                        <input type="text" class="form-control" id="number" placeholder="5516122064">
                        <div id="number-validate" class="invalid-feedback">
                        </div>
                    </div>
                    <hr>
                    <div class="col-sm-12">
                        <h5>Dirección.</h5>
                    </div>
                    <div class="col-sm-6 mt-2 mb-2">
                        <label for="alias_direction" class="form-label">Alias</label>
                        <input type="text" class="form-control" id="alias_direction" placeholder="Casa">
                        <div id="alias_direction-validate" class="invalid-feedback">
                        </div>
                    </div>
                    <div class="col-sm-6 mt-2 mb-2">
                        <label for="direction" class="form-label">Dirección</label>
                        <input type="text" class="form-control" id="direction" placeholder="Lago Winnipeg 139">
                        <div id="direction-validate" class="invalid-feedback">
                        </div>
                    </div>
                    <div class="col-sm-6 mt-2 mb-2">
                        <label for="postal_code" class="form-label">Codigo postal</label>
                        <input type="text" class="form-control" id="postal_code" placeholder="55040">
                        <div id="postal_code-validate" class="invalid-feedback">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="btnCloseModal" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" id="btnAddContact">Agregar</button>
            </div>
        </div>
    </div>
</div>

