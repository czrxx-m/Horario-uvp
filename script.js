
// ============================================================
// MI HORARIO — LÓGICA PRINCIPAL
// Ingeniería en Agronomía
//
// Funciones incluidas:
// 1. Datos de materias y actividades.
// 2. Selector de los siete días.
// 3. Horario diario con tiempos de descanso.
// 4. Identificación de clases pasadas y en curso.
// 5. Próxima clase y cuenta regresiva.
// 6. Resumen y progreso de la jornada.
// 7. Catálogo de materias con buscador.
// 8. Fecha actual y actualización automática.
// 9. Respaldo visual si uvp.png no se encuentra.
//
// Este archivo trabaja con los identificadores de index.html
// y con las clases visuales declaradas en style.css.
// ============================================================


// ------------------------------------------------------------
// 1. CONFIGURACIÓN GENERAL
// ------------------------------------------------------------

const CONFIGURACION = {
    idioma: "es-MX",
    intervaloActualizacion: 60000,
    limiteDiasBusqueda: 7,
    mostrarDescansosHastaMinutos: 45
};

const DIAS_ORDENADOS = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo"
];

// Date.getDay() utiliza 0 para domingo y 6 para sábado.
const NOMBRES_DIAS_FECHA = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
];


// ------------------------------------------------------------
// 2. HORARIO ACADÉMICO
//
// Cada clase tiene:
// inicio: hora en formato de 24 horas.
// fin: hora de finalización.
// materia: nombre de la materia o actividad.
// salon: espacio en el que se realiza.
// profesor: nombre del profesor, cuando corresponde.
//
// Los bloques académicos se conservan por separado.
// Vóley se mantiene como actividad de dos horas.
// ------------------------------------------------------------

const horario = {
    Lunes: [
        {
            inicio: "08:10",
            fin: "09:00",
            materia: "Matemáticas I",
            salon: "1116",
            profesor: "Cecilia"
        },
        {
            inicio: "09:10",
            fin: "10:00",
            materia: "Pensamiento Analítico y Lógico",
            salon: "1108",
            profesor: "Carlos"
        },
        {
            inicio: "10:10",
            fin: "11:00",
            materia: "Pensamiento Analítico y Lógico",
            salon: "1108",
            profesor: "Carlos"
        },
        {
            inicio: "11:10",
            fin: "12:00",
            materia: "Botánica General",
            salon: "2103",
            profesor: "Regina"
        },
        {
            inicio: "12:10",
            fin: "13:00",
            materia: "Botánica General",
            salon: "2103",
            profesor: "Regina"
        },
        {
            inicio: "13:10",
            fin: "14:00",
            materia: "Edafología",
            salon: "2103",
            profesor: "Edgar"
        }
    ],

    Martes: [
        {
            inicio: "10:10",
            fin: "11:00",
            materia: "Edafología",
            salon: "Lab. de Antropometría",
            profesor: "Edgar"
        },
        {
            inicio: "11:10",
            fin: "12:00",
            materia: "Edafología",
            salon: "Lab. de Antropometría",
            profesor: "Edgar"
        },
        {
            inicio: "12:10",
            fin: "13:00",
            materia: "Química",
            salon: "2103",
            profesor: "Asunción"
        },
        {
            inicio: "13:10",
            fin: "14:00",
            materia: "Química",
            salon: "2103",
            profesor: "Asunción"
        }
    ],

    Miércoles: [
        {
            inicio: "07:10",
            fin: "08:00",
            materia: "Matemáticas I",
            salon: "1118",
            profesor: "Cecilia"
        },
        {
            inicio: "08:10",
            fin: "09:00",
            materia: "Matemáticas I",
            salon: "1118",
            profesor: "Cecilia"
        },
        {
            inicio: "09:10",
            fin: "10:00",
            materia: "Botánica General",
            salon: "Lab. C. Bas",
            profesor: "Regina"
        },
        {
            inicio: "10:10",
            fin: "11:00",
            materia: "Botánica General",
            salon: "Lab. C. Bas",
            profesor: "Regina"
        },
        {
            inicio: "11:10",
            fin: "12:00",
            materia: "Edafología",
            salon: "1106",
            profesor: "Edgar"
        },
        {
            inicio: "12:10",
            fin: "13:00",
            materia: "Competencias Digitales",
            salon: "Lab. Info 1",
            profesor: "José"
        },
        {
            inicio: "13:10",
            fin: "14:00",
            materia: "Competencias Digitales",
            salon: "Lab. Info 1",
            profesor: "José"
        },
        {
            inicio: "17:00",
            fin: "19:00",
            materia: "Vóley",
            salon: "Actividad deportiva",
            profesor: ""
        }
    ],

    Jueves: [],

    Viernes: [
        {
            inicio: "09:10",
            fin: "10:00",
            materia: "Matemáticas I",
            salon: "1204",
            profesor: "Cecilia"
        },
        {
            inicio: "10:10",
            fin: "11:00",
            materia: "Pensamiento Analítico y Lógico",
            salon: "1123",
            profesor: "Carlos"
        },
        {
            inicio: "11:10",
            fin: "12:00",
            materia: "Autonomía, Carácter y Propósito",
            salon: "Viti",
            profesor: "Douglas"
        },
        {
            inicio: "12:10",
            fin: "13:00",
            materia: "Autonomía, Carácter y Propósito",
            salon: "Viti",
            profesor: "Douglas"
        },
        {
            inicio: "13:10",
            fin: "14:00",
            materia: "Química",
            salon: "1109",
            profesor: "Asunción"
        }
    ],

    Sábado: [
        {
            inicio: "09:00",
            fin: "11:00",
            materia: "Vóley",
            salon: "Actividad deportiva",
            profesor: ""
        }
    ],

    Domingo: []
};


