import styled from 'styled-components';
import TwitterFollowerTable from './components/tables/TwitterFollowerTable';
import USElectionTable from './components/tables/USElectionTable';
import FootballTable from './components/tables/FootballTable';
import LineGraph from './components/graphs/LineGraph';
import FootballBarGraph from './components/graphs/FootballBarGraph';
import ElectionBarGraph from './components/graphs/ElectionBarGraph';
import TwitterBarGraph from './components/graphs/TwitterBarGraph';

const StyledApp = styled.div`
  display: flex;
`;
const StyledInfo = styled.div`
  width: 20%;
`;
const Title = styled.h3`
  text-align: center;
  padding: 5px 0;
  border-bottom: 2px solid #000000;
  margin-top: ${(props) => props.marginTop || 'auto'};
`;
const StyledTables = styled.div`
  display: flex;
  width: 80%;
`;

function App() {
  return (
    <StyledApp>
      <StyledTables>
        <FootballTable />
        <TwitterFollowerTable />
        <USElectionTable />
      </StyledTables>

      <StyledInfo>
        <Title marginTop="80px">What it means</Title>
        <FootballBarGraph />
        <TwitterBarGraph />
        <ElectionBarGraph />
        <Title>How it's changed</Title>
        <div>
          <LineGraph />
        </div>
      </StyledInfo>
    </StyledApp>
  );
}

export default App;
