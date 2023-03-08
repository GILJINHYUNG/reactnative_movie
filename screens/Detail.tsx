import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
	Dimensions,
	StyleSheet,
	Share,
	TouchableOpacity,
	Platform,
} from "react-native";
import styled from "styled-components/native";
import { Movie, moviesApi, TV, tvApi } from "../api";
import Poster from "./components/Poster";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR } from "../colors";
import { useQuery } from "react-query";
import Loader from "./components/Loader";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
	background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
	height: ${SCREEN_HEIGHT / 3}px;
	justify-content: flex-end;
	padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
	flex-direction: row;
	width: 80%;
`;
const Title = styled.Text`
	color: white;
	font-size: 30px;
	align-self: flex-end;
	margin-left: 15px;
	margin-right: 15px;
	font-weight: 500;
`;

const Data = styled.View`
	padding: 0px 20px;
`;

const Overview = styled.Text`
	color: ${(props) => props.theme.textColor};
	margin: 20px 0;
	font-size: 14px;
	line-height: 20px;
`;

const VideoBtn = styled.TouchableOpacity`
	flex-direction: row;
`;

const BtnText = styled.Text`
	color: white;
	font-weight: 600;
	margin-bottom: 5px;
	line-height: 24px;
	margin-left: 10px;
`;

type RootstackParamList = {
	Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootstackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
	navigation: { setOptions },
	route: { params },
}) => {
	const isMovie = "original_title" in params;
	const { isLoading, data } = useQuery(
		[isMovie ? "movies" : "TV", params.id],
		isMovie ? moviesApi.detail : tvApi.detail
	);
	const shareMedia = async () => {
		const isAndroid = Platform.OS === "android";
		const homepage = isMovie
			? `https://www.imdb.com/title/${data.imdb_id}/`
			: data.hompage;

		if (isAndroid) {
			await Share.share({
				message: `${params.overview}\nCheck it out: ${homepage}`,
				title: isMovie ? params.original_title : params.original_name,
			});
		}
		await Share.share({
			url: isMovie
				? `https://www.imdb.com/title/${data.imdb_id}/`
				: data.hompage,
			message: params.overview,
		});
	};
	const ShareButton = () => (
		<TouchableOpacity onPress={shareMedia}>
			<Ionicons name="share-outline" color="rgb(175, 175, 175)" size={24} />
		</TouchableOpacity>
	);

	useEffect(() => {
		setOptions({
			title: "original_title" in params ? "Movie" : "TV Show",
		});
	}, []);
	useEffect(() => {
		if (data) {
			setOptions({
				headerRight: () => <ShareButton />,
			});
		}
	}, [data]);
	const openYTLink = async (videoID: string) => {
		const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;
		await WebBrowser.openBrowserAsync(baseUrl);
	};
	return (
		<Container>
			<Header>
				<Background
					style={StyleSheet.absoluteFill}
					source={{ uri: makeImgPath(params.backdrop_path || "") }}
				/>
				<LinearGradient
					colors={["transparent", BLACK_COLOR]}
					style={StyleSheet.absoluteFill}
				/>
				<Column>
					<Poster path={params.poster_path || ""} />
					<Title>
						{"original_title" in params
							? params.original_title
							: params.original_name}
					</Title>
				</Column>
			</Header>
			<Data>
				<Overview>{params.overview}</Overview>
				{isLoading ? <Loader /> : null}
				{data?.videos?.results.map((video) => (
					<VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
						<Ionicons name="logo-youtube" color="white" size={25} />
						<BtnText>{video.name}</BtnText>
					</VideoBtn>
				))}
			</Data>
		</Container>
	);
};

export default Detail;
