import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Collapse,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";

import {
  getStatusNameById,
  getTypeNameById,
  filteredArticlesBySubjName,
  getArticleSubjName,
  getCampaignsStats,
} from "../../helpers";

import {
  formatPrice,
  isUndefined,
  removeArrayDuplicates,
  removeArrayUndefined,
  roundNumber,
} from "../../../../utils";

import { useGetSubjNameMutation } from "../../../../redux/api/articles";

const CustomizedTableContainer = styled(TableContainer)({
  ".MuiTable-root th, .MuiTable-root td": {
    border: "1px solid #e0e0e0",
  },
  "thead.MuiTableHead-root": {
    background: "#9cbfcb",
  },
});

const Row = ({ row }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.subjName}
        </TableCell>

        <TableCell align="right">{row.subjsCount}</TableCell>
        <TableCell align="right">{formatPrice(row.campaigns.length)}</TableCell>
        <TableCell align="right">{formatPrice(row.stats.Views)}</TableCell>
        <TableCell align="right">{formatPrice(row.stats.Clicks)}</TableCell>
        <TableCell align="right">{roundNumber(row.stats.Ctr, 2)}</TableCell>
        <TableCell align="right">
          {formatPrice(Math.ceil(row.stats.Cpc))}
        </TableCell>
        <TableCell align="right">
          {formatPrice(Math.ceil(row.stats.spent))}
        </TableCell>
        <TableCell align="right">{formatPrice(row.stats.orders)}</TableCell>
        <TableCell align="right">
          {formatPrice(Math.ceil(row.stats.target))}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Артикулов</TableCell>
                    <TableCell>Статус</TableCell>
                    <TableCell>Вид рекламы</TableCell>
                    <TableCell>Название</TableCell>
                    <TableCell>Ставка (CPM, ₽)</TableCell>
                    <TableCell>Показы</TableCell>
                    <TableCell>Клики</TableCell>
                    <TableCell>CTR</TableCell>
                    <TableCell>Ср. цена клика</TableCell>
                    <TableCell>Потрачено</TableCell>
                    <TableCell>Продаж</TableCell>
                    <TableCell>Цена цели</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {row.campaigns.map((row, index) => (
                    <TableRow
                      key={index}
                      onClick={() => navigate(`/edit/${row.Id}`)}
                    >
                      <TableCell component="th" scope="row">
                        {row.nms.length}
                      </TableCell>
                      <TableCell>{getStatusNameById(row.statusId)}</TableCell>
                      <TableCell>{getTypeNameById(row.Type)}</TableCell>
                      <TableCell>{row.CampaignName}</TableCell>
                      <TableCell>
                        {!isUndefined(row.Cpm)
                          ? formatPrice(Math.ceil(row.Cpm))
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {!isUndefined(row.Views) ? formatPrice(row.Views) : "-"}
                      </TableCell>
                      <TableCell>
                        {!isUndefined(row.Clicks)
                          ? formatPrice(row.Clicks)
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {!isUndefined(row.Ctr)
                          ? formatPrice(roundNumber(row.Ctr, 2))
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {!isUndefined(row.Cpc)
                          ? formatPrice(Math.ceil(row.Cpc))
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {!isUndefined(row.spent)
                          ? formatPrice(Math.ceil(row.spent))
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {!isUndefined(row.orders)
                          ? formatPrice(row.orders)
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {!isUndefined(row.target)
                          ? formatPrice(Math.ceil(row.target))
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export const SortedSubjTable = ({ rows }) => {
  const [
    getSubjName,
    {
      data: subjNameData,
      isLoading: isGetSubjNameLoading,
      isSuccess: isGetSubjNameSuccess,
    },
  ] = useGetSubjNameMutation();

  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const articles = removeArrayDuplicates(rows.map(({ nms }) => nms).flat(1));

    getSubjName({ articles });
  }, [rows]);

  useEffect(() => {
    if (!isGetSubjNameSuccess) return;

    const campaignsSortedBySubjName = filteredArticlesBySubjName(
      subjNameData
    ).map((subjName) => {
      const campaigns = removeArrayUndefined(
        rows.map((campaign) => {
          const isArticleExists =
            campaign.nms.findIndex(
              (_article) =>
                getArticleSubjName(_article, subjNameData) === subjName
            ) !== -1;

          if (isArticleExists) {
            return campaign;
          }
        })
      );

      return {
        subjName: subjName,
        campaigns,
        subjsCount: removeArrayDuplicates(
          campaigns.map((campaign) => campaign.nms).flat(1)
        ).length,
      };
    });

    const campaignsSortedBySubjNameWithStats = campaignsSortedBySubjName.map(
      (sortedCampaign) => ({
        ...sortedCampaign,
        stats: getCampaignsStats(sortedCampaign.campaigns),
      })
    );

    setCampaigns(campaignsSortedBySubjNameWithStats);
  }, [isGetSubjNameSuccess]);

  return (
    <CustomizedTableContainer
      className="campaign-list__table-sorted-by-subj"
      component={Paper}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Предмет</TableCell>
            <TableCell align="right">Артикулов</TableCell>
            <TableCell align="right">Кампаний</TableCell>
            <TableCell align="right">Показы</TableCell>
            <TableCell align="right">Клики</TableCell>
            <TableCell align="right">CTR</TableCell>
            <TableCell align="right">Ср. цена клика</TableCell>
            <TableCell align="right">Потрачено</TableCell>
            <TableCell align="right">Продаж</TableCell>
            <TableCell align="right">Цена цели</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns &&
            campaigns.map((row, index) => <Row key={index} row={row} />)}
        </TableBody>
      </Table>
    </CustomizedTableContainer>
  );
};
