export default {
    data() {
        return {
            module    : 'order',
            data      : [],
            total     : 0,
            page      : 1,
            rows      : 5,
            modalForm : false,
            modalForm2: false,
            ids       : [],
            searchBox : ''
        };
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    if (this.formValidate._id) {
                        this.axios({
                            url: `${this.baseUrl}/${this.module}/data/${
                this.formValidate._id
              }`,
                            method: 'put',
                            data  : this.formValidate
                        }).then(res => {
                            this.formValidate = {};
                            this.modalForm    = false;
                            this.getData();
                        });
                    } else {
                        this.axios({
                            url   : `${this.baseUrl}/${this.module}/data`,
                            method: 'post',
                            data  : this.formValidate
                        }).then(res => {
                            this.modalForm = false;
                            this.getData();
                        });
                    }
                } else {
                    this.$Message.error('Fail!');
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        edit(id) {
            // 请示数据，打开对话框，显示表单的数据，进行提交
            this.axios({
                url   : `${this.baseUrl}/${this.module}/data/${id}`,
                method: 'get'
            }).then(res => {
                this.formValidate = res.data;
                this.modalForm    = true;
            });
        },
        detail(id,userId,productId){
            //console.log(id,'----',userId,'---',productId);
            this.axios({
                url   : `${this.baseUrl}/${this.module}/data/${id}`,
                method: 'get'
            }).then(res => {
                this.formValidate2 = res.data;
                //this.modalForm2    = true;
            });
            this.axios({
                url   : `${this.baseUrl}/user/data/${userId}`,
                method: 'get'
            }).then(res=>{
                this.formValidate3 = res.data;
                //this.modalForm2    = true;
            });
            this.axios({
                url   : `${this.baseUrl}/product/data/${productId}`,
                method: 'get'
            }).then(res=>{
                this.formValidate4 = res.data;
                this.modalForm2    = true;
            });
        },
        remove(id) {
            this.$Modal.confirm({
                title  : '确认操作',
                content: '<p>你确认删除该记录吗?</p>',
                onOk   : () => {
                    this.axios({
                        url   : `${this.baseUrl}/${this.module}/data/${id}`,
                        method: 'delete'
                    }).then(res => {
                        this.getData();
                    });
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel');
                }
            });
        },
        getData() {
            this.axios({
                url   : `${this.baseUrl}/${this.module}/list`,
                method: 'post',
                data  : {
                    page: this.page,
                    rows: this.rows
                }
            }).then(res => {
                this.total = res.data.total;
                this.data  = res.data.rows;
            });
        },
        getOrderState(node){
            console.log(node);
            //console.log(this.rows);
            //console.log(this.getOrderState);
            this.axios({
                url   : `${this.baseUrl}/${this.module}/list`,
                method: 'post',
                data  : {
                    orderState: node[0].title,
                    page      : 1,
                    rows      : this.rows
                }
            }).then(res=>{
                this.total = res.data.total;
                this.data  = res.data.rows;
            })
        },
        onSearch() {
            this.axios({
                url   : `${this.baseUrl}/${this.module}/list`,
                method: 'post',
                data  : {
                    userName: this.searchBox,
                    page    : 1,
                    rows    : this.rows
                }
            }).then(res => {
                this.total = res.data.total;
                this.data  = res.data.rows;
            });
        },
        onChangePage(page) {
            this.page = page;
            if (this.searchBox) {
                this.onSearch();
            } else {
                this.getData();
            }
            // if(this.getOrderState){
            //     this.getOrderState();
            // }
            //this.page = page;
            //this.getData();
        },
        onPageSizeChange(rows) {
            this.rows = rows;
            if (this.searchBox) {
                this.onSearch();
            } else {
                this.getData();
            }
            // if(this.getOrderState){
            //     this.getOrderState();
            // }
            //this.rows = rows;
            //this.getData();
        },
        onSelect(selections) {
            var ids = [];
            for (let i = 0; i < selections.length; i++) {
                ids.push(selections[i]._id);
            }
            this.ids = ids.toString();
            console.log(ids);
        },
        removes() {
            this.$Modal.confirm({
                title  : '确认操作',
                content: '<p>你确认删除该记录吗?</p>',
                onOk   : () => {
                    this.axios({
                        url   : `${this.baseUrl}/${this.module}/data/removes`,
                        method: 'post',
                        data  : {
                            ids: this.ids
                        }
                    }).then(res => {
                        this.getData();
                    });
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel');
                }
            });
        }
    },
    mounted() {
        this.getData();
    }
};