import styled from 'styled-components';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import GraphItem from './GraphItem';

const Graph = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100px;
  width: 180px;
`;

export default function BarGraph({ data, type, color }) {
  return (
    <Graph>
      {data.map((item) => (
        <GraphItem key={uuidv4()} data={item} type={type} color={color} />
      ))}
    </Graph>
  );
}

BarGraph.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
