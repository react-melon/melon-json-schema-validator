(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'melon/validator/Validity', 'ajv', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('melon/validator/Validity'), require('ajv'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Validity, global.ajv, global.babelHelpers);
        global.index = mod.exports;
    }
})(this, function (exports, _Validity, _ajv, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    var _ajv2 = babelHelpers.interopRequireDefault(_ajv);

    var Validator = function () {
        function Validator(options) {
            babelHelpers.classCallCheck(this, Validator);

            this.validator = new _ajv2.default(options);
        }

        babelHelpers.createClass(Validator, [{
            key: 'resolveSchema',
            value: function resolveSchema(component) {
                return component.props.rules || {};
            }
        }, {
            key: 'validate',
            value: function validate(value, component) {

                var validator = this.validator;

                var valid = validator.validate(this.resolveSchema(component), value);

                var validity = new _Validity2.default();

                return valid ? validity : validator.errors.reduce(function (validity, error) {

                    validity.addState(babelHelpers.extends({}, error, {
                        isValid: false
                    }));

                    return validity;
                }, validity);
            }
        }, {
            key: 'createCustomValidity',
            value: function createCustomValidity(customValidity) {

                var validity = new _Validity2.default();

                validity.addState({
                    isValid: !!customValidity,
                    message: customValidity
                });

                return validity;
            }
        }]);
        return Validator;
    }();

    exports.default = Validator;
});