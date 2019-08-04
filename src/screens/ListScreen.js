import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Animated, FlatList } from 'react-native';
import PreviewCard from './../components/PreviewCard';
import { Constants } from 'expo'
import PropTypes from 'prop-types';

const keyExtractor = item => item.title;

export default class ListScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
            scrollY: new Animated.Value(0),
            responseList: [],
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


            // Most Popular Anime
            callResponse = await fetch(this.props.navigation.state.params.Uri)
                .then((callResponse) => callResponse.json());
            let responseList = [];
            callResponse.data.forEach((data) => {
                responseList.push({
                    title: data.attributes.canonicalTitle, 
                    rating: data.attributes.averageRating, 
                    type: data.type, 
                    imageURI: data.attributes.posterImage.small, 
                    episodeCount: data.attributes.episodeCount
                })
            })


            this.setState({
                responseList: responseList,
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
        const { Title, SubtTitle, Type, Uri } = this.props.navigation.state.params;
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
                            {Title}
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
                        <Text style={styles.title}>{Title}</Text>
                    </View>

                    <View style={styles.subHeadingContainer}>
                        <Text style={styles.subHeading}>{SubtTitle}</Text>
                    </View>
                    <FlatList
                        data={this.state.responseList}
                        keyExtractor={keyExtractor}
                        renderItem={this.renderPreviewCard}
                        numColumns={3}
                        showsHorizontalScrollIndicator={false}
                        inverted={false}
                        extraData={this.state}
                    />
                </Animated.ScrollView>
            </View >
        );
    }
}

PreviewCard.propTypes = {
    Title: PropTypes.string,
    SubtTitle: PropTypes.string,
    Type: PropTypes.string,
    Uri: PropTypes.string,
};

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