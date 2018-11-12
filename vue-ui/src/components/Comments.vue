<template>
  <div>
    <Tree :data="data" @on-select-change="getID"></Tree>
    <Table border :columns="columns7" :data="datalist" @on-selection-change="issueSelected"></Table>

    <!-- 修改所有论点的模态框 -->
    <Modal v-model="modal1" title="Common Modal dialog box title" @on-ok="ok()" @on-cancel="cancel">
      <Form :label-width="80">
        <FormItem label="论点">
          <Input type="text" v-model="title"></Input>
        </FormItem>
        <FormItem label="发布时间">
          <Input type="text" v-model="isuTime" disabled></Input>
        </FormItem>
        <FormItem label="发布者">
          <Input type="text" v-model="isuUser" disabled></Input>
        </FormItem>
        <FormItem label="阅读数量">
          <Input type="text" v-model="isuRead"></Input>
        </FormItem>
        <FormItem label="评论数量">
          <Input type="text" v-model="isuComment"></Input>
        </FormItem>
        <FormItem label="板块" v-model="isuType">

          <Select v-model="isuType">
            <Option value="热点">热点</Option>
            <Option value="体验">体验</Option>
            <Option value="健康">健康</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>

    <!-- 显示相关评论数据的模态框 -->
    <Modal v-model="modal2" title="评论详情" @on-ok="pingOk" @on-cancel="pingCancel" width="90%">
      <Table border :columns="pingColumns" :data="pingDataList" @on-selection-change="pingSelected"></Table>
      <Button @click="pingdeletemany()" style="margin-left:47.1%; border-color:#ed4014;margin-top:20px;">批量删除</Button>
      <Page :total="pingtotal" @on-change="pingyeshu" :page-size="6" style="margin-top:20px;" />
    </Modal>

    <!-- 批量删除 -->
    <Button @click="deletemany()" style="margin-left:40%; border-color:#ed4014;margin-top:20px;">批量删除</Button>
    <Page :total="total" @on-change="yeshu" style="margin-top:20px;" />
  </div>

</template>
<script>
//评论模块的点评列表
import pingLun from '../base/pingBase.js';

