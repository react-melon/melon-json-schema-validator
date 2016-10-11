/**
 * @file test
 * @author leon <ludafa@outlook.com>
 */

import JSONSchemaValiditor from '../../src/index';

describe('melon-json-schema-validator', function () {

    it('should work', function () {

        const validator = new JSONSchemaValiditor({
            allErrors: true
        });


        const component = {
            props: {
                rules: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                        age: {
                            type: 'number'
                        }
                    },
                    required: ['name', 'age']
                }
            }
        };

        const validity1 = validator.validate({name: 'test', age: 18}, component);

        expect(validity1.isValid()).toBe(true);

        const validity2 = validator.validate({name: 'test'}, component);

        expect(validity2.isValid()).toBe(false);
        expect(validity2.states.length).toBe(1);

        const validity3 = validator.validate({name: 1, age: ''}, component);

        expect(validity3.isValid()).toBe(false);
        expect(validity3.states.length).toBe(2);

    });




});
