<!--登录记录-->
<template>
    <div class="acc-record">
        <div class="normal-title">
            <div class="block"></div>
            <div>我的记录</div>
        </div>
        <div class="content">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="登陆记录" name="first">
                    <div class="tab-content">
                        <div class="normal-title">
                            <div class="block"></div>
                            <div>登录记录<span class="title-tips">您最近一周的登录情况</span></div>
                        </div>
                        <div class="login-tips">
                            根据登录时间，IP，地理位置，若判断为异常情况，请在核实后及时<span
                            class="change-psw">修改密码</span>
                        </div>
                        <!--说明-->
                        <div class="release">
                            <div style="margin-right: 5px;width: 25px">说明</div>
                            <div>
                                1：移动端登录，由于运营商是随机分配IP，往往存在与实际登录地不符的情况
                                <br/>
                                2：若使用VPN或代理联网的，登录地无法准确记录
                                <br/>
                                3：部分网络代理商的服务，存在IP地址不稳定的问题
                                <br/>
                                4：使用哔哩哔哩账号登录的游戏，也存在一定程度的误报情况
                            </div>
                        </div>
                        <div class="table">
                            <el-table
                                :data="[{ date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }]"
                                :header-cell-style="{background:'#ececec'}"
                                v-if="activeName === 'first'"
                                style="width: 100%">
                                <el-table-column
                                    prop="date"
                                    label="日期"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="地址">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="节操记录" name="second">
                    <div class="tab-content">
                        <div class="sec-title">我的节操值：<span class="sec-value">70</span></div>
                        <div class="sec-tips">每天登录可以恢复1点节操值(70封顶)。</div>
                        <div class="normal-title mt20">
                            <div class="block"></div>
                            <div>节操记录<span class="title-tips">您最近一周的变化情况</span></div>
                        </div>
                        <div class="table">
                            <el-table
                                :data="[{ date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }]"
                                v-if="activeName === 'second'"
                                :header-cell-style="{background:'#ececec'}"
                                style="width: 100%">
                                <el-table-column
                                    prop="date"
                                    label="日期"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="地址">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="经验值记录" name="third">
                    <div class="tab-content">
                        <div class="normal-title">
                            <div class="block"></div>
                            <div>经验值记录<span class="title-tips">您最近一周的变化情况</span></div>
                        </div>
                        <div class="table">
                            <el-table
                                :data="[{ date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }]"
                                v-if="activeName === 'third'"
                                :header-cell-style="{background:'#ececec'}"
                                style="width: 100%">
                                <el-table-column
                                    prop="date"
                                    label="日期"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="地址">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup>

import {ref} from "vue";

let activeName = ref("third");
const handleClick = (tab, event) => {
    console.log(tab, event)
}

</script>

<style scoped>
.normal-title {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ececec;
}

.block {
    width: 5px;
    height: 20px;
    background: #00AEEC;
    border-radius: 4px;
    margin-right: 10px;
}

.tab-content {
    padding: 10px 20px;
}

.title-tips {
    font-size: 14px;
    color: #999999;
    margin-left: 10px;
}

.login-tips {
    font-size: 12px;
    color: #999999;
    margin-top: 20px;
}

.change-psw {
    cursor: pointer;
    color: #00AEEC;
}

.release {
    margin-top: 20px;
    font-size: 12px;
    color: #999999;
    display: flex;
    align-items: flex-start;
}

.table {
    margin-top: 20px;
    border: 1px solid #ececec;
    border-radius: 4px;
}

.sec-title {
    font-size: 18px;
    color: #333333;
    font-weight: 600;
}

.sec-value {
    color: #00AEEC;
}

.sec-tips {
    font-size: 12px;
    color: #999999;
    margin-top: 20px;
}
.mt20{
    margin-top: 20px;
}
</style>