<template>
  <div>
    <Tree :data="data4"></Tree>
   
   
        <Input suffix="ios-search" placeholder="Enter something..."   style="width:auto" v-model="searchval"/>
            <Button type="primary" icon="ios-search" @click="searchAll">Search</Button>
             <!-- <span ></span> -->
            <!-- <br><br> -->
    <Table border :columns="columns" :data="data" @on-selection-change="onSelect"></Table>
    <br><br>
    <Page :total="total" :page-size="rows" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" show-sizer />

    <Modal v-model="modalForm" title="数据操作" fullscreen >
        <cartmodal :users="userID"></cartmodal>
    </Modal>

    <!-- <Modal v-model="modalForm" title="数据操作">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="username">
          <Input v-model="formValidate.username" placeholder="请输入用户名"/>
        </FormItem>
        <FormItem label="年龄" prop="age">
          <Input v-model="formValidate.age" placeholder="请输入年龄" number/>
        </FormItem>
          <FormItem label="性别" prop="sex">
          <RadioGroup v-model="formValidate.sex">
        <Radio label="true"></Radio>
        <Radio label="false"></Radio>
    </RadioGroup>
        </FormItem>
          <FormItem label="QQ" prop="QQ">
          <Input v-model="formValidate.QQ" placeholder="请输入QQ" number/>
        </FormItem>
          <FormItem label="email" prop="email">
          <Input v-model="formValidate.email" placeholder="请输入邮箱" type="email"/>
        </FormItem>
          <FormItem label="学历" prop="education">
          <select v-model="formValidate.education" placeholder="请选择学历" style="width:300px;height:30px">
         <option value="小学">小学</option>
         <option value="初中">初中</option>
         <option value="高中">高中</option>
         <option value="专科">专科</option>
         <option value="本科" selected="selected">本科</option>
         <option value="研究生">研究生</option>
         <option value="博士生">博士生</option>
         <option value="博士后">博士后</option>
          </select>
        </FormItem>
          <FormItem label="地址" prop="address">
          <Input v-model="formValidate.address" placeholder="请输入地址" type="text"/>
        </FormItem>
          <FormItem label="证件号" prop="cardId">
          <Input v-model="formValidate.cardId" placeholder="请输入身份证号" number/>
        </FormItem>
          <FormItem label="手机号" prop="phone">
          <Input v-model="formValidate.phone" placeholder="请输入手机号" number/>
        </FormItem>
          <FormItem label="爱好" prop="hobby">
          <Input v-model="formValidate.hobby" placeholder="请输入爱好" type="text"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
      </Form>
      <div slot="footer">
      </div>
    </Modal> -->
  </div>

</template>
<script>
import Base from '../base/cartbase';
import cartmodal from './cart11111';
export default {
  mixins: [Base],

  components: {
     'cartmodal': cartmodal,
  },

  data() {
    return {
      data4       : [],
         module      : 'user',
         formValidate: {
           username : '',
        age      : '',
        sex      : '',
        QQ       : '',
        email    : '',
        education: '',
        address  : '',
        cardId   : '',
        phone    : '',
        hobby    : '',
        userID: '',
      },
      ruleValidate: {
        username: [
          {
            required: true,
            message : '必须输入用户名',
            trigger : 'blur'
          }
        ],
        age: [
          {
            type    : 'number',
            required: false,
            message : '请输入年龄',
            trigger : 'blur'
          }
        ],
         sex: [
          {
            required: true,
            message : '请输入性别',
            trigger : 'blur'
          }
        ],
         QQ: [
          {
            type    : 'number',
            required: false,
            message : '请输入QQ',
            trigger : 'blur'
          }
        ],
         email: [
          {
            required: false,
            message : '请输入email',
            trigger : 'blur'
          }
        ],
         education: [
          {
            required: true,
            message : '请输入education',
            trigger : 'blur'
          }
        ],
         address: [
          {
            required: true,
            message : '请输入地址',
            trigger : 'blur'
          }
        ],
         cardId: [
          {
            type    : 'number',
            required: true,
            message : '请输入证件号',
            trigger : 'blur'
          }
        ],
         phone: [
          {
            type    : 'number',
            required: true,
            message : '请输入手机号',
            trigger : 'blur'
          }
        ],
         hobby: [
          {
            required: false,
            message : '请输入爱好',
            trigger : 'blur'
          }
        ],
      },
      columns: [
        {
          type : 'selection',
          width: 80,
          align: 'center'
        },
        {
          title: '用户名',
          key  : 'username'
        },
        {
          title: '年龄',
          key  : 'age'
        },
        {
          title : '性别',
          key   : 'sex',
          render: function(h,obj){
            var sex = obj.row.sex;
            var txt = '';
            if (sex) {
              txt = '男';
            }else{
              txt = '女';
            }
            return h('div',[h('span',txt)]);
          }
        },
        {
          title: 'QQ',
          key  : 'QQ'
        },
        {
          title: 'email',
          key  : 'email'
        },
        {
          title: '学历',
          key  : 'education'
        },
        {
          title: '地址',
          key  : 'address'
        },
        {
          title: '证件号',
          key  : 'cardId'
        },
        {
          title: '手机号',
          key  : 'phone'
        },
        {
          title: '爱好',
          key  : 'hobby'
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
                      console.log(params.row._id);
                      this.userID=params.row._id;
                      console.log(this.userID);
                      this.findcart(params.row._id);
                      this.getData();
                    }
                  }
                },
                '查看购物车'
              ),
              
            ]);
          }
        }
      ]
    };
  },
  mounted() {
     this.axios({
            method: 'post',
            url   : `${this.baseUrl}/cate/list/4`
        }).then(res => {
            this.data4 = res.data


        })
  },
};
</script>
