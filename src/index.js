/**
 * @file main entry file
 * @author ludafa(ludafa@outlook.com)
 */

const Validity = require('melon/validator/Validity');
const tv4 = require('tv4');

function JsonSchemaValidator() {
}

JsonSchemaValidator.prototype.resolveSchema = function (component) {
    return component.props.rules || {};
};

JsonSchemaValidator.prototype.validate = function (value, component) {

    const {errors = []} = tv4.validateMultiple(
        value,
        this.resolveSchema(component)
    );

    const validity = errors.reduce(
        (validity, error) => {

            const {valid, ...rest} = error;

            validity.addState({
                ...rest,
                isValid: valid
            });

            return validity;

        },
        new Validity()
    );

    return validity;
};

JsonSchemaValidator.prototype.createCustomValidity = function (customValidity) {

    const validity = new Validity();

    validity.addState({
        isValid: !!customValidity,
        message: customValidity
    });

    return validity;

};

const defaultValidator = new JsonSchemaValidator();

defaultValidator.Validator = JsonSchemaValidator;
defaultValidator.create = function () {
    return new JsonSchemaValidator();
};

module.exports = defaultValidator;


