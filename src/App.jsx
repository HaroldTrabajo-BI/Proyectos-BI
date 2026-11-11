
import { useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";

/* CATEGORIAS PRINCIPALES */

const areas = [
  {
    id: "proyectos",
    titulo: "Caso de Estudio 1",
    especialidad: "Demanda del Metro de Panamá (2018–2026)",
    descripcion: "Procesamiento de datos históricos, visualización de indicadores y análisis del flujo de usuarios en la Línea 1 y 2.",
    enlace: "Ver proyecto",
    icono: "capas",
  },
  {
    id: "proyectos2",
    titulo: "Caso de Estudio 2",
    especialidad: "Pendiente",
    descripcion:
      "Pendiente.",
    enlace: "Ver informes",
    icono: "documento",
  },
  {
    id: "proyectos3",
    titulo: "Caso de Estudio 3",
    especialidad: "Pendiente",
    descripcion:
      "Pendiente.",
    enlace: "Ver dashboards",
    icono: "grafico",
  },
];


const trabajos = [
  {
    id: "metro-panama",
    categoria: "proyectos",
    titulo: "Pipeline ETL",
    descripcion:
      "Extracción, limpieza, estandarización y consolidación de registros históricos de demanda de pasajeros de las líneas 1 y 2 del Metro de Panamá.",
    herramientas: ["Python", "Pandas", "ETL", "VS Code"],
    objetivo:
      "Desarrollar un proceso ETL utilizando Python para extraer, limpiar, transformar y consolidar los datos de demanda de pasajeros de las líneas 1 y 2 del Metro de Panamá, facilitando su posterior análisis mediante Power BI.",
    fuente:
      "Los datos se obtienen del portal de Datos Abiertos de Panamá, donde se encuentran disponibles los archivos CSV correspondientes a la demanda de pasajeros de ambas líneas.",
    carga:
      "Finalmente se integraran los registros procesados de las líneas 1 y 2 del Metro de Panamá en un único DataFrame y exportarlo a un archivo CSV maestro para su posterior utilización en Power BI.",
    enlaceLinea1: "https://lix.li/QVVTN",
    enlaceLinea2: "https://lix.li/qVMWZF",
    codigoPandas: `import pandas as pd

# Lectura del archivo omitiendo el encabezado institucional
df = pd.read_csv(temp_file, sep=";", skiprows=5, header=None, encoding="latin-1")`,
    codigoExtraccion: `headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
response = requests.get(url_descarga, headers=headers)

if response.status_code != 200:
    print(f"Error al descargar {nombre_linea}. Código: {response.status_code}")
    return None`,
    codigoTransformacionFechas: `
partes = df.iloc[:, 0].astype(str).str.split('-', expand=True)
df['Mes'] = partes[0].str.lower().map(MAPEO_MESES)
df['Año'] = '20' + partes[1].str.strip()`,
    codigoTransformacionEntero: `columnas_numericas = ['Días Laborables', 'Días Sábados', 'Días Feriados']
for col in columnas_numericas:
    df[col] = df[col].astype(str).str.replace(',', '').str.strip()
    df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0).astype(int)`,
    codigoNuevaColumna: `df['Línea'] = numero_tramo
df['Mes_Num'] = df['Mes'].map(MESES_A_NUMERO)
df['Fecha'] = pd.to_datetime(df['Año'] + '-' + df['Mes_Num'] + '-01')
df = df.drop(columns=['Mes_Num'])

# Reordenamiento de columnas
df = df[['Fecha', 'Línea', 'Mes', 'Año', 'Días Laborables', 'Días Sábados', 'Días Feriados']]`,
    codigoGuardado: `df_maestro = pd.concat([df_l1, df_l2], ignore_index=True)

    archivo_salida = 'proyecto-datos/demanda_metro_maestro.csv'
    df_maestro.to_csv(archivo_salida, index=False, encoding='utf-8')`,
    enlacePython:"https://github.com/HaroldTrabajo-BI/Proyectos-BI/blob/main/proyecto-datos/etl-metro.py",
    enlaceCSVmaestro:"https://github.com/HaroldTrabajo-BI/Proyectos-BI/blob/main/proyecto-datos/demanda_metro_maestro.csv",

  },
  {
    id: "Reporte-Metro",
    categoria: "proyectos",
    descripcion:
      "Diseño y desarrollo de informe ejecutivo interactivo en Power BI para consultar resultados, analizar indicadores de desempeño y evaluar tendencias.",
    titulo: "Informes y reportes de gestión",
    objetivo:
      "Presentar los informes ejecutivos y reportes visuales desarrollados mediante Excel y Power BI, mostrando el proceso de organización y análisis de la información proveniente de archivos CSV."+ 
      " A través de estos trabajos se busca destacar la aplicación de herramientas de análisis de datos para estructurar información, "+ 
      "visualizar indicadores, identificar tendencias y facilitar la interpretación de resultados.",
    herramientas: ["Excel", "Power BI", "Datos"],
    problema:
      "La información y los indicadores requieren una presentación estructurada que facilite su consulta e interpretación.",
    solucion:
      "Desarrollar informes ejecutivos y reportes en Power BI que permitan consultar resultados, analizar indicadores y visualizar tendencias.",
    
    capturas: [
        {
            imagen: "VistaGeneral.png",
            titulo: "Vista general del dashboard",
            descripcion: "Indicadores generales de demanda de pasajeros."
        },
        {
            imagen: "VistaFiltroAño.png",
            titulo: "Comportamiento histórico",
            descripcion: "Evolución anual de pasajeros."
        },
        {
            imagen: "VistaFiltroMes.png",
            titulo: "Comparativa por mes",
            descripcion: "Distribución de pasajeros por mes."
        }],

pbixUrl: "https://github.com/HaroldTrabajo-BI/Proyectos-BI/releases/download/v1.0/Demanda_Metro_Panama.pbix",

  },
  {
    id: "informe-gestion",
    categoria: "informes",
    titulo: "Informe ejecutivo de gestión",
    descripcion:
      "Presentación estructurada de indicadores, resultados y actividades.",
    herramientas: ["Excel", "Análisis", "Reportes"],
    problema:
      "La información operativa debe transformarse en reportes claros para facilitar su interpretación.",
    solucion:
      "Organizar indicadores y resultados en un documento ejecutivo con información relevante.",
  },
  {
    id: "informe-seguimiento",
    categoria: "informes",
    titulo: "Reporte de seguimiento operativo",
    descripcion:
      "Análisis de actividades, estados y oportunidades de mejora.",
    herramientas: ["Excel", "KPIs", "Reportes"],
    problema:
      "La falta de información consolidada dificulta identificar actividades pendientes.",
    solucion:
      "Crear un reporte estructurado para visualizar estados, tendencias y próximas acciones.",
  },
  {
    id: "dashboard-operativo",
    categoria: "dashboards",
    titulo: "Dashboard de indicadores operativos",
    descripcion:
      "Panel para visualizar indicadores de desempeño y evolución de resultados.",
    herramientas: ["Power BI", "KPIs", "Visualización"],
    problema:
      "Los indicadores distribuidos en distintas fuentes dificultan el análisis general.",
    solucion:
      "Diseñar visualizaciones que permitan consultar resultados e identificar tendencias.",
  },
  {
    id: "dashboard-productividad",
    categoria: "dashboards",
    titulo: "Dashboard de productividad",
    descripcion:
      "Análisis visual de actividades, cargas de trabajo y cumplimiento.",
    herramientas: ["Excel", "Power BI", "Datos"],
    problema:
      "Es necesario comparar resultados y medir la evolución de las actividades.",
    solucion:
      "Crear un panel con gráficos, filtros e indicadores de seguimiento.",
  },
];

/* ICONOS SVG */

function Icono({ tipo }) {
  const props = {
    width: 32,
    height: 32,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (tipo === "capas") {
    return (
      <svg {...props}>
        <path d="m12 2 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 17 9 5 9-5" />
      </svg>
    );
  }

  if (tipo === "documento") {
    return (
      <svg {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h8" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M3 21h18" />
      <rect x="5" y="12" width="3" height="7" rx=".5" />
      <rect x="11" y="7" width="3" height="12" rx=".5" />
      <rect x="17" y="3" width="3" height="16" rx=".5" />
    </svg>
  );
}

/* VOLVER AL INICIO DE LA PAGINA AL NAVEGAR */

function ReiniciarScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* ENCABEZADO */

function Encabezado() {
  return (
    <header className="cabecera">
      <div className="contenedor cabecera-interior">

        <Link to="/" className="marca">
          <strong>Proyectos BI</strong>
          <span className="marca-separador"> - </span>
          <span>Harold Torres</span>
        </Link>

        <nav className="navegacion">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "activo" : ""
            }
          >
            Inicio
          </NavLink>

          {areas.map((area) => (
            <NavLink
              key={area.id}
              to={`/${area.id}`}
              className={({ isActive }) =>
                isActive ? "activo" : ""
              }
            >
              {area.titulo}
            </NavLink>
          ))}
        </nav>

        <a
          className="boton-contacto"
          href="mailto:haroldtorres.trabajo@gmail.com"
        >
          Contacto
        </a>

      </div>
    </header>
  );
}

/* PAGINA PRINCIPAL */

function Inicio() {
  return (
    <main>

      <section className="presentacion">
        <div className="foto-arquitectura" />

        <div className="contenedor presentacion-interior">
          <div className="presentacion-texto">


            <h1>
              Soluciones digitales
              <br className="salto-escritorio" />
              {" "}para mejores decisiones
            </h1>

            <p className="introduccion">
              Un espacio para presentar proyectos,
              informes y herramientas interactivas
              que transforman información en resultados.
            </p>

            <Link
              className="boton-principal"
              to="/proyectos"
            >
              Explorar proyectos
              <span>→</span>
            </Link>

          </div>
        </div>
      </section>

      <section className="areas">
        <div className="contenedor cuadricula-areas">

          {areas.map((area) => (
            <article className="tarjeta" key={area.id}>

              <div className="icono-tarjeta">
                <Icono tipo={area.icono} />
              </div>

              <h2>{area.titulo}</h2>

              <p className="especialidad">
                {area.especialidad}
              </p>

              <p className="descripcion">
                {area.descripcion}
              </p>

              <Link
                className="enlace-tarjeta"
                to={`/${area.id}`}
              >
                {area.enlace}
                <span>→</span>
              </Link>

            </article>
          ))}

        </div>
      </section>

    </main>
  );
}

/* PAGINAS DE PROYECTOS, INFORMES Y DASHBOARDS */

function PaginaCategoria({ categoriaId }) {
  const area = areas.find(
    (item) => item.id === categoriaId
  );

  const lista = trabajos.filter(
    (item) => item.categoria === categoriaId
  );

  if (!area) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="pagina-interior">
      <div className="contenedor">

        <Link to="/" className="volver">
          ← Volver al inicio
        </Link>

        <p className="eyebrow">
          PORTAFOLIO PROFESIONAL
        </p>

        <h1 className="titulo-interior">
          {area.titulo}
        </h1>

        <p className="descripcion-interior">
          {area.descripcion}
        </p>

        <div className="cuadricula-trabajos">

          {lista.map((trabajo) => (
            <article
              className="trabajo-card"
              key={trabajo.id}
            >

              <h2>{trabajo.titulo}</h2>

              <p>{trabajo.descripcion}</p>

              <div className="etiquetas">
                {trabajo.herramientas.map((herramienta) => (
                  <span key={herramienta}>
                    {herramienta}
                  </span>
                ))}
              </div>

              <Link
                className="enlace-trabajo"
                to={`/trabajo/${trabajo.id}`}
              >
                Ver detalles →
              </Link>

            </article>
          ))}

        </div>

      </div>
    </main>
  );
}

/* FICHA INDIVIDUAL DE UN TRABAJO */

function DetalleTrabajo() {
  const { id } = useParams();

  const trabajo = trabajos.find(
    (item) => item.id === id
  );

  if (!trabajo) {
    return <Navigate to="/" replace />;
  }

  const area = areas.find(
    (item) => item.id === trabajo.categoria
  );

  const esMetro = trabajo.id === "metro-panama";
  const esInformeGestion = trabajo.id === "Reporte-Metro";

  return (
    <main className="pagina-interior">
      <div className="contenedor">

        <Link
          className="volver"
          to={`/${trabajo.categoria}`}
        >
          ← Volver a {area.titulo}
        </Link>

        <h1 className="titulo-interior">
          {trabajo.titulo}
        </h1>

        <p className="descripcion-interior">
          {trabajo.descripcion}
        </p>

        <div className="ficha-contenido">

          <div className="ficha-principal">
            {esMetro ? (
              /* =================== VISTA 1:METRO DE PANAMÁ (ETL) =================== */
              <>
                {/* CONTENIDO EXCLUSIVO: METRO DE PANAMÁ (ETL) */}
                <section className="bloque-ficha">
                  <h2>01. Objetivo</h2>
                  <p>{trabajo.objetivo}</p>
                </section>

                <section className="bloque-ficha">
                  <h2>02. Fuente de los datos</h2>
                  <p>{trabajo.fuente}</p>
                  <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                    <a
                      href={trabajo.enlaceLinea1}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#2563EB", textDecoration: "none", fontWeight: "500" }}
                    >
                      <span>📁</span> CSV Demanda Línea 1 ↗
                    </a>

                    <a
                      href={trabajo.enlaceLinea2}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#2563EB", textDecoration: "none", fontWeight: "500" }}
                    >
                      <span>📁</span> CSV Demanda Línea 2 ↗
                    </a>
                  </div>
                </section>

                <section className="bloque-ficha">
                  <h2>03. Justificación técnica</h2>
                  <p>Para este pipeline se seleccionó un stack enfocado en rendimiento y flexibilidad para grandes volúmenes de registros tabulares:</p>
                  
                  <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <div style={{ background: "#F9FAFB", padding: "0.75rem 1rem", borderRadius: "6px", borderLeft: "4px solid #9ab7d3" }}>
                      <strong>Python:</strong> Lenguaje principal para la automatización del script y la gestión del flujo completo.
                    </div>

                    <div style={{ background: "#F9FAFB", padding: "0.75rem 1rem", borderRadius: "6px", borderLeft: "4px solid #9ab7d3" }}>
                      <strong>Pandas:</strong> Esencial para la manipulación de DataFrames, normalización de columnas y la unificación de los registros.
                    </div>
                  </div>

                  <div style={{ 
                    background: "#0F172A", 
                    color: "#E2E8F0", 
                    padding: "1.25rem", 
                    borderRadius: "8px", 
                    marginTop: "1.5rem", 
                    fontFamily: "monospace", 
                    fontSize: "0.85rem",
                    overflowX: "auto",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"}}>

                    <div style={{ color: "#94A3B8", marginBottom: "0.5rem", fontSize: "0.75rem", borderBottom: "1px solid #334155", paddingBottom: "0.3rem" }}>
                      🐍 etl-metro.py (Pandas)
                    </div>
                    <pre style={{ margin: 0, fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                      <code>{trabajo.codigoPandas}</code>
                    </pre>
                  </div>
                </section>

                <section className="bloque-ficha">
                    <h2>04. Descarga de los datos</h2>
                    <p>Se utilizó la biblioteca Requests para realizar solicitudes HTTP y obtener los archivos CSV publicados en la fuente oficial.</p>
                    
                    <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "0.75rem", marginBottom: "0.5rem" }}>
                      Biblioteca utilizada: Python · Requests
                    </div>

                    <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <div style={{ background: "#F9FAFB", padding: "0.75rem 1rem", borderRadius: "6px", borderLeft: "4px solid #9ab7d3", fontSize: "0.9rem" }}>
                        <strong>User-Agent:</strong> Establece una cabecera que identifica la solicitud HTTP con información similar a la de un navegador web.
                      </div>

                      <div style={{ background: "#F9FAFB", padding: "0.75rem 1rem", borderRadius: "6px", borderLeft: "4px solid #9ab7d3", fontSize: "0.9rem" }}>
                        <strong>status_code != 200:</strong> Valida que la conexión HTTP sea exitosa antes de intentar procesar el archivo, evitando caídas inesperadas del pipeline.
                      </div>
                    </div>

                    <div style={{ 
                      background: "#0F172A", 
                      color: "#E2E8F0", 
                      padding: "1.25rem", 
                      borderRadius: "8px",
                      marginTop: "1.5rem", 
                      fontFamily: "monospace", 
                      fontSize: "0.85rem",
                      overflowX: "auto",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"}}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", fontSize: "0.75rem", borderBottom: "1px solid #334155", paddingBottom: "0.3rem", color: "#94A3B8" }}>
                        <span>🐍 Biblioteca Requests</span>
                      </div>
                      <pre style={{ margin: 0, fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                        <code>{trabajo.codigoExtraccion}</code>
                      </pre>
                    </div>
                </section>

                <section className="bloque-ficha">
                  <h2>05. Transformación y limpieza de datos</h2>
                  <p>Mediante Pandas se realizan diferentes operaciones:</p>

                    <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <div style={{ background: "#F9FAFB", padding: "0.75rem 1rem", borderRadius: "6px", borderLeft: "4px solid #9ab7d3", fontSize: "0.9rem" }}>
                        <h3>05.1 Separación y estandarización de fechas:</h3> Este paso transforma la columna de fecha original en dos columnas independientes: Mes y Año.
                        <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#475569", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                          <li><strong>df.iloc[ : , 0 ]</strong> Selecciona la primera columna del DataFrame.</li>
                          <li><strong>.astype(str)</strong> Convierte los valores a texto.</li>
                          <li><strong>.str.split('-', expand=True)</strong> Divide el contenido utilizando el guion.</li>
                          <li><strong>.map(MAPEO_MESES)</strong> Sustituye abreviaturas por nombres completos.</li>
                        </ul>
                        
                        <div style={{ background: "#0F172A", color: "#E2E8F0", padding: "1.25rem", borderRadius: "8px", marginTop: "0.75rem", fontFamily: "monospace", fontSize: "0.85rem", overflowX: "auto" }}>
                          <pre style={{ margin: 0, fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                            <code>{trabajo.codigoTransformacionFechas}</code>
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <div style={{ background: "#F9FAFB", padding: "0.75rem 1rem", borderRadius: "6px", borderLeft: "4px solid #9ab7d3", fontSize: "0.9rem" }}>
                        <h3>05.2 Limpieza y conversión de valores numéricos:</h3> Estandariza las columnas de demanda eliminando comas y convirtiéndolas a enteros.
                        
                        <div style={{ background: "#0F172A", color: "#E2E8F0", padding: "1.25rem", borderRadius: "8px", marginTop: "0.75rem", fontFamily: "monospace", fontSize: "0.85rem", overflowX: "auto" }}>
                          <pre style={{ margin: 0, fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                            <code>{trabajo.codigoTransformacionEntero}</code>
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <div style={{ background: "#F9FAFB", padding: "0.75rem 1rem", borderRadius: "6px", borderLeft: "4px solid #9ab7d3", fontSize: "0.9rem" }}>
                        <h3>05.3 Incorporación de columnas y creación de fecha:</h3> Incorpora un identificador de línea y genera una columna de fecha en formato datetime.
                        
                        <div style={{ background: "#0F172A", color: "#E2E8F0", padding: "1.25rem", borderRadius: "8px", marginTop: "0.75rem", fontFamily: "monospace", fontSize: "0.85rem", overflowX: "auto" }}>
                          <pre style={{ margin: 0, fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                            <code>{trabajo.codigoNuevaColumna}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                </section>

                <section className="bloque-ficha">
                  <h2>06. Consolidación y exportación de datos</h2>
                  <p>{trabajo.carga}</p>

                  <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#475569", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                    <li><strong>pd.concat()</strong> Combina los DataFrames verticalmente.</li>
                    <li><strong>to_csv()</strong> Exporta el DataFrame maestro resultante.</li>
                  </ul>

                  <div style={{ background: "#0F172A", color: "#E2E8F0", padding: "1.25rem", borderRadius: "8px", marginTop: "0.75rem", fontFamily: "monospace", fontSize: "0.85rem", overflowX: "auto" }}>
                    <pre style={{ margin: 0, fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                      <code>{trabajo.codigoGuardado}</code>
                    </pre>
                  </div>

                  <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
  
                    <a
                      href={trabajo.enlacePython}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#2563EB", textDecoration: "none", fontWeight: "500" }}
                    >
                      <span>💻</span> Ver código fuente en Python ↗
                    </a>

                    <a
                      href={trabajo.enlaceCSVmaestro}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#2563EB", textDecoration: "none", fontWeight: "500" }}
                    >
                      <span>📊</span> CSV Maestro Consolidado ↗
                    </a>

                  </div>
                </section>
              </>
            ) : esInformeGestion ? (
              /* =================== VISTA 2:INFORME / REPORTE =================== */
              <>
                {/*1.SECCIÓN DE OBJETIVO*/}
                <section className="bloque-ficha">
                  <h2>01. Objetivo</h2>
                  <p>{trabajo.objetivo}</p>
                </section>


                {/*2. HERRAMIENTAS*/}
                <section className="bloque-ficha" style={{ marginTop: "1.5rem" }}>
                  <h2>02. Herramientas utilizadas</h2>
                  <div className="etiquetas" style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {trabajo.herramientas.map((herramienta) => (
                      <span key={herramienta} style={{ background: "#E2E8F0", padding: "0.4rem 0.8rem", borderRadius: "6px", fontSize: "0.85rem", fontWeight: "500", color: "#1E293B" }}>
                        {herramienta}
                      </span>
                    ))}
                  </div>
                </section>


                {/*3.TARJETA DE VISUALIZACIÓN Y DESCARGA (Power BI / Imagen)*/}
                <section className="bloque-ficha">
                  <h2>03. Visualización del Dashboard</h2>
                  <p>Se presenta una vista previa del reporte desarrollado en Power BI, donde se muestran los principales indicadores, gráficos y visualizaciones del análisis. Asimismo, se proporciona acceso al archivo PBIX para su descarga y exploración en Power BI Desktop, permitiendo consultar los filtros, las visualizaciones y el modelo de datos asociado:</p>

                  <div style={{ 
                    background: "#0F172A", 
                    borderRadius: "16px", 
                    padding: "1.5rem", 
                    border: "1px solid #1E293B", 
                    color: "#F8FAFC", 
                    marginTop: "1rem",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)"}}>
                    <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", color: "#d7d7d7" }}>Vista general del Dashboard</h3>
                    

                    {/*IMAGEN DEL DASHBOARD Vista General*/}
                    <div style={{ marginBottom: "1.25rem", borderRadius: "8px", overflow: "hidden", border: "1px solid #334155" }}>
                      <img 
                        src={`${import.meta.env.BASE_URL}reporte-metro/VistaGeneral.png`}
                        alt="Vista previa del dashboard" 
                        style={{ width: "100%", height: "auto", display: "block" }} 
                      />
                    </div>

                    <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", color: "#d7d7d7" }}>Vista filtro por año</h3>
                    {/*IMAGEN DEL DASHBOARD Vista Filtro por año*/}
                    <div style={{ marginBottom: "1.25rem", borderRadius: "8px", overflow: "hidden", border: "1px solid #334155" }}>
                      <img 
                        src={`${import.meta.env.BASE_URL}reporte-metro/VistaFiltroAnio.png`}
                        alt="Vista previa del dashboard" 
                        style={{ width: "100%", height: "auto", display: "block" }} 
                      />
                    </div>

                    <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", color: "#d7d7d7" }}>Vista filtro por mes</h3>
                    {/*IMAGEN DEL DASHBOARD Vista Filtro por mes*/}
                    <div style={{ marginBottom: "1.25rem", borderRadius: "8px", overflow: "hidden", border: "1px solid #334155" }}>
                      <img 
                        src={`${import.meta.env.BASE_URL}reporte-metro/VistaFiltroMes.png`}
                        alt="Vista previa del dashboard" 
                        style={{ width: "100%", height: "auto", display: "block" }} 
                      />
                    </div>

                    {/*ENLACE A GITHUB*/}
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                      <a 
                        href={trabajo.pbixUrl}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ background: "#2563EB", color: "#fff", padding: "0.6rem 1.2rem", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                      >
                        Descargar archivo .pbix 📁
                      </a>
                    </div>
                  </div>
                </section>

                <section className="bloque-hallazgos">

                    <div className="separador-analisis">
                        <span>ANÁLISIS DE DATOS</span>
                    </div>

                    <h2>Lectura de resultados</h2>

                    <p className="intro-hallazgos">
                        Principales hallazgos identificados a partir
                        del análisis histórico de la demanda de pasajeros.
                    </p>

                    <div className="grid-hallazgos">
                        {/* Primera tarjeta */}
                        <article className="tarjeta-hallazgo destacado">
                            <span className="etiqueta-hallazgo">
                                DEMANDA ACUMULADA
                            </span>

                            <h3>
                                ¿Cuántos pasajeros se registraron
                                durante el período analizado?
                            </h3>

                            <strong className="valor-hallazgo">
                                78,872,677
                            </strong>

                            <p>
                                Pasajeros registrados entre 2018 y 2026,
                                considerando ambas líneas del Metro de Panamá.
                            </p>
                        </article>
                        {/* Segunda tarjeta */}
                        <article className="tarjeta-hallazgo">
                            <span className="etiqueta-hallazgo">
                                COMPARACIÓN POR LÍNEA
                            </span>

                            <h3>
                                ¿Cuál de las dos líneas concentra mayor demanda?
                            </h3>

                            <strong className="valor-hallazgo">
                                Línea 1
                            </strong>

                            <p>
                                La Línea 1 concentra el 63.3% de la demanda acumulada, con 45,467,189 pasajeros registrados entre 2019 y agosto de 2026, 
                                superando a la Línea 2, que representa el 36.7%. Esta diferencia evidencia una mayor utilización de la Línea 1 durante los 
                                años analizados, manteniendo una demanda superior en cada uno de los períodos comparables.
                            </p>
                        </article>
                        {/* Tercera tarjeta */}
                        <article className="tarjeta-hallazgo">
                            <span className="etiqueta-hallazgo">
                                MAYOR DEMANDA ANUAL
                            </span>

                            <h3>
                                ¿En qué año se registró la mayor demanda?
                            </h3>

                            <strong className="valor-hallazgo">
                                2019 -11,456,119
                            </strong>

                            <p>
                                Durante 2019 se alcanzó el mayor volumen anual de pasajeros, sumando 8,194,366 usuarios en la Línea 1 y 3,261,753 en la Línea 2.
                            </p>
                        </article>
                        {/* Cuarta tarjeta */}
                        <article className="tarjeta-hallazgo">
                            <span className="etiqueta-hallazgo">
                                EVOLUCIÓN DE LA DEMANDA
                            </span>

                            <h3>
                                ¿Hubo períodos de disminución o recuperación?
                            </h3>

                            <strong className="valor-hallazgo">
                                -59.6%
                            </strong>

                            <p>
                                La demanda de pasajeros experimentó una fuerte reducción en 2020, coincidiendo con el período de la pandemia de COVID-19. 
                                A partir de 2021 se observa una recuperación progresiva, alcanzando en 2024 un volumen cercano al registrado antes de la pandemia. 
                                En 2025 se presentó una ligera disminución del 1.75%.
                            </p>
                        </article>
                        {/* Quinta tarjeta */}
                        <article className="tarjeta-hallazgo">
                            <span className="etiqueta-hallazgo">
                                COMPORTAMIENTO MENSUAL
                            </span>

                            <h3>
                                ¿Se observa un comportamiento particular durante determinados meses?
                            </h3>

                            <strong className="valor-hallazgo">
                                Diciembre, Enero y Febrero
                            </strong>

                            <p>
                                El análisis histórico muestra que diciembre registra los mayores niveles de demanda, manteniendo este comportamiento durante todos los 
                                años completos entre 2021 y 2025. Esto podría estar relacionado con las fiestas de fin de año, las compras y otras actividades propias de 
                                la temporada. Por otro lado, enero y febrero presentan una menor cantidad de pasajeros, posiblemente debido a las vacaciones escolares y 
                                universitarias, que reducen los desplazamientos habituales. Estos resultados permiten identificar variaciones en el uso del Metro a lo largo 
                                del año y reconocer los períodos de mayor demanda.
                            </p>
                        </article>
                        {/* Sexta tarjeta */}
                        <article className="tarjeta-hallazgo">
                            <span className="etiqueta-hallazgo">
                                TIPO DE JORNADA
                            </span>

                            <h3>
                                ¿Qué diferencias existen entre sábados y feriados?
                            </h3>

                            <strong className="valor-hallazgo">
                                Sábados tienen mayor demanda que feriados
                            </strong>

                            <p>
                                Los registros históricos muestran que los sábados concentran un mayor volumen acumulado de pasajeros. Entre 2018 y agosto de 2026 se contabilizaron 
                                27,894,580 pasajeros los sábados, frente a 13,600,594 durante los días feriados, lo que representa una diferencia de aproximadamente 14.3 millones de 
                                pasajeros. Este comportamiento podría estar relacionado con que los sábados se mantienen actividades laborales, comerciales y educativas, mientras que 
                                los feriados suelen destinarse al descanso, paseos y actividades recreativas. También influye la mayor cantidad de sábados en el calendario en comparación 
                                con los días feriados.
                            </p>
                        </article>
                        {/* Séptima tarjeta */}
                        <article className="tarjeta-hallazgo">
                            <span className="etiqueta-hallazgo">
                                IMPACTO DE LA LÍNEA 2
                            </span>

                            <h3>
                                ¿La apertura de la Línea 2 influyó en el aumento de pasajeros de la Línea 1?
                            </h3>

                            <strong className="valor-hallazgo">
                                Definitivamente sí
                            </strong>

                            <p>
                                Durante 2019, la Línea 1 registró un incremento del 15.78% en su demanda respecto a 2018. Al comparar los mismos meses, se observa que el crecimiento 
                                fue mayor después de la apertura de la Línea 2, pasando de un 5.7% antes de su inauguración a un 19.2% durante los meses posteriores.
                            </p>
                        </article>
                        {/* Octava tarjeta */}
                        <article className="tarjeta-hallazgo">
                            <span className="etiqueta-hallazgo">
                                COMBUSTIBLE Y DEMANDA
                            </span>

                            <h3>
                                ¿Qué relación existe entre las variaciones del precio de los combustibles y la demanda del Metro?
                            </h3>

                            <strong className="valor-hallazgo">
                                Relación indirecta
                            </strong>

                            <p>
                                El análisis de los precios de la gasolina de 91 y 95 octanos, así como del diésel, permite identificar diferentes comportamientos en comparación 
                                con la demanda de pasajeros del Metro de Panamá. Durante 2020, la disminución de los combustibles coincidió con una fuerte caída en la cantidad de 
                                pasajeros, en un período marcado por la pandemia. Posteriormente, entre 2021 y 2022, el aumento de los precios coincidió con la recuperación de la 
                                demanda. Sin embargo, durante 2023 y 2024 los combustibles registraron reducciones, mientras que la cantidad de pasajeros continuó creciendo. 
                                En 2026 también se observaron incrementos importantes en los precios, aunque la demanda presentó variaciones a lo largo de los meses.
                            </p>
                        </article>


                    </div>

                </section>


              </>
            ) : (

              <>
                {/* CONTENIDO GENÉRICO PARA LOS DEMÁS TRABAJOS E INFORMES */}
                {trabajo.problema && (
                  <section className="bloque-ficha" style={{ marginBottom: "1.5rem" }}>
                    <h2>Problema identificado</h2>
                    <p>{trabajo.problema}</p>
                  </section>
                )}

                {trabajo.solucion && (
                  <section className="bloque-ficha" style={{ marginBottom: "1.5rem" }}>
                    <h2>Solución implementada</h2>
                    <p>{trabajo.solucion}</p>
                  </section>
                )}

                <section className="bloque-ficha">
                  <h2>Herramientas y tecnologías</h2>
                  <div className="etiquetas" style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {trabajo.herramientas.map((herramienta) => (
                      <span key={herramienta} style={{ background: "#E2E8F0", padding: "0.4rem 0.8rem", borderRadius: "6px", fontSize: "0.85rem", fontWeight: "500", color: "#1E293B" }}>
                        {herramienta}
                      </span>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>

          {/* LA BARRA LATERAL DEL ETL SOLO APARECE EN EL METRO DE PANAMÁ */}
          {esMetro && (
            <aside>
              <div style={{ 
                background: "#0F172A", 
                border: "1px solid #1E293B", 
                borderRadius: "16px", 
                padding: "1.5rem", 
                color: "#F8FAFC",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                fontSize: "0.85rem"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", borderBottom: "1px solid #1E293B", paddingBottom: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "8px", overflow: "hidden", border: "1px solid #38BDF8", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(56, 189, 248, 0.1)" }}>
                    <img src="tren.png" alt="Icono Tren" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: "#F8FAFC" }}>Flujo del proceso ETL</h3>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "#94A3B8" }}>Demanda de pasajeros · Metro de Panamá</p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center" }}>
                  
                  <div style={{ width: "100%", background: "#1E293B", border: "1px solid #0891B2", borderRadius: "12px", padding: "1rem", boxShadow: "0 0 15px rgba(6, 182, 212, 0.15)" }}>
                    <div style={{ display: "inline-block", background: "rgba(6, 182, 212, 0.2)", color: "#22D3EE", padding: "0.2rem 0.6rem", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                      FUENTES DE DATOS
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "8px", border: "1px dashed #06B6D4", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(6, 182, 212, 0.05)", color: "#22D3EE", flexShrink: 0 }}>
                        <img src="fuente.png" alt="Icono Fuente" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: "600", color: "#E2E8F0" }}>Línea 1 & Línea 2</div>
                        <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Archivos CSV independientes</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ color: "#38BDF8", fontSize: "1.2rem", fontWeight: "bold", textShadow: "0 0 8px #38BDF8", margin: "0.2rem 0" }}>↓</div>

                  <div style={{ width: "100%", background: "#1E293B", border: "1px solid #2563EB", borderRadius: "12px", padding: "1rem", boxShadow: "0 0 15px rgba(59, 130, 246, 0.15)" }}>
                    <div style={{ display: "inline-block", background: "rgba(59, 130, 246, 0.2)", color: "#60A5FA", padding: "0.2rem 0.6rem", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                      EXTRACCIÓN
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "8px", border: "1px dashed #3B82F6", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(59, 130, 246, 0.05)", color: "#60A5FA", flexShrink: 0 }}>
                        <img src="codigo.png" alt="Icono Extracción" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: "600", color: "#E2E8F0" }}>Python + Requests</div>
                        <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Peticiones HTTP automatizadas</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ color: "#34D399", fontSize: "1.2rem", fontWeight: "bold", textShadow: "0 0 8px #34D399", margin: "0.2rem 0" }}>↓</div>

                  <div style={{ width: "100%", background: "#1E293B", border: "1px solid #059669", borderRadius: "12px", padding: "1rem", boxShadow: "0 0 15px rgba(16, 185, 129, 0.15)" }}>
                    <div style={{ display: "inline-block", background: "rgba(16, 185, 129, 0.2)", color: "#34D399", padding: "0.2rem 0.6rem", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                      TRANSFORMACIÓN
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "8px", border: "1px dashed #10B981", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(16, 185, 129, 0.05)", color: "#34D399", flexShrink: 0 }}>
                        <img src="transformacion.png" alt="Icono Transformación" style={{ width: "90%", height: "90%", objectFit: "cover" }} />
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#CBD5E1" }}>
                        Limpieza y estructuración de datos con Pandas
                      </div>
                    </div>
                  </div>

                  <div style={{ color: "#C084FC", fontSize: "1.2rem", fontWeight: "bold", textShadow: "0 0 8px #C084FC", margin: "0.2rem 0" }}>↓</div>

                  <div style={{ width: "100%", background: "#1E293B", border: "1px solid #9333EA", borderRadius: "12px", padding: "1rem", boxShadow: "0 0 15px rgba(168, 85, 247, 0.15)" }}>
                    <div style={{ display: "inline-block", background: "rgba(168, 85, 247, 0.2)", color: "#C084FC", padding: "0.2rem 0.6rem", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                      CONSOLIDACIÓN
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "8px", border: "1px dashed #A855F7", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(168, 85, 247, 0.05)", color: "#C084FC", flexShrink: 0 }}>
                        <img src="datosFinal.png" alt="Icono Consolidación" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: "600", color: "#E2E8F0" }}>Unión de líneas</div>
                        <div style={{ fontSize: "0.75rem", color: "#A855F7" }}>demanda_metro_maestro.csv</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </aside>
          )}

        </div>
      </div>
    </main>
  );
}

/* PIE DE PAGINA */

function PiePagina() {
  return (
    <footer className="pie">
      <div className="contenedor pie-interior">

        <div>
          <strong>Proyectos BI - Harold Torres</strong>
        </div>

        <a href="mailto:haroldtorres.trabajo@gmail.com">
          Escríbeme →
        </a>

      </div>
    </footer>
  );
}

/* RUTAS PRINCIPALES */

function App() {
  return (
    <HashRouter>
      <ReiniciarScroll />

      <Encabezado />

      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route
          path="/proyectos"
          element={
            <PaginaCategoria categoriaId="proyectos" />
          }
        />

        <Route
          path="/informes"
          element={
            <PaginaCategoria categoriaId="informes" />
          }
        />

        <Route
          path="/dashboards"
          element={
            <PaginaCategoria categoriaId="dashboards" />
          }
        />

        <Route
          path="/trabajo/:id"
          element={<DetalleTrabajo />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>

      <PiePagina />
    </HashRouter>
  );
}

export default App;
