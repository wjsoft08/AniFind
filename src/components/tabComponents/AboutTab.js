import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class AboutTab extends React.Component {

    static propTypes = {
        ItemInfo: PropTypes.object,
    }

    render() {
        const { ageRating, ageRatingGuide, startDate, endDate, nextRelease, episodeCount, episodeLength, nsfw, synopsis } = this.props.ItemInfo.data.attributes;
        return (
            <View style={styles.container}>
                <Text numberOfLines={1} style={styles.title}>Synopsis</Text>
                <Text numberOfLines={0} style={styles.subHeading}>{synopsis}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#262626",
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '500',
        color: 'white',
        marginVertical: 10,
        // borderBottomColor: "white",
        // borderBottomWidth: 2
    },
    subHeading: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#a8a8a8',
        alignSelf: 'flex-start'
    }
})