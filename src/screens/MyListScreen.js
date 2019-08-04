import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Animated, FlatList, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PreviewCard from '../components/PreviewCard';
import { Constants } from 'expo'

const keyExtractor = item => item.attributes.canonicalTitle;

export default class MyListScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
            scrollY: new Animated.Value(0),
            myAnimeList: [],
            myMangaList: [],
        };


    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
    }
    
    componentDidMount() {
        const loadData = async () => {
            try {
                let keys = await AsyncStorage.getAllKeys();
                let myAnimeList = [];
                let myMangaList = [];
                this.asyncForEach(keys, async (result) => {
                    let nameSplit = result.split("_");
                    try {
                        const value = await AsyncStorage.getItem(result);
                        if (value !== null) {
                            if(nameSplit[0] === "anime") {
                                myAnimeList.push(JSON.parse(value));
                            } else if (nameSplit[0] === "manga") {
                                myMangaList.push(JSON.parse(value));
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }
                  })

                  this.setState({
                    myAnimeList: myAnimeList,
                    myMangaList: myMangaList,
                  })
               
            } catch (error) {
                // Error saving data
            }

            // this.setState({
            //     responseList: responseList,
            // })
        }

        loadData();
    }


    renderPreviewCard = (data) => {
        console.log(data.item.attributes.canonicalTitle)
        return (
            <PreviewCard
                Title={data.item.attributes.canonicalTitle}
                Rating={data.item.attributes.averageRating}
                Type={data.item.type}
                ImageURI={data.item.attributes.posterImage.small}
                Episodes={data.item.attributes.episodeCount}
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
                            My List
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
                        <Text style={styles.title}>My List</Text>
                    </View>

                    <FlatList
                        data={this.state.myAnimeList}
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