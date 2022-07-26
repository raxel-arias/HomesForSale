import { check, body, ValidationChain } from "express-validator";
import { CategoriesController } from "../controllers/categories/categories.controller";

export class PropertyValidator {
    public constructor() {}

    public static CreateProperty: ValidationChain[] = [
        body('title')
            .exists().withMessage('Title must exist')
            .trim()
            .not().isEmpty().withMessage('Title must not be empty')
            .isString().withMessage('Title must be a string'),
        body('description')
            .optional()
            .trim()
            .isString().withMessage('Description must be a string')
            .escape(),
        body('price')
            .exists().withMessage('Price must exist')
            .isInt({min: 500}).withMessage('Price must be greather or equal than 500'),
        body('bedrooms')
            .exists().withMessage('Bedrooms must exist')
            .isInt({min: 0}).withMessage('Number of bedrooms must be greather or equal than 0'),
        body('bathrooms')
            .exists().withMessage('Bathrooms must exist')
            .isInt({min: 0}).withMessage('Number of bathrooms must be greather or equal than 0'),
        body('parkings')
            .exists().withMessage('Parkings must exist')
            .isInt({min: 0}).withMessage('Number of parking spaces must be greather or equal than 0'),
        body('latitude')
            .exists().withMessage('Latitude must exist')
            .toFloat()
            .isNumeric().withMessage('Latitude must be a valid number'),
        body('longitude')
            .exists().withMessage('Longitude must exist')
            .toFloat()
            .isNumeric().withMessage('Longitude must be a valid number'),
        body('full_address')
            .exists().withMessage('Address must exist')
            .trim()
            .not().isEmpty().withMessage('Address must not be empty'),
        body('category_type')
            .custom(async (id_category) => {
                try {
                    if (!id_category) throw new Error('Category must be a number');

                    const response = await new CategoriesController().GetCategory(Number(id_category));

                    return true;
                } catch (error: any) {
                    throw new Error(error.msg);
                }
            })
            .toInt()
    ];

    public static CreatePropertySanitization: ValidationChain[] = [
        check('title')
            .trim()
            .escape()
            .toUpperCase()
    ];
}