<template>
    <el-form :model="subcontractorUnit" label-position="top">
        <el-form-item label="单位名称：">
            <el-input v-model="subcontractorUnit.name" clearable :title="subcontractorUnit.name" />
        </el-form-item>
        <el-form-item label="分包价格（元）：">
            <el-input-number v-model="subcontractorUnit.price" clearable type="number" :precision="2" :step="1" :min="0" />
        </el-form-item>
        <el-form-item label="已支付成本（元）：">
            <el-input-number v-model="subcontractorUnit.costPaid" clearable type="number" :precision="2" :step="1"
                :min="0" />
        </el-form-item>
        <el-form-item label="分包模式：">
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
            <div v-for="(item, index) in subcontractorUnit.biddingUnits" style="display: flex;width:100%;">
                <el-input style="margin-right:10px;margin-bottom:10px;" v-model="item.name"
                    :placeholder="'请输入投标单位--' + (index + 1)" clearable :title="item.name" />
                <el-button :style="{ visibility: index == 0 ? 'hidden' : 'visible', marginTop: '6px' }"
                    @click="handleDeleteUnit(item, index, '投标')" size="small" :icon="Close" circle />
            </div>
        </div>
        <!-- 中标单位 -->
        <div style="margin-top: 10px;">
            <div style="height:40px;width:100%;">
                <label>中标单位：</label>
                <el-button primary style="position:relative;left:43%;" @click="handleAddWinningUnit">添加</el-button>
            </div>
            <div v-for="(item, index) in subcontractorUnit.winningUnit" style="display: flex;width:100%;">
                <el-input style="margin-right:10px;margin-bottom:10px;" v-model="item.name"
                    :placeholder="'请输入中标单位--' + (index + 1)" clearable :title="item.name" />
                <el-button :style="{ visibility: index == 0 ? 'hidden' : 'visible', marginTop: '6px' }"
                    @click="handleDeleteUnit(item, index, '中标')" size="small" :icon="Close" circle />
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
import { isEmpty } from '../utils/str_util';
const dialogVisible = ref(false);
const dialogMessage = ref('确定要删除么？');
const dialogTargetTag = ref('投标');
const deleteIndex = ref(0);

const props = defineProps({
    subcontractorUnit: {
        type: Object,
        required: true,
    }
})

const subcontractorUnit = reactive<SubcontractingUnit>(props.subcontractorUnit as SubcontractingUnit);

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

// 检测
function check() {
    if (isEmpty(subcontractorUnit.name)) {
        messageNotice('请输入单位名称');
        return false;
    }
    if (isEmpty(subcontractorUnit.price <= 0 ? '' : subcontractorUnit.price.toString())) {
        messageNotice('请输入分包价格');
        return false;
    }
    if (isEmpty(subcontractorUnit.costPaid <= 0 ? '' : subcontractorUnit.costPaid.toString())) {
        messageNotice('请输入已支付成本');
        return false;
    }
    if (isEmpty(subcontractorUnit.modeStyle)) {
        messageNotice('请输入分包模式');
        return false;
    }
    if (isEmpty(subcontractorUnit.tenderMethod)) {
        messageNotice('请输入招标方式');
        return false;
    }
    for (let index = 0; index < subcontractorUnit.biddingUnits!.length; index++) {
        const element = subcontractorUnit.biddingUnits![index];
        if (isEmpty(element.name)) {
            messageNotice(`请输入第${index + 1}个投标单位名称`);
            return false;
        }
    }
    for (let index = 0; index < subcontractorUnit.winningUnit!.length; index++) {
        const element = subcontractorUnit.winningUnit![index];
        if (isEmpty(element.name)) {
            messageNotice(`请输入第${index + 1}个中标单位名称`);
            return false;
        }
    }
    return true;
}
/* function clear() {
    subcontractorUnit.name = '';
    subcontractorUnit.price = '';
    subcontractorUnit.costPaid = '';
    subcontractorUnit.tenderMethod = '';
    subcontractorUnit.modeStyle = '';
    subcontractorUnit.biddingUnits = [{ name: '' }];
    subcontractorUnit.winningUnit = [{ name: '' }];
}

function clone(bean: SubcontractingUnit) {
    const json = JSON.stringify(bean);
    return JSON.parse(json);
} */
// 提交
const confirm = () => {
    if (check()) {
        return subcontractorUnit;
    }
    return undefined;
}

// 暴露子元素方法
defineExpose({ confirm });
</script>