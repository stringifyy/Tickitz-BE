const { query } = require('express');
const db = require('../../helper(db)/connection')
const { v4: uuidv4 } = require('uuid');

const moviesModel = {
    // CREATE
    create: ({ movies_name, movies_genre, movies_release, duration, movies_directed, movies_cast, movies_synopsis, movies_image, date }) => {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO movies (id, movies_name, movies_genre, movies_release, duration, movies_directed, movies_cast, movies_synopsis, movies_image, date) 
                VALUES (
                    '${uuidv4()}',
                    '${movies_name}',
                    '${movies_genre}',
                    '${movies_release}',
                    '${duration}',
                    '${movies_directed}',
                    '${movies_cast}',
                    '${movies_synopsis}',
                    '${movies_image}',
                    '${date}')`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve({ movies_name, movies_genre, movies_release, duration, movies_directed, movies_cast, movies_synopsis, movies_image, date })
                    }
                }
            )
        })
    },

    // READ (MOVIES WITH CINEMA)
    // query: (search, movies_release, sortBy, limit, offset) => {
    //     let orderQuery = `ORDER BY date ${sortBy} LIMIT ${limit} OFFSET ${offset}`

    //     if (!search && !movies_release) {
    //         return orderQuery
    //     } else if (search && movies_release) {
    //         return `WHERE movies_name ILIKE '%${search}%' AND movies_release ILIKE '${movies_release}%' ${orderQuery}`
    //     } else if (search || movies_release) {
    //         return `WHERE movies_name ILIKE '%${search}%' OR movies_release ILIKE '${movies_release}%' ${orderQuery}`
    //     } else {
    //         return orderQuery
    //     }
    // },

    // whereClause: (search, movies_release) => {
    //     // console.log("whereclause", { search, movies_release })
    //     if (search && movies_release) {
    //         return `WHERE movies_name ILIKE '%${search}%' AND movies_release ILIKE '${movies_release}%'`
    //     } else if (search || movies_release) {
    //         // console.log("OKOKOK")
    //         return `WHERE movies_name ILIKE '%${search}%' OR movies_release ILIKE '${movies_release}%'`
    //     } else {
    //         return ""
    //     }
    // },

    // orderAndGroupClause: (sortBy, limit, offset) => {
    //     return `GROUP BY p.id ORDER BY date ${sortBy} LIMIT ${limit} OFFSET ${offset}`
    // },

    // read: function (search, movies_release, sortBy = 'DESC', limit = 25, offset = 0) {
    //     // console.log("where", this.whereClause(search, category))
    //     // console.log("order", this.orderAndGroupClause(sortBy, limit, offset))
    //     return new Promise((resolve, reject) => {
    //         db.query(
    //             `SELECT 
    //             p.id, p.movies_name, p.movies_genre, p.movies_release, p.duration, p.movies_directed, p.movies_cast, p.movies_synopsis, p.movies_image, p.date,
    //             json_agg(row_to_json(pi)) cinema 
    //             FROM movies p
    //             INNER JOIN cinema pi ON p.id = pi.id_movies 
    //             ${this.whereClause(search, movies_release)}
    //             ${this.orderAndGroupClause(sortBy, limit, offset)}
    //             `,
    //             (err, result) => {
    //                 if (err) {
    //                     return reject(err.message)
    //                 } else {
    //                     return resolve(result.rows)
    //                 }
    //             }
    //         )
    //     })
    // },

    // READ (MOVIES ONLY)
    query: (search, movies_release, sortBy, limit, offset) => {
        let orderQuery = `ORDER BY date ${sortBy} LIMIT ${limit} OFFSET ${offset}`

        if (!search && !movies_release) {
            return orderQuery
        } else if (search && movies_release) {
            return `WHERE movies_name ILIKE '%${search}%' AND movies_release ILIKE '${movies_release}%' ${orderQuery}`
        } else if (search || movies_release) {
            return `WHERE movies_name ILIKE '%${search}%' OR movies_release ILIKE '${movies_release}%' ${orderQuery}`
        } else {
            return orderQuery
        }
    },

    read: function (search, movies_release, sortBy = 'DESC', limit = 25, offset = 0) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * from movies ${this.query(search, movies_release, sortBy, limit, offset)}`,
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
                p.id, p.movies_name, p.movies_genre, p.movies_release, p.duration, p.movies_directed, p.movies_cast, p.movies_synopsis, p.movies_image,
                json_agg(row_to_json(pi)) cinema 
                FROM movies p
                INNER JOIN cinema pi ON p.id = pi.id_movies 
                AND p.id='${id}'
                GROUP BY p.id`,
                // `SELECT * from movies WHERE id='${id}'`,
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

    // SINGLE
    update: function (req, id) {
        return new Promise((success, failed) => {
            const { movies_name, movies_genre, movies_release, duration, movies_directed, movies_cast, movies_synopsis } = req.body
            db.query(`SELECT * FROM movies WHERE id='${id}'`, (error, result) => {
                if (error) {
                    return failed(error.message)
                } else {
                    // console.log(result);
                    if (result.rows.length < 1) {
                        return failed('Id not found!')
                    } else {
                        db.query(`
                        UPDATE movies SET 
                        movies_name='${movies_name || result.rows[0].movies_name}', 
                        movies_genre='${movies_genre || result.rows[0].movies_genre}', 
                        movies_release='${movies_release || result.rows[0].movies_release}', 
                        duration='${duration || result.rows[0].duration}', 
                        movies_directed='${movies_directed || result.rows[0].movies_directed}', 
                        movies_cast='${movies_cast || result.rows[0].movies_cast}', 
                        movies_synopsis='${movies_synopsis || result.rows[0].movies_synopsis}', 
                        movies_image='${(req.file != undefined) ? req.file.filename : result.rows[0].movies_image}' 
                        WHERE id='${id}'`, (error) => {
                            if (error) {
                                return failed(error.message)
                            } else {
                                return success(result.rows)
                            }
                        })
                    }
                }
            })
        })
    },

    // DELETE
    // untuk remove tergantung paramnya saja, untuk kasus dibawah ini yaitu id.
    remove: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                `DELETE from movies WHERE id='${id}' RETURNING movies_image`,
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
    }
}

module.exports = moviesModel