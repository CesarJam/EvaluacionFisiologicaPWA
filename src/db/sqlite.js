import initSqlJs from 'sql.js'

let db = null

// Inicializar la base de datos
export const initDB = async () => {
  if (db) return db

  const SQL = await initSqlJs({
    locateFile: () => `/sql-wasm.wasm`
  })

  const savedDB = localStorage.getItem('lionsss_sqlite_db')
  
  if (savedDB) {
    const binaryString = window.atob(savedDB)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    db = new SQL.Database(bytes)
    
    try {
      db.run("ALTER TABLE evaluaciones ADD COLUMN nombre TEXT;");
    } catch (e) {
    }
  } else {
    db = new SQL.Database()
    db.run(`
      CREATE TABLE IF NOT EXISTS evaluaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT,
        nombre TEXT,
        parametros TEXT,
        resultado INTEGER,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `)
    saveDB()
  }
  
  return db
}

// Función para persistir la base de datos
const saveDB = () => {
  if (!db) return
  const data = db.export()
  let binary = ''
  const len = data.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(data[i])
  }
  window.localStorage.setItem('lionsss_sqlite_db', window.btoa(binary))
}

export const guardarEvaluacion = async (tipo, nombre, parametros, resultado) => {
  await initDB()
  
  db.run(
    `INSERT INTO evaluaciones (tipo, nombre, parametros, resultado) VALUES (?, ?, ?, ?)`,
    [tipo, nombre, JSON.stringify(parametros), resultado]
  )
  
  saveDB()
  console.log(`Evaluación de ${tipo} para ${nombre} guardada correctamente.`)
}

export const obtenerHistorial = async () => {
  await initDB()
  const res = db.exec(`SELECT id, tipo, nombre, parametros, resultado, fecha FROM evaluaciones ORDER BY id DESC`)
  
  if (res.length === 0) return []
  
  return res[0].values.map(row => ({
    id: row[0],
    tipo: row[1],
    nombre: row[2] || 'Sin nombre',
    parametros: JSON.parse(row[3]),
    resultado: row[4],
    fecha: row[5]
  }))
}

export const eliminarEvaluacion = async (id) => {
  await initDB()
  db.run(`DELETE FROM evaluaciones WHERE id = ?`, [id])
  saveDB()
}