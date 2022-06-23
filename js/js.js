/* 

    Desafío - Incorporar Eventos
    Alumno: Marco Valdés

*/


// Función que calcula el costo del permiso de residencia temporal en pesos chilenos (CLP$)
function costo(valor) {
    return valor * 866; // CLP$866 = USD$1 
}

function entrada() {
    // Crea elemento select:
    let listadoPaises = document.createElement("select");
    // Le añade la clase .selector-pais
    listadoPaises.classList.add("selector-pais");
    // Agrega primera opción al select de "Selecciona el país" con el valor 0:
    listadoPaises.innerHTML = `<option value="0">Selecciona el país</option>`;
    // Por cada país agrega un elemento option con el id y el nombre del país:
    for(let i = 0; i < paises.length; i++){
        listadoPaises.innerHTML += `<option value="${paises[i].id}">${paises[i].pais}</option>`;
    }
    // Selecciona el elemento al cual se agregará el elemento:
    let header = document.getElementById("header");
    // Agrega el elemento al HTML:
    header.append(listadoPaises);
    // En el caso de existir un cambio en el elemento select:
    const paisSeleccionado = document.querySelector('.selector-pais');
    paisSeleccionado.addEventListener('change', (evento) => {
    // Guardamos el valor de la opción seleccionada en la variable país:
    let pais = evento.target.value;
    // Si se elige la opción por defecto "Elige el país que emitió el pasaporte" escondemos todo lo que esté fuera del header:        
    if(pais == 0){
        document.getElementById('pais-seleccionado').style.display = "none";
    }
    // Si se selecciona un país hace visible el contenedor pais-seleccionado: 
    else {
        document.getElementById('pais-seleccionado').style.display = "flex";
    }
    // Busca el país seleccionado en el Array paises por el ID:
    const buscarId = paises.find(elpais => elpais.id == pais);
    // Modifica src de bandera:
    let banderaPais = document.getElementById("bandera-pais");
    banderaPais.src = `img/banderas/${buscarId.bandera}`;
    // Modifica nombre del país:
    let tituloPais = document.getElementById("nombre-pais");
    tituloPais.innerHTML = `${buscarId.pais.toLocaleUpperCase()}`;
    let descripcionPais = document.getElementById("descripcion-pais");
    // Variable que contiene el valor de la propiedad permiso -> si: requiere / no: no requiere
    let requiereVisa = buscarId.permiso;
    // Constante que comprueba si el país se encuentra acogido al Convenio Alianza Pacífico:
    const cap = paisesCap.includes(buscarId.id);
    // Si el país no requiere de permiso previo, imprime lo siguiente:
    if(requiereVisa === 'no' && buscarId.id !== 7) {
        descripcionPais.innerHTML = `<p class="p-justify">Si deseas viajar a Chile con pasaporte de ${buscarId.pais} <strong>no requerirás</strong> de autorización previa o visa para ingresar al país.</p>
                                     <p class="p-justify"><a onclick="alertaNivel1()" href="#">Haz clic aquí</a> para conocer los requisitos sanitarios de ingreso a Chile <em>(Plan Fronteras Protegidas)</em>.</p>
                                     <h3>TURISMO</h3>
                                     <p class="p-justify">Si viajas a Chile con fines de recreo o turismo <em>(sin ánimo de residencia)</em> se te otorgará un permiso de permanencia transitoria al momento de ingresar al país.</p>
                                     <ul>
                                        <li>Vigencia del permiso de permanencia transitoria simple (días): ${buscarId.estadiaSimple}.</li>
                                        <li>Costo del permiso de permanencia transitoria simple (US$): ${buscarId.costoSimple}.</li>
                                        <li>Vigencia del permiso de permanencia transitoria múltiple (días): ${buscarId.estadiaMultiple}.</li>
                                        <li>Costo del permiso de permanencia transitoria múltiple (US$): ${buscarId.costoMultiple}.</li>
                                     </ul>                                       
                                     <h4>Prorrogar un permiso de permanencia transitoria</h4>
                                     <p class="p-justify">El permiso de permanencia transitoria puede prorrogarse por un período adicional de hasta 90 días. Quienes deseen extender su estadía en Chile como titulares de un permiso de permanencia transitoria, deberán realizar el trámite de <strong>"Solicitud Prórroga de Permanencia Transitoria"</strong> a través del <a href="https://tramites.serviciomigraciones.cl" target="_blank">sitio web de trámites digitales del Servicio Nacional de Migraciones</a>, <strong>antes del vencimiento del permiso original</strong>.</p>
                                     <p class="p-justify">La prórroga del permiso de permanencia transitoria tiene un costo de US$100.</p>
                                        <ul>
                                            <li><a href="https://serviciomigraciones.cl/permanenciatransitoria/prorrogadepermanenciatransitoria/" target="_blank">Requisitos para solicitar la prórroga de un Permiso de Permanencia Transitoria</a>.</li>
                                        </ul>
                                     <h4>Trabajar con un permiso de permanencia transitoria</h4>
                                     <p class="p-justify">Quienes sean titulares de un Permiso de Permanencia Transitoria podrán solicitar un permiso de trabajo, ya sea antes o después de su ingreso a Chile. El permiso de trabajo podrá otorgarse siempre que se encuentre vigente el Permiso de Permanencia Transitoria.</p>
                                        <ul>
                                            <li><a href="https://serviciomigraciones.cl/permanenciatransitoria/permisodetrabajoconpermanenciatransitoria/" target="_blank">Requisitos para solicitar un permiso de trabajo como titular de un Permiso de Permanencia Transitoria</a>.</li>
                                        </ul>
                                     <h3>RESIDENCIA</h3>
                                     <p class="p-justify">Si tu intención es residir y trabajar en Chile, tendrás que solicitar un permiso de residencia temporal desde fuera de Chile a través del sitio web de <a href="https://tramites.serviciomigraciones.cl/" target="_blank">trámites digitales del Servicio Nacional de Migraciones</a>.</p>
                                     <p class="p-justify">Quienes ingresen a Chile a partir del <strong>12 de febrero de 2022</strong> <em>(fecha en que entró en vigencia la nueva Ley de Migración y Extranjería - N°21.325)</em> con un permiso de permanencia transitoria (turismo) <strong>no podrán postular a un permiso de residencia temporal dentro del país</strong>, <u>salvo que:</u> a) acrediten tener vínculo de familia con chilenos o con residentes definitivos en Chile; O, b) su estadía sea concordante con los objetivos de la Política Nacional de Migración y Extranjería; O, c) se encuentren en alguno de los casos debidamente calificados por la Subsecretaría del Interior mediante resolución, previo informe del Servicio Nacional de Migraciones.</p> 
                                     <p class="p-justify">Se consideran vínculos de familia: a) cónyuge u otra figura análoga que, de conformidad con el derecho aplicable, produzca efectos equivalentes al matrimonio; b) padre o madre; c) hijo menor de edad; d) hijo con discapacidad; e) hijo soltero menor de 24 años que se encuentre estudiando; y, f) menor de edad que se encuentre bajo cuidado personal o curaduría.</p>
                                        <ul>
                                            <li><a href="https://serviciomigraciones.cl/residenciatemporal/" target="_blank">Subcategorías de residencia temporal disponibles en Chile</a>.</li>
                                            <li><a href="https://tramites.extranjeria.gob.cl/tramites/iniciar/248" target="_blank">Trámite de solicitud de residencia temporal para extranjeros fuera de Chile - Servicio Nacional de Migraciones</a></li>
                                        </ul>
                                     <p class="p-justify"><em>* Antes de realizar el trámite debes <a href="https://tramites.extranjeria.gob.cl/register" target="_blank">crear tu cuenta</a>.</em></p>`;
        }
        // Si el país seleccionado requiere permiso previo pero se encuentra acogido al Convenio Alianza Pacífico imprime lo siguiente:
        else if(cap === true) {
            descripcionPais.innerHTML = `<p class="p-justify">Si deseas viajar a Chile con pasaporte de ${buscarId.pais} <strong>requerirás</strong> de autorización previa o visa para ingresar al país, salvo que seas titular de residencia permanente vigente en Colombia, México o Perú, en cuyo caso estarás exento del requisito de autorización previa o visa (Convenio Alianza del Pacífico).</p>
                                         <p class="p-justify"><a onclick="alertaNivel1()" href="#">Haz clic aquí</a> para conocer los requisitos sanitarios de ingreso a Chile <em>(Plan Fronteras Protegidas)</em>.</p>
                                         <h3>TURISMO</h3>
                                         <p class="p-justify">Si viajas a Chile con fines de recreo o turismo <em>(sin ánimo de residencia)</em>, y no eres titular de residencia definitiva vigente en Colombia, México o Perú, tendrás que solicitar un <strong>Permiso de Permanencia Transitoria</strong> a través del <a href="https://tramites.minrel.gov.cl/Solicitudes/visa.aspx" target="_blank">sitio web de Trámites Consulares del Ministerio de Relaciones Exteriores de Chile</a>.</p>
                                         <ul>
                                            <li><a href="https://serviciosconsulares.cl/tramites/visa-de-permanencia-transitoria" target="_blank">Requisitos para solicitar un Permiso de Permanencia Transitoria</a>.</li>
                                            <li>Vigencia del permiso de permanencia transitoria simple (días): ${buscarId.estadiaSimple}.</li>
                                            <li>Costo del permiso de permanencia transitoria simple (US$): ${buscarId.costoSimple}.</li>
                                            <li>Vigencia del permiso de permanencia transitoria múltiple (días): ${buscarId.estadiaMultiple}.</li>
                                            <li>Costo del permiso de permanencia transitoria múltiple (US$): ${buscarId.costoMultiple}.</li>
                                         </ul>
                                         <h4>Prorrogar un permiso de permanencia transitoria</h4>
                                         <p class="p-justify">El permiso de permanencia transitoria puede prorrogarse por un período adicional de hasta 90 días. Quienes deseen extender su estadía en Chile como titulares de un permiso de permanencia transitoria, deberán realizar el trámite de <strong>"Solicitud Prórroga de Permanencia Transitoria"</strong> a través del <a href="https://tramites.serviciomigraciones.cl" target="_blank">sitio web de trámites digitales del Servicio Nacional de Migraciones</a>, <strong>antes del vencimiento del permiso original</strong>.</p>
                                         <p class="p-justify">La prórroga del permiso de permanencia transitoria tiene un costo de US$100.</p>
                                         <ul>
                                             <li><a href="https://serviciomigraciones.cl/permanenciatransitoria/prorrogadepermanenciatransitoria/" target="_blank">Requisitos para solicitar la prórroga de un Permiso de Permanencia Transitoria</a>.</li>
                                         </ul>
                                         <h4>Trabajar con un permiso de permanencia transitoria</h4>
                                         <p class="p-justify">Quienes sean titulares de un Permiso de Permanencia Transitoria podrán solicitar un permiso de trabajo, ya sea antes o después de su ingreso a Chile. El permiso de trabajo podrá otorgarse siempre que se encuentre vigente el Permiso de Permanencia Transitoria.</p>
                                         <ul>
                                             <li><a href="https://serviciomigraciones.cl/permanenciatransitoria/permisodetrabajoconpermanenciatransitoria/" target="_blank">Requisitos para solicitar un permiso de trabajo como titular de un Permiso de Permanencia Transitoria</a>.</li>
                                         </ul>
                                         <h3>RESIDENCIA</h3>
                                         <p class="p-justify">Si tu intención es residir y trabajar en Chile, tendrás que solicitar un permiso de residencia temporal desde fuera de Chile a través del sitio web de <a href="https://tramites.serviciomigraciones.cl/" target="_blank">trámites digitales del Servicio Nacional de Migraciones</a>.</p>
                                         <p class="p-justify">Quienes ingresen a Chile a partir del <strong>12 de febrero de 2022</strong> <em>(fecha en que entró en vigencia la nueva Ley de Migración y Extranjería - N°21.325)</em> con un permiso de permanencia transitoria (turismo) <strong>no podrán postular a un permiso de residencia temporal dentro del país</strong>, <u>salvo que:</u> a) acrediten tener vínculo de familia con chilenos o con residentes definitivos en Chile; O, b) su estadía sea concordante con los objetivos de la Política Nacional de Migración y Extranjería; O, c) se encuentren en alguno de los casos debidamente calificados por la Subsecretaría del Interior mediante resolución, previo informe del Servicio Nacional de Migraciones.</p> 
                                         <p class="p-justify">Se consideran vínculos de familia: a) cónyuge u otra figura análoga que, de conformidad con el derecho aplicable, produzca efectos equivalentes al matrimonio; b) padre o madre; c) hijo menor de edad; d) hijo con discapacidad; e) hijo soltero menor de 24 años que se encuentre estudiando; y, f) menor de edad que se encuentre bajo cuidado personal o curaduría.</p>
                                            <ul>
                                              <li><a href="https://serviciomigraciones.cl/residenciatemporal/" target="_blank">Subcategorías de residencia temporal disponibles en Chile</a>.</li>
                                              <li><a href="https://tramites.extranjeria.gob.cl/tramites/iniciar/248" target="_blank">Trámite de solicitud de residencia temporal para extranjeros fuera de Chile - Servicio Nacional de Migraciones</a></li>
                                            </ul>
                                         <br>   
                                         <p class="p-justify"><em>* Antes de realizar el trámite debes <a href="https://tramites.extranjeria.gob.cl/register" target="_blank">crear tu cuenta</a>.</em></p>`;
        }
        // Si se selecciona Antillas Holandesas imprime lo siguiente:
        else if(pais == 7) {
            descripcionPais.innerHTML = `<p class="p-justify"><strong>No requerirás</strong> de permiso previo o visa para ingresar a Chile. A Aruba, Bonaire, Curazao, Saba, San Eustaquio y San Martín se le aplican las mismas condiciones que a nacionales de Países Bajos.</p>
                                         <p class="p-justify"><a onclick="alertaNivel1()" href="#">Haz clic aquí</a> para conocer los requisitos sanitarios de ingreso a Chile <em>(Plan Fronteras Protegidas)</em>.</p> 
                                         <h3>TURISMO</h3>
                                         <p class="p-justify">Si viajas a Chile con fines de recreo o turismo <em>(sin ánimo de residencia)</em> se te otorgará un permiso de permanencia transitoria al momento de ingresar al país.</p>
                                         <ul>
                                            <li><a href="https://serviciosconsulares.cl/tramites/visa-de-permanencia-transitoria" target="_blank">Requisitos para solicitar un Permiso de Permanencia Transitoria</a>.</li>
                                            <li>Vigencia del permiso de permanencia transitoria simple (días): ${buscarId.estadiaSimple}.</li>
                                            <li>Costo del permiso de permanencia transitoria simple (US$): ${buscarId.costoSimple}.</li>
                                            <li>Vigencia del permiso de permanencia transitoria múltiple (días): ${buscarId.estadiaMultiple}.</li>
                                            <li>Costo del permiso de permanencia transitoria múltiple (US$): ${buscarId.costoMultiple}.</li>
                                         </ul>
                                         <h4>Prorrogar un permiso de permanencia transitoria</h4>
                                         <p class="p-justify">El permiso de permanencia transitoria puede prorrogarse por un período adicional de hasta 90 días. Quienes deseen extender su estadía en Chile como titulares de un permiso de permanencia transitoria, deberán realizar el trámite de <strong>"Solicitud Prórroga de Permanencia Transitoria"</strong> a través del <a href="https://tramites.serviciomigraciones.cl" target="_blank">sitio web de trámites digitales del Servicio Nacional de Migraciones</a>, <strong>antes del vencimiento del permiso original</strong>.</p>
                                         <p class="p-justify">La prórroga del permiso de permanencia transitoria tiene un costo de US$100.</p>
                                         <ul>
                                             <li><a href="https://serviciomigraciones.cl/permanenciatransitoria/prorrogadepermanenciatransitoria/" target="_blank">Requisitos para solicitar la prórroga de un Permiso de Permanencia Transitoria</a>.</li>
                                         </ul>
                                         <h4>Trabajar con un permiso de permanencia transitoria</h4>
                                         <p class="p-justify">Quienes sean titulares de un Permiso de Permanencia Transitoria podrán solicitar un permiso de trabajo, ya sea antes o después de su ingreso a Chile. El permiso de trabajo podrá otorgarse siempre que se encuentre vigente el Permiso de Permanencia Transitoria.</p>
                                         <ul>
                                             <li><a href="https://serviciomigraciones.cl/permanenciatransitoria/permisodetrabajoconpermanenciatransitoria/" target="_blank">Requisitos para solicitar un permiso de trabajo como titular de un Permiso de Permanencia Transitoria</a>.</li>
                                         </ul>
                                         <h3>RESIDENCIA</h3>
                                         <p class="p-justify">Si tu intención es residir y trabajar en Chile, tendrás que solicitar un permiso de residencia temporal desde fuera de Chile a través del sitio web de <a href="https://tramites.serviciomigraciones.cl/" target="_blank">trámites digitales del Servicio Nacional de Migraciones</a>.</p>
                                         <p class="p-justify">Quienes ingresen a Chile a partir del <strong>12 de febrero de 2022</strong> <em>(fecha en que entró en vigencia la nueva Ley de Migración y Extranjería - N°21.325)</em> con un permiso de permanencia transitoria (turismo) <strong>no podrán postular a un permiso de residencia temporal dentro del país</strong>, <u>salvo que:</u> a) acrediten tener vínculo de familia con chilenos o con residentes definitivos en Chile; O, b) su estadía sea concordante con los objetivos de la Política Nacional de Migración y Extranjería; O, c) se encuentren en alguno de los casos debidamente calificados por la Subsecretaría del Interior mediante resolución, previo informe del Servicio Nacional de Migraciones.</p> 
                                         <p class="p-justify">Se consideran vínculos de familia: a) cónyuge u otra figura análoga que, de conformidad con el derecho aplicable, produzca efectos equivalentes al matrimonio; b) padre o madre; c) hijo menor de edad; d) hijo con discapacidad; e) hijo soltero menor de 24 años que se encuentre estudiando; y, f) menor de edad que se encuentre bajo cuidado personal o curaduría.</p>
                                         <ul>
                                            <li><a href="https://serviciomigraciones.cl/residenciatemporal/" target="_blank">Subcategorías de residencia temporal disponibles en Chile</a>.</li>
                                            <li><a href="https://tramites.extranjeria.gob.cl/tramites/iniciar/248" target="_blank">Trámite de solicitud de residencia temporal para extranjeros fuera de Chile - Servicio Nacional de Migraciones</a></li>
                                         </ul>
                                         <p class="p-justify"><em>* Antes de realizar el trámite debes <a href="https://tramites.extranjeria.gob.cl/register" target="_blank">crear tu cuenta</a>.</em></p>`;
        }
        // Si el país es China (id: 37), imprime lo siguiente:
        else if(pais == 37) {
            descripcionPais.innerHTML = `<p class="p-justify">Si deseas viajar a Chile con pasaporte de ${buscarId.pais} <strong>requerirás</strong> de autorización previa o visa para ingresar al país, salvo que seas titular de una Visa de Turismo otorgada por Canadá o por Estados Unidos <em>(todos los tipos de Visas otorgadas, excepto la Visa C)</em> con a lo menos 6 meses de vigencia, o Green Card, en cuyo caso estarás exento del requisito de autorización previa o visa.</p>
                                         <p class="p-justify"><a onclick="alertaNivel1()" href="#">Haz clic aquí</a> para conocer los requisitos sanitarios de ingreso a Chile <em>(Plan Fronteras Protegidas)</em>.</p>      
                                         <h3>TURISMO</h3>
                                         <p class="p-justify">Si viajas a Chile con fines de recreo o turismo <em>(sin ánimo de residencia)</em>, y no eres titular de una Visa de Turismo otorgada por Canadá o por Estados Unidos <em>(todos los tipos de Visas otorgadas, excepto la Visa C)</em> con a lo menos 6 meses de vigencia, o Green Card, tendrás que solicitar un <strong>Permiso de Permanencia Transitoria</strong> a través del <a href="https://tramites.minrel.gov.cl/Solicitudes/visa.aspx" target="_blank">sitio web de Trámites Consulares del Ministerio de Relaciones Exteriores de Chile</a>.</p>
                                         <ul>
                                            <li><a href="https://serviciosconsulares.cl/tramites/visa-de-permanencia-transitoria" target="_blank">Requisitos para solicitar un Permiso de Permanencia Transitoria</a>.</li>
                                            <li>Vigencia del permiso de permanencia transitoria simple (días): ${buscarId.estadiaSimple}.</li>
                                            <li>Costo del permiso de permanencia transitoria simple (US$): ${buscarId.costoSimple}.</li>
                                            <li>Vigencia del permiso de permanencia transitoria múltiple (días): ${buscarId.estadiaMultiple}.</li>
                                            <li>Costo del permiso de permanencia transitoria múltiple (US$): ${buscarId.costoMultiple}.</li>
                                         </ul>
                                         <h4>Prorrogar un permiso de permanencia transitoria</h4>
                                         <p class="p-justify">El permiso de permanencia transitoria puede prorrogarse por un período adicional de hasta 90 días. Quienes deseen extender su estadía en Chile como titulares de un permiso de permanencia transitoria, deberán realizar el trámite de <strong>"Solicitud Prórroga de Permanencia Transitoria"</strong> a través del <a href="https://tramites.serviciomigraciones.cl" target="_blank">sitio web de trámites digitales del Servicio Nacional de Migraciones</a>, <strong>antes del vencimiento del permiso original</strong>.</p>
                                         <p class="p-justify">La prórroga del permiso de permanencia transitoria tiene un costo de US$100.</p>
                                         <ul>
                                             <li><a href="https://serviciomigraciones.cl/permanenciatransitoria/prorrogadepermanenciatransitoria/" target="_blank">Requisitos para solicitar la prórroga de un Permiso de Permanencia Transitoria</a>.</li>
                                         </ul>
                                         <h4>Trabajar con un permiso de permanencia transitoria</h4>
                                         <p class="p-justify">Quienes sean titulares de un Permiso de Permanencia Transitoria podrán solicitar un permiso de trabajo, ya sea antes o después de su ingreso a Chile. El permiso de trabajo podrá otorgarse siempre que se encuentre vigente el Permiso de Permanencia Transitoria.</p>
                                         <ul>
                                             <li><a href="https://serviciomigraciones.cl/permanenciatransitoria/permisodetrabajoconpermanenciatransitoria/" target="_blank">Requisitos para solicitar un permiso de trabajo como titular de un Permiso de Permanencia Transitoria</a>.</li>
                                         </ul>
                                         <h3>RESIDENCIA</h3>
                                         <p class="p-justify">Si tu intención es residir y trabajar en Chile, tendrás que solicitar un permiso de residencia temporal desde fuera de Chile a través del sitio web de <a href="https://tramites.serviciomigraciones.cl/" target="_blank">trámites digitales del Servicio Nacional de Migraciones</a>.</p>
                                         <p class="p-justify">Quienes ingresen a Chile a partir del <strong>12 de febrero de 2022</strong> <em>(fecha en que entró en vigencia la nueva Ley de Migración y Extranjería - N°21.325)</em> con un permiso de permanencia transitoria (turismo) <strong>no podrán postular a un permiso de residencia temporal dentro del país</strong>, <u>salvo que:</u> a) acrediten tener vínculo de familia con chilenos o con residentes definitivos en Chile; O, b) su estadía sea concordante con los objetivos de la Política Nacional de Migración y Extranjería; O, c) se encuentren en alguno de los casos debidamente calificados por la Subsecretaría del Interior mediante resolución, previo informe del Servicio Nacional de Migraciones.</p> 
                                         <p class="p-justify">Se consideran vínculos de familia: a) cónyuge u otra figura análoga que, de conformidad con el derecho aplicable, produzca efectos equivalentes al matrimonio; b) padre o madre; c) hijo menor de edad; d) hijo con discapacidad; e) hijo soltero menor de 24 años que se encuentre estudiando; y, f) menor de edad que se encuentre bajo cuidado personal o curaduría.</p>
                                         <ul>
                                            <li><a href="https://serviciomigraciones.cl/residenciatemporal/" target="_blank">Subcategorías de residencia temporal disponibles en Chile</a>.</li>
                                            <li><a href="https://tramites.extranjeria.gob.cl/tramites/iniciar/248" target="_blank">Trámite de solicitud de residencia temporal para extranjeros fuera de Chile - Servicio Nacional de Migraciones</a></li>
                                         </ul>
                                         <p class="p-justify"><em>* Antes de realizar el trámite debes <a href="https://tramites.extranjeria.gob.cl/register" target="_blank">crear tu cuenta</a>.</em></p>`;
        }
        // Si el país es India (id: 79) o República Dominicana (id: 153), imprime lo siguiente:
        else if(pais == 79 || pais == 153) {
            descripcionPais.innerHTML = `<p class="p-justify">Si deseas viajar a Chile con pasaporte de ${buscarId.pais} <strong>requerirás</strong> de autorización previa o visa para ingresar al país, salvo que seas titular de una Visa otorgada por Estados Unidos <em>(Todos los tipos excepto la Visa C)</em> con a lo menos 6 meses de vigencia, o Green Card, en cuyo caso estarás exento del requisito de autorización previa o visa.</p>
                                         <p class="p-justify"><a onclick="alertaNivel1()" href="#">Haz clic aquí</a> para conocer los requisitos sanitarios de ingreso a Chile <em>(Plan Fronteras Protegidas)</em>.</p>
                                         <h3>TURISMO</h3>
                                         <p class="p-justify">Si viajas a Chile con fines de recreo o turismo <em>(sin ánimo de residencia)</em>, y no eres titular de una Visa otorgada por Estados Unidos <em>(Todos los tipos excepto la Visa C)</em> con a lo menos 6 meses de vigencia, o Green Card, tendrás que solicitar un <strong>Permiso de Permanencia Transitoria</strong> a través del <a href="https://tramites.minrel.gov.cl/Solicitudes/visa.aspx" target="_blank">sitio web de Trámites Consulares del Ministerio de Relaciones Exteriores de Chile</a>.</p>
                                         <ul>
                                            <li><a href="https://serviciosconsulares.cl/tramites/visa-de-permanencia-transitoria" target="_blank">Requisitos para solicitar un Permiso de Permanencia Transitoria</a>.</li>
                                            <li>Vigencia del permiso de permanencia transitoria simple (días): ${buscarId.estadiaSimple}.</li>
                                            <li>Costo del permiso de permanencia transitoria simple (US$): ${buscarId.costoSimple}.</li>
                                            <li>Vigencia del permiso de permanencia transitoria múltiple (US$): ${buscarId.estadiaMultiple}.</li>
                                            <li>Costo del permiso de permanencia transitoria múltiple (días): ${buscarId.costoMultiple}.</li>
                                         </ul>
                                         <h4>Prorrogar un permiso de permanencia transitoria</h4>
                                         <p class="p-justify">El permiso de permanencia transitoria puede prorrogarse por un período adicional de hasta 90 días. Quienes deseen extender su estadía en Chile como titulares de un permiso de permanencia transitoria, deberán realizar el trámite de <strong>"Solicitud Prórroga de Permanencia Transitoria"</strong> a través del <a href="https://tramites.serviciomigraciones.cl" target="_blank">sitio web de trámites digitales del Servicio Nacional de Migraciones</a>, <strong>antes del vencimiento del permiso original</strong>.</p>
                                         <p class="p-justify">La prórroga del permiso de permanencia transitoria tiene un costo de US$100.</p>
                                         <ul>
                                             <li><a href="https://serviciomigraciones.cl/permanenciatransitoria/prorrogadepermanenciatransitoria/" target="_blank">Requisitos para solicitar la prórroga de un Permiso de Permanencia Transitoria</a>.</li>
                                         </ul>
                                         <h4>Trabajar con un permiso de permanencia transitoria</h4>
                                         <p class="p-justify">Quienes sean titulares de un Permiso de Permanencia Transitoria podrán solicitar un permiso de trabajo, ya sea antes o después de su ingreso a Chile. El permiso de trabajo podrá otorgarse siempre que se encuentre vigente el Permiso de Permanencia Transitoria.</p>
                                         <ul>
                                             <li><a href="https://serviciomigraciones.cl/permanenciatransitoria/permisodetrabajoconpermanenciatransitoria/" target="_blank">Requisitos para solicitar un permiso de trabajo como titular de un Permiso de Permanencia Transitoria</a>.</li>
                                         </ul>
                                         <h3>RESIDENCIA</h3>
                                         <p class="p-justify">Si tu intención es residir y trabajar en Chile, tendrás que solicitar un permiso de residencia temporal desde fuera de Chile a través del sitio web de <a href="https://tramites.serviciomigraciones.cl/" target="_blank">trámites digitales del Servicio Nacional de Migraciones</a>.</p>
                                         <p class="p-justify">Quienes ingresen a Chile a partir del <strong>12 de febrero de 2022</strong> <em>(fecha en que entró en vigencia la nueva Ley de Migración y Extranjería - N°21.325)</em> con un permiso de permanencia transitoria (turismo) <strong>no podrán postular a un permiso de residencia temporal dentro del país</strong>, <u>salvo que:</u> a) acrediten tener vínculo de familia con chilenos o con residentes definitivos en Chile; O, b) su estadía sea concordante con los objetivos de la Política Nacional de Migración y Extranjería; O, c) se encuentren en alguno de los casos debidamente calificados por la Subsecretaría del Interior mediante resolución, previo informe del Servicio Nacional de Migraciones.</p> 
                                         <p class="p-justify">Se consideran vínculos de familia: a) cónyuge u otra figura análoga que, de conformidad con el derecho aplicable, produzca efectos equivalentes al matrimonio; b) padre o madre; c) hijo menor de edad; d) hijo con discapacidad; e) hijo soltero menor de 24 años que se encuentre estudiando; y, f) menor de edad que se encuentre bajo cuidado personal o curaduría.</p>
                                         <ul>
                                            <li><a href="https://serviciomigraciones.cl/residenciatemporal/" target="_blank">Subcategorías de residencia temporal disponibles en Chile</a>.</li>
                                            <li><a href="https://tramites.extranjeria.gob.cl/tramites/iniciar/248" target="_blank">Trámite de solicitud de residencia temporal para extranjeros fuera de Chile - Servicio Nacional de Migraciones</a></li>
                                         </ul>
                                         <p class="p-justify"><em>* Antes de realizar el trámite debes <a href="https://tramites.extranjeria.gob.cl/register" target="_blank">crear tu cuenta</a>.</em></p>`;
        }
        // Si el país es Australia (id: 12), imprime lo siguiente:
        else if(pais == 12){
            descripcionPais.innerHTML = `<p class="p-justify">Si deseas viajar a Chile con pasaporte de ${buscarId.pais} <strong>requerirás</strong> de autorización previa o visa para ingresar al país.</p>
                                         <p class="p-justify"><a onclick="alertaNivel1()" href="#">Haz clic aquí</a> para conocer los requisitos sanitarios de ingreso a Chile <em>(Plan Fronteras Protegidas)</em>.</p>
                                         <h3>TURISMO</h3>
                                         <p class="p-justify">Si viajas a Chile con fines de recreo o turismo <em>(sin ánimo de residencia)</em>, tendrás que solicitar un <strong>Permiso de Permanencia Transitoria</strong> a través del <a href="https://tramites.minrel.gov.cl/Solicitudes/visa.aspx" target="_blank">sitio web de Trámites Consulares del Ministerio de Relaciones Exteriores de Chile</a>.</p>
                                         <ul>
                                            <li><a href="https://serviciosconsulares.cl/tramites/visa-de-permanencia-transitoria" target="_blank">Requisitos para solicitar un Permiso de Permanencia Transitoria</a>.</li>
                                            <li>Vigencia del permiso de permanencia transitoria simple (días): ${buscarId.estadiaSimple}.</li>
                                            <li>Costo del permiso de permanencia transitoria simple (US$): ${buscarId.costoSimple}.</li>
                                            <li>Vigencia del permiso de permanencia transitoria múltiple (US$): ${buscarId.estadiaMultiple}.</li>
                                            <li>Costo del permiso de permanencia transitoria múltiple (días): ${buscarId.costoMultiple}.</li>
                                         </ul>
                                         <h4>Prorrogar un permiso de permanencia transitoria</h4>
                                         <p class="p-justify">El permiso de permanencia transitoria puede prorrogarse por un período adicional de hasta 90 días. Quienes deseen extender su estadía en Chile como titulares de un permiso de permanencia transitoria, deberán realizar el trámite de <strong>"Solicitud Prórroga de Permanencia Transitoria"</strong> a través del <a href="https://tramites.serviciomigraciones.cl" target="_blank">sitio web de trámites digitales del Servicio Nacional de Migraciones</a>, <strong>antes del vencimiento del permiso original</strong>.</p>
                                         <p class="p-justify">La prórroga del permiso de permanencia transitoria tiene un costo de US$100.</p>
                                         <ul>
                                             <li><a href="https://serviciomigraciones.cl/permanenciatransitoria/prorrogadepermanenciatransitoria/" target="_blank">Requisitos para solicitar la prórroga de un Permiso de Permanencia Transitoria</a>.</li>
                                         </ul>
                                         <h4>Trabajar con un permiso de permanencia transitoria</h4>
                                         <p class="p-justify">Quienes sean titulares de un Permiso de Permanencia Transitoria podrán solicitar un permiso de trabajo, ya sea antes o después de su ingreso a Chile. El permiso de trabajo podrá otorgarse siempre que se encuentre vigente el Permiso de Permanencia Transitoria.</p>
                                         <ul>
                                             <li><a href="https://serviciomigraciones.cl/permanenciatransitoria/permisodetrabajoconpermanenciatransitoria/" target="_blank">Requisitos para solicitar un permiso de trabajo como titular de un Permiso de Permanencia Transitoria</a>.</li>
                                         </ul>
                                         <h3>RESIDENCIA</h3>
                                         <p class="p-justify">Si tu intención es residir y trabajar en Chile, tendrás que solicitar un permiso de residencia temporal desde fuera de Chile a través del sitio web de <a href="https://tramites.serviciomigraciones.cl/" target="_blank">trámites digitales del Servicio Nacional de Migraciones</a>.</p>
                                         <p class="p-justify">Quienes ingresen a Chile a partir del <strong>12 de febrero de 2022</strong> <em>(fecha en que entró en vigencia la nueva Ley de Migración y Extranjería - N°21.325)</em> con un permiso de permanencia transitoria (turismo) <strong>no podrán postular a un permiso de residencia temporal dentro del país</strong>, <u>salvo que:</u> a) acrediten tener vínculo de familia con chilenos o con residentes definitivos en Chile; O, b) su estadía sea concordante con los objetivos de la Política Nacional de Migración y Extranjería; O, c) se encuentren en alguno de los casos debidamente calificados por la Subsecretaría del Interior mediante resolución, previo informe del Servicio Nacional de Migraciones.</p> 
                                         <p class="p-justify">Se consideran vínculos de familia: a) cónyuge u otra figura análoga que, de conformidad con el derecho aplicable, produzca efectos equivalentes al matrimonio; b) padre o madre; c) hijo menor de edad; d) hijo con discapacidad; e) hijo soltero menor de 24 años que se encuentre estudiando; y, f) menor de edad que se encuentre bajo cuidado personal o curaduría.</p>
                                         <ul>
                                            <li><a href="https://serviciomigraciones.cl/residenciatemporal/" target="_blank">Subcategorías de residencia temporal disponibles en Chile</a>.</li>
                                            <li><a href="https://tramites.extranjeria.gob.cl/tramites/iniciar/248" target="_blank">Trámite de solicitud de residencia temporal para extranjeros fuera de Chile - Servicio Nacional de Migraciones</a></li>
                                         </ul>
                                         <p class="p-justify"><em>* Antes de realizar el trámite debes <a href="https://tramites.extranjeria.gob.cl/register" target="_blank">crear tu cuenta</a>.</em></p>`;
        }
       // Si el país es Venezuela (id: 196)
       else if (pais == 196){
            descripcionPais.innerHTML = `<p class="p-justify">Si deseas viajar a Chile con pasaporte de ${buscarId.pais} <strong>requerirás</strong> de autorización previa o visa para ingresar al país, salvo que seas titular de Residencia Definitiva vigente en Argentina, en cuyo caso estarás exento del requisito de autorización previa o visa.</p>
                                         <p class="p-justify"><a onclick="alertaNivel1()" href="#">Haz clic aquí</a> para conocer los requisitos sanitarios de ingreso a Chile <em>(Plan Fronteras Protegidas)</em>.</p>
                                         <h3>TURISMO</h3>
                                         <p class="p-justify">Si viajas a Chile con fines de recreo o turismo <em>(sin ánimo de residencia)</em>, y no eres titular de Residencia Definitiva vigente en Argentina, tendrás que solicitar un <strong>Permiso de Permanencia Transitoria</strong> a través del <a href="https://tramites.minrel.gov.cl/Solicitudes/visa.aspx" target="_blank">sitio web de Trámites Consulares del Ministerio de Relaciones Exteriores de Chile</a>.</p>
                                            <ul>
                                                <li><a href="https://serviciosconsulares.cl/tramites/visa-de-permanencia-transitoria" target="_blank">Requisitos para solicitar un Permiso de Permanencia Transitoria</a>.</li>
                                                <li>Vigencia del permiso de permanencia transitoria simple (días): ${buscarId.estadiaSimple}.</li>
                                                <li>Costo del permiso de permanencia transitoria simple (US$): ${buscarId.costoSimple}.</li>
                                                <li>Vigencia del permiso de permanencia transitoria múltiple (días): ${buscarId.estadiaMultiple}.</li>
                                                <li>Costo del permiso de permanencia transitoria múltiple (US$): ${buscarId.costoMultiple}.</li>
                                            </ul>
                                         <h4>Prorrogar un permiso de permanencia transitoria</h4>
                                         <p class="p-justify">El permiso de permanencia transitoria puede prorrogarse por un período adicional de hasta 90 días. Quienes deseen extender su estadía en Chile como titulares de un permiso de permanencia transitoria, deberán realizar el trámite de <strong>"Solicitud Prórroga de Permanencia Transitoria"</strong> a través del <a href="https://tramites.serviciomigraciones.cl" target="_blank">sitio web de trámites digitales del Servicio Nacional de Migraciones</a>, <strong>antes del vencimiento del permiso original</strong>.</p>
                                         <p class="p-justify">La prórroga del permiso de permanencia transitoria tiene un costo de US$100.</p>
                                            <ul>
                                                <li><a href="https://serviciomigraciones.cl/permanenciatransitoria/prorrogadepermanenciatransitoria/" target="_blank">Requisitos para solicitar la prórroga de un Permiso de Permanencia Transitoria</a>.</li>
                                            </ul>
                                         <h4>Trabajar con un permiso de permanencia transitoria</h4>
                                         <p class="p-justify">Quienes sean titulares de un Permiso de Permanencia Transitoria podrán solicitar un permiso de trabajo, ya sea antes o después de su ingreso a Chile. El permiso de trabajo podrá otorgarse siempre que se encuentre vigente el Permiso de Permanencia Transitoria.</p>
                                            <ul>
                                                <li><a href="https://serviciomigraciones.cl/permanenciatransitoria/permisodetrabajoconpermanenciatransitoria/" target="_blank">Requisitos para solicitar un permiso de trabajo como titular de un Permiso de Permanencia Transitoria</a>.</li>
                                            </ul>
                                         <h3>RESIDENCIA</h3>
                                         <p class="p-justify">Si tu intención es residir y trabajar en Chile, tendrás que solicitar un permiso de residencia temporal desde fuera de Chile a través del sitio web de <a href="https://tramites.serviciomigraciones.cl/" target="_blank">trámites digitales del Servicio Nacional de Migraciones</a>.</p>
                                         <p class="p-justify">Quienes ingresen a Chile a partir del <strong>12 de febrero de 2022</strong> <em>(fecha en que entró en vigencia la nueva Ley de Migración y Extranjería - N°21.325)</em> con un permiso de permanencia transitoria (turismo) <strong>no podrán postular a un permiso de residencia temporal dentro del país</strong>, <u>salvo que:</u> a) acrediten tener vínculo de familia con chilenos o con residentes definitivos en Chile; O, b) su estadía sea concordante con los objetivos de la Política Nacional de Migración y Extranjería; O, c) se encuentren en alguno de los casos debidamente calificados por la Subsecretaría del Interior mediante resolución, previo informe del Servicio Nacional de Migraciones.</p> 
                                         <p class="p-justify">Se consideran vínculos de familia: a) cónyuge u otra figura análoga que, de conformidad con el derecho aplicable, produzca efectos equivalentes al matrimonio; b) padre o madre; c) hijo menor de edad; d) hijo con discapacidad; e) hijo soltero menor de 24 años que se encuentre estudiando; y, f) menor de edad que se encuentre bajo cuidado personal o curaduría.</p>
                                            <ul>
                                                <li><a href="https://serviciomigraciones.cl/residenciatemporal/" target="_blank">Subcategorías de residencia temporal disponibles en Chile</a>.</li>
                                                <li><a href="https://tramites.extranjeria.gob.cl/tramites/iniciar/248" target="_blank">Trámite de solicitud de residencia temporal para extranjeros fuera de Chile - Servicio Nacional de Migraciones</a></li>
                                            </ul>
                                         <p class="p-justify"><em>* Antes de realizar el trámite debes <a href="https://tramites.extranjeria.gob.cl/register" target="_blank">crear tu cuenta</a>.</em></p>`;
        }
       // Si el país requiere de permiso previo o visa y no existen excepciones, imprime lo siguiente:
       else {
            descripcionPais.innerHTML = `<p class="p-justify">Si deseas viajar a Chile con pasaporte de ${buscarId.pais} <strong>requerirás</strong> de autorización previa o visa para ingresar al país.</p>
                                        <p class="p-justify"><a onclick="alertaNivel1()" href="#">Haz clic aquí</a> para conocer los requisitos sanitarios de ingreso a Chile <em>(Plan Fronteras Protegidas)</em>.</p>
                                        <h3>TURISMO</h3>
                                        <p class="p-justify">Si viajas a Chile con fines de recreo o turismo <em>(sin ánimo de residencia)</em>, tendrás que solicitar un <strong>Permiso de Permanencia Transitoria</strong> a través del <a href="https://tramites.minrel.gov.cl/Solicitudes/visa.aspx" target="_blank">sitio web de Trámites Consulares del Ministerio de Relaciones Exteriores de Chile</a>.</p>
                                        <ul>
                                            <li><a href="https://serviciosconsulares.cl/tramites/visa-de-permanencia-transitoria" target="_blank">Requisitos para solicitar un Permiso de Permanencia Transitoria</a>.</li>
                                            <li>Vigencia del permiso de permanencia transitoria simple (días): ${buscarId.estadiaSimple}.</li>
                                            <li>Costo del permiso de permanencia transitoria simple (US$): ${buscarId.costoSimple}.</li>
                                            <li>Vigencia del permiso de permanencia transitoria múltiple (días): ${buscarId.estadiaMultiple}.</li>
                                            <li>Costo del permiso de permanencia transitoria múltiple (US$): ${buscarId.costoMultiple}.</li>
                                        </ul>
                                        <h4>Prorrogar un permiso de permanencia transitoria</h4>
                                        <p class="p-justify">El permiso de permanencia transitoria puede prorrogarse por un período adicional de hasta 90 días. Quienes deseen extender su estadía en Chile como titulares de un permiso de permanencia transitoria, deberán realizar el trámite de <strong>"Solicitud Prórroga de Permanencia Transitoria"</strong> a través del <a href="https://tramites.serviciomigraciones.cl" target="_blank">sitio web de trámites digitales del Servicio Nacional de Migraciones</a>, <strong>antes del vencimiento del permiso original</strong>.</p>
                                        <p class="p-justify">La prórroga del permiso de permanencia transitoria tiene un costo de US$100.</p>
                                        <ul>
                                            <li><a href="https://serviciomigraciones.cl/permanenciatransitoria/prorrogadepermanenciatransitoria/" target="_blank">Requisitos para solicitar la prórroga de un Permiso de Permanencia Transitoria</a>.</li>
                                        </ul>
                                        <h4>Trabajar con un permiso de permanencia transitoria</h4>
                                        <p class="p-justify">Quienes sean titulares de un Permiso de Permanencia Transitoria podrán solicitar un permiso de trabajo, ya sea antes o después de su ingreso a Chile. El permiso de trabajo podrá otorgarse siempre que se encuentre vigente el Permiso de Permanencia Transitoria.</p>
                                        <ul>
                                            <li><a href="https://serviciomigraciones.cl/permanenciatransitoria/permisodetrabajoconpermanenciatransitoria/" target="_blank">Requisitos para solicitar un permiso de trabajo como titular de un Permiso de Permanencia Transitoria</a>.</li>
                                        </ul>
                                        <h3>RESIDENCIA</h3>
                                        <p class="p-justify">Si tu intención es residir y trabajar en Chile, tendrás que solicitar un permiso de residencia temporal desde fuera de Chile a través del sitio web de <a href="https://tramites.serviciomigraciones.cl/" target="_blank">trámites digitales del Servicio Nacional de Migraciones</a>.</p>
                                        <p class="p-justify">Quienes ingresen a Chile a partir del <strong>12 de febrero de 2022</strong> <em>(fecha en que entró en vigencia la nueva Ley de Migración y Extranjería - N°21.325)</em> con un permiso de permanencia transitoria (turismo) <strong>no podrán postular a un permiso de residencia temporal dentro del país</strong>, <u>salvo que:</u> a) acrediten tener vínculo de familia con chilenos o con residentes definitivos en Chile; O, b) su estadía sea concordante con los objetivos de la Política Nacional de Migración y Extranjería; O, c) se encuentren en alguno de los casos debidamente calificados por la Subsecretaría del Interior mediante resolución, previo informe del Servicio Nacional de Migraciones.</p> 
                                        <p class="p-justify">Se consideran vínculos de familia: a) cónyuge u otra figura análoga que, de conformidad con el derecho aplicable, produzca efectos equivalentes al matrimonio; b) padre o madre; c) hijo menor de edad; d) hijo con discapacidad; e) hijo soltero menor de 24 años que se encuentre estudiando; y, f) menor de edad que se encuentre bajo cuidado personal o curaduría.</p>
                                            <ul>
                                            <li><a href="https://serviciomigraciones.cl/residenciatemporal/" target="_blank">Subcategorías de residencia temporal disponibles en Chile</a>.</li>
                                            <li><a href="https://tramites.extranjeria.gob.cl/tramites/iniciar/248" target="_blank">Trámite de solicitud de residencia temporal para extranjeros fuera de Chile - Servicio Nacional de Migraciones</a></li>
                                            </ul>
                                        <p class="p-justify"><em>* Antes de realizar el trámite debes <a href="https://tramites.extranjeria.gob.cl/register" target="_blank">crear tu cuenta</a>.</em></p>`;
        }
    });
}
// Ejecuta la función:
entrada();

// Número de países que requieren un permiso para ingresar a Chile:
function numeroDePaisesQueRequierenPermiso() {
    let totalReqVis = 0;
    paises.forEach((requieren) => {
    if(requieren.permiso == "si") {
        totalReqVis++;
    }
})
console.log(totalReqVis);
}

// Texto a mostrar si Chile se encuentra en Alerta Nivel 1:
const alertaNivel1 = () => {
    alert("REQUISITOS SANITARIOS DE INGRESO:\n\n1) Todas las personas mayores de 6 años de edad deben completar la Declaración Jurada a través de www.c19.cl hasta 48 horas antes de su embarque.\n2) Cuarentena o aislamiento: Sólo las personas que, al tiempo de ingresar a Chile correspondan a un caso confirmado de COVID-19, deberán cumplir con la medida de aislamiento por 7 días en una residencia sanitaria o en el lugar que la autoridad sanitaria determine.\n3) Test PCR negativo antes de abordar: Opcional.\n4) Test PCR al ingresar a Chile: Aleatorio.\n\nFuente: Resolución Exenta N° 495 del Ministerio de Salud - Plan Fronteras Protegidas.");
}