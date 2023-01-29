import { Tree, TreeProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { DataNode } from 'antd/es/tree';

const MenuManage: React.FC = () => {
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    const treeData: DataNode[]  = [
        {
            title: "获客环节",
            key: "0-0",
            children: [
                {
                    title: "直播工作台",
                    key: "0-1",
                }
            ]
        }
    ];
    return (
        <Tree
        showLine
        switcherIcon={<DownOutlined />}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={treeData}
        />
    )
}

export default MenuManage