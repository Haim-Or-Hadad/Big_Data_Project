import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useState } from 'react';
const Toppings =["Pepperoni", "Mushrooms", "Onions", "Sausage", "Bacon", "Extra Cheese"]
export const BigMLTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;
  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                  />
                </TableCell>
                <TableCell>
                  Antecedent
                </TableCell>
                <TableCell>
                  Consequent
                </TableCell>
                <TableCell>
                  Support(%)
                </TableCell>
                <TableCell>
                  Coverage(%)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((data) => {
                const antecedentIndex = Math.floor(Math.random() * Toppings.length);
                const antecedent = Toppings[antecedentIndex];
                
                // Generate a random index value for data.consequent
                let consequentIndex = Math.floor(Math.random() * Toppings.length);
                let consequent = Toppings[consequentIndex];
                
                // Keep generating a new random index value for consequent until it is not the same as antecedent
                while (consequentIndex === antecedentIndex) {
                  consequentIndex = Math.floor(Math.random() * Toppings.length);
                  consequent = Toppings[consequentIndex];
                }
                let id = Math.random().toString(36).substring(7);
                const isSelected = selected.includes(id);
                return (
                  <TableRow
                    hover
                    key={id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="subtitle2">
                          {antecedent}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {consequent}
                    </TableCell>
                    <TableCell>
                      {data.support}
                    </TableCell>
                    <TableCell>
                      {data.coverage}
                    </TableCell>
                  </TableRow>
                );
              })
              }
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

BigMLTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
