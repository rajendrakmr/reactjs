const getRoleBaseMenuList = {
    // ... your data as provided
};

const collectCheckedMenus = (menuList, checkedValues) => {
  const defaultSelectedMenus = [];

  const traverseMenu = (nodes) => {
    for (const moduleName in nodes) {
      const categories = nodes[moduleName];

      for (const category in categories) {
        categories[category].forEach(node => {
          if (checkedValues.includes(node.dcpyViewSecurityMenyKey.menuId)) {
            defaultSelectedMenus.push({
              menuId: node.dcpyViewSecurityMenyKey.menuId,
              moduleName: node.moduleName,
              moduleId: node.dcpyViewSecurityMenyKey.moduleId,
              menuName: node.menuName,
              menuLinkName: node.menuLinkName
            });
          }
        });
      }
    }
  };

  traverseMenu(menuList);
  return defaultSelectedMenus;
};

// Example usage:
const checkedValues = [1210, 1211, 1209];
const selectedMenus = collectCheckedMenus(getRoleBaseMenuList, checkedValues);
 
