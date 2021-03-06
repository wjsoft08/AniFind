import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import PreviewCard from './PreviewCard';
import Constants from 'expo-constants';


const keyExtractor = item => item.id.toString();

export default class CategoryPreview extends React.Component {

    constructor(props) {
        super(props);
    }

    renderPreviewCard = (data) => {
        const { Navigation } = this.props;
        return (
            <PreviewCard
                Title={data.item.title}
                Rating={data.item.rating}
                Type={data.item.type}
                ImageURI={data.item.imageURI}
                Episodes={data.item.episodeCount}
                CardPressed={() => Navigation.navigate("MoreInfoScreen", {
                    id: data.item.id,
                    type: data.item.type,
                    Navigation: Navigation,
                })}
            />
        )
    }

    render() {
        const { Name, Data, Navigation, Type, SeeMoreLink } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.subHeadingContainer}>
                    <Text style={styles.subHeading}>{Name}</Text>
                    <TouchableOpacity onPress={() => Navigation.navigate("ListScreen", {
                        Title: Type,
                        SubtTitle: Name,
                        Type: Type,
                        Uri: SeeMoreLink,
                        Navigation: Navigation,
                    })}>
                        <Text style={styles.subHeading}>SEE MORE</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                        data={Data}
                        keyExtractor={keyExtractor}
                        renderItem={this.renderPreviewCard}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        inverted={false}
                        extraData={this.state}
                    />
            </View>
        );
    }
}


PreviewCard.propTypes = {
    Name: PropTypes.string.isRequired,
    Data: PropTypes.array,
    Type: PropTypes.string,
    SeeMoreLink: PropTypes.string,
    Navigation: PropTypes.any,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#262626",
    },
    titleContainer: {
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    //    marginTop: 56 + Constants.statusBarHeight,
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