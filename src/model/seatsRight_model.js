const { query } = require('express');
const db = require('../../helper(db)/connection')
const { v4: uuidv4 } = require('uuid');

const seatsModel = {
    // CREATE
    create: ({ site, status }) => {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO seats_right (id, site, status) VALUES ('${uuidv4()}','${site}','${status}')`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve({ site, status })
                    }
                }
            )
        })
    },

    // READ
    query: (search, status, sortBy, limit, offset) => {
        let orderQuery = `ORDER BY filter ${sortBy} LIMIT ${limit} OFFSET ${offset}`

        if (!search && !status) {
            return orderQuery
        } else if (search && status) {
            return `WHERE site ILIKE '%${search}%' AND status ILIKE '${status}%' ${orderQuery}`
        } else if (search || status) {
            return `WHERE site ILIKE '%${search}%' OR status ILIKE '${status}%' ${orderQuery}`
        } else {
            return orderQuery
        }
    },

    read: function (search, status, sortBy = 'ASC', limit = 25, offset = 0) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT id, site, status from seats_right ${this.query(search, status, sortBy, limit, offset)}`,
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
                `SELECT * from seats_right WHERE id='${id}'`,
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
    update: ({ id, status }) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM seats_right WHERE id='${id}'`, (err, result) => {
                // console.log(result);
                if (err) {
                    return reject(err.message);
                } else {
                    db.query(
                        `UPDATE seats_right SET
                        status='${status || result.rows[0].status}'
                        WHERE id='${id}'`,
                        (err, result) => {
                            if (err) {
                                return reject(err.message)
                            } else {
                                return resolve({ id, status })
                            }
                        }
                    )
                }
            })
        })
    },

    // DELETE
    // untuk remove tergantung paramnya saja, untuk kasus dibawah ini yaitu id.
    remove: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                `DELETE from seats_right WHERE id='${id}'`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve(`seat ${id} has been deleted`)
                    }
                }
            )
        })
    }
}

module.exports = seatsModel