import "./index.scss";

import { Button, ToggleButton } from "@mui/material";

import { CustomizedToggleButtonGroup } from "./CustomizedToggleButtonGroup";

export const CustomToggleButtonGroup = ({
  campaignSection,
  changeCampaignSection,
}) => (
  <div className="controls">
    <div className="container">
      <div className="controls__inner">
        <div className="controls__toggle-button-group">
          <CustomizedToggleButtonGroup
            color="primary"
            value={campaignSection}
            exclusive
            onChange={changeCampaignSection}
          >
            <ToggleButton value="campaign-list">Список кампаний</ToggleButton>
            <ToggleButton value="auction">Аукцион</ToggleButton>
          </CustomizedToggleButtonGroup>
        </div>

        {campaignSection === "campaign.js-list" && (
          <div className="controls__action-button">
            <Button variant="outlined" size="large">
              Создать кампанию
            </Button>
          </div>
        )}
      </div>
    </div>
  </div>
);
