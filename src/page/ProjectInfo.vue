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
                </el-card>
            </el-col>
            <el-col :span="8" class="col-item">
                <el-card :body-style="cardStyleItem">
                    <el-form-item label="项目概述：" style="margin-bottom: 11px;">
                        <el-input v-model="project.content" type="textarea" :rows="9" resize="none" clearable />
                    </el-form-item>
                </el-card>
            </el-col>
            <el-col :span="8" class="col-item">
                <el-card :body-style="cardStyleItem">
                    <el-form-item label="合同金额（元）：">
                        <el-input v-model="project.contractAmount" clearable type="number" />
                    </el-form-item>
                    <el-form-item label="审定金额（元）：">
                        <el-input v-model="project.approvedAmount" clearable type="number" />
                    </el-form-item>
                    <el-form-item label="已回款金额（元）：">
                        <el-input v-model="project.repaidAmount" clearable type="number" />
                    </el-form-item>
                </el-card>
            </el-col>
        </el-row>
        <el-card style="margin:5px 10px;" :body-style="{ padding: '10px 10px 15px 10px' }">
            <el-row>
                <el-col :span="12">
                    <div>分包单位：</div>
                </el-col>
                <el-col :span="12" style="">
                    <el-button class="add-bt" type="primary" plain @click="handleAddSubcontractingUnit">添加</el-button>
                </el-col>
            </el-row>
            <el-row>
                <div style="flex-wrap: wrap;flex-direction: row;flex: auto;">
                    <span>1.</span><span>单位名称：<span style="text-decoration: underline">asdfasd</span></span>
                </div>
            </el-row>
        </el-card>

    </el-form>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { ProjectInfo } from '../bean';
const cardStyleItem = { padding: '10px 10px 0px 10px' }
const project = reactive<ProjectInfo>({
    year: '',
    content: '',
    id: 0,
    projectName: '',
    buildUnit: '',
    ctime: '',
    utime: ''
});
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
const handleAddSubcontractingUnit = () => {
    console.log('分包单位');

}
</script>
<style scoped>
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
</style>