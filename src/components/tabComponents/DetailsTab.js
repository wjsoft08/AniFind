import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class DetailsTab extends React.Component {

    static propTypes = {
        ItemInfo: PropTypes.object,
    }

    render() {
        const { titles, ageRating, ageRatingGuide, startDate, endDate, nextRelease, episodeCount, episodeLength, nsfw, synopsis } = this.props.ItemInfo.data.attributes;
        return (
            <View style={styles.container}>

                <View style={styles.detailContainer}>
                    <View style={styles.detailSeparation}>
                        <Text numberOfLines={1} style={styles.subHeading}>Title (jp)</Text>
                        <Text numberOfLines={1} style={styles.subHeading}>Rating</Text>
                        <Text numberOfLines={1} style={styles.subHeading}>FromTo</Text>
                        <Text numberOfLines={1} style={styles.subHeading}>Next Release</Text>
                        <Text numberOfLines={1} style={styles.subHeading}>Episodes</Text>
                        <Text numberOfLines={1} style={styles.subHeading}>Episode Length</Text>
                        <Text numberOfLines={1} style={styles.subHeading}>NSFW</Text>
                    </View>
                    <View style={styles.detailSeparation}>
                        <Text numberOfLines={1} style={styles.text}>{titles.ja_jp}</Text>
                        <Text numberOfLines={1} style={styles.text}>{ageRating} - {ageRatingGuide}</Text>
                        <Text numberOfLines={1} style={styles.text}>{startDate} to {endDate}</Text>
                        <Text numberOfLines={1} style={styles.text}>{nextRelease}</Text>
                        <Text numberOfLines={1} style={styles.text}>{episodeCount}</Text>
                        <Text numberOfLines={1} style={styles.text}>{episodeLength}min</Text>
                        <Text numberOfLines={1} style={styles.text}>{nsfw}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#262626",
        margin: 10,
        flexDirection: 'row',
    },
    detailContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
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
        color: 'white',
        alignSelf: 'flex-start'
    },
    text: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#a8a8a8',
        alignSelf: 'flex-start'
    },
    detailSeparation: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: 10,
    }
})