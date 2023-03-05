import React from "react";
import styled from "styled-components/native";

const Text = styled.Text`
	color: rgba(255, 255, 255, 0.7);
	font-size: 10px;
`;

interface VotesProps {
	votes: number;
}

const Votes: React.FC<VotesProps> = ({ votes }) => {
	return (
		<Text>{votes > 0 ? `⭐️ ${votes.toFixed(1)}/10` : "Coming soon"}</Text>
	);
};

export default Votes;
