<template>
  <div>
   <!--  <Button type="primary" @click="allData">列表展示{{users}}</Button> -->
    <Button type="primary" @click="addData()">添加数据</Button>
    <Button type="primary" @click="removes">删除多个</Button>
    <Input suffix="ios-search" placeholder="Enter something..." style="width:auto" v-model="searchval" />
    <Button type="primary" icon="ios-search" @click="searchAll">Search</Button>
    <Table border :columns="columns" :data="data" @on-selection-change="onSelect"></Table>
    <Page :total="total" :page-size="rows" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" show-sizer />

    <Modal v-model="modalForm" title="数据操作">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="商品编号" prop="goodsID">
          <Input v-model="formValidate.goodsID" placeholder="请输入商品编号" number />
        </FormItem>
        <FormItem label="商品名称" prop="goodsName">
          <Input v-model="formValidate.goodsName" placeholder="输入商品名称" />
        </FormItem>

        <FormItem label="商品数量" prop="number">
          <Input v-model="formValidate.number" placeholder="请输入商品数量" number />
        </FormItem>
        <FormItem label="商品属性" prop="attr">
          <Input v-model="formValidate.attr" placeholder="请描述商品属性" />
        </FormItem>
        <FormItem label="商品单价" prop="price">
          <Input v-model="formValidate.price" placeholder="请输入商品单价" number />
        </FormItem>
        <FormItem label="商品总价" prop="totalPrice">
          <Input v-model="formValidate.totalPrice" placeholder="请计算商品总价" number/>
        </FormItem>
        <FormItem label="够买日期" prop="date">
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="Select date and time(Excluding seconds)" v-model="formValidate.date"  style="width: 300px"></DatePicker>

        </FormItem>
        <FormItem label="店铺名称" prop="shop">
          <Input v-model="formValidate.shop" placeholder="请输入店铺" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
      </Form>
      <div slot="footer">
        我就不显示按钮
      </div>
    </Modal>
  </div>

</template>
<script>
import Base from '../base/cartbase2';
export default {
  props:['users'],
  mixins: [Base],
  data() {
    return {
      formValidate: {
        userID:'',
        goodsID   : '',
        goodsName : '',
        number    : '',
        attr      : '',
        price     : '',
        totalPrice: '',
        date      : '',
        shop      : ''
      },
      ruleValidate: {
        goodsID: [
          {
            type    : 'number',
            required: true,
            message : '请输入商品编号',
            trigger : 'blur'
          }
        ],
        goodsName: [
          {
            required: true,
            message : '请输入商品名称',
            trigger : 'blur'
          }
        ],
        number: [
          {
            type    : 'number',
            required: true,
            message : '请输入商品数量',
            trigger : 'blur'
          }
        ],
        attr: [
          {
            required: false,
            message : '请描述商品属性',
            trigger : 'blur'
          }
        ],
        price: [
          {
            type    : 'number',
            required: true,
            message : '请输入商品单价',
            trigger : 'blur'
          }
        ],
        totalPrice: [
          {
            type    : 'number',
            required: true,
            message : '请计算商品总价',
            trigger : 'blur'
          }
        ],
        date: [
          {
            required: false,
            message : '请选择日期'
          }
        ],
        shop: [
          {
            required: true,
            message : '请输入店铺名称',
            trigger : 'blur'
          }
        ]
      },
      columns: [
        {
          type : 'selection',
          width: 80,
          align: 'center'
        },
        {
          title   : '商品编号',
          key     : 'goodsID',
        },
        {
          title: '商品名称',
          key  : 'goodsName',
        },
        {
          title: '商品数量',
          key  : 'number'
        },
        {
          title: '商品属性',
          key  : 'attr'
        },
        {
          title: '商品单价',
          key  : 'price'
        },
        {
          title: '商品总价',
          key  : 'totalPrice'
        },
        {
          title: '商品日期',
          key  : 'date'
        },
        {
          title: '店铺名称',
          key  : 'shop'
        },
        {
          title : '操作',
          key   : 'action',
          width : 150,
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
  methods:{
    addData(){
      this.formValidate.userID=this.users;
      modalForm = true
    }
  },
  mounted() {
        // console.log(users);
        this.findcart(this.users);
    }


};
</script>
