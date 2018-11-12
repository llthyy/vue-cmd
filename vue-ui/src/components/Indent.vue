<template>
  <div>
        <Tree :data="data3" @on-select-change="getOrderState"></Tree>
    <Button type="primary" @click="modalForm = true">添加数据</Button>
    <Button type="primary" @click="removes">删除多个</Button>
    <div style="display:inline-block">
        <Input placeholder="根据用户名搜索订单" v-model="searchBox" search/>
    </div>
    <Button type="success" @click="onSearch">搜索</Button>
    <br><br>
    <Table border :columns="columns" :data="data" @on-selection-change="onSelect" id="dg"></Table>
    <br><br>
    <Page :total="total" :page-size="rows" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" show-sizer />
    <!-- 数据操作 -->
    <Modal v-model="modalForm" title="数据操作">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
         <FormItem label="产品ID" prop="productId">
          <Input v-model="formValidate.productId" placeholder="请输入产品ID"></Input>
        </FormItem>
        <!-- <FormItem label="用户名" prop="userName">
          <Input v-model="formValidate.userName" placeholder="请输入用户名"></Input>
        </FormItem> -->
        <FormItem label="地址" prop="adress">
          <Input v-model="formValidate.adress" placeholder="请输入地址"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="phone">
          <Input v-model="formValidate.phone" placeholder="请输入电话"></Input>
        </FormItem>
        <FormItem label="支付方式" prop="payType">
          <!-- <Input v-model="formValidate.payType" placeholder="请选择支付方式"></Input> -->
          <Select v-model="formValidate.payType" style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="总价" prop="totalPrice">
          <Input v-model="formValidate.totalPrice" placeholder="总价" style="width:200px" number></Input>
        </FormItem>
        <FormItem label="订单状态" prop="orderState">
          <!-- <Input v-model="formValidate.orderState" placeholder="1完成0未完成"></Input> -->
          <RadioGroup v-model="formValidate.orderState">
            <Radio label="已完成"></Radio>
            <Radio label="未完成"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="创建时间" prop="createTime">
           <!-- <Input v-model="formValidate.createTime" placeholder="创建时间"></Input> -->
          <DatePicker type="date" v-model="formValidate.createTime" placeholder="Select date"></DatePicker>
        </FormItem>
        <FormItem label="备注信息" prop="noteMessage">
          <Input v-model="formValidate.noteMessage" placeholder="备注信息"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left:120px">提交</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
      <div slot="footer" style="display:none">
        我就不显示按钮
      </div>
    </Modal>

    <!-- 详细信息 -->
    <Modal v-model="modalForm2" title="详细信息">
      <Form ref="formValidate2" :model="formValidate2" :label-width="80">
        <!-- <FormItem label="用户ID" prop="userId">
          <Input v-model="formValidate2.userId" ></Input>
        </FormItem> -->
        <!-- <FormItem label="产品ID" prop="productId">
          <Input v-model="formValidate2.productId" ></Input>
        </FormItem> -->
        <FormItem label="用户名" prop="userName">
          <Input v-model="formValidate2.userName" ></Input>
        </FormItem>
        <FormItem label="地址" prop="adress">
          <Input v-model="formValidate2.adress"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="phone">
          <Input v-model="formValidate2.phone"></Input>
        </FormItem>
        <FormItem label="支付方式" prop="payType">
          <Input v-model="formValidate2.payType"></Input>
        </FormItem>
        <FormItem label="总价" prop="totalPrice">
          <Input v-model="formValidate2.totalPrice" ></Input>
        </FormItem>
        <FormItem label="订单状态" prop="orderState">
          <Input v-model="formValidate2.orderState" ></Input>
        </FormItem>
        <FormItem label="创建时间" prop="createTime">
          <Input v-model="formValidate2.createTime" ></Input>
        </FormItem>
        <FormItem label="备注信息" prop="noteMessage">
          <Input v-model="formValidate2.noteMessage" ></Input>
        </FormItem>
      </Form>

      <div slot="footer">
        <!-- 我就不显示按钮 -->
      </div>

      <Form ref="formValidate3" :model="formValidate3" :label-width="80">
        <FormItem label="用户名" prop="username">
          <Input v-model="formValidate3.username" ></Input>
        </FormItem>
        <FormItem label="用户邮箱" prop="email">
          <Input v-model="formValidate3.email" ></Input>
        </FormItem>
        <FormItem label="教育信息" prop="education">
          <Input v-model="formValidate3.education" ></Input>
        </FormItem>
      </Form>

      <Form ref="formValidate4" :model="formValidate4" :label-width="80">
        <FormItem label="产品名称" prop="name">
          <Input v-model="formValidate4.name" ></Input>
        </FormItem>
        <FormItem label="数量" prop="quantity">
          <Input v-model="formValidate4.quantity" ></Input>
        </FormItem>
        <FormItem label="单价" prop="price">
          <Input v-model="formValidate4.price" ></Input>
        </FormItem>
      </Form>

    </Modal>

  </div>

