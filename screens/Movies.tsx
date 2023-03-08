import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { Movie, MovieResponse, moviesApi } from "../api";
import HList from "./components/HList";
import HMedia from "./components/HMedia";
import Loader from "./components/Loader";
import Slide from "./components/Slide";

const Container = styled.FlatList``;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
	color: white;
	font-size: 18px;
	font-weight: 500;
	margin-left: 30px;
	margin-bottom: 15px;
`;

const ComingSoonTitle = styled(ListTitle)`
	margin-bottom: 15px;
`;

const HSeperator = styled.View`
	height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
	const [refreshing, setRefreshing] = useState(false);
	const queryClient = useQueryClient();
	const { isLoading: nowPlayingLoading, data: nowPlayingData } =
		useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
	const { isLoading: upcomingLoading, data: upcomingData } =
		useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
	const { isLoading: trendingLoading, data: trendingData } =
		useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);
	const onRefresh = async () => {
		setRefreshing(true);
		await queryClient.refetchQueries(["movies"]);
		setRefreshing(false);
	};

	const renderHMedia = ({ item }) => (
		<HMedia
			posterPath={item.poster_path}
			originalTitle={item.original_title}
			releaseDate={item.release_date}
			overview={item.overview}
			fullData={item}
		/>
	);
	const movieKeyExtractor = (item: Movie) => item.id + "";
	const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

	return loading ? (
		<Loader />
	) : (
		<Container
			onRefresh={onRefresh}
			refreshing={refreshing}
			ListHeaderComponent={
				<>
					<Swiper
						horizontal
						loop
						autoplay
						autoplayTimeout={3.5}
						showsButtons={false}
						showsPagination={false}
						containerStyle={{
							marginBottom: 30,
							width: "100%",
							height: SCREEN_HEIGHT / 3,
						}}
					>
						{nowPlayingData.results.map((movie) => (
							<Slide
								key={movie.id}
								backdropPath={movie.backdrop_path}
								posterPath={movie.poster_path}
								originalTitle={movie.original_title}
								voteAverage={movie.vote_average}
								overview={movie.overview}
								fullData={movie}
							/>
						))}
					</Swiper>
					{trendingData ? (
						<HList title="Trending Movies" data={trendingData.results} />
					) : null}
					<ComingSoonTitle>Coming Soon</ComingSoonTitle>
				</>
			}
			data={upcomingData.results}
			keyExtractor={movieKeyExtractor}
			ItemSeparatorComponent={HSeperator}
			renderItem={renderHMedia}
		/>
	);
};
export default Movies;
