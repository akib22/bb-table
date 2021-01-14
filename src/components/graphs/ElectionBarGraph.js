import { useEffect } from 'react';
import { useCustomContext } from '../../context';
import USElectionData from '../../seed/us-election.json';
import BarGraph from './BarGraph';
import GoldenText from '../common/GoldenText';
import { Info, StyledGraph } from '../common/GraphUtilities';

export default function ElectionBarGraph() {
  const [{ USElection }, dispatch] = useCustomContext();

  useEffect(() => {
    dispatch({ type: 'update-us-election-info', USElection: USElectionData[0] });
  }, []);

  if (!USElection) {
    return null;
  }

  return (
    <StyledGraph>
      <BarGraph data={USElectionData} type="us-election" color="#3fc1c9" />
      <Info>
        Republicans received <GoldenText>{USElection.percentage}%</GoldenText> votes in{' '}
        <strong>{USElection.state}</strong>.
      </Info>
    </StyledGraph>
  );
}