// ------------------------------------------------------------
// 3. REFERENCIAS A LOS ELEMENTOS DEL HTML
//
// Estos nombres deben coincidir con los id del index.html.
// ------------------------------------------------------------

const elementos = {
    fechaActual: document.getElementById("fecha-actual"),
    estadoDia: document.getElementById("estado-dia"),
    anioActual: document.getElementById("anio-actual"),

    metricasDia: document.getElementById("metricas-dia"),
    barraProgreso: document.getElementById("barra-progreso"),
    progresoRelleno: document.getElementById("progreso-relleno"),
    textoPorcentaje: document.getElementById("texto-porcentaje"),
    textoProgreso: document.getElementById("texto-progreso"),

    mensajeProxima: document.getElementById("mensaje-proxima"),

    botonHoy: document.getElementById("boton-hoy"),
    selectorDias: document.getElementById("selector-dias"),
    nombreDiaSeleccionado: document.getElementById(
        "nombre-dia-seleccionado"
    ),
    contadorClases: document.getElementById("contador-clases"),
    horarioDia: document.getElementById("horario-dia"),

    buscadorMaterias: document.getElementById("buscador-materias"),
    contadorMaterias: document.getElementById("contador-materias"),
    listaMaterias: document.getElementById("lista-materias"),

    logoUVP: document.getElementById("logo-uvp")
};


// ------------------------------------------------------------
// 4. ESTADO DE LA INTERFAZ
//
// seguirDiaActual indica si la pantalla sigue automáticamente
// el día real. Si eliges otro día, se conserva esa selección.
// El botón "Volver a hoy" recupera el seguimiento automático.
// ------------------------------------------------------------

let seguirDiaActual = true;
let diaSeleccionado = obtenerDiaActual();


// ------------------------------------------------------------
// 5. FUNCIONES AUXILIARES PARA CREAR ELEMENTOS
// ------------------------------------------------------------

function crearElemento(etiqueta, claseCSS = "", texto = "") {
    const elemento = document.createElement(etiqueta);

    if (claseCSS) {
        elemento.className = claseCSS;
    }

    if (texto !== "") {
        elemento.textContent = texto;
    }

    return elemento;
}

function normalizarTexto(texto) {
    return String(texto)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase(CONFIGURACION.idioma)
        .trim();
}

function obtenerDiaActual() {
    return NOMBRES_DIAS_FECHA[new Date().getDay()];
}

function esDiaActual(dia) {
    return dia === obtenerDiaActual();
}

function obtenerHoraActualEnMinutos() {
    const ahora = new Date();

    return ahora.getHours() * 60 + ahora.getMinutes();
}


// ------------------------------------------------------------
// 6. CONVERSIÓN Y FORMATO DE HORAS
// ------------------------------------------------------------

function horaAMinutos(hora) {
    const partes = hora.split(":").map(Number);
    const horas = partes[0];
    const minutos = partes[1];

    return horas * 60 + minutos;
}

function minutosDuracion(clase) {
    return Math.max(
        0,
        horaAMinutos(clase.fin) - horaAMinutos(clase.inicio)
    );
}

function formatearHora(hora) {
    const partes = hora.split(":").map(Number);
    const horas24 = partes[0];
    const minutos = partes[1];

    const indicador = horas24 >= 12 ? "p. m." : "a. m.";
    const horas12 = horas24 % 12 || 12;

    return `${horas12}:${String(minutos).padStart(2, "0")} ${indicador}`;
}

function formatearDuracion(totalMinutos) {
    const minutos = Math.max(0, Math.round(totalMinutos));
    const horasCompletas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    if (horasCompletas === 0) {
        return `${minutos} min`;
    }

    if (minutosRestantes === 0) {
        return `${horasCompletas} h`;
    }

    return `${horasCompletas} h ${minutosRestantes} min`;
}

