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
            <div style="height:40px;width:100%;">
                <label>投标单位：</label>
                <el-button primary style="position:relative;left:43%;" @click="handleAddBiddingUnit">添加</el-button>
            </div>
            <div v-for="(item, index) in subcontractorUnit.biddingUnits"
                style="display: flex;align-items: center;width:100%;">
                <el-input style="margin-right:10px;margin-bottom:10px;" v-model="item.name"
                    :placeholder="'请输入投标单位--' + (index + 1)" clearable />
                <el-button :style="{ visibility: index == 0 ? 'hidden' : 'visible' }" @click="handleDeleteUnit(item, index, '投标')"
                    size="small" :icon="Close" circle />
            </div>
        </div>
        <!-- 中标单位 -->
        <div style="margin-top: 10px;">
            <div style="height:40px;width:100%;">
                <label>中标单位：</label>
                <el-button primary style="position:absolute;right: 10px;" @click="handleAddWinningUnit">添加</el-button>
            </div>
            <div v-for="(item, index) in subcontractorUnit.winningUnit"
                style="display: flex;align-items: center;width:100%;">
                <el-input style="margin-right:10px;margin-bottom:10px;" v-model="item.name"
                    :placeholder="'请输入中标单位--' + (index + 1)" clearable />
                <el-button v-if="index > 0" @click="handleDeleteUnit(item, index, '中标')" size="small" :icon="Close"
                    circle />
            </div>
        </div>
    </el-form>
    <el-dialog v-model="dialogVisible" title="温馨提示" width="30%">
        <span>{{ dialogMessage }}</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleDialogSure">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { SubcontractingUnit, Unit } from '../bean';
import { Close } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
const dialogVisible = ref(false);
const dialogMessage = ref('确定要删除么？');
const dialogTargetTag = ref('投标');
const deleteIndex = ref(0);
const subcontractorUnit = reactive<SubcontractingUnit>({
    name: '',
    price: '',
    costPaid: '',
    tenderMethod: '',
    modeStyle: '',
    biddingUnits: [{ name: '' }],
    winningUnit: [{ name: '' }]
})

const handleAddBiddingUnit = () => {
    subcontractorUnit.biddingUnits?.push({ name: '' });
}
const handleAddWinningUnit = () => {
    if (subcontractorUnit.winningUnit!.length >= subcontractorUnit.biddingUnits!.length) {
        messageNotice('请先输入投标单位\n(中标单位数量要大于投标单位)')
        return;
    }
    subcontractorUnit.winningUnit?.push({ name: '' });
}
const messageNotice = (msg: string) => {
    ElNotification({
        title: '错误提示',
        message: msg,
        type: 'error',
    });
}
const handleDeleteUnit = (item: Unit, index: number, tag: string) => {
    if (index == 0) {
        messageNotice('至少有一个' + tag + '单位');
        return;
    }
    deleteIndex.value = index;
    dialogMessage.value = '确定要删除第' + (index + 1) + '个' + tag + '单位么？\n' + item.name;
    dialogTargetTag.value = tag;
    dialogVisible.value = true;
}

const handleDialogSure = () => {
    var arr: Array<Unit>;
    if (dialogTargetTag.value == '投标') {
        arr = subcontractorUnit.biddingUnits!;
    } else {
        arr = subcontractorUnit.winningUnit!;
    }
    arr.splice(deleteIndex.value, 1);
    dialogVisible.value = false;
}
</script>