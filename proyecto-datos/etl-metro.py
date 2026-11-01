import pandas as pd
import requests

# --- 1. DICCIONARIOS GLOBALES DE MAPEO ---
MAPEO_MESES = {
    'ene': 'Enero', 'feb': 'Febrero', 'mar': 'Marzo', 'abr': 'Abril',
    'may': 'Mayo', 'jun': 'Junio', 'jul': 'Julio', 'ago': 'Agosto',
    'sep': 'Septiembre', 'oct': 'Octubre', 'nov': 'Noviembre', 'dic': 'Diciembre'
}

MESES_A_NUMERO = {
    'Enero': '01', 'Febrero': '02', 'Marzo': '03', 'Abril': '04',
    'Mayo': '05', 'Junio': '06', 'Julio': '07', 'Agosto': '08',
    'Septiembre': '09', 'Octubre': '10', 'Noviembre': '11', 'Diciembre': '12'
}

# --- 2. FUNCIÓN REUTILIZABLE PARA EL ETL DE CUALQUIER LÍNEA ---
def procesar_linea(url_descarga, nombre_linea, numero_tramo):
    print(f"\n📥 Descargando datos de {nombre_linea}...")
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
    response = requests.get(url_descarga, headers=headers)
    
    if response.status_code != 200:
        print(f"❌ Error al descargar {nombre_linea}. Código: {response.status_code}")
        return None

    temp_file = f"temp_{nombre_linea.lower().replace(' ', '_')}.csv"
    with open(temp_file, "wb") as f:
        f.write(response.content)

    print(f"🔄 Procesando y limpiando {nombre_linea} (skiprows=5)...")
    # Lectura robusta sin cabecera automática
    df = pd.read_csv(temp_file, sep=";", skiprows=5, header=None, encoding="latin-1")

    # Separación de la columna de fecha original (ej. 'ene-18')
    partes = df.iloc[:, 0].astype(str).str.split('-', expand=True)
    df['Mes'] = partes[0].str.lower().map(MAPEO_MESES)
    df['Año'] = '20' + partes[1].str.strip()

    # Asignación provisional de columnas para aislar las métricas de demanda
    df.columns = ['Mes_Original', 'Días Laborables', 'Días Sábados', 'Días Feriados'] + list(df.columns[4:])
    df = df[['Mes', 'Año', 'Días Laborables', 'Días Sábados', 'Días Feriados']]

    # Limpieza de valores numéricos (remover comas y convertir a entero estricto int64)
    columnas_numericas = ['Días Laborables', 'Días Sábados', 'Días Feriados']
    for col in columnas_numericas:
        df[col] = df[col].astype(str).str.replace(',', '').str.strip()
        df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0).astype(int)

    # Incorporación de columnas de negocio: Tramo y Fecha (datetime)
    df['Tramo'] = numero_tramo
    df['Mes_Num'] = df['Mes'].map(MESES_A_NUMERO)
    df['Fecha'] = pd.to_datetime(df['Año'] + '-' + df['Mes_Num'] + '-01')
    df = df.drop(columns=['Mes_Num'])

    # Reordenamiento profesional de columnas
    df = df[['Fecha', 'Tramo', 'Mes', 'Año', 'Días Laborables', 'Días Sábados', 'Días Feriados']]
    
    print(f"✨ ¡{nombre_linea} procesada con éxito!")
    return df

# --- 3. EJECUCIÓN DEL PIPELINE PRINCIPAL ---

# URL Oficial de la Línea 1
URL_L1 = "https://www.datosabiertos.gob.pa/dataset/fc61ee7e-517c-4ea9-9404-8acd8342734e/resource/282f3fd6-c45d-4be0-92e3-0a6574007298/download/demanda-de-usuarios-a-agosto-2026-linea-1.csv"

# (Placeholder) URL de la Línea 2 - Reemplázala cuando obtengas el enlace de datos abiertos de la L2
URL_L2 = "https://www.datosabiertos.gob.pa/dataset/fc61ee7e-517c-4ea9-9404-8acd8342734e/resource/e61f93cd-bbd8-4fa5-95e9-39ec98308590/download/demanda-de-usuarios-a-agosto-2026-linea-2.csv" 

# Procesamos la Línea 1
df_l1 = procesar_linea(URL_L1, "Línea 1", numero_tramo=1)

# Procesamos la Línea 2 (Descomenta cuando tengas el link de la L2)
df_l2 = procesar_linea(URL_L2, "Línea 2", numero_tramo=2)

if df_l1 is not None:
    # Si solo tienes la L1 por ahora, puedes consolidarla directamente:
    #df_maestro = df_l1.copy()
    
    # Si ya tienes ambas, usarías:
    df_maestro = pd.concat([df_l1, df_l2], ignore_index=True)

    # Guardar archivo maestro consolidado para Power BI
    archivo_salida = 'proyecto-datos/demanda_metro_maestro.csv'
    df_maestro.to_csv(archivo_salida, index=False, encoding='utf-8')

    print(f"\n🚀 ¡ETL completado! Archivo maestro guardado en: {archivo_salida}")
    print("\n📊 Vista previa del DataFrame maestro consolidado:")
    print(df_maestro.head(10))
    print("\n📋 Tipos de datos finales:")
    print(df_maestro.dtypes)