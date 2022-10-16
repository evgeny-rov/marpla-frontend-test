import { TextField } from '@mui/material';

export const Search = ({ value, onChange }) => {
  return (
    <div className="search">
      <TextField value={value} onChange={onChange} label="Поиск" variant="outlined" />
    </div>
  );
};
