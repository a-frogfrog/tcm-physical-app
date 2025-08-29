import React, { useEffect } from 'react';
import { useState } from 'react';
import Layout from '../layout';
import { get_goods } from '../../api/goods';
import { Table, Tag, Image } from 'antd';


const Home = () => {
 const [data,set_data] = useState([]);
 const [pagination,set_pagination] = useState({
   total:0,
   current:1,
   pageSize:5,
 })
 const [loading, set_loading] = useState(false);


 const columns = [
  {
    title:'图片',
    dataIndex:Image,
    key:'name',
    render:(_,record)=>{
      <Image
        width={64}
        src={record.cover}
      />
    }
  },
  {
    title:'名字',
    dataIndex:'name',
    key:'name',
  },
  {
    title:'价格',
    dataIndex:'price',
    key:'price',
    render:price => <Tag color='red'>${price}</Tag>
  },
  {
    title:'供应商',
    dataIndex:'supplier',
    key:'supplier'
  },
 ]

  useEffect(()=>{
    const bind_user = async () =>{
      set_loading(true);
      const res = await get_goods({
        page:pagination.current,
        limit:pagination.pageSize,
        keyWord:"",
        keyword_time:[],
        staus_isDirectly:0,
        status_isBan:0,
        status_isShelve:0,
        price_type:"",
        inventory_type:"",
        sales_order:""
      });
      set_loading(false);
      if(res.code === 0){
        set_data(res.data.list);
        if(res.data.total !=pagination.total){
          set_pagination({
            ...pagination,
            total:res.data.total,
          })
        }
      }
    }
    bind_user();
  },[pagination]);


  const handleTableChange = (pagination) => {
    set_pagination(pagination);
    //侦听器  监听
}
  return (
    <Layout>
      <Table
            columns={columns}
            dataSource={data}
            pagination={pagination}
            onChange={handleTableChange}
            loading={loading}
        />
    </Layout>
  );
};

export default Home;
