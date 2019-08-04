import { StyleSheet, Text, View, Animated, Image, AsyncStorage, TouchableOpacity, ActivityIndicator, Dimensions, ToastAndroid, Linking } from 'react-native';
import React from 'react'
import { Constants } from 'expo';
import TabBar from '../components/TabBar';
//import { CacheManager } from "react-native-expo-image-cache";
import { FontAwesome } from '@expo/vector-icons';
import AboutTab from '../components/tabComponents/AboutTab';
import DetailsTab from '../components/tabComponents/DetailsTab';
import SimilarTab from '../components/tabComponents/SimilarTab';


export default class MoreInfoScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        const { id, type, } = this.props.navigation.state.params;

        this.state = {
            scrollY: new Animated.Value(0),
            isLoading: true,
            id: id,
            type: type,
            selectedTab: 'ndvi',
            itemInfo: {},
            selectedTab: 'About',
            similarList: [],
        };
    }

    componentDidMount() {
        const { id, type, } = this.props.navigation.state.params;
        const callApi = async () => {
            infoResponse = await fetch(`https://kitsu.io/api/edge/${type}/${id}`)
                .then((infoResponse) => infoResponse.json());



            genreResponse = await fetch(`https://kitsu.io/api/edge/${type}/${id}/genres`)
                .then((genreResponse) => genreResponse.json());

            similarResponse = await fetch(`https://kitsu.io/api/edge/${type}?page[limit]=10&filter[genres]=${genreResponse.data[0].attributes.name}&filter[genres]=${genreResponse.data[1].attributes.name}&filter[genres]=${genreResponse.data[2].attributes.name}&sort=-averageRating,popularityRank`)
                .then((similarResponse) => similarResponse.json());

            let similarList = [];
            similarResponse.data.forEach((data) => {
                similarList.push({
                    id: data.id,
                    type: data.type,
                    title: data.attributes.canonicalTitle,
                    rating: data.attributes.averageRating,
                    imageURI: data.attributes.posterImage.small,
                    episodeCount: data.attributes.episodeCount
                })
            })

            this.setState({
                itemInfo: infoResponse,
                isLoading: false,
                similarList: similarList,
            })

        }
        callApi();
    }

    tabPressed = (tabName) => {


        this.setState({
            selectedTab: tabName,
        });
    }

    playYoutube = async () => {
        const { id, type, itemInfo } = this.state;
        try {
            Linking.canOpenURL("https://www.youtube.com/watch?v=" + itemInfo.data.attributes.youtubeVideoId).then(function (n) {
                if (n) {
                    Linking.openURL("https://www.youtube.com/watch?v=" + itemInfo.data.attributes.youtubeVideoId)
                }
            });
            } catch (error) {
            console.log(error)
        }
    }

    addToMyList = async () => {
        const { id, type, itemInfo } = this.state;
        const saveInfo = { id: itemInfo.data.id, type: itemInfo.data.type, attributes: itemInfo.data.attributes };
        try {
            await AsyncStorage.setItem(`${type}_${id}_${itemInfo.data.attributes.canonicalTitle}`, JSON.stringify(saveInfo));
            ToastAndroid.showWithGravityAndOffset(
                `${itemInfo.data.attributes.canonicalTitle} has been added to list`,
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                150
            );
        } catch (error) {
            console.log(error)
        }
    }


    renderSelectedTab(selectedTab) {
        const { id, type, isLoading, itemInfo, similarList } = this.state;
        const { navigate } = this.props.navigation;
        switch (selectedTab) {
            case 'About':
                return (
                    <AboutTab
                        ItemInfo={itemInfo}
                    />
                );
            case 'Details':
                return (
                    <DetailsTab
                        ItemInfo={itemInfo}
                    />
                );
            case 'Characters':
                return (
                    <View>
                        <Text numberOfLines={1} style={styles.subHeading}>Status: {itemInfo.data.attributes.status}</Text>
                    </View>
                );
            case 'Similar':
                return (
                    <SimilarTab
                        SimilarList={similarList}
                        navigation={navigate}
                    />
                );
            default:
                return null;
        };
    }

    render() {
        const headerContentOp = this.state.scrollY.interpolate({
            inputRange: [0, 28, 38],
            outputRange: [0, 0, 1]
        });

        const { id, selectedTab, type, isLoading, itemInfo } = this.state;


        return (
            <View style={styles.container}>
                {isLoading ?
                    <View>
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <Animated.View
                            style={styles.animatedHeaderContainer}
                        >
                            <Animated.View style={{ zIndex: 3, opacity: headerContentOp, flexDirection: "column", alignItems: "center", justifyContent: "flex-start", }} >
                                <Text style={styles.animatedHeaderTitle}>
                                    {itemInfo.data.attributes.canonicalTitle}
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
                                <Image
                                    style={styles.imageStyle}
                                    source={{ uri: itemInfo.data.attributes.posterImage.small }}
                                />
                                <View style={styles.previewInfoContainer}>
                                    <View style={styles.previewInfoTextContianer}>
                                        <Text numberOfLines={2} style={styles.title}>{itemInfo.data.attributes.canonicalTitle}</Text>
                                        <Text numberOfLines={1} style={styles.subHeading}>Rating: {itemInfo.data.attributes.averageRating}</Text>
                                        <Text numberOfLines={1} style={styles.subHeading}>Status: {itemInfo.data.attributes.status}</Text>
                                        <Text numberOfLines={1} style={styles.subHeading}>{itemInfo.data.attributes.showType}</Text>
                                    </View>
                                    <View style={styles.previewInfoTextContianer}>
                                        <TouchableOpacity onPress={this.playYoutube} style={styles.addMyListButton}>
                                            <FontAwesome name="youtube-play" size={26} style={{ color: 'red', marginRight: 8 }} />
                                            <Text numberOfLines={1} style={styles.text}>Watch Trailer</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.addToMyList} style={styles.addMyListButton}>
                                            <FontAwesome name="plus-square-o" size={26} style={{ color: 'white', marginRight: 5 }} />
                                            <Text numberOfLines={1} style={styles.text}>Add to My List</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TabBar
                                TabPressed={this.tabPressed}
                            />
                            {this.renderSelectedTab(selectedTab)}
                        </Animated.ScrollView>
                    </View >
                }
            </View>
        )
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
        paddingHorizontal: 10,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 56 + Constants.statusBarHeight,
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        color: 'white',
        marginVertical: 10,
    },
    imageStyle: {
        margin: 10,
        width: 150,
        height: 220,
    },
    previewInfoContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    subHeading: {
        fontSize: 18,
        fontWeight: 'normal',
        color: 'white',
        alignSelf: 'flex-start'
    },
    text: {
        fontSize: 14,
        paddingTop: 2,
        fontWeight: 'normal',
        color: 'white',
        alignSelf: 'flex-start'
    },
    previewInfoTextContianer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    addMyListButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
})