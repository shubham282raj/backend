// npm i express-validator

import { query } from 'express-validator';
// you are using them as middleware

// they add 'express-validator#contexts' to req object
// so that you can access them in the next middleware

import { query, validationResult } from 'express-validator';

query("sort").isString().notEmpty().withMessage("Seems empty")
// this is the middleware that validates the query parameter
// it sends stuff to the next middleware without errors

const result = validationResult(req);
// in the next middleware, you can access the validation results

import { query, validationResult, body } from 'express-validator';
// for body of post requests

body().isEmpty()
// and so on

result.isEmpty()
// this returns true if there are no errors

if(!result.isEmpty()){
    return res.status(400).send({errors: result.array()})
}

import { query, validationResult, body, matchedData } from 'express-validator';

const data = matchedData(req)
// this is the data that passed the validation
// contains only the data which was passed successfully

[
    body('username')
        .notEmpty()
        .withMessage('username cannot be empty')
        .isLength({min: 5, max: 32})
        .withMessage('username must be at least 5 characters with a max of 32 characters')
        .isString()
        .withMessage('username must be a string'),
    body('name')
        .notEmpty()
        .withMessage('name cannot be empty')
        .isString()
        .withMessage('name must be a string')
]
// also can pass an array of validators to the middleware

// we can create schemas for validation as well
export const create_user_val_schema = {
    username: {
        isLength: {
            options: { min: 5, max: 32 },
            errorMessage: 'userrname must be at least 5 characters with a max of 32 characters'
        },
        // notEmpty: true,
        notEmpty: {
            errorMessage: 'username cannot be empty'
        },
        isString: {
            errorMessage: 'username must be a string'
        }
    },
    name: {
        notEmpty: {
            errorMessage: 'name cannot be empty'
        },
        isString: {
            errorMessage: 'name must be a string'
        }
    }
}