function formatearFechaCompleta(fecha) {
    const texto = new Intl.DateTimeFormat(
        CONFIGURACION.idioma,
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    ).format(fecha);

    return texto.charAt(0).toLocaleUpperCase(
        CONFIGURACION.idioma
    ) + texto.slice(1);
}

function crearFechaConHora(fechaBase, hora) {
    const fecha = new Date(fechaBase);
    const partes = hora.split(":").map(Number);

    fecha.setHours(partes[0], partes[1], 0, 0);

    return fecha;
}

function formatearFechaRelativa(fecha, fechaReferencia = new Date()) {
    const hoy = new Date(
        fechaReferencia.getFullYear(),
        fechaReferencia.getMonth(),
        fechaReferencia.getDate()
    );

    const diaConsultado = new Date(
        fecha.getFullYear(),
        fecha.getMonth(),
        fecha.getDate()
    );

    const diferenciaDias = Math.round(
        (diaConsultado - hoy) / 86400000
    );

    if (diferenciaDias === 0) {
        return "Hoy";
    }

    if (diferenciaDias === 1) {
        return "Mañana";
    }

    return new Intl.DateTimeFormat(
        CONFIGURACION.idioma,
        {
            weekday: "long",
            day: "numeric",
            month: "short"
        }
    ).format(fecha);
}


// ------------------------------------------------------------
// 7. ORDEN DEL HORARIO
//
// Las actividades se ordenan por hora de inicio para asegurar
// una presentación cronológica, aunque se cambien de posición
// en el objeto de datos.
// ------------------------------------------------------------

function obtenerClasesOrdenadas(dia) {
    const clases = horario[dia] || [];

    return [...clases].sort((a, b) => {
        return horaAMinutos(a.inicio) - horaAMinutos(b.inicio);
    });
}

function obtenerDuracionDia(dia) {
    return obtenerClasesOrdenadas(dia).reduce(
        (total, clase) => total + minutosDuracion(clase),
        0
    );
}


// ------------------------------------------------------------
// 8. SELECTOR DE DÍAS
//
// Crea un botón por día y marca el día seleccionado.
// El indicador rojo distingue el día real.
// ------------------------------------------------------------

function obtenerAbreviaturaDia(dia) {
    const abreviaturas = {
        Lunes: "Lun",
        Martes: "Mar",
        Miércoles: "Mié",
        Jueves: "Jue",
        Viernes: "Vie",
        Sábado: "Sáb",
        Domingo: "Dom"
    };

    return abreviaturas[dia] || dia;
}

function renderizarSelectorDias() {
    elementos.selectorDias.replaceChildren();

    DIAS_ORDENADOS.forEach(dia => {
        const boton = crearElemento(
            "button",
            "boton-dia"
        );

        boton.type = "button";
        boton.setAttribute(
            "aria-label",
            `Mostrar horario del ${dia}`
        );

        const estaSeleccionado = dia === diaSeleccionado;
        const esHoy = esDiaActual(dia);

        if (estaSeleccionado) {
            boton.classList.add("seleccionado");
        }

        if (esHoy) {
            boton.classList.add("hoy");
        }

        boton.setAttribute(
            "aria-pressed",
            String(estaSeleccionado)
        );

        const nombreCorto = crearElemento(
            "span",
            "dia-corto",
            obtenerAbreviaturaDia(dia)
        );

        const indicador = crearElemento(
            "span",
            "dia-indicador"
        );

        indicador.setAttribute("aria-hidden", "true");

        boton.append(nombreCorto, indicador);

        boton.addEventListener("click", () => {
            diaSeleccionado = dia;
            seguirDiaActual = esDiaActual(dia);

            actualizarInterfaz();
        });

        elementos.selectorDias.appendChild(boton);
    });
}


// ------------------------------------------------------------
// 9. ESTADO DE CADA CLASE
//
// En el día actual, la actividad puede estar pendiente,
// en curso o finalizada. En otros días se muestra como parte
// de la vista del horario sin asumir un estado temporal.
// ------------------------------------------------------------

function obtenerEstadoClase(clase, dia) {
    if (!esDiaActual(dia)) {
        return "programada";
    }

    const ahora = obtenerHoraActualEnMinutos();
    const inicio = horaAMinutos(clase.inicio);
    const fin = horaAMinutos(clase.fin);

    if (ahora >= fin) {
        return "finalizada";
    }

    if (ahora >= inicio && ahora < fin) {
        return "en-curso";
    }

    return "pendiente";
}

function crearEtiquetaEstado(estado) {
    const etiquetas = {
        "en-curso": "EN CURSO",
        "finalizada": "FINALIZADA"
    };

    if (!etiquetas[estado]) {
        return null;
    }

    const etiqueta = crearElemento(
        "span",
        `etiqueta-estado ${estado}`,
        etiquetas[estado]
    );

    return etiqueta;
}


