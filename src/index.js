/**
 * @file main entry file
 * @author ludafa(ludafa@outlook.com)
 */

import Validity from 'melon-core/validator/Validity';
import Ajv from 'ajv';
import locale from './locale/zh-CN';

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

        if (valid) {
            return validity;
        }

        locale(validator.errors);

        return validator.errors.reduce(
            (validity, error) => {
                validity.addState({
                    ...error,
                    isValid: false
                });
                return validity;
            },
            validity
        );

    }

    createCustomValidity(customValidity) {

        const validity = new Validity();

        validity.addState({
            isValid: !customValidity,
            message: customValidity
        });

        return validity;

    }

    // delegated methods from ajv validator

    addFormat(...args) {
        this.validator.addFormat(...args);
    }

    addKeyword(...args) {
        this.validator.addKeyword(...args);
    }

    getSchema(...args) {
        this.getSchema(...args);
    }

    validateSchema(...args) {
        this.validateSchema(...args);
    }

    addMetaSchema(...args) {
        this.addMetaSchema(...args);
    }

    addSchema(...args) {
        this.addSchema(...args);
    }

    removeSchema(...args) {
        this.removeSchema(...args);
    }

    errorsText(...args) {
        this.errorsText(...args);
    }

}
