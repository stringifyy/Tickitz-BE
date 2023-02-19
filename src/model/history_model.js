const { query } = require('express');
const db = require('../../helper(db)/connection')
const { v4: uuidv4 } = require('uuid');

const historyModel = {
    // CREATE
    create: ({ id_user, movies_name, movies_date, movies_time, cinema_name, ticket_count, total_payment, seats }) => {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO history (id, id_user, movies_name, movies_date, movies_time, cinema_name, ticket_count, total_payment, seats) VALUES ('${uuidv4()}','${id_user}','${movies_name}','${movies_date}','${movies_time}','${cinema_name}','${ticket_count}','${total_payment}','${seats}')`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve({ id_user, movies_name, movies_date, movies_time, cinema_name, ticket_count, total_payment, seats })
                    }
                }
            )
        })
    },

    // READ
    query: (search, movies_name, sortBy, limit, offset) => {
        let orderQuery = `ORDER BY movies_date ${sortBy} LIMIT ${limit} OFFSET ${offset}`

        if (!search && !movies_name) {
            return orderQuery
        } else if (search && movies_name) {
            return `WHERE movies_name ILIKE '%${search}%' AND movies_name ILIKE '${movies_name}%' ${orderQuery}`
        } else if (search || movies_name) {
            return `WHERE movies_name ILIKE '%${search}%' OR movies_name ILIKE '${movies_name}%' ${orderQuery}`
        } else {
            return orderQuery
        }
    },

    read: function (search, movies_name, sortBy = 'DESC', limit = 25, offset = 0) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * from history ${this.query(search, movies_name, sortBy, limit, offset)}`,
                (err, result) => {
                    // console.log(result);
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve(result.rows)
                    }
                }
            )
        })
    },

    readDetail: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT 
                p.id, p.name, p.email,
                json_agg(row_to_json(pi)) history 
                FROM users p
                INNER JOIN history pi ON p.id = pi.id_user
                AND p.id='${id}'
                GROUP BY p.id`,
                // `SELECT * from history WHERE id_user='${id}'`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve(result.rows[0])
                    }
                }
            );
        })
    },

    // UPDATE
    // update: ({ id, email, password, mobile_number, name, gender, birthdate, address, role }) => {
    //     return new Promise((resolve, reject) => {
    //         db.query(`SELECT * FROM users WHERE id='${id}'`, (err, result) => {
    //             // console.log(result);
    //             if (err) {
    //                 return reject(err.message);
    //             } else {
    //                 db.query(
    //                     `UPDATE users SET name='${name || result.rows[0].name}', email='${email || result.rows[0].email}', password='${password || result.rows[0].password}', mobile_number='${mobile_number || result.rows[0].mobile_number}', gender='${gender || result.rows[0].gender}', birthdate='${birthdate || result.rows[0].birthdate}', address='${address || result.rows[0].address}', role='${role || result.rows[0].role}' WHERE id='${id}'`,
    //                     (err, result) => {
    //                         if (err) {
    //                             return reject(err.message)
    //                         } else {
    //                             return resolve({ id, email, password, mobile_number, name, gender, birthdate, address, role })
    //                         }
    //                     }
    //                 )
    //             }
    //         })
    //     })
    // },

    // DELETE
    // untuk remove tergantung paramnya saja, untuk kasus dibawah ini yaitu id.
    remove: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                `DELETE from history WHERE id='${id}'`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve(`users ${id} has been deleted`)
                    }
                }
            )
        })
    }
}

module.exports = historyModel