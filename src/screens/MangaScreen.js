import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Animated, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PreviewCard from '../components/PreviewCard';
import { Constants } from 'expo';

const keyExtractor = item => item.title;

export default class MangaScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
            scrollY: new Animated.Value(0),
            trendingMangaList: [],
            ongoingMangaList: [],
            mostPopularList: [],
            upcomingMangaList: [],
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
            trendingMangaResponse = await fetch(`https://kitsu.io/api/edge/trending/manga`)
                .then((trendingMangaResponse) => trendingMangaResponse.json());
            let trendingMangaList = [];
            trendingMangaResponse.data.forEach((data) => {
                trendingMangaList.push({
                    title: data.attributes.canonicalTitle, 
                    rating: data.attributes.averageRating, 
                    type: data.type, 
                    imageURI: data.attributes.posterImage.small, 
                    episodeCount: data.attributes.episodeCount
                })
            })

            // Popular On-goin Anime
            ongoingMangaResponse = await fetch(`https://kitsu.io/api/edge/manga?page[limit]=10&filter[status]=current&sort=popularityRank`)
                .then((ongoingMangaResponse) => ongoingMangaResponse.json());
            let ongoingMangaList = [];
            ongoingMangaResponse.data.forEach((data) => {
                ongoingMangaList.push({
                    title: data.attributes.canonicalTitle, 
                    rating: data.attributes.averageRating, 
                    type: data.type, 
                    imageURI: data.attributes.posterImage.small, 
                    episodeCount: data.attributes.episodeCount
                })
            })

            // Most Popular Anime
            mostPopularMangaResponse = await fetch(`https://kitsu.io/api/edge/manga?page[limit]=10&filter&sort=popularityRank`)
                .then((mostPopularMangaResponse) => mostPopularMangaResponse.json());
            let mostPopularMangaList = [];
            mostPopularMangaResponse.data.forEach((data) => {
                mostPopularMangaList.push({
                    title: data.attributes.canonicalTitle, 
                    rating: data.attributes.averageRating, 
                    type: data.type, 
                    imageURI: data.attributes.posterImage.small, 
                    episodeCount: data.attributes.episodeCount
                })
            })

            // // Most Popular Anime
            // upComingMangaResponse = await fetch(`https://kitsu.io/api/edge/manga?page[limit]=10&filter[status]=upcoming&sort=-averageRating,popularityRank`)
            //     .then((upComingMangaResponse) => upComingMangaResponse.json());
            // let upcomingMangaList = [];
            // upComingAnimeResponse.data.forEach((data) => {
            //     upcomingMangaList.push({
            //         title: data.attributes.canonicalTitle, 
            //         rating: data.attributes.averageRating, 
            //         type: data.type, 
            //         imageURI: data.attributes.posterImage.small, 
            //         episodeCount: data.attributes.episodeCount
            //     })
            // })

            this.setState({
                trendingMangaList: trendingMangaList,
                ongoingMangaList: ongoingMangaList,
                mostPopularMangaList: mostPopularMangaList,
            //    upcomingMangaList: upcomingMangaList,
            })
        }

        callApi();
    }


    renderPreviewCard = (data) => {
        return (
            <PreviewCard
                Title={data.item.title}
                Rating={data.item.rating}
                Type={data.item.type}
                ImageURI={data.item.imageURI}
                Episodes={data.item.episodeCount}
            />
        )
    }

    render() {
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
                            Manga
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
                        <Text style={styles.title}>Manga</Text>
                    </View>
                    <View style={styles.subHeadingContainer}>
                        <Text style={styles.subHeading}>Trending Manga</Text>
                    </View>
                    <FlatList
                        data={this.state.trendingMangaList}
                        keyExtractor={keyExtractor}
                        renderItem={this.renderPreviewCard}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        inverted={false}
                        extraData={this.state}
                    />

                    <View style={styles.subHeadingContainer}>
                        <Text style={styles.subHeading}>Top On-going Manga</Text>
                    </View>
                    <FlatList
                        data={this.state.ongoingMangaList}
                        keyExtractor={keyExtractor}
                        renderItem={this.renderPreviewCard}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        inverted={false}
                        extraData={this.state}
                    />

                    <View style={styles.subHeadingContainer}>
                        <Text style={styles.subHeading}>Most Popular Manga</Text>
                    </View>
                    <FlatList
                        data={this.state.mostPopularMangaList}
                        keyExtractor={keyExtractor}
                        renderItem={this.renderPreviewCard}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        inverted={false}
                        extraData={this.state}
                    />

                    {/* <View style={styles.subHeadingContainer}>
                        <Text style={styles.subHeading}>Upcoming Manga</Text>
                    </View>
                    <FlatList
                        data={this.state.upcomingMangaList}
                        keyExtractor={keyExtractor}
                        renderItem={this.renderPreviewCard}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        inverted={false}
                        extraData={this.state}
                    /> */}
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
        zIndex: 1,
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