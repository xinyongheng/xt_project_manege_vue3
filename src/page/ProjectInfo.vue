<template>
    <h3 style="margin: 0px;padding: 0px">项目详情：</h3>
    <el-form :model="project" label-position="top">
        <el-row style="box-sizing: border-box;padding: 0px 5px;">
            <el-col :span="8" class="col-item">
                <el-card :body-style="cardStyleItem">
                    <el-form-item label="年份（年）：">
                        <el-date-picker v-model="project.year" type="year" placeholder="请选择年份"
                            :disabled-date="disabledDate" />
                    </el-form-item>
                    <el-form-item label="项目名称：">
                        <el-input v-model="project.projectName" clearable />
                    </el-form-item>
                    <el-form-item label="建设单位：">
                        <el-input v-model="project.buildUnit" clearable />
                    </el-form-item>
                    <el-form-item label="项目负责人：">
                        <el-input v-model="project.projectLeader" clearable />
                    </el-form-item>
                </el-card>
            </el-col>
            <el-col :span="8" class="col-item">
                <el-card :body-style="cardStyleItem">
                    <el-form-item label="项目概述：" style="margin-bottom: 11px;">
                        <el-input v-model="project.content" type="textarea" :rows="9" resize="none" clearable />
                    </el-form-item>
                    <el-form-item label="合同金额（元）：">
                        <el-input v-model="project.contractAmount" clearable type="number" />
                    </el-form-item>
                </el-card>
            </el-col>
            <el-col :span="8" class="col-item">
                <el-card :body-style="cardStyleItem">

                    <el-form-item label="审定金额（元）：">
                        <el-input v-model="project.approvedAmount" clearable type="number" />
                    </el-form-item>
                    <el-form-item label="已回款金额（元）：">
                        <el-input v-model="project.repaidAmount" clearable type="number" />
                    </el-form-item>
                    <el-form-item label="毛利率（%）：">
                        <el-input-number v-model="project.profitMargin" clearable type="number" :precision="2" :step="0.1"
                            :min="0" :max="100">
                            <template #suffix>
                                <i slot="suffix" style="font-style: normal; margin-right: 10px">%</i>
                            </template>
                        </el-input-number>
                    </el-form-item>
                    <el-form-item label="毛利（元）：">
                        <el-input v-model="project.grossProfit" clearable type="number" />
                    </el-form-item>
                </el-card>
            </el-col>
        </el-row>

        <el-card style="margin:10px 10px;" :body-style="{ padding: '18px 10px 15px 10px' }">
            <el-row>
                <el-col>
                    <div>分包单位：</div>
                </el-col>
                <el-col>
                    <el-card :body-style="cardStyleItem">
                        <el-row>
                            <el-col>
                                <span class="circleNoBg">1</span>
                                <span>单位名称：</span>
                                <span
                                    class="text-line">嘻嘻嘻嘻嘻嘻嘻嘻手动阀阿斯蒂芬阿斯顿嘻嘻嘻嘻嘻嘻嘻嘻手动阀阿斯蒂芬阿斯顿嘻嘻嘻嘻嘻嘻嘻嘻手动阀阿斯蒂芬阿斯顿嘻嘻嘻嘻嘻嘻嘻嘻手动阀阿斯蒂芬阿斯顿</span>
                            </el-col>
                            <el-col class="unit-item" style="flex-wrap: wrap;display: flex;">
                                <div class="item"><span><span>分包价格：</span><span class="text-line">&nbsp;1024.45 <span
                                                style="font-size: 10px;">元</span>&nbsp;</span></span></div>
                                <div class="item"><span>已支付成本：</span><span class="text-line">&nbsp;1024.45 <span
                                            style="font-size: 10px;">元</span>&nbsp;</span></div>
                                <div class="item"><span>模式：</span><span class="text-line">&nbsp;产品购销&nbsp;</span></div>
                                <div class="item"><span>招标方式：</span><span class="text-line">&nbsp;询价&nbsp;</span></div>
                            </el-col>
                            <el-col class="unit-item">
                                <div style="display: flex;flex-wrap: wrap;">
                                    <div style="min-width: 40%;">
                                        <div>投标单位：</div>
                                        <ul style="margin:5px;list-style:decimal">
                                            <li class="">阿斯蒂芬</li>
                                            <li>阿斯蒂芬</li>
                                            <li>阿斯蒂芬</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <div>中标单位：</div>
                                        <ul style="margin:5px;list-style:decimal">
                                            <li class="">阿斯蒂芬</li>
                                            <li>阿斯蒂芬</li>
                                        </ul>
                                    </div>
                                </div>
                            </el-col>
                            <el-col>

                            </el-col>
                        </el-row>

                    </el-card>
                </el-col>
                <el-col style="margin-top: 20px;">
                    <el-card :body-style="cardStyleItem">
                        <el-row>
                            <el-col>
                                <span class="circleNoBg">1</span>
                                <span>单位名称：</span>
                                <span
                                    class="text-line">嘻嘻嘻嘻嘻嘻嘻嘻手动阀阿斯蒂芬阿斯顿嘻嘻嘻嘻嘻嘻嘻嘻手动阀阿斯蒂芬阿斯顿嘻嘻嘻嘻嘻嘻嘻嘻手动阀阿斯蒂芬阿斯顿嘻嘻嘻嘻嘻嘻嘻嘻手动阀阿斯蒂芬阿斯顿</span>
                            </el-col>
                            <el-col class="unit-item" style="flex-wrap: wrap;display: flex;">
                                <div class="item"><span><span>分包价格：</span><span class="text-line">&nbsp;1024.45 <span
                                                style="font-size: 10px;">元</span>&nbsp;</span></span></div>
                                <div class="item"><span>已支付成本：</span><span class="text-line">&nbsp;1024.45 <span
                                            style="font-size: 10px;">元</span>&nbsp;</span></div>
                                <div class="item"><span>模式：</span><span class="text-line">&nbsp;产品购销&nbsp;</span></div>
                                <div class="item"><span>招标方式：</span><span class="text-line">&nbsp;询价&nbsp;</span></div>
                            </el-col>
                            <el-col class="unit-item">
                                <div style="display: flex;flex-wrap: wrap;">
                                    <div style="min-width: 40%;">
                                        <div>投标单位：</div>
                                        <ul style="margin:5px;list-style:decimal">
                                            <li class="">阿斯蒂芬</li>
                                            <li>阿斯蒂芬</li>
                                            <li>阿斯蒂芬</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <div>中标单位：</div>
                                        <ul style="margin:5px;list-style:decimal">
                                            <li class="">阿斯蒂芬</li>
                                            <li>阿斯蒂芬</li>
                                        </ul>
                                    </div>
                                </div>
                            </el-col>
                            <el-col>

                            </el-col>
                        </el-row>

                    </el-card>
                </el-col>
            </el-row>
        </el-card>

    </el-form>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { ProjectInfo } from '../bean';
