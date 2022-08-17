import { body, ValidationChain } from 'express-validator';

export class MessageValidator {
    public constructor() {}

    public static SendMessage: ValidationChain[] = [
        body('message')
            .exists().withMessage('Message must not be empty')
            .trim()
            .not().isEmpty().withMessage('Message must not be empty')
            .escape()
    ]
}