import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';
import { Tooltip } from 'react-native-elements';


const keyExtractor = item => item.id.toString();

export default class MyListCard extends React.Component {

    state = {
        editVisible: false,
        editText: '',
        showImageModal: false,
        pickedImage: '',
    }

    render() {
        const { Title, Rating, Type, Status, ImageURI, CardPressed, DeletePressed } = this.props
        return (

            <TouchableOpacity onPress={CardPressed} underlayColor={"white"} style={styles.cardsContainer} >
                <View style={[styles.cardBox]}>
                    <Image
                        source={{ uri: ImageURI, }}
                        style={[styles.avatar, { backgroundColor: 'white' }]} />
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text numberOfLines={2} style={[styles.titleText]}>{Title}</Text>
                        <Text style={[styles.infoText]}>{Type}</Text>
                        <Text style={[styles.infoText]}>{Rating}%</Text>
                        <Text style={[styles.infoText]}>Status: {Status}</Text>
                    </View>
                    <TouchableOpacity onPress={DeletePressed} underlayColor={"white"} style={styles.deleteButton} >
                        <AntDesign name="delete" size={24} color="#ff3c00" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }
}


MyListCard.propTypes = {
    Title: PropTypes.string.isRequired,
    Rating: PropTypes.string,
    Type: PropTypes.string,
    ImageURI: PropTypes.string,
    CardPressed: PropTypes.func,
    DeletePressed: PropTypes.func,
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: 16,
        marginTop: 10,
        marginHorizontal: 10,
        color: 'white'
    },
    cardsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    cardBox: {
        flex: 1,
        flexDirection: "row",
        overflow: 'hidden',
        borderBottomColor: "#bbb",
        backgroundColor: "#262626",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#555',
        borderWidth: 2,
        backgroundColor: '#1f1f1f',
        marginLeft: 10,
        marginVertical: 5,
    },
    titleText: {
        fontSize: 16,
        marginTop: 10,
        marginHorizontal: 10,
        color: 'white'
    },
    infoText: {
        fontSize: 14,
        marginHorizontal: 10,
        color: '#a8a8a8',
    },
    deleteButton: {
        margin: 10,
    }
})