import { body, ValidationChain } from "express-validator";

export class AuthValidator {
    public static SignUp: ValidationChain[] = [
        body('name')
            .exists().withMessage('Name must exist')
            .trim()
            .not().isEmpty().withMessage("Name must not be empty")
            .isString().withMessage('Name must be a string')
            .escape()
            .toUpperCase(),
        body('email')
            .exists().withMessage('Email must exist')
            .trim()
            .not().isEmpty().withMessage('Email must not be empty')
            .isEmail().withMessage('Email must be a valid email')
            .toUpperCase(),
        body('password')
            .exists().withMessage('Password must exist')
            .not().isEmpty().withMessage('Password must not be empty')
            .isLength({min: 8}).withMessage('Password length must be at least 8 characters'),
        body('confirmPassword')
            .custom((value, { req }) => {
            if (value !== req.body.password) {
                    throw new Error('Password Confirmation does not match password');
                }
                return true;
            })
    ];

    public static Login: ValidationChain[] = [
        body('email')
            .exists().withMessage('Email must exist')
            .trim()
            .not().isEmpty().withMessage('Email must not be empty')
            .isEmail().withMessage('Email must be a valid email')
            .toUpperCase(),
        body('password')
            .exists().withMessage('Password must exist')
            .not().isEmpty().withMessage('Password must not be empty')
    ];

    public static RecoverAccount: ValidationChain[] = [
        body('email')
            .exists().withMessage('Email must exist')
            .trim()
            .not().isEmpty().withMessage('Email must not be empty')
            .isEmail().withMessage('Email must be a valid email')
            .toUpperCase()
    ];  

    public static SetNewPassword: ValidationChain[] = [
        body('password')
            .exists().withMessage('Password must exist')
            .not().isEmpty().withMessage('Password must not be empty')
            .isLength({min: 8}).withMessage('Password length must be at least 8 characters'),
        body('confirmPassword')
            .custom((value, { req }) => {
            if (value !== req.body.password) {
                    throw new Error('Password Confirmation does not match password');
                }
                return true;
            })
    ];
}