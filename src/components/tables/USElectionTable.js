/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useCustomContext } from '../../context';
import USElectionData from '../../seed/us-election.json';
import EmptyHeader from '../common/EmptyHeader';
import StyledTh from '../common/StyledTh';
import StyledTd from '../common/StyledTd';

export default function USElectionTable() {
  const data = useMemo(() => USElectionData, []);
  const [, dispatch] = useCustomContext();
  const handleHover = (val) => {
    const data = {};
    val.cells.forEach((item) => {
      data[item.column.id] = item.value;
    });
    dispatch({ type: 'update-us-election-info', USElection: data });
  };
  const columns = useMemo(
    () => [
      {
        Header() {
          return <EmptyHeader />;
        },
        accessor: 'dummy-header-1',
        columns: [
          { Header: 'State', accessor: 'state' },
          { Header: 'Votes', accessor: 'votes' },
          {
            Header: 'Percentage',
            accessor: 'percentage',
            Cell: (props) => `${props.value}%`,
          },
        ],
      },
    ],
    [],
  );
  const { rows, getTableProps, headerGroups, getTableBodyProps, prepareRow } = useTable(
    { data, columns },
    useSortBy,
  );

  return (
    <table
      onMouseEnter={() => dispatch({ type: 'update-line-graph', activeLineGraph: 'election' })}
      style={{ width: '30%' }}
      {...getTableProps()}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <StyledTh
                padding="26px 0"
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
            <tr onMouseEnter={() => handleHover(row)} {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <StyledTd {...cell.getCellProps()}>{cell.render('Cell')}</StyledTd>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
