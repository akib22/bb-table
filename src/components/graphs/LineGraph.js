import { Sparklines, SparklinesLine } from 'react-sparklines';
import { useCustomContext } from '../../context';
import football from '../../seed/football.json';
import twitterFollower from '../../seed/twitter-follower.json';
import USElection from '../../seed/us-election.json';

function LineGraph() {
  const [{ activeLineGraph }] = useCustomContext();

  if (activeLineGraph === 'football') {
    const footballData = football.map((item) => Math.round(item.win_league * 100));

    return (
      <Sparklines data={footballData}>
        <SparklinesLine style={{ fill: 'transparent', stroke: 'red' }} />
      </Sparklines>
    );
  }

  if (activeLineGraph === 'twitter') {
    const twitterData = twitterFollower.map((item) => Math.round(item.followers / 100000));

    return (
      <Sparklines data={twitterData}>
        <SparklinesLine style={{ fill: 'transparent', stroke: 'blue' }} />
      </Sparklines>
    );
  }

  if (activeLineGraph === 'election') {
    const electionData = USElection.map((item) => item.percentage);

    return (
      <Sparklines data={electionData}>
        <SparklinesLine style={{ fill: 'transparent', stroke: '#3fc1c9' }} />
      </Sparklines>
    );
  }
}

export default LineGraph;
