export default {
    data() {
        return {
            module: 'user',
            data: [],
            total: 0,
            page: 1,
            rows: 5,
            modalForm: false,
            ids: [],
            searchval: ''
        };
    },
    methods: {
        handleSubmit(username) {
            this.$refs[username].validate(valid => {
                if (valid) {
                    if (this.formValidate._id) {
                        this.axios({
                            url: `http://localhost:3000/${this.module}/data/${
                this.formValidate._id
              }`,
                            method: 'put',
                            data: this.formValidate
                        }).then(res => {
                            this.getData();
                            this.$data.formValidate = this.$options.data().formValidate;
                            this.modalForm = false;
                        });
                    } else {
                        this.axios({
                            url: `http://localhost:3000/${this.module}/data`,
                            method: 'post',
                            data: this.formValidate
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
        handleReset(username) {
            this.$refs[username].resetFields();
        },
        edit(id) {
            // 请示数据，打开对话框，显示表单的数据，进行提交
            this.axios({
                url: `http://localhost:3000/${this.module}/data/${id}`,
                method: 'get'
            }).then(res => {
                this.formValidate = res.data;
                this.modalForm = true;
            });
        },
        remove(id) {
            this.$Modal.confirm({
                title: '确认操作',
                content: '<p>你确认删除该记录吗?</p>',
                onOk: () => {
                    this.axios({
                        url: `http://localhost:3000/${this.module}/data/${id}`,
                        method: 'delete'
                    }).then(res => {
                        this.getData();
                    });
                    //同时删除这条数据的所有评论
                    var ids = id.split(",");
                    // console.log(ids)
                    this.axios({
                        url: `${this.baseUrl}/ping/objRemoves`,
                        method: 'post',
                        data: {
                            ids: ids
                        }
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
                url: `http://localhost:3000/${this.module}/list`,
                method: 'post',
                data: {
                    page: this.page,
                    rows: this.rows
                }
            }).then(res => {
                this.total = res.data.total;
                this.data = res.data.rows;
            });
        },
        allData() {
            this.axios({
                url: `http://localhost:3000/${this.module}/list`,
                method: 'post',
                data: {
                    page: this.page,
                    rows: this.rows
                }
            }).then(res => {
                this.total = res.data.total;
                this.data = res.data.rows;
            });
        },
        onChangePage(page) {
            this.page = page;
            if (this.searchval) {
                this.searchAll();
            }
            // else if (this.getId) {
            //   this.getId();
            // }
            else {
                this.getData();
            }
        },
        onPageSizeChange(rows) {
            this.rows = rows;
            if (this.searchval) {
                this.searchAll();
            }
            // else if (this.getId) {
            //   this.getId();
            // }
            else {
                this.getData();
            }
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
                title: '确认操作',
                content: '<p>你确认删除该记录吗?</p>',
                onOk: () => {
                    this.axios({
                        url: `http://localhost:3000/${this.module}/data/removes`,
                        method: 'post',
                        data: {
                            ids: this.ids
                        }
                    }).then(res => {
                        this.getData();
                    });
                    //删除所选的产品的所有评论
                    var ids = this.ids.split(",");
                    console.log(ids)
                    this.axios({
                        url: `${this.baseUrl}/ping/objRemoves`,
                        method: 'post',
                        data: {
                            ids: ids
                        }
                    }).then(res => {
                        this.getData();
                    });
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel');
                }
            });
        },
        //搜索内容
        searchAll() {
            this.axios({
                url: `http://localhost:3000/${this.module}/list`,
                method: 'post',
                data: {
                    username: this.searchval,
                    page: 1,
                    rows: this.rows
                }
            }).then(res => {
                this.total = res.data.total;
                this.data = res.data.rows;
            })
        },
        getId(node) {
            console.log(node);
            this.axios({
                url: `http://localhost:3000/${this.module}/list`,
                method: 'post',
                data: {
                    education: node[0].title,
                }
            }).then(res => {
                this.data = res.data.rows;
            })
        }
    },
    mounted() {
        this.getData();
    }
};