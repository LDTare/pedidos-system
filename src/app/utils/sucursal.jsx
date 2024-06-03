
const SucursalInfo = {};

function guardarSucursal(data){
    //Guardar sucursal
    SucursalInfo.id = data.id;
    SucursalInfo.nombre = data.nombre;
    SucursalInfo.direccion = data.direccion;
    SucursalInfo.telefono = data.telefono;

    console.log(SucursalInfo);
}

function verSucursal(){
    //Ver sucursal
    return SucursalInfo;
}

export { guardarSucursal, verSucursal };