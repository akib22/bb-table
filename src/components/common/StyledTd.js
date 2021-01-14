import styled from 'styled-components';

const StyledTd = styled.td`
  font-size: 14px;
  padding: 15px 3px;
  background: ${({ cell }) => {
    if (!cell) return;
    if (cell.column.id === 'make_round_of_16') return '#3fc1c9';
    if (cell.column.id === 'global_d') return `rgb(255, 0, 0, ${cell.value / 1.5})`;
    if (cell.column.id === 'global_o') return `rgb(68, 171, 67, ${cell.value / 6})`;
  }};
  border-radius: ${({ cell }) =>
    (cell?.column.id === 'global_o' || cell?.column.id === 'global_d') && '50%'};
  padding: ${({ cell }) =>
    (cell?.column.id === 'global_o' || cell?.column.id === 'global_d') && '10px 5px'};
  border-bottom: 1px solid rgba(153, 153, 153, 0.1);
`;

export default StyledTd;
