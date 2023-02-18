const moviesModel = require("../model/movies_model")
const Pagination = require("../../helper(db)/pagination.js")
const { unlink } = require('node:fs')

const moviesController = {
    create: (req, res) => {
        // console.log(req.file);
        const request = {
            ...req.body,
            movies_image: req.file.filename,
        }
        return moviesModel.create(request)
            .then((result) => {
                return res.status(201).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },
    read: (req, res) => {
        let { search, movies_release, sortBy, page, limit } = req.query
        let offset = Pagination.buildOffset(page, limit)
        return moviesModel.read(search, movies_release, sortBy, limit, offset)
            .then((result) => {
                return res.status(200).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },

    readDetail: (req, res) => {
        return moviesModel.readDetail(req.params.id)
            .then((result) => {
                if (result != null) {
                    return res.status(200).send({ message: "Success", data: result })
                } else {
                    return res.status(404).send({ message: "Sorry data not found! Please check your input ID!" })
                }
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },

    // SINGLE
    update: (req, res) => {
        // Id product
        const id = req.params.id

        return moviesModel.update(req, id)
            .then((result) => {
                // console.log(result[0].img_profile);
                // if (result[0].img_profile != null){
                //     for (let i = 0; i < result.length; i++) {
                //         unlink(`public/uploads/images/${result[i].img_profile}`, (err) => {
                //             if (err) throw err;
                //         });
                //     }
                // }
                return res.status(200).send({ message: `Successfully update data id=${id}` })
            })
            // Error handling
            .catch(error => {
                return res.status(400).send({
                    Status: 400,
                    Message: `${error}`
                })
            })
    },

    remove: (req, res) => {
        return moviesModel.remove(req.params.id)
            .then((result) => {
                // console.log(result);
                // console.log(result.rows[0].movies_image);
                for (let i = 0; i < result.length; i++) {
                    console.log(`public/uploads/images/${result[i].movies_image}`);
                    unlink(`public/uploads/images/${result[i].movies_image}`, (err) => {
                        if (err) throw err;
                    });
                }
                return res.status(200).send({ message: "Success", data: `users ${req.params.id} has been deleted` })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    }
}

module.exports = moviesController