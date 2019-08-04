import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import PreviewCard from '../PreviewCard';
import PropTypes from 'prop-types';

const keyExtractor = item => item.title;

export default class SimalarTab extends React.Component {

    static propTypes = {
        SimilarList: PropTypes.array,
        navigation: PropTypes.any
    }


    renderPreviewCard = (data) => {
        const { navigation: { navigate } } = this.props;
        console.log(data.item)
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
        const { SimilarList } = this.props;
        return (
            <View style={styles.container}>
                    <FlatList
                        data={SimilarList}
                        keyExtractor={keyExtractor}
                        renderItem={this.renderPreviewCard}
                        numColumns={3}
                        showsHorizontalScrollIndicator={false}
                        inverted={false}
                        extraData={this.state}
                    />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#262626",
        marginVertical: 10,
    },
})