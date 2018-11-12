export default {
    data() {
        return {

            data: [],
            total: 0,
            page: 1,
            rows: 5,
            modalForm: false,
            ids: []
        };
    },
    methods: {
        handleSubmit(name) {
            this.getDate();
            // console.log('formValidate', this.formValidate);
            this.$refs[name].validate(valid => {

                if (valid) {
                    if (this.formValidate._id) {
                        this.axios({
                            url: `${this.baseUrl}/${this.module}/data/${this.formValidate._id}`,
                            method: 'put',
                            data: this.formValidate
                        }).then(res => {
                            this.modalForm = false;
                            this.getData();
                            this.$data.formValidate = this.$options.data().formValidate;
                        });
                    } else {
                        this.axios({
                            url: `${this.baseUrl}/${this.module}/data`,
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
        handleReset(name) {
            this.$refs[name].resetFields();
            // Object.assign(this.$data.formValidate, this.$options.data().formValidate);
        },
        edit(id) {
            // 请示数据，打开对话框，显示表单的数据，进行提交
            this.axios({
                url: `${this.baseUrl}/${this.module}/data/${id}`,
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
                        url: `${this.baseUrl}/${this.module}/data/${id}`,
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
                url: `${this.baseUrl}/${this.module}/list`,
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
            this.getData();
        },
        onPageSizeChange(rows) {
            this.rows = rows;
            this.getData();
        },
        onSelect(selections) {
            var ids = [];
            for (let i = 0; i < selections.length; i++) {
                ids.push(selections[i]._id);
            }
            this.ids = ids.toString();
        },
        removes() {
            this.$Modal.confirm({
                title: '确认操作',
                content: '<p>你确认删除该记录吗?</p>',
                onOk: () => {
                    this.axios({
                        url: `${this.baseUrl}/${this.module}/data/removes`,
                        method: 'post',
                        data: {
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