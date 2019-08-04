import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, } from 'react-native';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';
import { Tooltip } from 'react-native-elements';


const keyExtractor = item => item.id.toString();

export default class PreviewCard extends React.Component {

    state = {
        editVisible: false,
        editText: '',
        showImageModal: false,
        pickedImage: '',
    }

    render() {
        const { Title, Rating, Type, Episodes, ImageURI, CardPressed } = this.props
        return (
            <TouchableOpacity onPress={CardPressed} underlayColor={"white"} style={styles.cardsContainer} >
                <View style={[styles.cardBox]}>
                    <Image
                        // defaultSource={require("./../../assets/error-image-generic.png")}
                        source={{ uri: ImageURI, }}
                        style={[styles.previewImage]} />
                    <View style={styles.previewInfoContainer}>
                        <View style={styles.titleContainer}>
                            <Text numberOfLines={2} style={[styles.titleText]}>{Title}</Text>
                        </View>
                        <View style={styles.infoButtonContainer}>

                            <Tooltip 
                                popover={
                                    <View>
                                        <Text style={styles.titleText}>Rating: {Rating}%</Text>
                                        <Text style={styles.titleText}>Episodes: {Episodes}</Text>
                                    </View>
                                }
                                height={50}
                                withOverlay={false}
                                backgroundColor={"#757575"}
                            >
                                <Feather name="info" size={22} style={{ color: "#dbdbdb", }} />
                            </Tooltip>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}


PreviewCard.propTypes = {
    Title: PropTypes.string.isRequired,
    Rating: PropTypes.string,
    Type: PropTypes.string,
    ImageURI: PropTypes.string,
    CardPressed: PropTypes.func
};

const styles = StyleSheet.create({
    cardsContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    cardBox: {
        flex: 1,
        height: 175,
        width: 120,
        flexDirection: "column",
        borderRadius: 3,
        overflow: 'hidden',
        marginHorizontal: 5,
        backgroundColor: "#1f1f1f",
        marginBottom: 20,
    },
    previewImage: {
        width: 120,
        height: 135,
        backgroundColor: 'black',
    },
    titleText: {
        fontSize: 14,
        marginHorizontal: 10,
        color: 'white'
    },
    previewInfoContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    titleContainer: {
        flex: 1,
        height: 40,
        width: 90,
    },
    infoButtonContainer: {
        height: 40,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
})