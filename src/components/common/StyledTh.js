import styled from 'styled-components';

const StyledTh = styled.th`
  border-bottom: 2px solid #666;
  pointer-events: ${(props) => (props.columnName.includes('dummy-header') ? 'none' : 'cursor')};
  font-size: 14px;
  padding: ${(props) =>
    (props.columnName.includes('dummy-header') && !props.padding) ||
    props.columnName.includes('dummy-header')
      ? '10px 0'
      : props.padding};
  &:hover {
    background: rgba(153, 153, 153, 0.082);
  }
`;

export default StyledTh;
