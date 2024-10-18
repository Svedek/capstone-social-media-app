import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()


export async function getPersons() {
  const [rows] = await pool.query("SELECT * FROM person")
  return rows
}

export async function getPerson(id) {
  const [rows] = await pool.query(`
    SELECT *
    FROM person
    WHERE person_id = ?
    `, [id])
    return rows[0]
}

export async function createPerson(name, bio) {
  const result = await pool.query(`
    INSERT INTO person (person_name, person_bio)
    VALUES (?, ?)
    `, [name, bio])
    return getPerson(result[0].insertId)
}

// const result = await createPerson('Grape', 'I am a grape')
// console.log(result)
// const person = await getPerson("Grape")
// console.log(person)
// const persons = await getPersons()
// console.log(persons)
