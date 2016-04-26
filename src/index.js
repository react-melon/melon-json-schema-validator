/**
 * @file main entry file
 * @author ludafa(ludafa@outlook.com)
 */

import Validity from 'melon/validator/Validity';
import tv4 from 'tv4';

export class Validator {

    resolveSchema(component) {
        return component.props.rules || {};
    }

    validate(value, component) {

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
    }

    createCustomValidity(customValidity) {

        const validity = new Validity();

        validity.addState({
            isValid: !!customValidity,
            message: customValidity
        });

        return validity;

    }

}

const validator = new Validator();

validator.Validator = Validator;
validator.create = function () {
    return new Validator();
};

/* eslint-disable fecs-export-on-declare */
export default validator;
