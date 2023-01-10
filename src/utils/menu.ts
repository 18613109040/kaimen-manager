import { MenuType } from '@/services/common';
import { MenuDataItem } from '@ant-design/pro-components';

function recursionMenu(subMenus: MenuType[]): MenuDataItem {
  const menus: MenuDataItem = [];
  subMenus.map((sub: MenuType) => {
    let menu: MenuDataItem = {
      path: sub.index,
      name: sub.title,
      // icon: sub.icon,
      children: [],
    };
    if ((sub.subs || [])?.length > 0) {
      // @ts-ignore
      menu.children = recursionMenu(sub.subs!);
    }
    menus.push(menu);

    return menu;
  });
  return menus;
}

export function transformMenu(list?: MenuType[]): MenuDataItem[] {
  const menus: MenuDataItem[] = [];
  list?.map((menu: MenuType) => {
    const item: MenuDataItem = {
      path: menu.index,
      name: menu.title,
      // icon: menu.icon,
    };
    if ((menu?.subs || [])?.length > 0) {
      // @ts-ignore
      item.children = recursionMenu(menu.subs!);
    }
    menus.push(item);

    return item;
  });
  return menus;
}
