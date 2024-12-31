import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types'; 

const TreeNode = React.memo(({ node, onCheck, onSelectItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle child nodes visibility
    const handleToggle = useCallback(() => setIsOpen(prev => !prev), []);

    // Handle checkbox state change
    const handleCheckboxChange = (e) => {
        const checked = e.target.checked; 
        onCheck(node, checked);
    };

    // Handle item selection
    const handleItemClick = () => {
        onSelectItem(node);
    };

    return (
        <div>
            <div className="d-flex align-items-center">
                {node.children && (
                    <span
                        onClick={handleToggle}
                        style={{ cursor: 'pointer', marginRight: '8px' }}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? '[-] ' : '[+] '}
                    </span>
                )}
                <div className="row w-100" onClick={handleItemClick} role="treeitem">
                    <div className="col-10">
                        <span>{node.name} {node.isAccess}</span>
                    </div>
                    <div className="col-2 text-end">
                        <input
                            type="checkbox"
                            id={`checkbox-${node.menuId}`} // Use a unique ID
                            checked={node.isChecked} // Use the updated isChecked
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                            aria-checked={node.isChecked}
                        />
                    </div>
                </div>
            </div>
            {isOpen && node.children && (
                <div style={{ paddingLeft: 20 }}>
                    {node.children.map((child, index) => (
                        <TreeNode
                            key={index} // Use a unique key
                            node={child}
                            onCheck={onCheck}
                            onSelectItem={handleItemClick} // Select item on child node
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

TreeNode.propTypes = {
    node: PropTypes.shape({
        name: PropTypes.string.isRequired,
        isChecked: PropTypes.bool.isRequired,
        children: PropTypes.arrayOf(PropTypes.object)
    }).isRequired,
    onCheck: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func.isRequired
};

export default TreeNode;
