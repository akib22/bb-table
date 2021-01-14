import { useEffect } from 'react';
import { useCustomContext } from '../../context';
import twitterFollowers from '../../seed/twitter-follower.json';
import BarGraph from './BarGraph';
import GoldenText from '../common/GoldenText';
import { Info, StyledGraph } from '../common/GraphUtilities';

export default function TwitterBarGraph() {
  const [{ twitter }, dispatch] = useCustomContext();

  useEffect(() => {
    dispatch({ type: 'update-twitter-info', twitter: twitterFollowers[0] });
  }, []);

  if (!twitter) {
    return null;
  }

  return (
    <StyledGraph>
      <BarGraph data={twitterFollowers} type="twitter-follower" color="blue" />
      <Info>
        <strong>{twitter.account}</strong> has <GoldenText>{twitter.followers}</GoldenText>{' '}
        followers on Twitter.
      </Info>
    </StyledGraph>
  );
}
