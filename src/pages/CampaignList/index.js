import './index.scss';
import { useMemo, useState } from 'react';
import { useGetListQuery } from '../../redux/api/campaigns';
import { Backdrop, CircularProgress, ToggleButton } from '@mui/material';

import { CustomizedToggleButtonGroup, DataTable, Search } from '../../components';

import { SortedArticleTable, SortedSubjTable, SortedAdvertsTable } from './components';
import { getStatusNameById, getTypeNameById } from './helpers';

const statusIdToStatusTypeTable = {
  7: 'archived',
  11: 'paused',
  9: 'active',
};

export const CampaignList = () => {
  const { data: campaignList, isLoading: isCampaignListLoading } = useGetListQuery();

  const [group, setGroupBy] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const setGroupByHandler = (_, sort) => setGroupBy(sort);
  const setStatusFilterHandler = (_, status) => status && setStatusFilter(status);

  const campaignsByStatus = useMemo(() => {
    const campaigns = campaignList || [];

    return campaigns.reduce(
      (acc, item) => {
        const statusType = statusIdToStatusTypeTable[item.statusId];

        const mappedItem = {
          ...item,
          Type: getTypeNameById(item.Type),
          statusId: getStatusNameById(item.statusId),
        };

        if (statusType) acc[statusType].push(mappedItem);

        acc.all.push(mappedItem);
        return acc;
      },
      { all: [], archived: [], paused: [], active: [] }
    );
  }, [campaignList]);

  return (
    <div className="campaign-list">
      <div className="container">
        <div className="campaign-list__inner">
          <div className="campaign-list__filters">
            <div className="campaign-list__group">
              <div className="campaign-list__group-text">Сгруппировать по:</div>

              <div className="campaign-list__group-buttons">
                <CustomizedToggleButtonGroup
                  className="campaign-list__toggle-group"
                  color="primary"
                  value={group}
                  exclusive
                  onChange={setGroupByHandler}
                >
                  <ToggleButton value="subj">Предмету</ToggleButton>
                  <ToggleButton value="article">Артикулу</ToggleButton>
                  <ToggleButton value="adverts">Виду рекламы</ToggleButton>
                </CustomizedToggleButtonGroup>
              </div>
            </div>

            <div className="campaign-list__filter">
              <div className="campaign-list__filter-text">Показывать:</div>

              <div className="campaign-list__filter-buttons">
                <CustomizedToggleButtonGroup
                  className="campaign-list__toggle-group"
                  color="primary"
                  value={statusFilter}
                  exclusive
                  onChange={setStatusFilterHandler}
                >
                  <ToggleButton value="all">Все ({campaignsByStatus.all.length})</ToggleButton>
                  <ToggleButton value="active">
                    Активные ({campaignsByStatus.active.length})
                  </ToggleButton>
                  <ToggleButton value="paused">
                    Остановленные ({campaignsByStatus.paused.length})
                  </ToggleButton>
                  <ToggleButton value="archived">
                    Архив ({campaignsByStatus.archived.length})
                  </ToggleButton>
                </CustomizedToggleButtonGroup>
              </div>
            </div>
          </div>

          <Search />

          <div className="campaign-list__table">
            <div className="campaign-list__table-sorted">
              {group === 'article' && <SortedArticleTable rows={campaignList} />}
              {group === 'subj' && <SortedSubjTable rows={campaignList} />}
              {group === 'adverts' && <SortedAdvertsTable rows={campaignList} />}
              <DataTable rows={campaignsByStatus[statusFilter]} />
            </div>
            <Backdrop
              sx={{
                position: 'fixed',
                backgroundColor: '#8c8c8c80',
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={isCampaignListLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        </div>
      </div>
    </div>
  );
};
