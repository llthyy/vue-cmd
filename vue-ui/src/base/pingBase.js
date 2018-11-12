export default {
    data() {
        return {
            pingColumns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '回复者',
                    key: 'issueId'
                },
                {
                    title: '回复时间',
                    key: 'pingTime'
                },
                {
                    title: '回复内容',
                    key: 'pingContent',
                    width: 700,
                    ellipsis: true
                },
                {
                    title: 'Action',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.pingRemove(params.index);
                                        }
                                    }
                                },
                                '删除'
                            )
                        ]);
                    }
                }
            ],
            //从数据库抓取某一贴的全部评论
            pingDataList: [],
            //评论列表的数据
            pingUserId: '',
            pingTime: '',
            pingId: '',
            pingContent: '',
            //当前文章/论点/产品的id
            nowPingId: '',
            //评论模态框状态
            modal2: false,

            //分页设置
            pingpage: 1,
            pingtotal: 0,

            //评论table中的选中项
            pingChecked: [],
            pingCheckedId: [],


        };
    },
    methods: {
        //查看具体的每条评论
        chakan(index) {
            // alert(index,this.datalist[index]);
            console.log(this.datalist[index]._id);
            this.modal2 = true;
            this.nowPingId = this.datalist[index]._id;
            //向数据库请求数据
            this.axios({
                    method: 'post',
                    url: `${this.baseUrl}/ping/list`,
                    data: {
                        issueId: this.nowPingId,
                        rows: 6
                    }
                })
                .then(res => {
                    var result = res.data.rows;
                    // this.pingpages = res.data.pages;
                    this.pingtotal = res.data.total;
                    // console.log(res.data);
                    this.pingDataList = [];
                    for (let i = 0; i < result.length; i++) {
                        this.pingDataList.push(result[i]);
                        // console.log(result[i]._id);
                    }
                    // console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //切换评论页数
        pingyeshu(page) {
            this.pingpage = page;
            // console.log(page);
            console.log(this.nowPingId);
            this.axios({
                    method: 'post',
                    url: `${this.baseUrl}/ping/list`,
                    data: {
                        page,
                        issueId: this.nowPingId
                    }
                })
                .then(res => {
                    var result = res.data.rows;
                    // this.pages = res.data.pages;
                    this.pingtotal = res.data.total;
                    console.log(res.data);
                    this.pingDataList = [];
                    // var idlist=[];
                    for (let i = 0; i < result.length; i++) {
                        this.pingDataList.push(result[i]);
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
        //对某条具体评论的操作
        pingOk() {
            console.log('ok');
        },
        pingCancel() {
            console.log('cancel');
        },

        pingRemove(index) {
            var sure = confirm('确定删除吗？');
            // if (sure) {
            //   console.log(sure, index);
            //   console.log(this.pingDataList[index]._id);
            // }
            if (sure) {
                console.log(sure, index);
                console.log(this.pingDataList[index]._id);
                console.log(this.pingDataList[index]);
                // this.datalist.splice(index, 1);
                this.axios({
                    method: 'delete',
                    url: `${this.baseUrl}/ping/data/${this.pingDataList[index]._id}`,
                    // data: nowdata
                }).then(res => {
                    console.log('删除成功');
                    this.axios({
                            method: 'post',
                            url: `${this.baseUrl}/ping/list`,
                            data: {
                                page: this.pingpage,
                                issueId: this.nowPingId
                            }
                        })
                        .then(res => {
                            var result = res.data.rows;
                            // this.pages = res.data.pages;
                            this.pingtotal = res.data.total;
                            console.log(res.data);
                            this.pingDataList = [];
                            // var idlist=[];
                            for (let i = 0; i < result.length; i++) {
                                this.pingDataList.push(result[i]);
                                // console.log(result[i]._id);
                                // idlist.push(result[i]._id);
                            }
                            // console.log(idlist);
                            // console.log(result);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });
            }
        },

        //选中多条评论
        pingSelected(i) {
            console.log(i);
            this.pingChecked = i;
        },
        //批量删除评论
        pingdeletemany() {
            var sure = confirm('确定删除吗？');
            this.pingCheckedId = [];
            if (sure) {
                this.pingChecked.forEach(el => {
                    this.pingCheckedId.push(el._id);
                });
                // console.log(sure);
                this.axios({
                    method: 'post',
                    url: `${this.baseUrl}/ping/data/removes`,
                    data: { ids: this.pingCheckedId }
                });
                // console.log(this.page);
                this.axios({
                        method: 'post',
                        url: `${this.baseUrl}/ping/list`,
                        data: {
                            page: this.pingpage,
                            issueId: this.nowPingId,
                            rows: 6
                        }
                    })
                    .then(res => {
                        var result = res.data.rows;
                        // this.pages = res.data.pages;
                        this.pingtotal = res.data.total;
                        // console.log(res.data);
                        this.pingDataList = [];
                        for (let i = 0; i < result.length; i++) {
                            this.pingDataList.push(result[i]);
                            // console.log(result[i]._id);
                        }
                        // console.log(result);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
    }
}