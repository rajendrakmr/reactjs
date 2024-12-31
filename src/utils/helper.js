
function removeHypen(input) {
    const index = input.indexOf('-');
    if (index !== -1) {
        return input.slice(index + 1);
    } else {
        return input;
    }
}

export const customSelectOption = {
    control: (base, state) => ({
        ...base,
        height: 'calc(1em + .50rem + 2px)',
        minHeight: 'calc(1em + .50rem + 2px)',
        fontSize: '11px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0',
        minWidth: '40%',
        boxSizing: 'border-box',
        backgroundColor: state.isSelected
            ? '#6ee9a4'
            : state.isDisabled
                ? '#e9ecef'
                : '#6ee9a4',
        color: state.isDisabled ? '#6ee9a4' : 'black',
        // backgroundColor: '#6ee9a4'
    }),
    valueContainer: (base) => ({
        ...base,
        padding: '0 9px',
        // display: 'flex',
        justifyContent: 'flex-start',
        // alignItems: 'center',
        height: '130%',
        boxSizing: 'border-box',
        minWidth: '40%',
        fontSize: '11px',
        fontWeight: 'bold',

    }),
    singleValue: (base) => ({
        ...base,
        minWidth: '80%',
        margin: '0',
        textAlign: 'left',
        fontSize: '11px',
        gridArea: '-1/1/1/3',
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    }),
    placeholder: (base) => ({
        ...base,
        // margin: '0',
        // textAlign: 'center',
        fontSize: '13px',
        // display: 'flex',
        // justifyContent: 'space-between',
        alignItems: 'end',
        padding: '0',
        height: '40%',
        display: 'flex'
    }),
    dropdownIndicator: (base) => ({
        ...base,
        // marginTop: '0',
        // padding: '1px 10px',
        // alignItems: 'center',
        color: 'black',
        // transform: 'rotate(0deg)',
        fontSize: '5px',
        padding: '0px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    }),
    indicatorContainer: (base) => ({
        ...base,
        height: '100%', // Ensure it fills the height properly
        display: 'flex',
        alignItems: 'center', // Vertically align indicator
        justifyContent: 'center',
    }),
    indicatorSeparator: (base) => ({
        ...base,
        display: 'display',
        height: '10px'
    }),
    menu: (base) => ({
        ...base,
        fontSize: '11px',
        whiteSpace: "nowrap",
        width: 'auto',       // Allow dropdown to adapt to content size
        minWidth: '80%',    // Ensures dropdown is at least as wide as the select box
        maxWidth: '250px',
    }),
    option: (base, state) => ({
        ...base,
        fontSize: '13px',
        backgroundColor: state.isSelected
            ? '#6ee9a4'
            : state.isDisabled
                ? '#d3d3d3'
                : 'white',
        color: 'black',
    }),
    input: (base) => ({
        ...base,
        fontSize: '11px',
    }),
    menuPortal: (base) => ({ ...base, zIndex: 999999 }),
}

export const convertToNodes = (data) => {
    const nodes = [];
    const defult = [];
    function traverse(data) {
        const nodeList = [];
        for (const key in data) {
            if (Array.isArray(data[key])) {
                const children = data[key].map(item => {
                    if (item.isAccess === 'Y') {
                        defult.push(item.menuId);
                    }
                    return {
                        value: item.menuId.toString(),
                        label: item.menuName
                    };
                });
                const labelName = removeHypen(key);
                nodeList.push({
                    value: key.toLowerCase(),
                    label: labelName,
                    children: children
                });
            } else if (typeof data[key] === 'object' && data[key] !== null) {
                const labelName = removeHypen(key);
                nodeList.push({
                    value: key.toLowerCase(),
                    label: labelName,
                    children: traverse(data[key])
                });
            }
        }
        return nodeList;
    }

    const resultNodes = traverse(data);
    nodes.push(...resultNodes);
    return { nodes, defult };
}

export const collectCheckedMenus = (menuList, checkedValues) => {
    const defaultSelectedMenus = [];
    const traverseMenu = (nodes) => {
        for (const moduleName in nodes) {
            const categories = nodes[moduleName];
            for (const category in categories) {
                categories[category].forEach(node => {
                    if (checkedValues.includes(node.menuId)) {
                        defaultSelectedMenus.push({
                            menuId: node.menuId,
                            moduleName: node.moduleName,
                            moduleId: node.moduleId,
                        });
                    }
                });
            }
        }
    };
    traverseMenu(menuList);
    return defaultSelectedMenus;
};

export const assignedMenu = (nodes) => {
    const defaultMenu = [];
    const traverseMenu = (nodes) => {
        for (const moduleName in nodes) {
            const categories = nodes[moduleName];
            for (const category in categories) {
                categories[category].forEach(node => {
                    defaultMenu.push(parseInt(node.menuId, 10));
                });
            }
        }
    };
    traverseMenu(nodes);
    return { default: defaultMenu };
}


export const selectedItemMenu = (nodes) => {
    const defaultMenu = [];
    if (Array.isArray(nodes)) {
        nodes.forEach(node => {
            defaultMenu.push(node.menuId);
        });
    } else {
        console.warn("Expected 'nodes' to be an array, but received:", nodes);
    }


    return { preChecked: defaultMenu };
}



export const filterRecordData = (obj) => { 
    for (const key in obj) {
        if (key !== 'pageNumber' && key !== 'pageNo' && key !== 'pageSize') {
            return true; 
        }
    } 
    return false;
};


