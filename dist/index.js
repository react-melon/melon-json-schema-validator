(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'melon/validator/Validity', 'tv4', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('melon/validator/Validity'), require('tv4'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Validity, global.tv4, global.babelHelpers);
        global.index = mod.exports;
    }
})(this, function (exports, _Validity, _tv, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Validator = undefined;

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    var _tv2 = babelHelpers.interopRequireDefault(_tv);

    var Validator = exports.Validator = function () {
        function Validator() {
            babelHelpers.classCallCheck(this, Validator);
        }

        babelHelpers.createClass(Validator, [{
            key: 'resolveSchema',
            value: function resolveSchema(component) {
                return component.props.rules || {};
            }
        }, {
            key: 'validate',
            value: function validate(value, component) {
                var _tv4$validateMultiple = _tv2.default.validateMultiple(value, this.resolveSchema(component));

                var _tv4$validateMultiple2 = _tv4$validateMultiple.errors;
                var errors = _tv4$validateMultiple2 === undefined ? [] : _tv4$validateMultiple2;


                var validity = errors.reduce(function (validity, error) {
                    var valid = error.valid;
                    var rest = babelHelpers.objectWithoutProperties(error, ['valid']);


                    validity.addState(babelHelpers.extends({}, rest, {
                        isValid: valid
                    }));

                    return validity;
                }, new _Validity2.default());

                return validity;
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

    var validator = new Validator();

    validator.Validator = Validator;
    validator.create = function () {
        return new Validator();
    };

    /* eslint-disable fecs-export-on-declare */
    exports.default = validator;
});