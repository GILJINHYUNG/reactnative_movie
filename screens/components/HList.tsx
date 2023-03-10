import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../../api";
import VMedia from "./VMedia";

const ListTitle = styled.Text`
	color: white;
	font-size: 18px;
	font-weight: 500;
	margin-left: 30px;
	margin-bottom: 15px;
`;

const ListContainer = styled.View`
	margin-bottom: 40px;
`;

export const HListSeperator = styled.View`
	width: 20px;
`;

interface HListProps {
	title: string;
	data: any[];
}

const HList: React.FC<HListProps> = ({ title, data }) => {
	return (
		<ListContainer>
			<ListTitle>{title}</ListTitle>
			<FlatList
				data={data}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 30 }}
				ItemSeparatorComponent={HListSeperator}
				keyExtractor={(item: Movie | TV) => item.id + ""}
				renderItem={({ item }: { item: Movie | TV }) => (
					<VMedia
						posterPath={item.poster_path}
						originalTitle={item.original_title ?? item.original_name}
						voteAverage={item.vote_average}
						fullData={item}
					/>
				)}
			/>
		</ListContainer>
	);
};

export default HList;