// ------------------------------------------------------------
// 10. TARJETAS INDIVIDUALES DE CLASE
//
// La información se crea con elementos del DOM.
// Cada tarjeta incluye hora de inicio, hora de fin, materia,
// salón y profesor cuando existe.
// ------------------------------------------------------------

function crearTarjetaClase(clase, dia) {
    const estado = obtenerEstadoClase(clase, dia);

    const tarjeta = crearElemento(
        "article",
        "clase-tarjeta"
    );

    tarjeta.setAttribute(
        "aria-label",
        `${clase.materia}, ${formatearHora(clase.inicio)} a ${formatearHora(clase.fin)}`
    );

    if (estado === "en-curso") {
        tarjeta.classList.add("en-curso");
    }

    if (estado === "finalizada") {
        tarjeta.classList.add("finalizada");
    }

    // Columna izquierda: intervalo de tiempo.
    const columnaHora = crearElemento(
        "div",
        "clase-eje-hora"
    );

    columnaHora.append(
        crearElemento(
            "span",
            "clase-hora-inicio",
            formatearHora(clase.inicio)
        ),
        crearElemento(
            "span",
            "clase-hora-separador",
            "hasta"
        ),
        crearElemento(
            "span",
            "clase-hora-fin",
            formatearHora(clase.fin)
        )
    );

    // Columna derecha: datos de la materia.
    const contenido = crearElemento(
        "div",
        "clase-contenido"
    );

    const cabecera = crearElemento(
        "div",
        "clase-cabecera"
    );

    const titulo = crearElemento(
        "h4",
        "clase-titulo",
        clase.materia
    );

    cabecera.appendChild(titulo);

    const etiqueta = crearEtiquetaEstado(estado);

    if (etiqueta) {
        cabecera.appendChild(etiqueta);
    }

    const detalles = crearElemento(
        "div",
        "detalles-clase"
    );

    detalles.appendChild(
        crearElemento(
            "span",
            "detalle-item",
            `Salón: ${clase.salon}`
        )
    );

    if (clase.profesor) {
        detalles.appendChild(
            crearElemento(
                "span",
                "detalle-item",
                `Profesor: ${clase.profesor}`
            )
        );
    }

    contenido.append(cabecera, detalles);
    tarjeta.append(columnaHora, contenido);

    return tarjeta;
}


// ------------------------------------------------------------
// 11. SEPARADORES DE DESCANSO
//
// Cuando existe una pausa breve entre dos clases consecutivas,
// se muestra visualmente el tiempo disponible entre ellas.
// Las pausas largas no se confunden con los descansos de clase.
// ------------------------------------------------------------

function crearSeparadorDescanso(minutos) {
    const separador = crearElemento(
        "div",
        "separador-descanso"
    );

    const lineaInicial = crearElemento(
        "span",
        "linea-descanso"
    );

    const simbolo = crearElemento(
        "span",
        "separador-descanso-simbolo",
        "✦"
    );

    const texto = crearElemento(
        "span",
        "",
        `Descanso · ${minutos} min`
    );

    const lineaFinal = crearElemento(
        "span",
        "linea-descanso"
    );

    separador.append(
        lineaInicial,
        simbolo,
        texto,
        lineaFinal
    );

    return separador;
}


// ------------------------------------------------------------
// 12. ESTADO VACÍO PARA DÍAS SIN ACTIVIDADES
// ------------------------------------------------------------

function crearMensajeDiaLibre(dia) {
    const contenedor = crearElemento(
        "div",
        "vacio"
    );

    const simbolo = crearElemento(
        "div",
        "vacio-simbolo",
        "✦"
    );

    const titulo = crearElemento(
        "h4",
        "",
        dia === "Domingo"
            ? "Un espacio para descansar"
            : "Día libre"
    );

    let mensaje;

    if (dia === "Domingo") {
        mensaje = "No tienes actividades registradas para hoy. Recarga energía para comenzar una nueva semana.";
    } else if (dia === "Jueves") {
        mensaje = "No tienes clases registradas para este día. Aprovecha el tiempo para estudiar, descansar o adelantar pendientes.";
    } else {
        mensaje = "No hay actividades programadas en este día.";
    }

    const descripcion = crearElemento(
        "p",
        "",
        mensaje
    );

    contenedor.append(
        simbolo,
        titulo,
        descripcion
    );

    return contenedor;
}


// ------------------------------------------------------------
// 13. RENDERIZAR EL HORARIO DE UN DÍA
//
// Actualiza:
// - Nombre del día.
// - Número de actividades.
// - Tarjetas de clase.
// - Descansos breves entre bloques.
// - Mensaje para un día libre.
// ------------------------------------------------------------

