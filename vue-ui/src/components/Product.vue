<template>
  <div>
        <Tree :data="data2"  ></Tree>
    <Button type="primary" @click="modalForm = true">添加数据</Button>
    <Button type="primary" @click="removes">删除多个</Button>
    <br><br>
    <Table border :columns="columns" :data="data" @on-selection-change="onSelect"></Table>
    <br><br>
    <Page :total="total" :page-size="rows" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" show-sizer />

    <Modal v-model="modalForm" title="数据操作" >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="产品图片" prop="pic">
          <!-- <Input v-model="formValidate.pic" ></Input> -->
         <quill-editor v-model="formValidate.pic" >
          </quill-editor>
        </FormItem>
        <FormItem label="产品名称" prop="name">
          <Input v-model="formValidate.name" ></Input>
        </FormItem>
        <FormItem label="产品数量" prop="quantity">
          <Input v-model="formValidate.quantity" ></Input>
        </FormItem>
        <FormItem label="产品价格" prop="price">
          <Input v-model="formValidate.price" ></Input>
        </FormItem>

        <FormItem label="产品大小" prop="size">
          <Input v-model="formValidate.size" ></Input>
        </FormItem>
        <FormItem label="产品状态" prop="stadus">
          <!-- <Input v-model="formValidate.stadus" ></Input> -->

            <RadioGroup v-model="formValidate.stadus">
                <Radio label="有货">有货</Radio>
                <Radio label="暂无货">暂无货</Radio>
            </RadioGroup>

        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
      </Form>
      <div slot="footer">

      </div>
    </Modal>
    <!-- 评论 -->
    <!-- <Modal v-model="modalForm1" title="产品评论" fullscreen footer-hide=false>
        <h1 slot="header" style="margin:0 auto;text-align:center">{{name}}</h1>
        <div style="background:#eee;width:1000px;margin:0 auto;padding:10px;">
              <p style="color:green;font-size:25px;margin:0 auto; ">评论人：{{issueId}}
                <span style="float:right;font-size:15px;color:green;">时间：{{pingTime}}</span>
                </p>
        <div>
          <p style="color:orange;font-size:25px;padding-top:10px;">评论内容：</p>
          <div style="width:100%;height:300px;font-size:14px;">{{pingContent}}</div>
        </div>
        <p></p>
        </div>
    </Modal> -->
    <Modal v-model="modal2" title="评论详情" @on-ok="pingOk" @on-cancel="pingCancel" width="90%">
      <Table border :columns="pingColumns" :data="pingDataList" @on-selection-change="pingSelected"></Table>
      <Button @click="pingdeletemany()" style="margin-left:47.1%; border-color:#ed4014;margin-top:20px;">批量删除</Button>
      <Page :total="pingtotal" @on-change="pingyeshu" :page-size="6" style="margin-top:20px;" />
    </Modal>
  </div>

</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import Base from '../base/Base';
import pingBase from '../base/pingBase';

// import func from './vue-temp/vue-editor-bridge';
export default {
  mixins    : [Base,pingBase],
  props     : ['time'],
  components: {
    quillEditor
  },
  data() {
    return {
        data2       : [],
        modalForm1  : false,
        module      : 'product',
        name        : '',
        formValidate: {
        name       : '',
        issueId    : '',
        pingTime   : '',
        pingContent: '',
        issueUserId: '',
        issueId    : '',
      },
      radio       : '有货',
      ruleValidate: {
        name: [
          {
            required: true,
            // message : '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      quantity: [
          {
            required: true,
            // message : '必须输入姓名',
            trigger: 'blur'
          }
        ],
      columns: [
        {
          type : 'selection',
          width: 60,
          align: 'center'
        },
        {
          title : '产品图片',
          key   : 'pic',
          width : 150,
          align : 'center',
          render: function(h,params){
                        return h('div',{
                            domProps:{
                            innerHTML: params.row.pic
                        },
                        style: {
                    marginRight: '5px',
                    width      : '100px',
                    height     : '120px',

                  }
                        });
                    }
        },

        {
          title: '产品名称',
          key  : 'name'
        },
        {
          title: '产品数量',
          key  : 'quantity'
        },
        {
          title: '产品价格',
          key  : 'price'
        },
        {
          title: '产品大小',
          key  : 'size'
        },
        {
          title: '产品状态',
          key  : 'stadus'
        },
        {
          title : '查看评论',
          key   : 'description',
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
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {

                      this.axios({
                      url   : `${this.baseUrl}/product/list`,
                      method: 'post',

                        }).then(res => {
                        // console.log(res.data);
                        this.datalist = res.data.rows;
                        this.chakan(params.index)
                      });
                    }
                  }
                },
                '查看评论'
              )
            ]);
          }
          },
        {
          title : '日期',
          key   : 'time',
          render: (h, params)=> {
            return h('div',
              // new Date(this.row.time).Format('yyyy年MM月dd日 hh:mm:ss')
               this.$moment(params.row.time).format('YYYY年MM 月DD日  A h:mm:ss  ')
              );/*这里的this.row能够获取当前行的数据*/
          }
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

  },

  mounted() {
    this.axios({
                    method: 'post',
                    url   : `${this.baseUrl}/cate/list/2`
                }).then(res=>{
                    this.data2 = res.data
                })
  },

}
</script>
<style>

</style>
