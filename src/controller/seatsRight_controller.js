const seatsModel = require("../model/seatsRight_model.js")
const Pagination = require("../../helper(db)/pagination.js")

const seatsController = {
    create: (req, res) => {
        return seatsModel.create(req.body)
            .then((result) => {
                return res.status(201).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },
    read: (req, res) => {
        let { search, status, sortBy, page, limit } = req.query
        let offset = Pagination.buildOffset(page, limit)
        return seatsModel.read(search, status, sortBy, limit, offset)
            .then((result) => {
                return res.status(200).send({ data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },

    readDetail: (req, res) => {
        return seatsModel.readDetail(req.params.id)
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
    update: (req, res) => {
        const request = {
            ...req.body,
            id: req.params.id
        }
        return seatsModel.update(request)
            .then((result) => {
                return res.status(201).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },
    remove: (req, res) => {
        return seatsModel.remove(req.params.id)
            .then((result) => {
                return res.status(200).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    }
}

module.exports = seatsController