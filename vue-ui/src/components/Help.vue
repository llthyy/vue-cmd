<template>
    <div>
        <Divider orientation="left">常见问题</Divider>
        <Collapse v-model="value" accordion>
            <Panel v-for="(data,i) in datas" :key="i">
                {{data.question}}
                <Button type="error" style="float:right;margin-top:3px;margin-right:3px;" @click.stop="delet(i)">删除</Button>
                <Button type="warning" style="float:right;margin-top:3px;margin-right:3px;" @click.stop="changeText(i)">修改</Button>
                <p slot="content" v-html='data.answers'>
                  <Button type="info">回复</Button>
                </p>
            </Panel>
        </Collapse>
        <br><br>
        <Page :total="100" show-sizer :page-size-opts="[10,15,20]" @on-change="pageChange" @on-page-size-change="sizeChange" />
        <br><br>
        <Button type="info" @click="addQuestion">增加</Button>
        <Modal v-model="modal" title="添加问题" @on-ok="ok" @on-cancel="cancel" fullscreen>
            <label>
                <h2>标题：</h2>
            </label>
            <Input v-model="questionTitle" placeholder="questionTitle" />
            <h2>内容：</h2>
            <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
            </quill-editor>
            <!-- <div ref="editor" style="text-align:left">
                <p>{{editorContent}}</p>
            </div> -->
        </Modal>

    </div>

</template>

<script>
//  import E from 'wangeditor'
export default {
  // name: 'editor',
  data() {
    return {
        qId           : '',
        value         : '1',
        datas         : [],
        modal         : false,
        questionTitle : '',
        answersContent: '',
        editorContent : '',
        type          : 1,
        content       : '',
        editorOption  : {
        // some quill options
      }
    };
  },
  methods: {
    addQuestion(){
        this.modal         = true
        this.type          = 1
        this.questionTitle = ''
    },
    onEditorBlur(quill) {
    //   console.log('editor blur!', quill);
    },
    onEditorFocus(quill) {
    //   console.log('editor focus!', quill);
    },
    onEditorReady(quill) {
    //   console.log('editor ready!', quill);
    },
    onEditorChange({ quill, html, text }) {
    //   console.log('editor change!', quill, html, text);
      this.content = html;
    },
    pageChange(i) {
      this.axios({
        method: 'post',
        url   : 'http://10.31.162.51:3000/help/list',
        data  : {
          page: i
        }
      }).then(response => {
        var result     = response.data.rows;
            this.datas = [];
        for (let i = 0; i < result.length; i++) {
          this.datas.push(result[i]);
        }
      });
    },
    sizeChange(i) {
      this.axios({
        method: 'post',
        url   : 'http://10.31.162.51:3000/help/list',
        data  : {
          rows: i
        }
      }).then(response => {
        var result     = response.data.rows;
            this.datas = [];
        for (let i = 0; i < result.length; i++) {
          this.datas.push(result[i]);
        }
      });
    },
    delet(i) {
      console.log(this.datas[i]._id);
      this.axios({
        method: 'delete',
        url   : `http://10.31.162.51:3000/help/data/${this.datas[i]._id}`
      }).then(response => {
        this.sizeChange();
        this.$Message.info('Delete Success');
      });
    },
    ok() {
        if(this.type){
             this.axios({
        method: 'post',
        url   : `http://10.31.162.51:3000/help/data`,
        data  : {
          question: this.questionTitle,
          answers : this.content
        }
      })
        .then(response => {
          console.log(response);
          this.content = ""
          this.sizeChange();
          this.$Message.info('Success');
        })
        .catch(err => {
          this.content = ""
          console.log(err);
          this.$Message.info('Something Err');
        });
        }else{
             this.axios({
        method: 'put',
        url   : `http://10.31.162.51:3000/help/data/${this.qId}`,
        data  : {
          question: this.questionTitle,
          answers : this.content
        }
      })
        .then(response => {
          console.log(response);
          this.content = ""
          this.sizeChange();
          this.$Message.info('Success');
        })
        .catch(err => {
          this.content = ""
          console.log(err);
          this.$Message.info('Something Err');
        });
        }

    },
    cancel() {
        this.content = ""
        this.$Message.info('Cancel');
    },
    changeText(i) {
        this.type          = 0,
        this.qId           = this.datas[i]._id
        this.modal         = true;
        this.questionTitle = this.datas[i].question;
        this.content       = this.datas[i].answers;
    },
    getList(){
        this.axios({
      method: 'post',
      url   : `http://10.31.162.51:3000/help/list`
    }).then(response => {
      var result = response.data.rows;
      for (let i = 0; i < result.length; i++) {
        this.datas.push(result[i]);
      }
    });
    }
  },
  mounted() {
    // let editor = new E(this.$refs.editor)
        this.getList()
    // editor.customConfig.onchange = (html) => {
    //   this.editorContent = html
    // }
    // editor.create()
  }
  // watch:{
  //     editorContent:function (val) {
  //         if(val!==this.editorContent){
  //             this.editorContent = this.editorContent
  //         }
  //      }
  // }
};
</script>

<style>
</style>
