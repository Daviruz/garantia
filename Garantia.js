  //Escuchamos los eventos de cada click.
document.addEventListener('click', rellenar, false);
document.getElementById('guardar').addEventListener('click', guardar_Opciones);
  //Obtenemos el id del contenedor de los campos que queremos llenar
function obtenerId(event){
  var id = recorrerObjeto(event);
  return id;
}

  //Recorremos el objeto para sacar la información que necesitamos
function recorrerObjeto(objeto){
  var id = "";
  for(var i in objeto){
    if(i == "id"){
      id = objeto[i];
    }
  }
  return id;
}
  //Evento que rellena los campos que necesitamos.
function rellenar(event){
  var d = event.target;
  var idFinal = obtenerId(d);
  switch(idFinal){
      case "divDragBar_Registracion":
        rellenarCuil();
        break;
      case "ctl00_body_ControlSoporteTecnico_ctrl_ControlDatosPersonales_fst_domicilio":
        rellenarTelefono();
        break;
      case "ctl00_body_ControlSoporteTecnico_f_datos_contacto":
        rellenarContacto();
        break;
  }
}
function rellenarTelefono(){
  array_telefono = ["tel_codigo", "tel_prefijo", "tel_numero", "mail_ref1"];
  chrome.storage.sync.get(array_telefono, function(datos){
    var arr = Object.keys(datos).map(function (key) {return datos[key]});
    document.getElementById("ctl00_body_ControlSoporteTecnico_ctrl_ControlDatosPersonales_ctrl_TELEFONO_Txt_Codigo").setAttribute("value",arr[1]);
    document.getElementById("ctl00_body_ControlSoporteTecnico_ctrl_ControlDatosPersonales_ctrl_TELEFONO_Txt_Prefijo").setAttribute("value",arr[3]);
    document.getElementById("ctl00_body_ControlSoporteTecnico_ctrl_ControlDatosPersonales_ctrl_TELEFONO_Txt_Numero").setAttribute("value",arr[2]);
    document.getElementById("ctl00_body_ControlSoporteTecnico_ctrl_ControlDatosPersonales_ctrl_TELEFONO_Txt_CodigoCel").setAttribute("value",arr[1]);
    document.getElementById("ctl00_body_ControlSoporteTecnico_ctrl_ControlDatosPersonales_ctrl_TELEFONO_Txt_PrefijoCel").setAttribute("value",arr[3]);
    document.getElementById("ctl00_body_ControlSoporteTecnico_ctrl_ControlDatosPersonales_ctrl_TELEFONO_Txt_NumeroCel").setAttribute("value",arr[2]);
    document.getElementById("ctl00_body_ControlSoporteTecnico_ctrl_ControlDatosPersonales_TxtMail").setAttribute("value",arr[0]);
  });
}
function rellenarContacto(){
  array_contacto = ["tel_ref", "mail_ref2", "disp_ref"];
  chrome.storage.sync.get(array_contacto, function(datos){
    var arr = Object.keys(datos).map(function (key) {return datos[key]});
    document.getElementById("ctl00_body_ControlSoporteTecnico_txt_telefono_Cont").setAttribute("value",arr[2]);
    document.getElementById("ctl00_body_ControlSoporteTecnico_txt_Mail_Cont").setAttribute("value",arr[1]);
    document.getElementById("ctl00_body_ControlSoporteTecnico_txt_disponibilidad_Cont").setAttribute("value",arr[0]);
  });
}
function rellenarCuil(){
  array_cuil = ["cuil_codigo", "cuil_dni", "cuil_digito"];
  chrome.storage.sync.get(array_cuil, function(datos){
    var arr = Object.keys(datos).map(function (key) {return datos[key]});
    document.getElementById("ctl00_body_ControlSoporteTecnico_ctrl_ControlIdentificacionTitular_ctrl_CUIL_txtCodigo").setAttribute("value",arr[0]);
    document.getElementById("ctl00_body_ControlSoporteTecnico_ctrl_ControlIdentificacionTitular_ctrl_CUIL_txtNumero").setAttribute("value",arr[2]);
    document.getElementById("ctl00_body_ControlSoporteTecnico_ctrl_ControlIdentificacionTitular_ctrl_CUIL_txtDigito").setAttribute("value",arr[1]);
  });
}
//Función para guardar las opciones.
function guardar_Opciones() {
  //Si, me dio flojera ponerlo en un array.
  var cuil_codigo = document.getElementById('cuil_codigo').value;
  var cuil_dni = document.getElementById('cuil_dni').value;
  var cuil_digito = document.getElementById('cuil_digito').value;
  var tel_codigo = document.getElementById('tel_codigo').value;
  var tel_prefijo = document.getElementById('tel_prefijo').value;
  var tel_numero = document.getElementById('tel_numero').value;
  var mail_ref1 = document.getElementById('mail_ref1').value;
  var tel_ref = document.getElementById('tel_ref').value;
  var disp_ref = document.getElementById('disp_ref').value;
  var mail_ref2 = document.getElementById('mail_ref2').value;
  chrome.storage.sync.set({
    cuil_codigo: cuil_codigo,
    cuil_dni: cuil_dni,
    cuil_digito: cuil_digito,
    tel_codigo: tel_codigo,
    tel_prefijo: tel_prefijo,
    tel_numero: tel_numero,
    mail_ref1: mail_ref1,
    tel_ref: tel_ref,
    disp_ref: disp_ref,
    mail_ref2: mail_ref2
  });
  alert("Se guardaron los cambios.");
}
