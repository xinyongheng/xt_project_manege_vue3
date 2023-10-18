<template>
    <el-form :model="subcontractorUnit" label-position="top">
        <el-form-item label="单位名称：">
            <el-input v-model="subcontractorUnit.name" clearable />
        </el-form-item>
        <el-form-item label="分包价格（元）：">
            <el-input-number v-model="subcontractorUnit.price" clearable type="number" :precision="2" :step="1" :min="0" />
        </el-form-item>
        <el-form-item label="已支付成本（元）：">
            <el-input-number v-model="subcontractorUnit.costPaid" clearable type="number" :precision="2" :step="1"
                :min="0" />
        </el-form-item>
        <el-form-item label="模式：">
            <el-input v-model="subcontractorUnit.modeStyle" clearable />
        </el-form-item>
        <el-form-item label="招标方式：">
            <el-input v-model="subcontractorUnit.tenderMethod" clearable />
        </el-form-item>
        <!-- 投标单位 -->
        <div>
            <div style="display: flex;flex-direction:row;">
                <label>投标单位：</label>
                <el-button primary style="position:absolute;right: 10px;" @click="handleAddBiddingUnit">添加</el-button>
            </div>
            <ul style="list-style:decimal;margin:0px;">
                <li v-for="item in subcontractorUnit.biddingUnits">{{ item.name }}</li>
            </ul>
        </div>
        <!-- 中标单位 -->
        <div>
            <div style="display: flex;flex-direction:row;">
                <label>中标单位：</label>
                <el-button primary style="position:absolute;right: 10px;" @click="handleAddWinningUnit">添加</el-button>
            </div>
            <ul style="list-style:decimal;margin:0px;">
                <li v-for="item in subcontractorUnit.winningUnit">{{ item.name }}</li>
            </ul>
        </div>
    </el-form>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { SubcontractingUnit } from '../bean';

const subcontractorUnit = reactive<SubcontractingUnit>({
    name: '',
    price: '',
    costPaid: '',
    tenderMethod: '',
    modeStyle: '',
})
const handleAddBiddingUnit = () => {

}
const handleAddWinningUnit = () => {

}
</script>