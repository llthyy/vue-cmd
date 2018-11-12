<template>
    <div>
        <Button type="info" @click="getDatas(1)">新闻分类</Button>
        <Button type="info" @click="getDatas(2)">产品分类</Button>
        <Button type="info" @click="getDatas(3)">订单分类</Button>
        <Button type="info" @click="getDatas(4)">用户分类</Button>
        <Button type="info" @click="getDatas(5)">评论分类</Button>
        <Tree :data="data"  @on-select-change="getID"></Tree>
        <Button type="warning" @click="addRoot">添加分类</Button>
        <Button type="warning" @click="addTree">添加子类</Button>
        <Button type="info" @click="changeTree">修改</Button>
        <Button type="error"  @click="confirm">删除</Button>
         <Modal
        v-model    = "modal"
        title      = "添加分类"
        @on-ok     = "ok"
        @on-cancel = "cancel">

        <!-- <p> <label for="">父类</label>
        <Input v-model="treeTitle" placeholder="Enter something..." style="width: 300px" disabled/></p> -->
        <p> <label for=""><span style="color:red">*</span> 标题</label>
        <Input v-model="treeContent" placeholder="Enter something..." style="width: 300px" /></p>
    </Modal>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                type       : "",
                data       : [],
                modal      : false,
                treeID     : '',
                treeTitle  : "",
                treeContent: "",
                parent     : null,
                path       : "",
                sendType   : null
            }
        },
        methods:{
            confirm () {
                this.$Modal.confirm({
                    title  : '确认删除？',
                    content: '<p>数据删除后将不可恢复</p>',
                    onOk   : () => {
                        console.log(this.treeID)
                        // this.axios({
                        //     method: "delete",
                        //     url   : `${this.baseUrl}/cate/data/${this.treeID}`
                        // }).then(res=>{
                        // this.getDatas(this.type)
                        // this.$Message.info('删除成功');
                        // })
                        this.axios({
                            method: "delete",
                            url   : `${this.baseUrl}/cate/rem/${this.treeID}`,
                        }).then(res=>{
                            console.log(res)
                        this.getDatas(this.type)
                        this.$Message.info('删除成功');
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('取消删除');
                    }
                });
            },
            addRoot(){
                this.modal    = true
                this.sendType = 1
            },
            addTree(){
                 this.modal    = true
                 this.sendType = 2
            },
            changeTree(){
                this.modal    = true
                this.sendType = 3
            },
            getDatas(type){
                this.type = type
                this.axios({
                    method: 'post',
                    url   : `${this.baseUrl}/cate/list/${this.type}`
                }).then(res=>{
                    this.data = res.data
                    console.log(res.data)
                })
            },
            getID(data){
                this.treeID    = data[0]._id
                this.treeTitle = data[0].title
                this.parent    = data[0].parentId
                console.log(this.treeID)

            },
             ok () {
                    if(this.sendType===1){
                          this.axios({
                        method: "post",
                        url   : `${this.baseUrl}/cate/data`,
                        data  : {
                            title: this.treeContent,
                            type : this.type,
                            }
                        }).then(res=>{
                                this.getDatas(this.type)
                                 this.treeContent = ""
                                console.log(1)
                            })
                    }else if(this.sendType===2){
                         this.axios({
                            method: "post",
                            url   : `${this.baseUrl}/cate/data`,
                            data  : {
                                title   : this.treeContent,
                                parentId: this.treeID,
                                type    : this.type,
                                }
                            }).then(res=>{
                                this.getDatas(this.type)
                                 this.treeContent = ""
                                console.log(2)
                            })
                    }else{
                        this.axios({
                            method: "put",
                            url   : `${this.baseUrl}/cate/data/${this.treeID}`,
                            data  : {
                                title: this.treeContent,
                                type : this.type,
                                }
                            }).then(res=>{
                                console.log(3)
                                this.getDatas(this.type)
                                 this.treeContent = ""
                            })
                    }


                this.$Message.info('Success');
            },
            cancel () {
                this.$Message.info('Cancel');
            }
        },
        mounted() {

            this.getDatas(1)
        },

    }
</script>

<style>

</style>
