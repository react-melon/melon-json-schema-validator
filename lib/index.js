(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'melon-core/validator/Validity', 'ajv', './locale/zh-CN', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('melon-core/validator/Validity'), require('ajv'), require('./locale/zh-CN'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Validity, global.ajv, global.zhCN, global.babelHelpers);
        global.index = mod.exports;
    }
})(this, function (exports, _Validity, _ajv, _zhCN, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    var _ajv2 = babelHelpers.interopRequireDefault(_ajv);

    var _zhCN2 = babelHelpers.interopRequireDefault(_zhCN);

    var Validator = function () {
        function Validator(options) {
            babelHelpers.classCallCheck(this, Validator);

            this.validator = new _ajv2['default'](options);
        }

        Validator.prototype.resolveSchema = function resolveSchema(component) {
            var _component$props = component.props;
            var rules = _component$props.rules;
            var schema = _component$props.schema;

            return rules || schema || {};
        };

        Validator.prototype.validate = function validate(value, component) {

            var validator = this.validator;

            var valid = validator.validate(this.resolveSchema(component), value);

            var validity = new _Validity2['default']();

            if (valid) {
                return validity;
            }

            (0, _zhCN2['default'])(validator.errors);

            return validator.errors.reduce(function (validity, error) {
                validity.addState(babelHelpers['extends']({}, error, {
                    isValid: false
                }));
                return validity;
            }, validity);
        };

        Validator.prototype.createCustomValidity = function createCustomValidity(customValidity) {

            var validity = new _Validity2['default']();

            validity.addState({
                isValid: !customValidity,
                message: customValidity
            });

            return validity;
        };

        Validator.prototype.addFormat = function addFormat() {
            var _validator;

            (_validator = this.validator).addFormat.apply(_validator, arguments);
        };

        Validator.prototype.addKeyword = function addKeyword() {
            var _validator2;

            (_validator2 = this.validator).addKeyword.apply(_validator2, arguments);
        };

        Validator.prototype.getSchema = function getSchema() {
            this.getSchema.apply(this, arguments);
        };

        Validator.prototype.validateSchema = function validateSchema() {
            this.validateSchema.apply(this, arguments);
        };

        Validator.prototype.addMetaSchema = function addMetaSchema() {
            this.addMetaSchema.apply(this, arguments);
        };

        Validator.prototype.addSchema = function addSchema() {
            this.addSchema.apply(this, arguments);
        };

        Validator.prototype.removeSchema = function removeSchema() {
            this.removeSchema.apply(this, arguments);
        };

        Validator.prototype.errorsText = function errorsText() {
            this.errorsText.apply(this, arguments);
        };

        return Validator;
    }();

    exports['default'] = Validator;
});
//# sourceMappingURL=index.js.map
