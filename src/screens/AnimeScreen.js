import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Animated, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PreviewCard from './../components/PreviewCard';
import { Constants } from 'expo'
import { TouchableOpacity } from 'react-native-gesture-handler';
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
            })
        }

        callApi();
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
        const { navigation: { navigate } } = this.props;
        const headerContentOp = this.state.scrollY.interpolate({
            inputRange: [0, 28, 38],
            outputRange: [0, 0, 1]
        });
        return (
            <View style={{ flex: 1 }}>
                <Animated.View
                    style={styles.animatedHeaderContainer}
                >
                    <Animated.View style={{ zIndex: 3, opacity: headerContentOp, flexDirection: "column", alignItems: "center", justifyContent: "flex-start", }} >
                        <Text style={styles.animatedHeaderTitle}>
                            Anime
                        </Text>
                    </Animated.View>
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
                    {/* <View style={styles.subHeadingContainer}>
                        <Text style={styles.subHeading}>Trending Anime</Text>
                        <TouchableOpacity onPress={() => navigate("ListScreen", {
                            Title: "Anime",
                            SubtTitle: "Trending Anime",
                            Type: "Anime",
                            Uri: "https://kitsu.io/api/edge/trending/anime",
                        })}>
                            <Text style={styles.subHeading}>SEE MORE</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.trendingList}
                        keyExtractor={keyExtractor}
                        renderItem={this.renderPreviewCard}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        inverted={false}
                        extraData={this.state}
                    /> */}

                    <CategoryPreview 
                        Name='Trending Anime'
                        Data={this.state.trendingList}
                        Type='Anime'
                        SeeMoreLink='https://kitsu.io/api/edge/trending/anime'
                        Navigate={navigate}
                    />

                    <CategoryPreview 
                        Name='Top On-going Anime'
                        Data={this.state.ongoingList}
                        Type='Anime'
                        SeeMoreLink='https://kitsu.io/api/edge/anime?page[limit]=20&filter[status]=current&sort=popularityRank'
                        Navigate={navigate}
                    />

                    <View style={styles.subHeadingContainer}>
                        <Text style={styles.subHeading}>Top On-going Anime</Text>
                        <TouchableOpacity onPress={() => navigate("ListScreen", {
                            Title: "Anime",
                            SubtTitle: "Top On-going Anime",
                            Type: "Anime",
                            Uri: "https://kitsu.io/api/edge/anime?page[limit]=20&filter[status]=current&sort=popularityRank",
                        })}>
                            <Text style={styles.subHeading}>SEE MORE</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.ongoingList}
                        keyExtractor={keyExtractor}
                        renderItem={this.renderPreviewCard}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        inverted={false}
                        extraData={this.state}
                    />

                    <View style={styles.subHeadingContainer}>
                        <Text style={styles.subHeading}>Most Popular Anime</Text>
                        <TouchableOpacity onPress={() => navigate("ListScreen", {
                            Title: "Anime",
                            SubtTitle: "Most Popular Anime",
                            Type: "Anime",
                            Uri: "https://kitsu.io/api/edge/anime?page[limit]=20&filter&sort=popularityRank",
                        })}>
                            <Text style={styles.subHeading}>SEE MORE</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.mostPopularList}
                        keyExtractor={keyExtractor}
                        renderItem={this.renderPreviewCard}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        inverted={false}
                        extraData={this.state}
                    />

                    <View style={styles.subHeadingContainer}>
                        <Text style={styles.subHeading}>Upcoming Anime</Text>
                        <TouchableOpacity onPress={() => navigate("ListScreen", {
                            Title: "Anime",
                            SubtTitle: "Upcoming Anime",
                            Type: "Anime",
                            Uri: "https://kitsu.io/api/edge/anime?page[limit]=20&filter[status]=upcoming&sort=-averageRating,popularityRank",
                        })}>
                            <Text style={styles.subHeading}>SEE MORE</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.upcomingAnimeList}
                        keyExtractor={keyExtractor}
                        renderItem={this.renderPreviewCard}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        inverted={false}
                        extraData={this.state}
                    />
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