import {styled, ToggleButtonGroup} from "@mui/material";

export const CustomizedToggleButtonGroup = styled(ToggleButtonGroup)({
    "@media (max-width: 768px)": {
        display: "flex",

        "& > button": {
            flex: "1 1 100%",
        },
    },
});
