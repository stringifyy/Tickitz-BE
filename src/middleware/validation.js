// express validator
const { body, check, validationResult } = require('express-validator')
const checkDuplicate = require('./checkDuplicate')

// USERS
// RULES
const rulesUsers = [
    check('email')
        .notEmpty().withMessage('email cannot empty')
        .trim()
        .escape(),

    body('email').custom(async value => {
        const duplicateName = await checkDuplicate(value)
        if (duplicateName) {
            throw new Error('email already registered!')
        }
        return true
    }),

    check('password')
        .notEmpty().withMessage('password cannot empty')
        .trim()
        .escape(),

    check('phone')
        .notEmpty().withMessage('mobile number cannot empty')
        .isNumeric().withMessage('mobile number must be a numeric')
        .trim()
        .escape(),

    check('name')
        .notEmpty().withMessage('name cannot empty')
        .trim()
        .escape(),

]
// RESPONSE AND CONDITION
const users = [
    //Rules
    rulesUsers,

    //Response
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg })
        }
        next();
    }
]

// const filesPayloadExists = (req, res, next) => {
//     if (!req.files) return res.status(400).json({ status: 'error', message: 'Missing files!' })
//     next()
// } 

module.exports = { users }


