const { query } = require('express');
const db = require('../../helper(db)/connection')
const { v4: uuidv4 } = require('uuid');

const cinemaModel = {
    // CREATE
    create: ({ id_movies, cinema_name, cinema_location, cinema_price, cinema_date, cinema_image }) => {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO cinema (id, id_movies, cinema_name, cinema_location, cinema_price, cinema_date, cinema_image ) 
                VALUES (
                    '${uuidv4()}',
                    '${id_movies}',
                    '${cinema_name}',
                    '${cinema_location}',
                    '${cinema_price}',
                    '${cinema_date}',
                    '${cinema_image}')`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve({ id_movies, cinema_name, cinema_location, cinema_price, cinema_date, cinema_image })
                    }
                }
            )
        })
    },

    // READ
    query: (search, cinema_location, sortBy, limit, offset) => {
        let orderQuery = `ORDER BY cinema_location ${sortBy} LIMIT ${limit} OFFSET ${offset}`

        if (!search && !cinema_location) {
            return orderQuery
        } else if (search && cinema_location) {
            return `WHERE cinema_name ILIKE '%${search}%' AND cinema_location ILIKE '${cinema_location}%' ${orderQuery}`
        } else if (search || cinema_location) {
            return `WHERE cinema_name ILIKE '%${search}%' OR cinema_location ILIKE '${cinema_location}%' ${orderQuery}`
        } else {
            return orderQuery
        }
    },

    read: function (search, cinema_location, sortBy = 'ASC', limit = 25, offset = 0) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * from cinema ${this.query(search, cinema_location, sortBy, limit, offset)}`,
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
                `SELECT * from cinema WHERE id='${id}'`,
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
    // update: function (req, id) {
    //     return new Promise((success, failed) => {
    //         const { movies_name, movies_genre, movies_release, duration, movies_directed, movies_cast, movies_synopsis } = req.body
    //         db.query(`SELECT * FROM movies WHERE id='${id}'`, (error, result) => {
    //             if (error) {
    //                 return failed(error.message)
    //             } else {
    //                 // console.log(result);
    //                 if (result.rows.length < 1) {
    //                     return failed('Id not found!')
    //                 } else {
    //                     db.query(`
    //                     UPDATE movies SET 
    //                     movies_name='${movies_name || result.rows[0].movies_name}', 
    //                     movies_genre='${movies_genre || result.rows[0].movies_genre}', 
    //                     movies_release='${movies_release || result.rows[0].movies_release}', 
    //                     duration='${duration || result.rows[0].duration}', 
    //                     movies_directed='${movies_directed || result.rows[0].movies_directed}', 
    //                     movies_cast='${movies_cast || result.rows[0].movies_cast}', 
    //                     movies_synopsis='${movies_synopsis || result.rows[0].movies_synopsis}', 
    //                     movies_image='${(req.file != undefined) ? req.file.filename : result.rows[0].movies_image}' 
    //                     WHERE id='${id}'`, (error) => {
    //                         if (error) {
    //                             return failed(error.message)
    //                         } else {
    //                             return success(result.rows)
    //                         }
    //                     })
    //                 }
    //             }
    //         })
    //     })
    // },

    // DELETE
    // untuk remove tergantung paramnya saja, untuk kasus dibawah ini yaitu id.
    remove: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                `DELETE from cinema WHERE id='${id}' RETURNING cinema_image`,
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

module.exports = cinemaModel