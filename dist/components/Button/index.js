var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { memo, } from 'react';
import classnames from 'classnames';
export var Button = function (_a) {
    var _b;
    var className = _a.className, disabled = _a.disabled, size = _a.size, type = _a.type, children = _a.children, href = _a.href, htmlType = _a.htmlType, restProps = __rest(_a, ["className", "disabled", "size", "type", "children", "href", "htmlType"]);
    var classes = classnames('btn', className, (_b = {},
        _b["btn-" + type] = type,
        _b["btn-" + size] = size,
        _b.disabled = type === 'link' && disabled,
        _b));
    if (type === 'link' && href) {
        return (React.createElement("a", __assign({ className: classes, href: href }, restProps), children));
    }
    else {
        return (React.createElement("button", __assign({ type: htmlType, className: classes, disabled: disabled }, restProps), children));
    }
};
Button.defaultProps = {
    disabled: false,
    type: 'default',
    htmlType: 'button',
};
export default memo(Button);
