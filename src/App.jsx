
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
    id: "informes",
    titulo: "Informes",
    especialidad: "Análisis y reportes",
    descripcion:
      "Presentación de resultados, indicadores de gestión y análisis de información.",
    enlace: "Ver informes",
    icono: "documento",
  },
  {
    id: "dashboards",
    titulo: "Dashboards",
    especialidad: "Paneles interactivos",
    descripcion:
      "Visualización de indicadores, estadísticas y seguimiento de resultados.",
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
    df_maestro.to_csv(archivo_salida, index=False, encoding='utf-8')`
  },
  {
    id: "gestion-procesos",
    categoria: "proyectos",
    titulo: "Sistema de seguimiento de procesos",
    descripcion:
      "Organización y control de tareas, etapas y actividades operativas.",
    herramientas: ["Excel", "Automatización", "Datos"],
    problema:
      "La información dispersa dificulta el seguimiento de tareas y el control de actividades.",
    solucion:
      "Centralizar el seguimiento mediante registros estructurados e indicadores de estado.",
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
          href="mailto:tucorreo@ejemplo.com"
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
              
              {/* Descripción de parámetros técnicos */}
              <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ background: "#F9FAFB", padding: "0.75rem 1rem", borderRadius: "6px", borderLeft: "4px solid #9ab7d3" }}>
                  <strong>Python:</strong> Lenguaje principal para la automatización del script y la gestión del flujo completo.
                </div>

                <div style={{ background: "#F9FAFB", padding: "0.75rem 1rem", borderRadius: "6px", borderLeft: "4px solid #9ab7d3" }}>
                  <strong>Pandas:</strong> Esencial para la manipulación de DataFrames, normalización de columnas y la unificación de los registros.
                </div>
              </div>

              {/* Recuadro de código Pandas */}
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

                {/* Descripción de parámetros técnicos */}
                <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ background: "#F9FAFB", padding: "0.75rem 1rem", borderRadius: "6px", borderLeft: "4px solid #9ab7d3", fontSize: "0.9rem" }}>
                    <strong>User-Agent:</strong> Establece una cabecera que identifica la solicitud HTTP con información similar a la de un navegador web."
                  </div>

                  <div style={{ background: "#F9FAFB", padding: "0.75rem 1rem", borderRadius: "6px", borderLeft: "4px solid #9ab7d3", fontSize: "0.9rem" }}>
                    <strong>status_code != 200:</strong> Valida que la conexión HTTP sea exitosa antes de intentar procesar el archivo, evitando caídas inesperadas del pipeline.
                  </div>
                </div>


                {/* Recuadro de código Requests */}
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

              {/* Descripción de los pasos */}
                <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ background: "#F9FAFB", padding: "0.75rem 1rem", borderRadius: "6px", borderLeft: "4px solid #9ab7d3", fontSize: "0.9rem" }}>
                    <h3>05.1 Separación y estandarización de fechas:</h3> este paso tiene como objetivo transformar la columna de fecha original, que contiene valores como ene-18, en dos columnas independientes: Mes(Enero) y Año(2018).
                    {/* Lista detalldas de los parametros */}
                    <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#475569", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem" }}>
                      <li>
                        <strong>df.iloc[ : , 0 ]</strong> Selecciona la primera columna del DataFrame.
                      </li>
                      <li>
                        <strong>.astype(str)</strong> Convierte los valores a texto.
                      </li>
                      <li>
                        <strong>.str.split('-', expand=True)</strong> Divide el contenido utilizando el guion como separador.
                      </li>
                      <li>
                        <strong>partes[0].str.lower()</strong> Obtiene el mes y lo convierte a minúsculas.
                      </li>
                      <li>
                        <strong>.map(MAPEO_MESES)</strong> Sustituye las abreviaturas por los nombres completos de los meses.
                      </li>
                      <li>
                        <strong>'20' + partes[1].str.strip()</strong> Añade el prefijo 20 al año y elimina espacios innecesarios.
                      </li>
                    </ul>
                    {/* Recuadro de código Requests */}
                    <div style={{ 
                      background: "#0F172A", 
                      color: "#E2E8F0", 
                      padding: "1.25rem", 
                      borderRadius: "8px",
                      marginTop: "0.5rem", 
                      fontFamily: "monospace", 
                      fontSize: "0.85rem",
                      overflowX: "auto",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"}}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", fontSize: "0.75rem", borderBottom: "1px solid #334155", paddingBottom: "0.3rem", color: "#94A3B8" }}>
                        <span>🐍 Código</span>
                      </div>
                      <pre style={{ margin: 0, fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                        <code>{trabajo.codigoTransformacionFechas}</code>
                      </pre>
                    </div>

                    {/* Tarjeta de previsualización del resultado */}
                    <div style={{ 
                      background: "#e9e9e9", 
                      color: "#E2E8F0", 
                      padding: "1.25rem", 
                      borderRadius: "8px", 
                      marginTop: "1.25rem", 
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      fontSize: "0.85rem"
                    }}>
                      <div style={{ color: "#1E293B", marginBottom: "0.75rem", fontWeight: "600", fontSize: "0.8rem", borderBottom: "1px solid #334155", paddingBottom: "0.4rem" }}>
                        📊 Resultado de la transformación
                      </div>
                      
                      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid #334155", color: "#334155", fontSize: "0.75rem" }}>
                            <th style={{ paddingBottom: "0.5rem" }}>Fecha original</th>
                            <th style={{ paddingBottom: "0.5rem" }}>Mes</th>
                            <th style={{ paddingBottom: "0.5rem" }}>Año</th>
                          </tr>
                        </thead>
                        <tbody style={{ color: "#335155" }}>
                          <tr style={{ borderBottom: "1px solid #1E293B" }}>
                            <td style={{ padding: "0.5rem 0" }}>ene-18</td>
                            <td style={{ padding: "0.5rem 0" }}>Enero</td>
                            <td style={{ padding: "0.5rem 0" }}>2018</td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid #1E293B" }}>
                            <td style={{ padding: "0.5rem 0" }}>feb-18</td>
                            <td style={{ padding: "0.5rem 0" }}>Febrero</td>
                            <td style={{ padding: "0.5rem 0" }}>2018</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "0.5rem 0" }}>mar-18</td>
                            <td style={{ padding: "0.5rem 0" }}>Marzo</td>
                            <td style={{ padding: "0.5rem 0" }}>2018</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>


                {/* Descripción de los pasos */}
                <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ background: "#F9FAFB", padding: "0.75rem 1rem", borderRadius: "6px", borderLeft: "4px solid #9ab7d3", fontSize: "0.9rem" }}>
                    <h3>05.2 Limpieza y conversión de valores numéricos:</h3> su objetivo es estandarizar las columnas correspondientes a la demanda de pasajeros, eliminando las comas de los valores tipo texto y convirtiéndolos a números enteros para facilitar su procesamiento y análisis.
                    {/* Lista detallada de los parametros */}
                    <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#475569", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem" }}>
                      <li>
                        <strong>columnas_numericas</strong> Define una lista con las columnas que contienen los valores de demanda.
                      </li>
                      <li>
                        <strong>for col in columnas_numericas</strong> Recorre cada una de las columnas definidas.
                      </li>
                      <li>
                        <strong>.str.replace(',', '')</strong> Elimina las comas utilizadas como separadores de miles.
                      </li>
                      <li>
                        <strong>.str.strip()</strong> Elimina espacios en blanco al inicio y al final de los valores.
                      </li>
                      <li>
                        <strong>pd.to_numeric()</strong> Convierte los valores a un formato numérico, permitiendo su uso en cálculos y análisis posteriores.
                      </li>
                      <li>
                        <strong>errors='coerce'</strong> Convierte los valores que no pueden interpretarse como números en valores nulos (NaN).
                      </li>
                      <li>
                        <strong>.fillna(0)</strong> Sustituye los valores nulos por cero.
                      </li>
                      <li>
                        <strong>.astype(int)</strong> Convierte los valores a un tipo de dato entero.
                      </li>
                    </ul>
                    {/* Recuadro de código Requests */}
                    <div style={{ 
                      background: "#0F172A", 
                      color: "#E2E8F0", 
                      padding: "1.25rem", 
                      borderRadius: "8px",
                      marginTop: "0.5rem", 
                      fontFamily: "monospace", 
                      fontSize: "0.85rem",
                      overflowX: "auto",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"}}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", fontSize: "0.75rem", borderBottom: "1px solid #334155", paddingBottom: "0.3rem", color: "#94A3B8" }}>
                        <span>🐍 Código</span>
                      </div>
                      <pre style={{ margin: 0, fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                        <code>{trabajo.codigoTransformacionEntero}</code>
                      </pre>
                    </div>

                    {/* Tarjeta de previsualización del resultado */}
                    <div style={{ 
                      background: "#e9e9e9", 
                      color: "#E2E8F0", 
                      padding: "1.25rem", 
                      borderRadius: "8px", 
                      marginTop: "1.25rem", 
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      fontSize: "0.85rem"}}>
                      <div style={{ color: "#1E293B", marginBottom: "0.75rem", fontWeight: "600", fontSize: "0.8rem", borderBottom: "1px solid #334155", paddingBottom: "0.4rem" }}>
                        Comparativa de transformación
                      </div>
                      
                      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid #334155", color: "#334155", fontSize: "0.85rem"}}>
                        
                            <th style={{ paddingBottom: "0.5rem", fontWeight: "600" }}></th>
                            <th style={{ paddingBottom: "0.5rem", fontWeight: "600" }}>Antes (Con comas/texto)</th>
                            <th style={{ paddingBottom: "0.5rem", fontWeight: "600" }}>Después (Entero limpio)</th>
                          </tr>
                        </thead>
                        <tbody style={{ color: "#335155" }}>
                          <tr style={{ borderBottom: "1px solid #1E293B" }}>
                            <td style={{ padding: "0.6rem 0", fontWeight: "normal" }}>Días Laborables</td>
                            <td style={{ padding: "0.6rem 0", fontWeight: "600" }}>"251,195"</td>
                            <td style={{ padding: "0.6rem 0", fontWeight: "600" }}>251195</td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid #1E293B" }}>
                            <td style={{ padding: "0.6rem 0", fontWeight: "normal" }}>Días Feriados</td>
                            <td style={{ padding: "0.6rem 0", fontWeight: "600" }}>"82,150"</td>
                            <td style={{ padding: "0.6rem 0", fontWeight: "600" }}>82150</td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid #1E293B" }}>
                            <td style={{ padding: "0.6rem 0", fontWeight: "normal" }}>Días Sábados</td>
                            <td style={{ padding: "0.6rem 0", fontWeight: "600" }}>"194,234"</td>
                            <td style={{ padding: "0.6rem 0", fontWeight: "600" }}>194234</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  

                  <div style={{ marginTop: "0.6rem", background: "#F9FAFB", padding: "0.75rem 1rem", borderRadius: "6px", borderLeft: "4px solid #9ab7d3", fontSize: "0.9rem" }}>
                    <h3>05.3 Incorporación de columnas y creación de fecha:</h3> Se incorpora un identificador para distinguir los registros de cada línea del Metro, se genera una columna de fecha a partir del mes y año, y se establece un orden estructurado para las columnas del DataFrame.

                    {/* Lista detallada de los parametros */}
                    <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#475569", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem" }}>
                      <li>
                        <strong>df['Línea'] = numero_tramo</strong> Crea una columna que identifica la línea del Metro a la que pertenece cada registro. Recibe el valor definido al ejecutar la función (1 o 2).
                      </li>
                      <li>
                        <strong>df['Mes'].map(MESES_A_NUMERO)</strong> Convierte los nombres de los meses en sus respectivos valores numéricos mediante el diccionario de equivalencias.
                      </li>
                      <li>
                        <strong>pd.to_datetime()</strong> Combina el año, el mes y el día para construir una fecha válida en formato datetime. Se establece el día 01 como referencia para cada período mensual.
                      </li>
                      <li>
                        <strong>df.drop(columns=['Mes_Num'])</strong> Elimina la columna auxiliar utilizada para convertir los nombres de los meses en números, ya que deja de ser necesaria.
                      </li>
                      <li>
                        <strong>df = df[['Fecha', 'Línea', 'Mes', 'Año', 'Días Laborables', 'Días Sábados', 'Días Feriados']]: </strong> Establece una estructura uniforme para presentar la información en el DataFrame final.
                      </li>
                    </ul>
                  

                    {/* Recuadro de código Nuevas columnas */}
                    <div style={{ 
                      background: "#0F172A", 
                      color: "#E2E8F0", 
                      padding: "1.25rem", 
                      borderRadius: "8px",
                      marginTop: "0.5rem", 
                      fontFamily: "monospace", 
                      fontSize: "0.85rem",
                      overflowX: "auto",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"}}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", fontSize: "0.75rem", borderBottom: "1px solid #334155", paddingBottom: "0.3rem", color: "#94A3B8" }}>
                        <span>🐍 Código</span>
                      </div>
                      <pre style={{ margin: 0, fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                        <code>{trabajo.codigoNuevaColumna}</code>
                      </pre>
                    </div>


                    {/* Tarjeta del DataFrame resultante */}
                    <div style={{ 
                      background: "#e9e9e9", 
                      color: "#E2E8F0", 
                      padding: "1.25rem", 
                      borderRadius: "8px", 
                      marginTop: "0.7rem", 
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      fontSize: "0.85rem"}}>
                      <div style={{ color: "#1E293B", marginBottom: "0.75rem", fontWeight: "600", fontSize: "0.8rem", borderBottom: "1px solid #1E293B", paddingBottom: "0.4rem" }}>
                        DataFrame resultante
                      </div>
                      
                      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid #334155", color: "#1E293B", fontSize: "0.75rem" }}>
                            <th style={{ paddingBottom: "0.5rem", fontWeight: "600" }}>Fecha</th>
                            <th style={{ paddingBottom: "0.5rem", fontWeight: "600", textAlign: "left" }}>Línea</th>
                            <th style={{ paddingBottom: "0.5rem", fontWeight: "600" }}>Mes</th>
                            <th style={{ paddingBottom: "0.5rem", fontWeight: "600", textAlign: "right" }}>Año</th>
                          </tr>
                        </thead>
                        <tbody style={{ color: "#1E293B" }}>
                          <tr style={{ borderBottom: "1px solid #1E293B" }}>
                            <td style={{ padding: "0.6rem 0" }}>01/01/2018</td>
                            <td style={{ padding: "0.6rem 0", textAlign: "left" }}>1</td>
                            <td style={{ padding: "0.6rem 0" }}>Enero</td>
                            <td style={{ padding: "0.6rem 0", textAlign: "right" }}>2018</td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid #1E293B" }}>
                            <td style={{ padding: "0.6rem 0" }}>01/02/2018</td>
                            <td style={{ padding: "0.6rem 0", textAlign: "left" }}>1</td>
                            <td style={{ padding: "0.6rem 0" }}>Febrero</td>
                            <td style={{ padding: "0.6rem 0", textAlign: "right" }}>2018</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "0.6rem 0" }}>01/03/2018</td>
                            <td style={{ padding: "0.6rem 0", textAlign: "left" }}>1</td>
                            <td style={{ padding: "0.6rem 0" }}>Marzo</td>
                            <td style={{ padding: "0.6rem 0", textAlign: "right" }}>2018</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
            </section>

            <section className="bloque-ficha">
              <h2>06. Consolidación y exportación de datos</h2>
              <p>{trabajo.carga}</p>

              {/* Lista detallada de los parametros */}
                    <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#475569", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem" }}>
                      <li>
                        <strong>pd.concat([df_l1, df_l2])</strong> Combina los dos DataFrames, colocando los registros de la Línea 2 debajo de los registros de la Línea 1 (consolidación vertical).
                      </li>
                      <li>
                        <strong>ignore_index=True</strong> Genera un nuevo índice secuencial para todos los registros, evitando conservar los índices originales de cada DataFrame.
                      </li>
                      <li>
                        <strong>archivo_salida</strong> Define la ruta y el nombre del archivo CSV que se generará.
                      </li>
                      <li>
                        <strong>df_maestro.to_csv()</strong> Exporta el DataFrame consolidado a un archivo CSV.
                      </li>
                      <li>
                        <strong>index=False</strong> Evita que Pandas exporte el índice del DataFrame como una columna adicional.
                      </li>
                      <li>
                        <strong>encoding='utf-8'</strong> Establece la codificación de caracteres para conservar correctamente tildes y caracteres especiales.
                      </li>
                    </ul>

              {/* Recuadro de código Guardado CSV */}
                    <div style={{ 
                      background: "#0F172A", 
                      color: "#E2E8F0", 
                      padding: "1.25rem", 
                      borderRadius: "8px",
                      marginTop: "0.5rem", 
                      fontFamily: "monospace", 
                      fontSize: "0.85rem",
                      overflowX: "auto",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"}}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", fontSize: "0.75rem", borderBottom: "1px solid #334155", paddingBottom: "0.3rem", color: "#94A3B8" }}>
                        <span>🐍 Código</span>
                      </div>
                      <pre style={{ margin: 0, fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                        <code>{trabajo.codigoGuardado}</code>
                      </pre>
                    </div>
            </section>

          </div>

          <aside>
            {/* Contenedor Principal: Diagrama ETL Vertical Neón */}
            <div style={{ 
              background: "#0F172A", 
              border: "1px solid #1E293B", 
              borderRadius: "16px", 
              padding: "1.5rem", 
              color: "#F8FAFC",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
              fontSize: "0.85rem"
            }}>
              {/* Encabezado del Diagrama */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", borderBottom: "1px solid #1E293B", paddingBottom: "1rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", overflow: "hidden", border: "1px solid #38BDF8", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(56, 189, 248, 0.1)" }}>
                  <img src="tren.png" alt="Icono Tren" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: "#F8FAFC" }}>Flujo del proceso ETL</h3>
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "#94A3B8" }}>Demanda de pasajeros · Metro de Panamá</p>
                </div>
              </div>

              {/* Contenedor de Fases Verticales */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center" }}>
                
                {/* FASE 1: FUENTES DE DATOS (Cian Neón) */}
                <div style={{ width: "100%", background: "#1E293B", border: "1px solid #0891B2", borderRadius: "12px", padding: "1rem", boxShadow: "0 0 15px rgba(6, 182, 212, 0.15)" }}>
                  <div style={{ display: "inline-block", background: "rgba(6, 182, 212, 0.2)", color: "#22D3EE", padding: "0.2rem 0.6rem", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                    FUENTES DE DATOS
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                    {/* Icono de Fuente */}
                    <div style={{ width: "48px", height: "48px", borderRadius: "8px", border: "1px dashed #06B6D4", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(6, 182, 212, 0.05)", color: "#22D3EE", flexShrink: 0 }}>
                      <img src="fuente.png" alt="Icono Fuente" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: "600", color: "#E2E8F0" }}>Línea 1 & Línea 2</div>
                      <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Archivos CSV independientes</div>
                    </div>
                  </div>
                  <div style={{ borderTop: "1px solid #334155", paddingTop: "0.5rem", fontSize: "0.75rem", color: "#64748B" }}>
                    Datos Abiertos de Panamá
                  </div>
                </div>

                {/* Flecha Neón */}
                <div style={{ color: "#38BDF8", fontSize: "1.2rem", fontWeight: "bold", textShadow: "0 0 8px #38BDF8", margin: "0.2rem 0" }}>↓</div>

                {/* FASE 2: EXTRACCIÓN (Azul Neón) */}
                <div style={{ width: "100%", background: "#1E293B", border: "1px solid #2563EB", borderRadius: "12px", padding: "1rem", boxShadow: "0 0 15px rgba(59, 130, 246, 0.15)" }}>
                  <div style={{ display: "inline-block", background: "rgba(59, 130, 246, 0.2)", color: "#60A5FA", padding: "0.2rem 0.6rem", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                    EXTRACCIÓN
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                    {/* Icono de Extracción */}
                    <div style={{ width: "48px", height: "48px", borderRadius: "8px", border: "1px dashed #3B82F6", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(59, 130, 246, 0.05)", color: "#60A5FA", flexShrink: 0 }}>
                      <img src="codigo.png" alt="Icono Extracción" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: "600", color: "#E2E8F0" }}>Python + Requests</div>
                      <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Peticiones HTTP automatizadas</div>
                    </div>
                  </div>
                  <div style={{ borderTop: "1px solid #334155", paddingTop: "0.5rem", fontSize: "0.75rem", color: "#64748B" }}>
                    Descarga directa de fuentes web
                  </div>
                </div>

                {/* Flecha Neón */}
                <div style={{ color: "#34D399", fontSize: "1.2rem", fontWeight: "bold", textShadow: "0 0 8px #34D399", margin: "0.2rem 0" }}>↓</div>

                {/* FASE 3: TRANSFORMACIÓN (Verde Neón) */}
                <div style={{ width: "100%", background: "#1E293B", border: "1px solid #059669", borderRadius: "12px", padding: "1rem", boxShadow: "0 0 15px rgba(16, 185, 129, 0.15)" }}>
                  <div style={{ display: "inline-block", background: "rgba(16, 185, 129, 0.2)", color: "#34D399", padding: "0.2rem 0.6rem", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                    TRANSFORMACIÓN
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                    {/* Icono de Transformación */}
                    <div style={{ width: "48px", height: "48px", borderRadius: "8px", border: "1px dashed #10B981", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(16, 185, 129, 0.05)", color: "#34D399", flexShrink: 0 }}>
                      <img src="transformacion.png" alt="Icono Transformación" style={{ width: "90%", height: "90%", objectFit: "cover" }} />
                    </div>
                    <ul style={{ margin: 0, paddingLeft: "1rem", color: "#CBD5E1", fontSize: "0.78rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                      <li>Separación de fechas (Mes / Año)</li>
                      <li>Limpieza numérica</li>
                      <li>Creación de columnas de negocio</li>
                    </ul>
                  </div>
                </div>

                {/* Flecha Neón */}
                <div style={{ color: "#C084FC", fontSize: "1.2rem", fontWeight: "bold", textShadow: "0 0 8px #C084FC", margin: "0.2rem 0" }}>↓</div>

                {/* FASE 4: CONSOLIDACIÓN (Púrpura Neón) */}
                <div style={{ width: "100%", background: "#1E293B", border: "1px solid #9333EA", borderRadius: "12px", padding: "1rem", boxShadow: "0 0 15px rgba(168, 85, 247, 0.15)" }}>
                  <div style={{ display: "inline-block", background: "rgba(168, 85, 247, 0.2)", color: "#C084FC", padding: "0.2rem 0.6rem", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                    CONSOLIDACIÓN
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                    {/* Icono de Consolidación */}
                    <div style={{ width: "48px", height: "48px", borderRadius: "8px", border: "1px dashed #A855F7", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(168, 85, 247, 0.05)", color: "#C084FC", flexShrink: 0 }}>
                      <img src="datosFinal.png" alt="Icono Consolidación" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: "600", color: "#E2E8F0" }}>Unión de ambas líneas</div>
                      <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Consolidación vía <code>pd.concat()</code></div>
                    </div>
                  </div>
                  <div style={{ borderTop: "1px solid #334155", paddingTop: "0.5rem", fontSize: "0.75rem", color: "#A855F7", fontWeight: "600" }}>
                    demanda_metro_maestro.csv
                  </div>
                </div>

              </div>
            </div>

          </aside>

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

        <a href="mailto:tucorreo@ejemplo.com">
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
