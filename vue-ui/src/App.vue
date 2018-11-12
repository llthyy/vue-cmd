<template>
    <div class="layout" v-if="login">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                        <Icon type="ios-navigate"></Icon>
                        Item 1
                        </MenuItem>
                        <MenuItem name="2">
                        <Icon type="ios-keypad"></Icon>
                        Item 2
                        </MenuItem>
                        <MenuItem name="3">
                        <Icon type="ios-analytics"></Icon>
                        Item 3
                        </MenuItem>
                        <MenuItem name="4">
                        <Icon type="ios-paper"></Icon>
                        Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']" accordion>
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                用户管理
                            </template>
                            <router-link :to="{name:'user'}">
                                <MenuItem name="1-1">
                                用户列表
                                </MenuItem>
                            </router-link>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                分类模块
                            </template>
                            <router-link :to="{name:'classify'}">
                                <MenuItem name="2-1">
                                分类
                                </MenuItem>
                            </router-link>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                新闻模块
                            </template>
                            <router-link :to="{name:'message'}">
                                <MenuItem name="3-1">新闻列表</MenuItem>
                            </router-link>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                评论模块
                            </template>
                            <router-link :to="{name:'comments'}">
                                <MenuItem name="4-1">评论列表</MenuItem>
                            </router-link>
                        </Submenu>
                        <Submenu name="5">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                产品模块
                            </template>
                            <router-link :to="{name:'product'}">
                                <MenuItem name="5-1">产品列表</MenuItem>
                            </router-link>
                        </Submenu>
                        <Submenu name="6">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                购物车
                            </template>
                            <router-link :to="{name:'cart'}">
                                <MenuItem name="6-1">购物车列表</MenuItem>
                            </router-link>
                        </Submenu>
                        <Submenu name="7">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                订单模块
                            </template>
                            <router-link :to="{name:'indent'}">
                                <MenuItem name="7-1">订单列表</MenuItem>
                            </router-link>
                        </Submenu>
                        <Submenu name="8">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                帮助中心
                            </template>
                            <router-link :to="{name:'help'}">
                                <MenuItem name="7-1">帮助中心</MenuItem>
                            </router-link>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
    <div v-else>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline style="text-align:center;marginTop:300px">
            <FormItem prop="username">
                <Input type="text" v-model="formInline.username" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      // Logined   : false,
      formInline: {
        username: '',
        password: ''
      },
      ruleInline: {
        username: [
          {
            required: true,
            message : 'Please fill in the user name',
            trigger : 'blur'
          }
        ],
        password: [
          {
            required: true,
            message : 'Please fill in the password.',
            trigger : 'blur'
          },
          {
            type   : 'string',
            min    : 6,
            message: 'The password length cannot be less than 6 bits',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions(['checkLogin', 'setToken']),
    handleSubmit(name) {
      // this.login = true
      // this.$store.state.login = true
      this.$refs[name].validate(valid => {
        if (valid) {
          this.axios({
            method: 'post',
            url   : 'http://10.31.162.51:3000/user/login',
            data  : {
              username: this.formInline.username,
              password: this.formInline.password
            }
          }).then(res => {
              console.log(res)
            if (res.data.token) {
              this.checkLogin(true);
              // console.log(res)
              this.setToken(res.data.token);
              this.$Message.success('登录成功!');
            } else {
              this.$Message.error('用户名或密码错误!');
            }
          });
        } else {
          this.$Message.error('用户名或密码错误!');
        }
      });
    }
  },
  computed: {
    login() {
      return this.$store.getters.login;
    }
  }
};
</script>

<style scoped>
.layout {
  border       : 1px solid #d7dde4;
  background   : #f5f7f9;
  position     : relative;
  border-radius: 4px;
  overflow     : hidden;
}
.layout-logo {
  width        : 100px;
  height       : 30px;
  background   : #5b6270;
  border-radius: 3px;
  float        : left;
  position     : relative;
  top          : 15px;
  left         : 20px;
}
.layout-nav {
  width       : 420px;
  margin      : 0 auto;
  margin-right: 20px;
}
</style>

