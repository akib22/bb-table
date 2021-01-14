import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useCustomContext } from '../../context';

const Column = styled.div`
  width: 5px;
  height: ${(props) => `${props.height}%`};
  background: ${(props) => `${props.active ? `${props.color}` : '#8080803b'}`};
  margin-right: 3px;

  &:hover {
    background: ${(props) => props.color};
  }
`;

export default function GraphItem({ data, type, color }) {
  const [{ twitter, USElection, football }, dispatch] = useCustomContext();

  let active;
  let height;
  let actionType;
  let actionPayload;
  if (type === 'football-info') {
    active = data.team === football.team;
    height = Math.round(data.win_league * 100 * 4);
    actionType = 'update-football-info';
    actionPayload = 'football';
  } else if (type === 'twitter-follower') {
    active = data.account === twitter.account;
    actionType = 'update-twitter-info';
    actionPayload = 'twitter';
    height = data.percentage;
  } else if (type === 'us-election') {
    active = data.state === USElection.state;
    actionType = 'update-us-election-info';
    actionPayload = 'USElection';
    height = data.percentage;
  }

  function handleHover() {
    dispatch({ type: actionType, [actionPayload]: data });
  }

  return (
    <Column active={active} color={color} height={height} onMouseEnter={() => handleHover()} />
  );
}

GraphItem.propTypes = {
  data: PropTypes.shape({
    account: PropTypes.string,
    state: PropTypes.string,
    team: PropTypes.string,
    percentage: PropTypes.number,
    win_league: PropTypes.number,
  }).isRequired,
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
