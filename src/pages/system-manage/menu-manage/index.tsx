import { Tree, TreeProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import { DataNode } from 'antd/es/tree';
import { useEffect, useState } from 'react';
import { MenuData, queryMenuListService } from '@/services/system-manage/meun-manage';
import { RESPONSE_SUCCESS_CODE } from '@/constant';

const MenuManage: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuData[]>([]);
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  // const treeData: DataNode[]  = [
  //     {
  //         title: "获客环节",
  //         key: "0-0",
  //         children: [
  //             {
  //                 title: "直播工作台",
  //                 key: "0-1",
  //             },{
  //                 title: "直播工作台2",
  //                 key: "0-2",
  //             }
  //         ]
  //     }
  // ];
  const getData = async () => {
    const res = await queryMenuListService();
    if (res?.code === RESPONSE_SUCCESS_CODE) {
      setMenuData(res?.result || []);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Tree
      fieldNames={{ title: 'label', key: 'id', children: 'children' }}
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={['0-0-0']}
      onSelect={onSelect}
      // titleRender={(nodeData: any)=> }
      defaultExpandAll={true}
      treeData={menuData! as any}
    />
  );
};

export default MenuManage;
