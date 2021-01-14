import styled from 'styled-components';
import BarGraph from './graphs/BarGraph';
import twitterFollowers from '../seed/twitter-follower.json';
import { useCustomContext } from '../context';

const Info = styled.p``;

export default function GraphInfo() {
  const [state] = useCustomContext();

  return (
    <>
      <BarGraph data={twitterFollowers} />
      <Info>
        {state.twitter}
        {/* {twitter.account} has {twitter.followers} followers on Twitter */}
        aa
      </Info>
    </>
  );
}
