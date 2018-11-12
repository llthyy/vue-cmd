

<template>
    <div>
        <Button type="primary" @click="modalForm = true;">添加数据</Button>
        <Button type="primary" @click="removes">删除多个</Button>
          <Tree :data="treeData" @on-select-change="getID"></Tree>
        <Table border :columns="columns" :data="data" @on-selection-change="onSelect" highlight-row @on-current-change="onCurrent"></Table>
        <Page :total="total" :page-size="rows" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" show-sizer />

        <Modal v-model="modalForm" title="数据操作">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="标题" prop="newsTitle">
                    <Input v-model="formValidate.newsTitle" placeholder="请输入标题"></Input>
                </FormItem>
                <FormItem label="内容" prop="newsContent">

                    <quill-editor v-model="formValidate.newsContent"
                                    ref    = "myQuillEditor"
                                  :options = "editorOption">
                    </quill-editor>
                </FormItem>
                <FormItem label="来源" prop="newsSource">
                    <Input v-model="formValidate.newsSource" placeholder="请输入来源"></Input>
                </FormItem>
                <FormItem label="新闻作者" prop="newsAuthor">
                    <Input v-model="formValidate.newsAuthor" placeholder="请输入作者"></Input>
                </FormItem>
                <FormItem label="新闻分类" prop="cateName">
                      <Select  v-model="formValidate.cateName"  style="width:200px" >
                          <Option value='社会新闻'>社会新闻</Option>
                          <Option value='财经新闻'>财经新闻</Option>
                          <Option value='金融新闻'>金融新闻</Option>
                          <Option value='汽车新闻'>汽车新闻</Option>
                          <Option value='娱乐新闻'>娱乐新闻</Option>
                          <Option value='体育新闻'>体育新闻</Option>
                          <Option value='即时新闻'>即时新闻</Option>
                          <Option value='中心世界观'>中心世界观</Option>
                          <Option value='国际人物'>国际人物</Option>
                          <Option value='奇趣八卦'>奇趣八卦</Option>
                          <Option value='科技自然'>科技自然</Option>
                          <Option value='资料库'>资料库</Option>
                      </Select>
                </FormItem>
                 <FormItem label="是否热点" prop="isHot">
                      <RadioGroup v-model="formValidate.isHot">
                        <Radio label='是'>热点</Radio>
                        <Radio label='否'>普通</Radio>
                    </RadioGroup>
                </FormItem>
                 <FormItem label="是否置顶" prop="isTop">
                    <RadioGroup v-model="formValidate.isTop" >
                        <Radio label='是'>置顶</Radio>
                        <Radio label='否'>普通</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click=" handleSubmit('formValidate')" >Submit</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
            <div slot="footer">
                我就不显示按钮
            </div>
        </Modal>
         <Modal v-model="modalMain"  fullscreen title="查看">

          <div v-if="flag" v-html="newsCont"></div>
          <p v-else-if="!flag">

               <ul>
                 <li v-for="(val,index) in newsComment " :key="index"><h2>{{index+1}}:{{val.pingContent}}</h2></li>
               </ul>
          </p>
         </Modal>
    </div>

</template>
<script>
import Base from '../base/newsBase';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  mixins: [Base],
  data() {
    return {
      module      : 'news',
      treeData    : [],
      modal       : false,
      treeID      : '',
      treeTitle   : "",
      type        : 1,
      treeContent : "",
      parent      : null,
      path        : "",
      modalMain: false,
      flag:true,
      newsCont:'',
      newsComment:'',
      editorOption: {

            },
      formValidate: {
        newsTitle  : '',
        newsContent: '',
        newsSource : '',
        newsAuthor : '',
        newsDate   : '',
        isHot      : '',
        isTop      : '',
        cateName:''
      },
      ruleValidate:{
       newsTitle: [
          {
            required: true,
            message : '必须输入标题',
            trigger : 'blur'
          }
        ],
       newsContent: [
          {
            required: true,
            message : '必须输入内容',
            trigger : 'blur',
            fixed:'left'
          }
        ],
       newsSource: [
          {
            required: true,
            message : '必须输入来源',
            trigger : 'blur'
          }
        ],
       newsAuthor: [
          {
            required: true,
            message : '必须输入作者',
            trigger : 'blur'
          }
        ]
      },
      columns: [
        {
          type : 'selection',
          width: 50,
          align: 'right'
        },
        {
          title: '新闻ID',
          width: 150,
          key  : '_id'
        },

        {
           title: '分类名称',
           width: 100,
           key  : 'cateName'
        },

        {
           title: '标题',
           width: 150,
           key  : 'newsTitle',

        },
        {
           title: '来源',
           width: 100,
           key  : 'newsSource'
        },
        {
           title: '发布者',
           width: 100,
           key  : 'newsAuthor'
        },
        {
           title: '发布时间',
           width: 120,
           key  : 'newsDate'
        },
        {
           title: '是否热点',
           width: 100,
           key  : 'isHot'
        },
        {
           title: '是否置顶',
           width: 100,
           key  : 'isTop'
        },
        {
          title : '操作',
          key   : 'action',
          width :300,
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
                      // console.log(params.row)
                      this.edit(params.row._id);
                    }
                  }
                },
                '修 改'
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
                '删 除'
              ),
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
                      this.flag=true;
                      this.modalMain=true;
                    }
                  }
                },
                '查看内容'
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
                        this.flag=false;
                        this.modalMain=true;
                       this.axios({
                      url   : `${this.baseUrl}/ping/list/`,
                      method: 'post',
              }).then(res=>{
                console.log('----------->', this.newsComment)
                      this.newsComment=res.data.rows;
              });

                    }
                  }
                },
                '查看评论'
              )
            ]);
          },

        }
      ]
    }
  },
  methods:{
        onCurrent(cur){
          this.newsCont=cur.newsContent;
        },
        getDate(){

            this.formValidate.newsDate =moment().subtract(10, 'days').calendar();
            this.modalForm             = false;

        },
        getDatas(type){
                this.type = type;
                this.axios({
                    method: 'post',
                    url   : `${this.baseUrl}/cate/list/${this.type}`
                }).then(res=>{
                    this.treeData = res.data;
                })
            },
        getID(node){

               this.axios({
                url   : `${this.baseUrl}/news/list/`,
                method: 'post',
                data  : {
                    child:node[0].children,
                    cateName:node[0].title
                }
              }).then(res=>{


                this.data = res.data.rows;
                //  this.formValidate.cateName=node[0].title;
              });

        },
        getContent(){
          return  this.formValidate.newsContent;
        }

  },
  mounted() {
    this.getDatas(1)

  },
  components: {
    quillEditor
  }

};

</script>

　