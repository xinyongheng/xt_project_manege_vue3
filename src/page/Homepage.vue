<template>
    <h3 style="margin: 8px;">项目列表</h3>
    <el-table :data="projectDataList" style="width: 100%" bord>
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="year" label="年份" width="180" />
        <el-table-column prop="projectName" label="项目名称" min-width="300" />

        <el-table-column prop="buildUnit" label="建设单位" min-width="300" />
        <el-table-column width="100" lable="详情">
            <template #default="info">
                <el-button class="look" text @click="handleClickInfo(info.row)"> 查看 </el-button>
            </template>
        </el-table-column>

    </el-table>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router';
import { ProjectInfoList } from '../bean/index';
import { ElMessage } from 'element-plus';
import { projectDataList as list } from '../bean/projectDataList';
const router = useRouter();
const projectDataList: Array<ProjectInfoList> = list
const handleClickInfo = (item: ProjectInfoList) => {
    const projectId = item.id;
    console.log(item);
    ElMessage('this is a message. projectId=' + projectId);
    router.push({ name: 'projectInfo' });
}
</script>

<style scoped>
:deep(#h3) {
    margin: 0px;
}

:deep(.look) {
    background-color: transparent;
}
</style>