function renderizarHorarioDia() {
    const dia = diaSeleccionado;
    const clases = obtenerClasesOrdenadas(dia);

    elementos.nombreDiaSeleccionado.textContent = dia;

    const numeroActividades = clases.length;

    elementos.contadorClases.textContent =
        `${numeroActividades} ${
            numeroActividades === 1
                ? "actividad"
                : "actividades"
        }`;

    elementos.horarioDia.replaceChildren();

    if (clases.length === 0) {
        elementos.horarioDia.appendChild(
            crearMensajeDiaLibre(dia)
        );

        return;
    }

    const lista = crearElemento(
        "div",
        "lista-clases"
    );

    clases.forEach((clase, indice) => {
        lista.appendChild(
            crearTarjetaClase(clase, dia)
        );

        const siguienteClase = clases[indice + 1];

        if (!siguienteClase) {
            return;
        }

        const finActual = horaAMinutos(clase.fin);
        const inicioSiguiente = horaAMinutos(
            siguienteClase.inicio
        );

        const minutosDescanso = inicioSiguiente - finActual;

        if (
            minutosDescanso > 0 &&
            minutosDescanso <= CONFIGURACION.mostrarDescansosHastaMinutos
        ) {
            lista.appendChild(
                crearSeparadorDescanso(minutosDescanso)
            );
        }
    });

    elementos.horarioDia.appendChild(lista);
}


// ------------------------------------------------------------
// 14. RESUMEN DEL DÍA
//
// Calcula cuántas actividades están registradas y cuánto
// tiempo total aparece en el horario.
// Para el día actual, estima los minutos que ya transcurrieron
// dentro de las actividades programadas.
// ------------------------------------------------------------

function crearMetrica(valor, etiqueta) {
    const tarjeta = crearElemento(
        "div",
        "metrica"
    );

    const valorElemento = crearElemento(
        "span",
        "metrica-valor",
        valor
    );

    const etiquetaElemento = crearElemento(
        "span",
        "metrica-etiqueta",
        etiqueta
    );

    const acento = crearElemento(
        "span",
        "metrica-acento"
    );

    acento.setAttribute("aria-hidden", "true");

    tarjeta.append(
        valorElemento,
        etiquetaElemento,
        acento
    );

    return tarjeta;
}

function calcularProgresoDia(dia, clases) {
    const totalMinutos = clases.reduce(
        (total, clase) => total + minutosDuracion(clase),
        0
    );

    if (!esDiaActual(dia) || totalMinutos === 0) {
        return {
            totalMinutos,
            transcurridos: 0,
            porcentaje: 0
        };
    }

    const ahora = obtenerHoraActualEnMinutos();

    const transcurridos = clases.reduce((total, clase) => {
        const inicio = horaAMinutos(clase.inicio);
        const fin = horaAMinutos(clase.fin);

        const minutosDentroDeClase = Math.max(
            0,
            Math.min(ahora, fin) - inicio
        );

        return total + minutosDentroDeClase;
    }, 0);

    const porcentaje = Math.min(
        100,
        Math.round((transcurridos / totalMinutos) * 100)
    );

    return {
        totalMinutos,
        transcurridos,
        porcentaje
    };
}

function renderizarResumenDia() {
    const dia = diaSeleccionado;
    const clases = obtenerClasesOrdenadas(dia);

    const progreso = calcularProgresoDia(dia, clases);

    const numeroActividades = clases.length;
    const duracionTotal = progreso.totalMinutos;
    const porcentaje = progreso.porcentaje;

    elementos.metricasDia.replaceChildren();

    elementos.metricasDia.append(
        crearMetrica(
            String(numeroActividades),
            numeroActividades === 1
                ? "Actividad registrada"
                : "Actividades registradas"
        ),

        crearMetrica(
            formatearDuracion(duracionTotal),
            "Tiempo programado"
        ),

        crearMetrica(
            `${porcentaje}%`,
            esDiaActual(dia)
                ? "Progreso de hoy"
                : "Vista previa"
        )
    );

    elementos.progresoRelleno.style.width = `${porcentaje}%`;

    elementos.barraProgreso.setAttribute(
        "aria-valuenow",
        String(porcentaje)
    );

    elementos.textoPorcentaje.textContent = `${porcentaje}%`;

    if (numeroActividades === 0) {
        elementos.textoProgreso.textContent =
            "No hay actividades programadas para este día. Puedes aprovecharlo para descansar o prepararte.";

        return;
    }

    if (!esDiaActual(dia)) {
        elementos.textoProgreso.textContent =
            "Estás viendo otro día. El progreso en tiempo real corresponde al día actual.";

        return;
    }

    if (porcentaje >= 100) {
        elementos.textoProgreso.textContent =
            "Has completado el tiempo programado de todas las actividades de hoy.";

        return;
    }

    elementos.textoProgreso.textContent =
        `Han transcurrido aproximadamente ${formatearDuracion(progreso.transcurridos)} de ${formatearDuracion(progreso.totalMinutos)} de actividad programada para hoy.`;
}


