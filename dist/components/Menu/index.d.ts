import React, { FC, CSSProperties, ReactNode } from 'react';
import { MenuItemProps } from './menuItem';
import { SubMenuProps } from './subMenu';
declare type MenuMode = 'horizontal' | 'vertical';
declare type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: CSSProperties;
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[];
    children?: ReactNode;
}
interface MenuContextType {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare type MenuComponent = {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
export declare const MenuContext: React.Context<MenuContextType>;
export declare const Menu: FC<MenuProps> & MenuComponent;
declare const _default: React.NamedExoticComponent<MenuProps>;
export default _default;
