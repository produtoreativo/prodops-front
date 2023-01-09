import React, { FC } from 'react';
import { IconButton, TableCell, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

type TableCellActionsProps = {
  id: string;
  handleDeleteRecord(id: string): Promise<void>;
  handleEditRecord(id: string): Promise<void>;
};

const TableCellActions: FC<TableCellActionsProps> = ({
  id,
  handleDeleteRecord,
  handleEditRecord,
}) => {
  if (!id) return <TableCell />;
  return (
    <TableCell align="right">
      <Tooltip placement="bottom" title="Edit">
        <IconButton
          aria-label="Edit"
          component="span"
          onClick={() => {
            handleEditRecord(id)
          }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip placement="bottom" title="Delete">
        <IconButton
          aria-label="Delete"
          component="span"
          color="error"
          onClick={() => {
            handleDeleteRecord(id);
          }}
        >
          <ClearIcon />
        </IconButton>
      </Tooltip>
    </TableCell>
  );
};

export default TableCellActions;