// ------------------------------------------------------------
// 15. BÚSQUEDA DE LA PRÓXIMA CLASE
//
// Revisa las actividades del día actual y los días siguientes.
// Si una clase ya terminó, la omite.
// Si una clase está en curso, la considera la actividad actual.
// ------------------------------------------------------------

function buscarProximaClase() {
    const ahora = new Date();

    for (
        let desplazamiento = 0;
        desplazamiento <= CONFIGURACION.limiteDiasBusqueda;
        desplazamiento++
    ) {
        const fecha = new Date(
            ahora.getFullYear(),
            ahora.getMonth(),
            ahora.getDate() + desplazamiento
        );

        const nombreDia = NOMBRES_DIAS_FECHA[fecha.getDay()];
        const clases = obtenerClasesOrdenadas(nombreDia);

        for (const clase of clases) {
            const inicio = crearFechaConHora(
                fecha,
                clase.inicio
            );

            const fin = crearFechaConHora(
                fecha,
                clase.fin
            );

            // Si la actividad finalizó, buscamos la siguiente.
            if (fin <= ahora) {
                continue;
            }

            return {
                clase,
                inicio,
                fin,
                nombreDia,
                enCurso: ahora >= inicio && ahora < fin
            };
        }
    }

    return null;
}


// ------------------------------------------------------------
// 16. CUENTA REGRESIVA
//
// Devuelve una expresión legible:
// - en 18 min
// - en 2 h 15 min
// - en 1 d 3 h
// ------------------------------------------------------------

function textoCuentaRegresiva(fechaObjetivo) {
    const diferencia = fechaObjetivo.getTime() - Date.now();

    if (diferencia <= 0) {
        return "Ahora";
    }

    const totalMinutos = Math.ceil(
        diferencia / 60000
    );

    const dias = Math.floor(totalMinutos / 1440);
    const horas = Math.floor(
        (totalMinutos % 1440) / 60
    );
    const minutos = totalMinutos % 60;

    if (dias > 0) {
        return `en ${dias} d ${horas} h`;
    }

    if (horas > 0) {
        return `en ${horas} h ${minutos} min`;
    }

    return `en ${minutos} min`;
}


// ------------------------------------------------------------
// 17. TARJETA DE LA PRÓXIMA CLASE
// ------------------------------------------------------------

function renderizarProximaClase() {
    elementos.mensajeProxima.replaceChildren();

    const proxima = buscarProximaClase();

    if (!proxima) {
        const mensaje = crearMensajeDiaLibre("Domingo");

        elementos.mensajeProxima.appendChild(mensaje);
        return;
    }

    const {
        clase,
        inicio,
        fin,
        nombreDia,
        enCurso
    } = proxima;

    const contenedor = crearElemento(
        "div",
        "proxima-contenido"
    );

    const estado = crearElemento(
        "div",
        enCurso
            ? "proxima-estado en-curso"
            : "proxima-estado",
        enCurso
            ? "ACTIVIDAD EN CURSO"
            : "PRÓXIMA ACTIVIDAD"
    );

    const titulo = crearElemento(
        "h3",
        "proxima-materia",
        clase.materia
    );

    const etiquetaFecha = formatearFechaRelativa(inicio);

    const detallesTexto = [
        etiquetaFecha,
        `${formatearHora(clase.inicio)} – ${formatearHora(clase.fin)}`,
        `Salón: ${clase.salon}`
    ];

    if (clase.profesor) {
        detallesTexto.push(`Profesor: ${clase.profesor}`);
    }

    const detalles = crearElemento(
        "p",
        "proxima-detalle",
        detallesTexto.join(" · ")
    );

    const pie = crearElemento(
        "div",
        "proxima-pie"
    );

    const objetivo = enCurso ? fin : inicio;
    const textoTiempo = enCurso
        ? `Termina ${textoCuentaRegresiva(objetivo)}`
        : `Comienza ${textoCuentaRegresiva(objetivo)}`;

    const tiempo = crearElemento(
        "span",
        "proxima-tiempo",
        textoTiempo
    );

    const nota = crearElemento(
        "span",
        "proxima-nota",
        enCurso
            ? "Mantén tu ritmo."
            : `Actividad del ${nombreDia.toLocaleLowerCase(CONFIGURACION.idioma)}.`
    );

    pie.append(tiempo, nota);

    contenedor.append(
        estado,
        titulo,
        detalles,
        pie
    );

    elementos.mensajeProxima.appendChild(contenedor);
}


// ------------------------------------------------------------
// 18. CATÁLOGO DE MATERIAS
//
// Agrupa los bloques por nombre de materia.
// Consolida los salones, profesores y días asociados,
// conservando el número de sesiones individuales.
// ------------------------------------------------------------

