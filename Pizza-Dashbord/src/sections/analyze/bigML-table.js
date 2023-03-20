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
import { useEffect, useState } from 'react';
const Toppings =["Pepperoni", "Mushrooms", "Onions", "Sausage", "Bacon", "Extra Cheese","Olives"]
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
  const [generatedPairs, setGeneratedPairs] = useState(new Set());
  useEffect(() => {
    setGeneratedPairs(new Set([...generatedPairs]));
  }, [items]);  
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
              let antecedentIndex, consequentIndex, antecedent, consequent;
              do {
                antecedentIndex = Math.floor(Math.random() * Toppings.length);
                antecedent = Toppings[antecedentIndex];
                consequentIndex = Math.floor(Math.random() * Toppings.length);
                consequent = Toppings[consequentIndex];
              } while (
                generatedPairs.has(`${antecedent}-${consequent}`) ||
                antecedent === consequent
              );
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
        rowsPerPage={100}
        rowsPerPageOptions={[100, 150, 250]}
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
