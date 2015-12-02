define('melon-json-schema-form/index', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'melon/validator/Validity',
    'tv4'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var Validity = require('melon/validator/Validity');
    var tv4 = require('tv4');
    function JsonSchemaValidator() {
    }
    JsonSchemaValidator.prototype.resolveSchema = function (component) {
        return component.props.rules || {};
    };
    JsonSchemaValidator.prototype.validate = function (value, component) {
        var _tv4$validateMultiple = tv4.validateMultiple(value, this.resolveSchema(component));
        var _tv4$validateMultiple2 = _tv4$validateMultiple.errors;
        var errors = _tv4$validateMultiple2 === undefined ? [] : _tv4$validateMultiple2;
        var validity = errors.reduce(function (validity, error) {
            var valid = error.valid;
            var rest = babelHelpers.objectWithoutProperties(error, ['valid']);
            validity.addState(babelHelpers.extends({}, rest, { isValid: valid }));
            return validity;
        }, new Validity());
        return validity;
    };
    JsonSchemaValidator.prototype.createCustomValidity = function (customValidity) {
        var validity = new Validity();
        validity.addState({
            isValid: !!customValidity,
            message: customValidity
        });
        return validity;
    };
    var defaultValidator = new JsonSchemaValidator();
    defaultValidator.Validator = JsonSchemaValidator;
    defaultValidator.create = function () {
        return new JsonSchemaValidator();
    };
    module.exports = defaultValidator;
});