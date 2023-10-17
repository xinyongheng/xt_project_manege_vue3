<template>
    <h3 style="margin: 0px;padding: 0px">项目创建：</h3>
    <el-form :model="project">
        <el-form-item>
            <el-input v-model="project.year" label="年份">

            </el-input>
        </el-form-item>
    </el-form>
    <el-card>

    </el-card>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { ProjectInfo } from '../bean';

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
})
</script>