</template>
<script>
import Base from '../base/Base1';
import moment from 'moment';
export default {
  mixins: [Base],
  data() {
    return {
      data3   : [
          {
              title   : '订单',
              expand  : false,
              children: [
                  {
                      title: '已完成',
                  },
                  {
                      title: '未完成',
                  }
              ]
          }
      ],
      cityList: [
                    {
                        value: '支付宝',
                        label: '支付宝'
                    },
                    {
                        value: '微信',
                        label: '微信'
                    },
                    {
                        value: '网银',
                        label: '网银'
                    },
                    {
                        value: '现金',
                        label: '现金'
                    },
                    {
                        value: '货到付款',
                        label: '货到付款'
                    }
                ],
      formValidate: {
        //userId: '',
        // userName   : '',
        productId  : '',
        adress     : '',
        phone      : '',
        payType    : '',
        totalPrice : '',
        orderState : '',
        createTime : '',
        noteMessage: ''
      },
      formValidate2: {
        userId: '',
        // userName   : '',
        // productId  : '',
        adress     : '',
        phone      : '',
        payType    : '',
        totalPrice : '',
        orderState : '',
        createTime : '',
        noteMessage: ''
      },
      formValidate3: {
        username : '',
        email    : '',
        education: ''
      },
      formValidate4: {
        name    : '',
        quantity: '',
        price   : ''
      },
      ruleValidate: {
        productId: [
          {
            message: '请输入产品ID',
            trigger: 'blur'
          }
        ],
        // userName: [
        //   {
        //     required: true,
        //     message : '请输入用户名',
        //     trigger : 'blur'
        //   }
        // ],
        adress:[
          {
            message: '请输入地址',
            trigger: 'blur'
          }
        ],
        phone:[
          {
            message: '请输入电话',
            trigger: 'blur'
          }
        ],
        payType:[
          {
            message: '支付方式',
            trigger: 'blur'
          }
        ],
        totalPrice:[
          {
            type   : 'number',
            message: '总价',
            trigger: 'blur'
          }
        ],
        orderState:[
           {
            message: '订单状态',
            trigger: 'blur'
          }
        ],
        noteMessage:[
          {
            message: '备注信息',
            trigger: 'blur'
          }
        ]
      },
      columns: [
        {
          type : 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '用户名',
          key  : 'userName',
          width: 80,
          align: 'center'
        },
        {
          title : '订单号',
          key   : 'orderId',
          width : 220,
          align : 'center',
          render: function(h,params){
              return h('div',params.row._id);
          }
        },
        // {
        //     title: '地址',
        //     key  : 'adress',
        //     with : 100,
        //     align: 'center'
        // },
        // {
        //     title: '联系电话',
        //     key  : 'phone',
        //     width: 100,
        //     align: 'center'
        // },
        // {
        //     title: '支付方式',
        //     key  : 'payType',
        //     width: 100,
        //     align: 'center'
        // },
        // {
        //    title: '总价',
        //    key  : 'totalPrice',
        //    width: 80,
        //    align: 'center'
        // },
        {
            title: '订单状态',
            key  : 'orderState',
            width: 130,
            align: 'center'
        },
        {
            title : '创建时间',
            key   : 'createTime',
            width : 170,
            align : 'center',
            render: function(h,params){
              return h('div',moment(params.row.createTime).format('YYYY-MM-DD HH:mm'));
            }
        },
        {
            title: '备注信息',
            key  : 'noteMessage',
            width: 195,
            align: 'center'
        },
        {
          title : '操作',
          key   : 'action',
          width : 210,
          align : 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row._id);
                    }
                  }
                },
                '修改'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.detail(params.row._id,params.row.userId,params.row.productId);
                    }
                  }
                },
                '详细信息'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row._id);
                    }
                  }
                },
                '删除'
              )
            ]);
          }
        }
      ]
    };
   },
  mounted() {
    this.axios({
                    method: 'post',
                    url   : `http://localhost:3000/cate/list/3`
                }).then(res=>{
                    this.data3 = res.data
                })
  },
};
</script>
