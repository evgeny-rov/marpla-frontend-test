import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Backdrop,
  Box,
  CircularProgress,
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
} from '@mui/material';

import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';

import {
  getStatusNameById,
  getTypeNameById,
  filteredArticlesBySubjName,
  getArticleSubjName,
  getCampaignsStats,
} from '../../helpers';

import {
  formatPrice,
  isUndefined,
  removeArrayDuplicates,
  removeArrayUndefined,
  roundNumber,
} from '../../../../utils';

import { useGetSubjNameQuery } from '../../../../redux/api/articles';

const CustomizedTableContainer = styled(TableContainer)({
  '.MuiTable-root th, .MuiTable-root td': {
    border: '1px solid #e0e0e0',
  },
  'thead.MuiTableHead-root': {
    background: '#9cbfcb',
  },
});

const Row = ({ row }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
        <TableCell align="right">{formatPrice(Math.ceil(row.stats.Cpc))}</TableCell>
        <TableCell align="right">{formatPrice(Math.ceil(row.stats.spent))}</TableCell>
        <TableCell align="right">{formatPrice(row.stats.orders)}</TableCell>
        <TableCell align="right">{formatPrice(Math.ceil(row.stats.target))}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>??????????????????</TableCell>
                    <TableCell>????????????</TableCell>
                    <TableCell>?????? ??????????????</TableCell>
                    <TableCell>????????????????</TableCell>
                    <TableCell>???????????? (CPM, ???)</TableCell>
                    <TableCell>????????????</TableCell>
                    <TableCell>??????????</TableCell>
                    <TableCell>CTR</TableCell>
                    <TableCell>????. ???????? ??????????</TableCell>
                    <TableCell>??????????????????</TableCell>
                    <TableCell>????????????</TableCell>
                    <TableCell>???????? ????????</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {row.campaigns.map((row, index) => (
                    <TableRow key={index} onClick={() => navigate(`/edit/${row.Id}`)}>
                      <TableCell component="th" scope="row">
                        {row.nms.length}
                      </TableCell>
                      <TableCell>{getStatusNameById(row.statusId)}</TableCell>
                      <TableCell>{getTypeNameById(row.Type)}</TableCell>
                      <TableCell>{row.CampaignName}</TableCell>
                      <TableCell>
                        {!isUndefined(row.Cpm) ? formatPrice(Math.ceil(row.Cpm)) : '-'}
                      </TableCell>
                      <TableCell>
                        {!isUndefined(row.Views) ? formatPrice(row.Views) : '-'}
                      </TableCell>
                      <TableCell>
                        {!isUndefined(row.Clicks) ? formatPrice(row.Clicks) : '-'}
                      </TableCell>
                      <TableCell>
                        {!isUndefined(row.Ctr) ? formatPrice(roundNumber(row.Ctr, 2)) : '-'}
                      </TableCell>
                      <TableCell>
                        {!isUndefined(row.Cpc) ? formatPrice(Math.ceil(row.Cpc)) : '-'}
                      </TableCell>
                      <TableCell>
                        {!isUndefined(row.spent) ? formatPrice(Math.ceil(row.spent)) : '-'}
                      </TableCell>
                      <TableCell>
                        {!isUndefined(row.orders) ? formatPrice(row.orders) : '-'}
                      </TableCell>
                      <TableCell>
                        {!isUndefined(row.target) ? formatPrice(Math.ceil(row.target)) : '-'}
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
  const { data: subjNameData, isLoading: isGetSubjNameLoading } = useGetSubjNameQuery();

  if (isGetSubjNameLoading)
    return (
      <Backdrop
        sx={{
          position: 'fixed',
          backgroundColor: '#8c8c8c80',
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  const campaignsSortedBySubjName = filteredArticlesBySubjName(subjNameData)
    .map((subjName) => {
      const campaigns = removeArrayUndefined(
        rows.map((campaign) => {
          const isArticleExists =
            campaign.nms.findIndex(
              (_article) => getArticleSubjName(_article, subjNameData) === subjName
            ) !== -1;

          if (isArticleExists) {
            return campaign;
          }
        })
      );

      return {
        subjName: subjName,
        campaigns,
        subjsCount: removeArrayDuplicates(campaigns.map((campaign) => campaign.nms).flat(1)).length,
      };
    })
    .filter(({ campaigns }) => campaigns.length > 0);

  const campaignsSortedBySubjNameWithStats = campaignsSortedBySubjName.map((sortedCampaign) => ({
    ...sortedCampaign,
    stats: getCampaignsStats(sortedCampaign.campaigns),
  }));

  return (
    <CustomizedTableContainer className="campaign-list__table-sorted-by-subj" component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>??????????????</TableCell>
            <TableCell align="right">??????????????????</TableCell>
            <TableCell align="right">????????????????</TableCell>
            <TableCell align="right">????????????</TableCell>
            <TableCell align="right">??????????</TableCell>
            <TableCell align="right">CTR</TableCell>
            <TableCell align="right">????. ???????? ??????????</TableCell>
            <TableCell align="right">??????????????????</TableCell>
            <TableCell align="right">????????????</TableCell>
            <TableCell align="right">???????? ????????</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaignsSortedBySubjNameWithStats.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </CustomizedTableContainer>
  );
};
