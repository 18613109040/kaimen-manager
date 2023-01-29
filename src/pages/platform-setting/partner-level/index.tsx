import { RESPONSE_SUCCESS_CODE } from '@/constant';
import { queryLevelListService, updatePartnerLevelService } from '@/services/platform-setting/level';
import { Form, InputNumber, message, Popconfirm, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: any;
  index: number;
  children: React.ReactNode;
}
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          <InputNumber />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const PartnerLevel: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | number>('');
  const [data, setData] = useState([
    
  ]);
  const isEditing = (record: any) => record.id === editingKey;
  const edit = (record: Partial<any> & { key: React.Key }) => {
    setEditingKey(record.id);
    form.setFieldsValue({ ...record });
  };
  const getData = async () => {
    const res = await queryLevelListService();
    if(res.code === RESPONSE_SUCCESS_CODE) {
      const temp: any = [...data];
      res?.rows?.forEach((item,index) => {
        temp[index] = {...temp[index], ...item};
        (item?.des?.split("-") || []).forEach((element,ix) => {
          temp[index][`profit${ix+1}`] = element;
        });
      })
      setData(temp);
    }
    
  }
  const save = async (record: any) => {
    try {
      console.log(record);
      const row = await form.getFieldsValue();
      console.log(Object.values(row))
      const res = await updatePartnerLevelService({
        id: record?.id as string,
        name: record?.name as string,
        des: `${row.profit1}-${row.profit2}-${row.profit3}-${row.profit4}-${row.profit5}`
      })
      if(res?.code === RESPONSE_SUCCESS_CODE) {
        message.success("修改成功")
        getData();
      }else {
        message.error(res?.msg)
      }
      setEditingKey("");
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: '分润比例',
      dataIndex: 'name',
    },
    {
      title: 'K1',
      dataIndex: 'profit1',
      editable: true,
      render: (name: string) => <span>{name}%</span>,
    },
    {
      title: 'K2',
      dataIndex: 'profit2',
      editable: true,
      render: (name: string) => <span>{name}%</span>,
    },
    {
      title: 'K3',
      dataIndex: 'profit3',
      editable: true,
      render: (name: string) => <span>{name}%</span>,
    },
    {
      title: 'K4',
      dataIndex: 'profit4',
      editable: true,
      render: (name: string) => <span>{name}%</span>,
    },
    {
      title: 'K5',
      dataIndex: 'profit5',
      editable: true,
      render: (name: string) => <span>{name}%</span>,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record)} style={{ marginRight: 8 }}>
              保存
            </Typography.Link>
            <Popconfirm title="确认取消保存" onConfirm={() => setEditingKey('')}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            编辑
          </Typography.Link>
        );
      },
    },
  ];

  useEffect(() => {
    getData()
  }, []);
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        rowKey="id"
        pagination={false}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
      />
    </Form>
  );
};
export default PartnerLevel;
