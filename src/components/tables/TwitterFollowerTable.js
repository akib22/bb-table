/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import styled from 'styled-components';
import { useTable, useSortBy } from 'react-table';
import TwitterFollowers from '../../seed/twitter-follower.json';
import { useCustomContext } from '../../context';
import EmptyHeader from '../common/EmptyHeader';
import StyledTh from '../common/StyledTh';
import StyledTd from '../common/StyledTd';

const StyledPercentage = styled.div`
  display: flex;
  align-items: center;
`;

const PercentageBar = styled.div`
  width: 50px;
  height: 10px;
  margin-left: 5px;
  background: #e1e1e1;
`;

const CompletedPercentage = styled.div`
  width: ${({ width }) => `${width}%`};
  height: 10px;
  background: #fc5185;
`;

export default function TwitterFollowerTable() {
  const [, dispatch] = useCustomContext();
  const handleHover = (val) => {
    const data = {};
    val.cells.forEach((item) => {
      data[item.column.id] = item.value;
    });
    dispatch({ type: 'update-twitter-info', twitter: data });
  };
  const data = useMemo(() => TwitterFollowers, []);
  const columns = useMemo(
    () => [
      {
        Header() {
          return <EmptyHeader />;
        },
        accessor: 'dummy-header',
        columns: [
          { Header: 'Account', accessor: 'account' },
          { Header: 'Followers', accessor: 'followers' },
          {
            Header: 'Exclusive Followers',
            accessor: 'exclusive_followers_pct',
            Cell({ value }) {
              return (
                <StyledPercentage>
                  {(value * 100).toFixed(1)}%
                  <PercentageBar>
                    <CompletedPercentage width={(value * 100).toFixed(1)} />
                  </PercentageBar>
                </StyledPercentage>
              );
            },
          },
        ],
      },
    ],
    [],
  );
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } = useTable(
    { data, columns },
    useSortBy,
  );

  return (
    <table
      onMouseEnter={() => dispatch({ type: 'update-line-graph', activeLineGraph: 'twitter' })}
      style={{ width: '30%' }}
      {...getTableProps()}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <StyledTh
                columnName={column.id}
                padding="18px 0"
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
                <StyledTd onMouseEnter={() => handleHover(row)} {...cell.getCellProps()}>
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
