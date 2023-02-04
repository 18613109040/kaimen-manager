import { Space, Tree, Typography } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
// import { DataNode } from 'antd/es/tree';
import { useEffect, useState } from 'react';
import { MenuData, queryMenuListService } from '@/services/system-manage/meun-manage';
import { RESPONSE_SUCCESS_CODE } from '@/constant';

const MenuManage: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuData[]>([]);
  //   const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
  //     console.log('selected', selectedKeys, info);
  //   };
  const getData = async () => {
    const res = await queryMenuListService();
    if (res?.code === RESPONSE_SUCCESS_CODE) {
      setMenuData(res?.result || []);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleEdit = () => {};
  return (
    <Tree
      fieldNames={{ title: 'label', key: 'id', children: 'children' }}
      //   showLine
      //   switcherIcon={<DownOutlined />}
      //   onSelect={onSelect}
      //   defaultExpandedKeys={['1' , '23']}
      // titleRender={(nodeData: any)=> }
      //   defaultExpandAll={true}
      treeData={menuData! as any}
      titleRender={(nodeData: any) => {
        console.log(nodeData);
        return (
          <Space>
            <span>{nodeData.label}</span>
            <Typography.Link onClick={handleEdit}>编辑</Typography.Link>
            {nodeData.children.length === 0 && <Typography.Link>删除</Typography.Link>}
          </Space>
        );
      }}
    />
  );
};

export default MenuManage;
