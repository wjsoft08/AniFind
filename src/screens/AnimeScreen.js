import React from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, Animated, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PreviewCard from './../components/PreviewCard';
import Constants from 'expo-constants';
import CategoryPreview from './../components/CategoryPreview';

const keyExtractor = item => item.title;

export default class AnimeScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
            scrollY: new Animated.Value(0),
            trendingList: [],
            ongoingList: [],
            mostPopularList: [],
            isLoading: true,
            searchText: '',
            searchSelected: false,
        };

        const trendingAnime = 'https://kitsu.io/api/edge/trending/anime';
        const popularityRankAnime = 'https://kitsu.io/api/edge/anime?page[limit]=10&filter&sort=popularityRank';
        const currentPopularityRankAnime = 'https://kitsu.io/api/edge/anime?page[limit]=10&filter[status]=current&sort=popularityRank';
        const upcomingAnime = 'https://kitsu.io/api/edge/anime?page[limit]=10&filter[status]=upcoming&sort=-averageRating,popularityRank';
        const genres = 'https://kitsu.io/api/edge/genres?page[limit]=20';
        const totalMediaCount = 'https://kitsu.io/api/edge/categories?sort=-totalMediaCount';
        const trendingManga = 'https://kitsu.io/api/edge/trending/manga';
        const popularityRankManga = 'https://kitsu.io/api/edge/manga?page[limit]=10&filter&sort=popularityRank';
        const currentPopularityRankManga = 'https://kitsu.io/api/edge/manga?page[limit]=10&filter[status]=current&sort=popularityRank';
        const upcomingManga = 'https://kitsu.io/api/edge/manga?page[limit]=10&filter[status]=upcoming&sort=-averageRating,popularityRank';
        const user = 'https://kitsu.io/api/edge/users?page[limit]=20';
        let search = 'https://kitsu.io/api/edge/anime?filter[text]=';
    }

    componentDidMount() {
        const callApi = async () => {

            // Trending Anime
            trendingAnimeResponse = await fetch(`https://kitsu.io/api/edge/trending/anime`)
                .then((trendingAnimeResponse) => trendingAnimeResponse.json());
            let trendingList = [];
            trendingAnimeResponse.data.forEach((data) => {
                trendingList.push({
                    id: data.id,
                    title: data.attributes.canonicalTitle,
                    rating: data.attributes.averageRating,
                    type: data.type,
                    imageURI: data.attributes.posterImage.small,
                    episodeCount: data.attributes.episodeCount
                })
            })

            // Popular On-goin Anime
            ongoingAnimeResponse = await fetch(`https://kitsu.io/api/edge/anime?page[limit]=10&filter[status]=current&sort=popularityRank`)
                .then((ongoingAnimeResponse) => ongoingAnimeResponse.json());
            let ongoingList = [];
            ongoingAnimeResponse.data.forEach((data) => {
                ongoingList.push({
                    id: data.id,
                    title: data.attributes.canonicalTitle,
                    rating: data.attributes.averageRating,
                    type: data.type,
                    imageURI: data.attributes.posterImage.small,
                    episodeCount: data.attributes.episodeCount
                })
            })

            // Most Popular Anime
            mostPopularAnimeResponse = await fetch(`https://kitsu.io/api/edge/anime?page[limit]=10&filter&sort=popularityRank`)
                .then((mostPopularAnimeResponse) => mostPopularAnimeResponse.json());
            let mostPopularList = [];
            mostPopularAnimeResponse.data.forEach((data) => {
                mostPopularList.push({
                    id: data.id,
                    title: data.attributes.canonicalTitle,
                    rating: data.attributes.averageRating,
                    type: data.type,
                    imageURI: data.attributes.posterImage.small,
                    episodeCount: data.attributes.episodeCount
                })
            })

            // Up coming Anime
            upComingAnimeResponse = await fetch(`https://kitsu.io/api/edge/anime?page[limit]=10&filter[status]=upcoming&sort=-averageRating,popularityRank`)
                .then((upComingAnimeResponse) => upComingAnimeResponse.json());
            let upcomingAnimeList = [];
            upComingAnimeResponse.data.forEach((data) => {
                upcomingAnimeList.push({
                    id: data.id,
                    type: data.type,
                    title: data.attributes.canonicalTitle,
                    rating: data.attributes.averageRating,
                    imageURI: data.attributes.posterImage.small,
                    episodeCount: data.attributes.episodeCount
                })
            })

            this.setState({
                trendingList: trendingList,
                ongoingList: ongoingList,
                mostPopularList: mostPopularList,
                upcomingAnimeList: upcomingAnimeList,
                isLoading: false,
            })
        }

        callApi();
    }

    searchPressed = () => {
        if (this.state.searchSelected) {
            this.setState({
                searchSelected: false,
            })
        } else {
            this.setState({
                searchSelected: true,
            })
        }
    }

    renderPreviewCard = (data) => {
        const { navigation: { navigate } } = this.props;
        return (
            <PreviewCard
                Title={data.item.title}
                Rating={data.item.rating}
                Type={data.item.type}
                ImageURI={data.item.imageURI}
                Episodes={data.item.episodeCount}
                CardPressed={() => navigate("MoreInfoScreen", {
                    id: data.item.id,
                    type: data.item.type,
                })}
            />
        )
    }

    render() {
        const { navigation } = this.props;
        const headerContentOp = this.state.scrollY.interpolate({
            inputRange: [0, 28, 38],
            outputRange: [0, 0, 1]
        });
        return (
            <View style={{ flex: 1 }}>
                <Animated.View
                    style={styles.animatedHeaderContainer}
                >
                    {this.state.searchSelected ?
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center", }}>
                            <TouchableOpacity onPress={this.searchPressed} underlayColor={"white"} style={styles.searchIcon}>
                                <FontAwesome name="search" size={28} style={{ color: "#dbdbdb", }} />
                            </TouchableOpacity>
                            <TextInput
                                style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }}
                                onChangeText={text => this.setState({ searchText: text })}
                                value={this.state.searchText}
                            />
                        </View>
                        :
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: "center", }}>
                            <TouchableOpacity onPress={this.searchPressed} underlayColor={"white"} style={[styles.searchIcon, {flex: 1}]}>
                                <FontAwesome name="search" size={28} style={{ color: "#dbdbdb", }} />
                            </TouchableOpacity>
                            <Animated.View style={{ flex: 1, zIndex: 3, opacity: headerContentOp, flexDirection: "column", alignItems: "center", justifyContent: "flex-start", }} >
                                <Text style={styles.animatedHeaderTitle}>
                                    Anime
                                </Text>
                            </Animated.View>
                            <View
                                style={{ flex: 1, paddingRight: 10 }}>
                            </View>
                        </View>
                    }
                </Animated.View>

                <Animated.ScrollView style={styles.container}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: { contentOffset: { y: this.state.scrollY } }
                            }
                        ],
                        {
                            useNativeDriver: true
                        }
                    )}
                >
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Anime</Text>
                    </View>
                    {this.state.isLoading ?
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color="#ffffff" />
                        </View>
                        :
                        <View>
                            <CategoryPreview
                                Name='Trending Anime'
                                Data={this.state.trendingList}
                                Type='Anime'
                                SeeMoreLink='https://kitsu.io/api/edge/trending/anime'
                                Navigation={navigation}
                            />

                            <CategoryPreview
                                Name='Top On-going Anime'
                                Data={this.state.ongoingList}
                                Type='Anime'
                                SeeMoreLink='https://kitsu.io/api/edge/anime?page[limit]=20&filter[status]=current&sort=popularityRank'
                                Navigation={navigation}
                            />

                            <CategoryPreview
                                Name='Most Popular Anime'
                                Data={this.state.mostPopularList}
                                Type='Anime'
                                SeeMoreLink='https://kitsu.io/api/edge/anime?page[limit]=20&filter&sort=popularityRank'
                                Navigation={navigation}
                            />

                            <CategoryPreview
                                Name='Upcoming Anime'
                                Data={this.state.upcomingAnimeList}
                                Type='Anime'
                                SeeMoreLink='https://kitsu.io/api/edge/anime?page[limit]=20&filter[status]=upcoming&sort=-averageRating,popularityRank'
                                Navigation={navigation}
                            />
                        </View>
                    }
                </Animated.ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#262626",
    },
    animatedHeaderContainer: {
        width: "100%",
        position: "absolute",
        backgroundColor: "#19191a",
        height: 56 + Constants.statusBarHeight,
        zIndex: 5,
        paddingTop: Constants.statusBarHeight,
        alignItems: "center",
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    animatedHeaderTitle: {
        fontSize: 24,
        color: "white",
        flex: 1,
        alignItems: "center",
        padding: 10,
        fontWeight: "bold"
    },
    searchIcon: {
        padding: 10,
    },
    titleContainer: {
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 56 + Constants.statusBarHeight,
    },
    title: {
        fontSize: 42,
        fontWeight: "bold",
        color: 'white',
    },
    subHeadingContainer: {
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subHeading: {
        fontSize: 18,
        fontWeight: 'normal',
        color: 'white',
    },
})