import initSqlJs from 'sql.js'

let db = null

// Inicializar la base de datos
export const initDB = async () => {
  if (db) return db

  // Iniciar sql.js indicando dónde está el archivo WASM
  const SQL = await initSqlJs({
    locateFile: file => `/sql-wasm.wasm`
  })

  // Revisar si ya tenemos una base de datos guardada en el navegador
  const savedDB = localStorage.getItem('lionesss_sqlite_db')
  
  if (savedDB) {
    // Si existe, la reconstruimos desde base64 a un buffer binario
    const binaryString = window.atob(savedDB)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    db = new SQL.Database(bytes)
  } else {
    // Si no existe, creamos una nueva y armamos la tabla
    db = new SQL.Database()
    db.run(`
      CREATE TABLE IF NOT EXISTS evaluaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        parametros TEXT,
        resultado INTEGER
      );
    `)
    saveDB() // Guardamos la estructura inicial
  }
  
  return db
}

// Función para persistir la base de datos en localStorage
const saveDB = () => {
  if (!db) return
  const data = db.export()
  let binary = ''
  for (let i = 0; i < data.byteLength; i++) {
    binary += String.fromCharCode(data[i])
  }
  window.localStorage.setItem('lionesss_sqlite_db', window.btoa(binary))
}

// Función para guardar una nueva evaluación
export const guardarEvaluacion = async (tipo, parametros, resultado) => {
  await initDB()
  
  // Guardamos los parámetros como un texto JSON para que sea flexible
  db.run(
    `INSERT INTO evaluaciones (tipo, parametros, resultado) VALUES (?, ?, ?)`,
    [tipo, JSON.stringify(parametros), resultado]
  )
  
  saveDB()
  console.log(`Evaluación de ${tipo} guardada correctamente.`)
}

// Función para obtener todo el historial (por si luego quieres hacer una vista de reportes)
export const obtenerHistorial = async () => {
  await initDB()
  const res = db.exec(`SELECT * FROM evaluaciones ORDER BY id DESC`)
  
  if (res.length === 0) return []
  
  return res[0].values.map(row => ({
    id: row[0],
    tipo: row[1],
    fecha: row[2],
    parametros: JSON.parse(row[3]),
    resultado: row[4]
  }))
}

// Función para eliminar un registro por su ID
export const eliminarEvaluacion = async (id) => {
  await initDB()
  
  db.run(`DELETE FROM evaluaciones WHERE id = ?`, [id])
  
  saveDB() // Actualizamos el localStorage después de borrar
  console.log(`Evaluación con ID ${id} eliminada correctamente.`)
}