function obtenerMateriasAgrupadas() {
    const materias = new Map();

    DIAS_ORDENADOS.forEach(dia => {
        const clases = obtenerClasesOrdenadas(dia);

        clases.forEach(clase => {
            if (!materias.has(clase.materia)) {
                materias.set(clase.materia, {
                    nombre: clase.materia,
                    sesiones: 0,
                    minutosTotales: 0,
                    dias: new Set(),
                    salones: new Set(),
                    profesores: new Set()
                });
            }

            const materia = materias.get(clase.materia);

            materia.sesiones += 1;
            materia.minutosTotales += minutosDuracion(clase);
            materia.dias.add(dia);
            materia.salones.add(clase.salon);

            if (clase.profesor) {
                materia.profesores.add(clase.profesor);
            }
        });
    });

    return [...materias.values()].sort(
        (a, b) => a.nombre.localeCompare(
            b.nombre,
            CONFIGURACION.idioma
        )
    );
}


// ------------------------------------------------------------
// 19. ELEMENTOS DE INFORMACIÓN PARA CADA MATERIA
// ------------------------------------------------------------

function crearDatoMateria(etiqueta, valor) {
    const contenedor = crearElemento(
        "p",
        "materia-dato"
    );

    const encabezado = crearElemento(
        "strong",
        "",
        etiqueta
    );

    const contenido = crearElemento(
        "span",
        "",
        valor
    );

    contenedor.append(encabezado, contenido);

    return contenedor;
}

function crearTarjetaMateria(materia, indice) {
    const tarjeta = crearElemento(
        "article",
        "materia-card"
    );

    tarjeta.setAttribute(
        "aria-label",
        `Materia: ${materia.nombre}`
    );

    const cabecera = crearElemento(
        "div",
        "materia-cabecera"
    );

    const numero = crearElemento(
        "span",
        "materia-numero",
        String(indice + 1).padStart(2, "0")
    );

    const sesiones = crearElemento(
        "span",
        "materia-sesiones",
        `${materia.sesiones} ${
            materia.sesiones === 1
                ? "sesión"
                : "sesiones"
        }`
    );

    cabecera.append(numero, sesiones);

    const titulo = crearElemento(
        "h3",
        "materia-titulo",
        materia.nombre
    );

    const lineas = crearElemento(
        "div",
        "materia-lineas"
    );

    lineas.append(
        crearDatoMateria(
            "Días",
            [...materia.dias].join(", ")
        ),

        crearDatoMateria(
            "Salón o espacio",
            [...materia.salones].join(", ")
        ),

        crearDatoMateria(
            "Profesor",
            [...materia.profesores].join(", ") || "No especificado"
        ),

        crearDatoMateria(
            "Tiempo semanal",
            formatearDuracion(materia.minutosTotales)
        )
    );

    tarjeta.append(
        cabecera,
        titulo,
        lineas
    );

    return tarjeta;
}


// ------------------------------------------------------------
// 20. FILTRAR Y RENDERIZAR EL CATÁLOGO
//
// La búsqueda acepta materia, día, profesor o salón.
// Se ignoran las diferencias entre mayúsculas y acentos.
// ------------------------------------------------------------

function renderizarMaterias() {
    const todasLasMaterias = obtenerMateriasAgrupadas();

    const busqueda = normalizarTexto(
        elementos.buscadorMaterias.value
    );

    const materiasFiltradas = todasLasMaterias.filter(
        materia => {
            const campos = [
                materia.nombre,
                ...materia.dias,
                ...materia.salones,
                ...materia.profesores
            ];

            const contenido = normalizarTexto(
                campos.join(" ")
            );

            return contenido.includes(busqueda);
        }
    );

    elementos.listaMaterias.replaceChildren();

    elementos.contadorMaterias.textContent =
        `${materiasFiltradas.length} ${
            materiasFiltradas.length === 1
                ? "materia"
                : "materias"
        }`;

    if (materiasFiltradas.length === 0) {
        const mensaje = crearMensajeDiaLibre("Jueves");

        mensaje.classList.add("materias-sin-resultados");

        const titulo = mensaje.querySelector("h4");
        const descripcion = mensaje.querySelector("p");

        if (titulo) {
            titulo.textContent = "No encontramos coincidencias";
        }

        if (descripcion) {
            descripcion.textContent =
                "Prueba con otra materia, nombre de profesor, salón o día de la semana.";
        }

        elementos.listaMaterias.appendChild(mensaje);

        return;
    }

    materiasFiltradas.forEach((materia, indice) => {
        elementos.listaMaterias.appendChild(
            crearTarjetaMateria(materia, indice)
        );
    });
}


// ------------------------------------------------------------
// 21. FECHA, ESTADO Y PIE DE PÁGINA
// ------------------------------------------------------------

