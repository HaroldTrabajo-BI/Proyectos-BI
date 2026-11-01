"""
=============================================================================
PROYECTO: Pipeline ETL - Demanda de Usuarios del Metro de Panamá
DESCRIPCIÓN: Script automatizado para la extracción, limpieza, transformación 
             y consolidación de datos históricos de demanda (Línea 1 y Línea 2).
AUTOR: Portafolio de Ingeniería / Análisis de Datos
=============================================================================
"""

import pandas as pd
import requests

#DICCIONARIOS GLOBALES DE MAPEO
MAPEO_MESES = {
    'ene': 'Enero', 'feb': 'Febrero', 'mar': 'Marzo', 'abr': 'Abril',
    'may': 'Mayo', 'jun': 'Junio', 'jul': 'Julio', 'ago': 'Agosto',
    'sep': 'Septiembre', 'oct': 'Octubre', 'nov': 'Noviembre', 'dic': 'Diciembre'}

MESES_A_NUMERO = {
    'Enero': '01', 'Febrero': '02', 'Marzo': '03', 'Abril': '04',
    'Mayo': '05', 'Junio': '06', 'Julio': '07', 'Agosto': '08',
    'Septiembre': '09', 'Octubre': '10', 'Noviembre': '11', 'Diciembre': '12'}

#FUNCIÓN PARA EL ETL DE CUALQUIER LÍNEA
def procesar_linea(url_descarga, nombre_linea, numero_tramo):
    """
    Parámetros:
    - url_descarga (str): Enlace directo al archivo CSV institucional.
    - nombre_linea (str): Nombre descriptivo de la línea (ej. 'Línea 1').
    - numero_tramo (int): Identificador numérico del tramo (1 o 2).
    """
    print(f"\nDescargando datos de {nombre_linea}...")
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
    response = requests.get(url_descarga, headers=headers)
    
    if response.status_code != 200:
        print(f"Error al descargar {nombre_linea}. Código: {response.status_code}")
        return None

    #Guardado temporal del archivo descargado
    temp_file = f"temp_{nombre_linea.lower().replace(' ', '_')}.csv"
    with open(temp_file, "wb") as f:
        f.write(response.content)

    print(f"Procesando y limpiando {nombre_linea} (skiprows=5)...")

    #Lectura del archivo omitiendo el encabezado
    df = pd.read_csv(temp_file, sep=";", skiprows=5, header=None, encoding="latin-1")

    #Separación de la columna de fecha original ('ene-18')
    partes = df.iloc[:, 0].astype(str).str.split('-', expand=True)
    df['Mes'] = partes[0].str.lower().map(MAPEO_MESES)
    df['Año'] = '20' + partes[1].str.strip()

    #Asignación temporal de columnas para aislar las métricas de demanda
    df.columns = ['Mes_Original', 'Días Laborables', 'Días Sábados', 'Días Feriados'] + list(df.columns[4:])
    df = df[['Mes', 'Año', 'Días Laborables', 'Días Sábados', 'Días Feriados']]

    #Limpieza de valores numéricos (remover comas y convertir a entero)
    columnas_numericas = ['Días Laborables', 'Días Sábados', 'Días Feriados']
    for col in columnas_numericas:
        df[col] = df[col].astype(str).str.replace(',', '').str.strip()
        df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0).astype(int)

    #Incorporación de columnas de negocio: Tramo y Fecha (datetime)
    df['Tramo'] = numero_tramo
    df['Mes_Num'] = df['Mes'].map(MESES_A_NUMERO)
    df['Fecha'] = pd.to_datetime(df['Año'] + '-' + df['Mes_Num'] + '-01')
    df = df.drop(columns=['Mes_Num'])

    #Reordenamiento de columnas
    df = df[['Fecha', 'Tramo', 'Mes', 'Año', 'Días Laborables', 'Días Sábados', 'Días Feriados']]
    
    print(f"✨ ¡{nombre_linea} procesada con éxito!")
    return df

#EJECUCIÓN DEL PIPELINE PRINCIPAL ---

#URL de la Línea 1
URL_L1 = "https://www.datosabiertos.gob.pa/dataset/fc61ee7e-517c-4ea9-9404-8acd8342734e/resource/282f3fd6-c45d-4be0-92e3-0a6574007298/download/demanda-de-usuarios-a-agosto-2026-linea-1.csv"

#URL de la Línea 2
URL_L2 = "https://www.datosabiertos.gob.pa/dataset/fc61ee7e-517c-4ea9-9404-8acd8342734e/resource/e61f93cd-bbd8-4fa5-95e9-39ec98308590/download/demanda-de-usuarios-a-agosto-2026-linea-2.csv" 

#Llamada a la función para procesar la Línea 1
df_l1 = procesar_linea(URL_L1, "Línea 1", numero_tramo=1)

#Llamada a la función para procesar la Línea 2
df_l2 = procesar_linea(URL_L2, "Línea 2", numero_tramo=2)

if df_l1 is not None:
    
    #Unir ambos DataFrames en uno solo (maestro)
    df_maestro = pd.concat([df_l1, df_l2], ignore_index=True)

    #Guardar archivo maestro para Power BI
    archivo_salida = 'proyecto-datos/demanda_metro_maestro.csv'
    df_maestro.to_csv(archivo_salida, index=False, encoding='utf-8')

    print(f"\n🚀 ¡ETL completado! Archivo maestro guardado en: {archivo_salida}")
    print("\n📊 Vista previa del DataFrame maestro consolidado:")
    print(df_maestro.head(10))
    print("\n📋 Tipos de datos finales:")
    print(df_maestro.dtypes)