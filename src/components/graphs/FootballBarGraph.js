import { useEffect } from 'react';
import { useCustomContext } from '../../context';
import footballData from '../../seed/football.json';
import BarGraph from './BarGraph';
import GoldenText from '../common/GoldenText';
import { Info, StyledGraph } from '../common/GraphUtilities';

export default function FootballBarGraph() {
  const [{ football }, dispatch] = useCustomContext();

  useEffect(() => {
    dispatch({ type: 'update-football-info', football: footballData[0] });
  }, []);

  if (!football) {
    return null;
  }

  return (
    <StyledGraph>
      <BarGraph data={footballData} type="football-info" color="red" />
      <Info>
        <strong>{football.team}</strong> has a{' '}
        <GoldenText>{Math.round(football.win_league * 100)}%</GoldenText> change of winning world
        cup.
      </Info>
    </StyledGraph>
  );
}
