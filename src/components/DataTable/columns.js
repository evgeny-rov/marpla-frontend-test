import { formatDate, isUndefined } from "../../utils";

export const columns = [
  {
    field: "statusId",
    headerName: "Статус",
    type: "number",
    width: 150,
  },
  {
    field: "Type",
    headerName: "Тип",
    type: "number",
  },
  {
    field: "id",
    headerName: "id",
    valueGetter: (params) => params.row.Id,
  },
  {
    field: "CampaignName",
    headerName: "Название",
    type: "string",
    width: 200,
  },
  {
    field: "nms",
    headerName: "Предметов",
    type: "number",
    valueGetter: (params) => params.value.length,
  },
  {
    field: "budget",
    headerName: "Бюджет",
    type: "number",
    valueGetter: (params) =>
      !isUndefined(params.value) ? params.value.budget : "-",
  },
  {
    field: "balance",
    headerName: "Лимит в день",
    type: "number",
    valueGetter: (params) =>
      !isUndefined(params.value) ? params.value.dailyBudget : "-",
  },
  {
    field: "Cpm",
    headerName: "Ставка (CPM, ₽)",
    type: "number",
    valueGetter: (params) => (!isUndefined(params.value) ? params.value : "-"),
  },
  {
    field: "Views",
    headerName: "Показы",
    type: "number",
    valueGetter: (params) => (!isUndefined(params.value) ? params.value : "-"),
  },
  {
    field: "Users",
    headerName: "Пользователей",
    type: "number",
    valueGetter: (params) => (!isUndefined(params.value) ? params.value : "-"),
  },
  {
    field: "Clicks",
    headerName: "Клики",
    type: "number",
    valueGetter: (params) => (!isUndefined(params.value) ? params.value : "-"),
  },
  {
    field: "Ctr",
    headerName: "CTR",
    type: "number",
    valueGetter: (params) => (!isUndefined(params.value) ? params.value : "-"),
  },
  {
    field: "Cpc",
    headerName: "Ср. цена клика",
    type: "number",
    valueGetter: (params) => (!isUndefined(params.value) ? params.value : "-"),
  },
  {
    field: "spent",
    headerName: "Потрачено",
    type: "number",
    valueGetter: (params) => (!isUndefined(params.value) ? params.value : "-"),
  },
  {
    field: "orders",
    headerName: "Продаж",
    type: "number",
    valueGetter: (params) => (!isUndefined(params.value) ? params.value : "-"),
  },
  {
    field: "target",
    headerName: "Цена цели",
    type: "number",
    valueGetter: (params) => (!isUndefined(params.value) ? params.value : "-"),
  },
  {
    field: "Sum",
    headerName: "Расход",
    type: "number",
    valueGetter: (params) => (!isUndefined(params.value) ? params.value : "-"),
  },
  {
    field: "Begin",
    headerName: "Дата создания",
    type: "date",
    width: 200,
    valueFormatter: (params) => formatDate(params.value),
  },
  {
    field: "End",
    headerName: "Пристановлено",
    type: "date",
    width: 200,
    valueFormatter: (params) => formatDate(params.value),
  },
];
