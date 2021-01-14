/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useCustomContext } from '../../context';
import football from '../../seed/football.json';
import StyledTh from '../common/StyledTh';
import StyledTd from '../common/StyledTd';
import EmptyHeader from '../common/EmptyHeader';

export default function FootballTable() {
  const [, dispatch] = useCustomContext();
  const data = useMemo(() => football, []);
  const columns = useMemo(
    () => [
      {
        Header() {
          return <EmptyHeader />;
        },
        accessor: 'dummy-header-2',
        columns: [
          { Header: 'Team', accessor: 'team' },
          { Header: 'Group', accessor: 'group' },
        ],
      },
      {
        Header: 'Team rating',
        accessor: 'dummy-header-3',
        columns: [
          { Header: 'Spi', accessor: 'spi', Cell: (props) => props.value.toFixed(1) },
          { Header: 'Off.', accessor: 'global_o', Cell: (props) => props.value.toFixed(1) },
          { Header: 'Deff', accessor: 'global_d', Cell: (props) => props.value.toFixed(1) },
        ],
      },
      {
        Header: 'Knockout stage changes',
        accessor: 'dummy-header-4',
        columns: [
          {
            Header: 'Make round of 16',
            accessor: 'make_round_of_16',
            Cell: (props) => {
              if (props.value === 1) return '✓';
              if (props.value >= 0.99) return '>99';
              return '<99';
            },
          },
          {
            Header: 'Make QTR final',
            accessor: 'make_quarters',
            Cell: (props) => `${Math.round(props.value * 100)}%`,
          },
          {
            Header: 'Make Semi final',
            accessor: 'make_semis',
            Cell: (props) => `${Math.round(props.value * 100)}%`,
          },
          {
            Header: 'Make Final',
            accessor: 'make_final',
            Cell: (props) => `${Math.round(props.value * 100)}%`,
          },
          {
            Header: 'Win world cup',
            accessor: 'win_league',
            Cell: (props) => `${Math.round(props.value * 100)}%`,
          },
        ],
      },
    ],
    [],
  );
  const handleHover = (val) => {
    const data = {};
    val.cells.forEach((item) => {
      data[item.column.id] = item.value;
    });
    dispatch({ type: 'update-football-info', football: data });
  };
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } = useTable(
    { data, columns },
    useSortBy,
  );

  return (
    <table
      onMouseEnter={() => dispatch({ type: 'update-line-graph', activeLineGraph: 'football' })}
      style={{ width: '30%' }}
      {...getTableProps()}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <StyledTh
                padding="10px 0"
                columnName={column.id}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
              </StyledTh>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <StyledTd
                  cell={cell}
                  onMouseEnter={() => handleHover(row)}
                  {...cell.getCellProps()}
                >
                  {cell.render('Cell')}
                </StyledTd>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