export default {
  mixins: [pingLun],
  data() {
    return {
      data: [],

      //论点的数据表
      columns7: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '论点/标题',
          key: 'issueTitle'
        },
        {
          title: '发布时间',
          key: 'issueTime'
        },
        {
          title: '发布者',
          key: 'issueUserId'
        },
        {
          title: '阅读数量',
          key: 'issueRead'
        },
        {
          title: '评论数量',
          key: 'issueComment'
        },
        {
          title: '板块',
          key: 'issueType'
        },
        {
          title: '查看',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.chakan(params.index);
                    }
                  }
                },
                '查看评论'
              )
            ]);
          }
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
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
                      this.changeList(params.index);
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
                      this.remove(params.index);
                    }
                  }
                },
                '删除'
              )
            ]);
          }
        }
      ],
      //从数据库抓取的贴列表
      datalist: [],
      //从数据库抓取某一贴的全部评论

      // 当前路径
      path: 'comments',

      //贴列表数据
      title: '',
      isuTime: '',
      isuUser: '',
      isuRead: '',
      isuComment: '',
      isuType: '',

      //下标和对话框状态
      num: 1,
      modal1: false,

      //分页设置
      total: 0,
      page: 1,

      //分类树
      typeTitle: '',

      //table中的选中项
      checked: [],
      checkedId: []
    };
  },
  methods: {
    //tree 筛选
    getID(index) {
      // console.log(index[0]);
      // console.log(index[0].title);
      if (index[0].title == '评论') {
        // alert('全部');
        this.typeTitle = null;
        this.axios({
          method: 'post',
          url: `${this.baseUrl}/comment/list`
        })
          .then(res => {
            var result = res.data.rows;
            this.pages = res.data.pages;
            this.total = res.data.total;
            // console.log(res.data);
            this.datalist = [];
            for (let i = 0; i < result.length; i++) {
              this.datalist.push(result[i]);
              // console.log(result[i]._id);
            }
            // console.log(result);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // alert(index[0].title);
        this.typeTitle = index[0].title;
        this.axios({
          method: 'post',
          url: `${this.baseUrl}/comment/list`,
          data: { issueType: index[0].title }
        })
          .then(res => {
            var result = res.data.rows;
            this.pages = res.data.pages;
            this.total = res.data.total;
            // console.log(res.data);
            this.datalist = [];
            for (let i = 0; i < result.length; i++) {
              this.datalist.push(result[i]);
              // console.log(result[i]._id);
            }
            // console.log(result);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    //批量选中
    issueSelected(sss) {
      this.cheched = sss;
      console.log(sss);
    },
    //批量删除
    deletemany() {
      this.checkedId = [];
      this.cheched.forEach(el => {
        this.checkedId.push(el._id);
      });
      console.log(this.checkedId);
      var sure = confirm('确定删除选中项吗？');
      if (sure) {
        this.axios({
          method: 'post',
          url: `${this.baseUrl}/comment/data/removes`,
          data: { ids: this.checkedId }
        });
        console.log(this.page);
        this.axios({
          method: 'post',
          url: `${this.baseUrl}/comment/list`,
          data: {
            page: this.page,
            issueType: this.typeTitle
          }
        })
          .then(res => {
            var result = res.data.rows;
            this.pages = res.data.pages;
            this.total = res.data.total;
            console.log(res.data);
            this.datalist = [];
            for (let i = 0; i < result.length; i++) {
              this.datalist.push(result[i]);
            }

            this.axios({
              method: 'post',
              url: `${this.baseUrl}/ping/objRemoves`,
              data: {
                ids: this.checkedId
              }
            })
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
      // this.checkedId.forEach(el => {
      //   this.remove(el);
      // });
      // this.remove();
      // console.log("删除成功");
    },
    //页面加载操作
    yeshu(page) {
      this.page = page;
      console.log(page);
      this.axios({
        method: 'post',
        url: `${this.baseUrl}/comment/list`,
        data: {
          page,
          issueType: this.typeTitle
        }
      })
        .then(res => {
          var result = res.data.rows;
          this.pages = res.data.pages;
          this.total = res.data.total;
          console.log(res.data);
          this.datalist = [];
          // var idlist=[];
          for (let i = 0; i < result.length; i++) {
            this.datalist.push(result[i]);
            // console.log(result[i]._id);
            // idlist.push(result[i]._id);
          }
          // console.log(idlist);
          // console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改操作
    changeList(index) {
      this.title = this.datalist[index].issueTitle;
      this.isuTime = this.datalist[index].issueTime;
      this.isuUser = this.datalist[index].issueUserId;
      this.isuRead = this.datalist[index].issueRead;
      this.isuComment = this.datalist[index].issueComment;
      this.isuType = this.datalist[index].issueType;
      this.modal1 = true;
      this.num = index;
      console.log(this.datalist[index]);
    },
    ok() {
      var num = this.num;
      this.datalist[num].issueTitle = this.title;

      this.datalist[num].issueRead = this.isuRead;
      this.datalist[num].issueComment = this.isuComment;
      this.datalist[num].issueType = this.isuType;
      // console.log(num);
      console.log(this.datalist[num]);
      this.axios({
        method: 'put',
        url: `${this.baseUrl}/comment/data/${this.datalist[num]._id}`,
        data: this.datalist[num]
      })
        .then(res => {
          console.log(res.data.msg);
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel() {
      // this.$Message.info('Clicked cancel');
    },

    //删除操作
    remove(index) {
      var sure = confirm('确定删除吗?');
      var nowdata = this.datalist[index];
      // var nowpage=this.page
      // console.log(sure);
      if (sure) {
        this.datalist.splice(index, 1);
        this.axios({
          method: 'delete',
          url: `${this.baseUrl}/comment/data/${nowdata._id}`,
          data: nowdata
        }).then(res => {
          console.log('删除成功');
          // console.log(res.data);
          // console.log(nowdata);
          this.axios({
            method: 'post',
            url: `${this.baseUrl}/ping/objRemoves`,
            data: {
              ids: [nowdata._id]
            }
          })
            .then(res => {
              console.log(res.data);
              alert('同时删除了相关评论');
            })
            .catch(err => {
              console.log(err);
            });
        });
      }
    }
  },
  mounted() {
    this.axios({
      method: 'post',
      url: `${this.baseUrl}/cate/list/5`
    }).then(res => {
      this.data = res.data;
      // console.log(res.data);
    });
    this.axios({
      method: 'post',
      url: `${this.baseUrl}/comment/list`
    })
      .then(res => {
        var result = res.data.rows;
        this.pages = res.data.pages;
        this.total = res.data.total;
        // console.log(res.data);
        for (let i = 0; i < result.length; i++) {
          this.datalist.push(result[i]);
          // console.log(result[i]._id);
        }
        // console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

