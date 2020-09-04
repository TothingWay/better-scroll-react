import React, { useState, createContext, memo, } from 'react';
import classNames from 'classnames';
import MenuItem from './menuItem';
import SubMenu from './subMenu';
export var MenuContext = createContext({ index: '0' });
export var Menu = function (_a) {
    var className = _a.className, mode = _a.mode, style = _a.style, children = _a.children, defaultIndex = _a.defaultIndex, onSelect = _a.onSelect, defaultOpenSubMenus = _a.defaultOpenSubMenus;
    var _b = useState(defaultIndex), currentActive = _b[0], setActive = _b[1];
    var classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString(),
                });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: [],
};
Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
export default memo(Menu);
