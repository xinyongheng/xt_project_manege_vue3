/**
 * 项目列表内容
 */
interface ProjectInfoList {
    id: number,
    // 年份
    year: string,
    // 项目名称
    projectName: string,
    // 建设单位
    buildUnit: string,
    // 项目负责人
    projectLeader: string,
    // 利润率
    profitMargin: string,
    // 毛利
    grossProfit: string,
    ctime: string,
    utime: string,
}
/**
 * 分包单位
 */
interface SubcontractingUnit {
    name: string,
    price: string,
    // 成本已支付
    costPaid: string,
    // 招标方式
    tenderMethod: string,
    // 分包模式
    modeStyle: string,
    // 投标单位
    biddingUnits?: Array<Unit>,
    // 中标单位
    winningUnit?: Array<Unit>,
}
/**
 * 单位
 */
interface Unit {
    name: string,
}
/**
 * 项目信息
 */
interface ProjectInfo extends ProjectInfoList {
    // 项目概述
    content: string,
    // 合同金额
    contractAmount?: number,
    // 审定金额
    approvedAmount?: number,
    // 已回款金额
    repaidAmount?: number,
    // 分包单位
    subcontractingUnits?: Array<SubcontractingUnit>,
}
export type { ProjectInfoList, ProjectInfo, SubcontractingUnit, Unit };