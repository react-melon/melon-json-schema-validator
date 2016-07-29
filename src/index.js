/**
 * @file main entry file
 * @author ludafa(ludafa@outlook.com)
 */

import Validity from 'melon-core/validator/Validity';
import Ajv from 'ajv';

export default class Validator {

    constructor(options) {
        this.validator = new Ajv(options);
    }

    resolveSchema(component) {
        const {rules, schema} = component.props;
        return rules || schema || {};
    }

    validate(value, component) {

        const validator = this.validator;

        const valid = validator.validate(this.resolveSchema(component), value);

        const validity = new Validity();

        return valid
            ? validity
            : validator
                .errors
                .reduce(function (validity, error) {

                    validity.addState({
                        ...error,
                        isValid: false
                    });

                    return validity;

                }, validity);


    }

    createCustomValidity(customValidity) {

        const validity = new Validity();

        validity.addState({
            isValid: !customValidity,
            message: customValidity
        });

        return validity;

    }

}
