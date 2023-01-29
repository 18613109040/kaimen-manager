import { RESPONSE_SUCCESS_CODE } from '@/constant';
import { updatePartnerLevelService } from '@/services/platform-setting/level';
import { queryVipLevelListService, VipLevelData } from '@/services/platform-setting/vip-level';
import { Form, InputNumber, message, Popconfirm, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import styles from "./index.less"
const VipLevel: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | number>('');
  const [data, setData] = useState<VipLevelData[]>([]);
  const isEditing = (record: any) => record.id === editingKey;
  const edit = (record: Partial<any> & { key: React.Key }) => {
    setEditingKey(record.id);
    form.setFieldsValue({
        monthGmv: record.monthGmv / 10000,
        monthAmountPurchased: record.monthAmountPurchased,
        rate: record.rate * 100
    });
  };
  const getData = async () => {
    const res = await queryVipLevelListService();
    if (res.code === RESPONSE_SUCCESS_CODE) {
      setData(res?.rows || []);
    }
  };
  const save = async (record: any) => {
    try {
      const row = await form.getFieldsValue();
      const res = await updatePartnerLevelService({
        id: record?.id as string,
        name: record?.name as string,
        des: `${row.profit1}-${row.profit2}-${row.profit3}-${row.profit4}-${row.profit5}`,
      });
      if (res?.code === RESPONSE_SUCCESS_CODE) {
        message.success('修改成功');
        getData();
      } else {
        message.error(res?.msg);
      }
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: '月交易量或月采购量',
      dataIndex: 'name',
      render: (_: any, record: VipLevelData) => {
        if (editingKey === record.id) {
          return (
            <div className={styles["line-row"]}>
              <Form.Item name="monthGmv" style={{ margin: 0 }}>
                <InputNumber />
              </Form.Item>
              万或
              <Form.Item name="monthAmountPurchased" style={{ margin: 0 }}>
                <InputNumber />
              </Form.Item>
              台
            </div>
          );
        }
        return (
          <span>
            {record.monthGmv / 10000}万或{record.monthAmountPurchased}台
          </span>
        );
      },
    },
    {
      title: 'VIP级别',
      dataIndex: 'levelName',
    },
    {
      title: '分润比例',
      dataIndex: 'rate',
      editable: true,
      render: (rate: number, record: VipLevelData) => {
        if (editingKey === record.id) {
          return (
            <div className={styles["line-row"]}>
              交易额 *
              <Form.Item name="rate" style={{ margin: 0 }}>
                <InputNumber />
              </Form.Item>
              %
            </div>
          );
        }
        return <span>交易额 * {rate * 100}%</span>;
      },
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
    getData();
  }, []);
//   const mergedColumns = columns.map((col) => {
//     if (!col.editable) {
//       return col;
//     }
//     return {
//       ...col,
//       onCell: (record: any) => ({
//         record,
//         dataIndex: col.dataIndex,
//         title: col.title,
//         editing: isEditing(record),
//       }),
//     };
//   });
  return (
    <Form form={form} component={false}>
      <Table
        // components={{
        //   body: {
        //     cell: EditableCell,
        //   },
        // }}
        rowKey="id"
        pagination={false}
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
      />
    </Form>
  );
};
export default VipLevel;
