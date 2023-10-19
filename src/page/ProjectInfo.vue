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
                    <el-button type="primary" style="position: absolute;right: 10px;top:-5px;"
                        @click="handleAddSubcontractingUnit">添加</el-button>
                </el-col>
                <el-col v-for="(item, index) in project.subcontractingUnits" style="margin-top:10px;">
                    <el-card :body-style="cardStyleItem">
                        <el-row>
                            <el-col>
                                <span class="circleNoBg">{{ (index + 1) }}</span>
                                <span>单位名称：</span>
                                <span class="text-line" :title="item.name">{{ item.name }}</span>
                                <div style="position: absolute;right: 0px;top:0px;">
                                    <el-button @click="handleChange(item)">修改</el-button>
                                    <el-button @click="handleDelete(index)">删除</el-button>
                                </div>
                            </el-col>
                            <el-col class="unit-item" style="flex-wrap: wrap;display: flex;">
                                <div class="item"><span><span>分包价格：</span><span class="text-line">&nbsp;{{ item.price }}
                                            <span style="font-size: 10px;">元</span>&nbsp;</span></span></div>
                                <div class="item"><span>已支付成本：</span><span class="text-line">&nbsp;{{ item.costPaid }} <span
                                            style="font-size: 10px;">元</span>&nbsp;</span></div>
                                <div class="item"><span>分包模式：</span><span class="text-line">&nbsp;{{ item.modeStyle
                                }}&nbsp;</span></div>
                                <div class="item"><span>招标方式：</span><span class="text-line">&nbsp;{{ item.tenderMethod
                                }}&nbsp;</span></div>
                            </el-col>
                            <el-col class="unit-item">
                                <div style="display: flex;flex-wrap: wrap;">
                                    <div style="min-width: 40%;">
                                        <div>投标单位：</div>
                                        <ul style="margin:5px;list-style:decimal">
                                            <li class="" v-for="unit in item.biddingUnits">{{ unit.name }}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <div>中标单位：</div>
                                        <ul style="margin:5px;list-style:decimal">
                                            <li class="" v-for="unit in item.winningUnit">{{ unit.name }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </el-form>
    <el-drawer v-model="drawer" direction="rtl" class="leftDrawer" :with-header="false">
        <template #default>
            <div>
                <h4 style="padding:0px;margin:0px;font-size:18px;">分包单位：</h4>
                <div style="padding-top:10px;"></div>
                <SubcontractorUnit ref="childRef" :subcontractor-unit="makeEmptySUnit" />
            </div>
        </template>
        <template #footer>
            <div>
                <el-button @click="drawer = false">取消</el-button>
                <el-button type="primary" @click="confirmClick">确定</el-button>
            </div>
        </template>
    </el-drawer>
    <el-dialog v-model="dialogVisible" title="温馨提示" width="30%">
        <span>确定要删除第{{ indexNo }}个分包单位么？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleDeleteDialog(indexNo - 1)">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ProjectInfo, SubcontractingUnit } from '../bean';
import SubcontractorUnit from '../components/SubcontractorUnit.vue';
import { ElMessage } from 'element-plus'
const childRef = ref();
// import HelloWorld from '../components/HelloWorld.vue';
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
    profitMargin: 0,
    grossProfit: ''
});
const drawer = ref(false);
const indexNo = ref(0);
const dialogVisible = ref(false);
const btClickTarget = ref('添加');
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
const handleAddSubcontractingUnit = () => {
    makeEmptySUnit.value = {
        name: '',
        price: 0,
        costPaid: 0,
        tenderMethod: '',
        modeStyle: '',
        biddingUnits: [{ name: '' }],
        winningUnit: [{ name: '' }]
    }
    btClickTarget.value = '添加';
    drawer.value = true;
}

function addSUnit(s_unit: SubcontractingUnit) {
    if (project.subcontractingUnits) {
        project.subcontractingUnits.push(s_unit);
    } else {
        project.subcontractingUnits = [s_unit];
    }
}
const makeEmptySUnit = ref<SubcontractingUnit>({
    name: '',
    price: 0,
    costPaid: 0,
    tenderMethod: '',
    modeStyle: '',
    biddingUnits: [{ name: '' }],
    winningUnit: [{ name: '' }]
})
const confirmClick = () => {
    const result = childRef.value.confirm();
    if (btClickTarget.value != '添加') {
        if (result) {
            drawer.value = false;
        }
        return;
    }
    if (result) {
        addSUnit(result);
        drawer.value = false;
    }
}

const handleChange = (item: SubcontractingUnit) => {
    makeEmptySUnit.value = item;
    btClickTarget.value = '修改';
    drawer.value = true;
}
const handleDelete = (index: number) => {
    const length = project.subcontractingUnits?.length ?? 0;
    if (length > index) {
        indexNo.value = index + 1;
        dialogVisible.value = true;
    } else {
        ElMessage.error('错误！');
    }
}
const handleDeleteDialog = (index: number) => {
    project.subcontractingUnits!.splice(index, 1);
    dialogVisible.value = false;
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