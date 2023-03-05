import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";

const HMovie = styled.View`
	padding: 0px 30px;
	flex-direction: row;
	margin-bottom: 30px;
`;

const HColumn = styled.View`
	margin-left: 15px;
	width: 80%;
`;

const Overview = styled.Text`
	color: white;
	font-size: 12px;
	opacity: 0.7;
	line-height: 21px;
	width: 80%;
`;

const Release = styled.Text`
	color: white;
	font-size: 12px;
	line-height: 21px;
	width: 80%;
	margin-bottom: 5px;
`;

interface HMediaProps {
	posterPath: string;
	originalTitle: string;
	releaseDate: string;
	overview: string;
}

const Title = styled.Text`
	color: white;
	font-weight: 600;
	margin-top: 7px;
	margin-bottom: 5px;
`;

const HMedia: React.FC<HMediaProps> = ({
	posterPath,
	originalTitle,
	releaseDate,
	overview,
}) => {
	return (
		<HMovie>
			<Poster path={posterPath} />
			<HColumn>
				<Title>{originalTitle}</Title>
				{releaseDate ? (
					<Release>
						개봉일 :
						{" " +
							new Date(releaseDate).toLocaleDateString("ko", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
					</Release>
				) : null}
				<Overview>
					{overview !== "" && overview.length > 80
						? `${overview.slice(0, 80)}...`
						: overview}
				</Overview>
			</HColumn>
		</HMovie>
	);
};

export default HMedia;