function actualizarFechaCabecera() {
    const ahora = new Date();

    elementos.fechaActual.textContent =
        formatearFechaCompleta(ahora);

    elementos.estadoDia.textContent =
        `HOY · ${obtenerDiaActual().toLocaleUpperCase(CONFIGURACION.idioma)}`;

    elementos.anioActual.textContent =
        String(ahora.getFullYear());
}


// ------------------------------------------------------------
// 22. INDICADOR DE BLOQUES PENDIENTES
//
// Se cuenta como pendiente una actividad cuyo horario de fin
// aún no se ha alcanzado. Una clase que esté en curso también
// se considera pendiente hasta su hora de finalización.
// ------------------------------------------------------------

function actualizarContadorClases() {
    const hoy = obtenerDiaActual();
    const clasesHoy = obtenerClasesOrdenadas(hoy);
    const horaActual = obtenerHoraActualEnMinutos();

    const pendientes = clasesHoy.filter(clase => {
        return horaAMinutos(clase.fin) > horaActual;
    }).length;

    if (clasesHoy.length === 0) {
        elementos.contadorClases.textContent =
            "Día sin actividades";

        return;
    }

    if (pendientes === 0) {
        elementos.contadorClases.textContent =
            "Jornada completada";

        return;
    }

    elementos.contadorClases.textContent =
        `${pendientes} pendientes de ${clasesHoy.length}`;
}


// ------------------------------------------------------------
// 23. RESPALDO VISUAL DEL LOGO
//
// Si uvp.png falta o tiene un nombre incorrecto, se muestra
// "UVP" como sustituto en lugar de un icono roto.
// Esto no modifica ni recolorea la imagen original.
// ------------------------------------------------------------

function configurarRespaldoLogo() {
    const imagen = elementos.logoUVP;

    if (!imagen) {
        return;
    }

    function mostrarRespaldo() {
        if (imagen.dataset.respaldoCreado === "true") {
            return;
        }

        imagen.dataset.respaldoCreado = "true";
        imagen.hidden = true;

        const respaldo = crearElemento(
            "span",
            "logo-respaldo",
            "UVP"
        );

        respaldo.setAttribute("aria-label", "UVP");

        imagen.parentElement.appendChild(respaldo);
    }

    imagen.addEventListener(
        "error",
        mostrarRespaldo,
        { once: true }
    );

    // Cubre el caso en el que la imagen ya falló al cargar.
    if (imagen.complete && imagen.naturalWidth === 0) {
        mostrarRespaldo();
    }
}


// ------------------------------------------------------------
// 24. ACTUALIZACIÓN GENERAL DE LA INTERFAZ
//
// Esta función se reutiliza al seleccionar un día, volver a hoy
// o actualizar la hora. El catálogo de materias se actualiza
// aparte, porque no necesita reconstruirse cada minuto.
// ------------------------------------------------------------

function actualizarInterfaz() {
    if (seguirDiaActual) {
        diaSeleccionado = obtenerDiaActual();
    }

    actualizarFechaCabecera();
    renderizarSelectorDias();
    renderizarResumenDia();
    renderizarHorarioDia();
    renderizarProximaClase();
    actualizarContadorClases();
}


// ------------------------------------------------------------
// 25. BOTÓN "VOLVER A HOY"
// ------------------------------------------------------------

function configurarBotonHoy() {
    elementos.botonHoy.addEventListener("click", () => {
        seguirDiaActual = true;
        diaSeleccionado = obtenerDiaActual();

        actualizarInterfaz();
    });
}


// ------------------------------------------------------------
// 26. BUSCADOR DE MATERIAS
// ------------------------------------------------------------

function configurarBuscador() {
    elementos.buscadorMaterias.addEventListener(
        "input",
        renderizarMaterias
    );
}


// ------------------------------------------------------------
// 27. INICIALIZACIÓN DE LA APLICACIÓN
//
// Primero se configuran las funciones interactivas.
// Después se dibujan los datos en pantalla.
// Finalmente, se activa la actualización periódica.
// ------------------------------------------------------------

function iniciarAplicacion() {
    configurarRespaldoLogo();
    configurarBotonHoy();
    configurarBuscador();

    actualizarFechaCabecera();
    renderizarMaterias();
    actualizarInterfaz();

    // Actualiza la cuenta regresiva y estados temporales.
    window.setInterval(
        actualizarInterfaz,
        CONFIGURACION.intervaloActualizacion
    );

    // Al volver a la pestaña, sincroniza la información.
    document.addEventListener(
        "visibilitychange",
        () => {
            if (!document.hidden) {
                actualizarInterfaz();
            }
        }
    );
}


// ------------------------------------------------------------
// 28. ARRANQUE
// ------------------------------------------------------------

iniciarAplicacion();