const cardStyleItem = { padding: '15px 10px 5px 10px' }
const project = reactive<ProjectInfo>({
    year: '',
    content: '',
    id: 0,
    projectName: '',
    buildUnit: '',
    ctime: '',
    utime: '',
    projectLeader: '',
    profitMargin: '',
    grossProfit: ''
});
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
const handleAddSubcontractingUnit = () => {
    console.log('分包单位');

}
</script>
<style scoped>
:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
    width: 100%;
}

:deep(.el-date-picker) {
    max-width: 360px;
}

.col-item {
    padding: 5px;
    box-sizing: border-box;
}

.add-bt {
    position: absolute;
    right: 0px;
    padding: 5px 10px;
    height: min-content;
}

.text-line {
    /* text-decoration: underline; */
    padding-right: 10px;
    padding-left: 8px;
    padding-bottom: 1px;
    border-bottom: 1px solid #000;
    box-sizing: border-box;
}

.unit-s {
    padding-top: 20px;
}

.circleNoBg {
    background-color: cornflowerblue;
    /* padding: 5px; */
    width: 30px;
    height: 30px;
    border-radius: 100%;
    box-sizing: border-box;
    /* border: 2px solid grey; */
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
    color: white;
    font-size: 15px;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    display: inline-flex;
}

.unit-item {
    margin-top: 15px;
}

.unit-item .item {
    margin-left: 30px;
    min-width: 180px;
}
</style>