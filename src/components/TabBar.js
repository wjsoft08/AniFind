import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

const keyExtractor = item => item.name.toString();

export default class TabBar extends React.Component {
    static propTypes = {
        TabPressed: PropTypes.func,
    }

    static defaultProps = {
        feedTabPressed: () => { },
        wildeyeTabPressed: () => { },
        forecastTabPressed: () => { },
    };

    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                { id: 1, name: 'About', selected: true },
                { id: 2, name: 'Details', selected: false },
                { id: 3, name: 'Characters', selected: false },
                { id: 4, name: 'Similar', selected: false },
            ]
        };
    }

    /**
     * Make every tab selected false then make the recently clicked one true
     */
    tabPressed = (item) => {
        const { tabs } = this.state;
        tabs.forEach(this.setSelectedFalse);
        item.selected = true;
        this.setState({
            tabs: [...tabs],
        });
        this.props.TabPressed(item.name);
    };

    setSelectedFalse = (item) => {
        item.selected = false;
    };

    renderTabList = ({ item }) => {
        if (item.selected) {
            return (
                <View key={item.id} style={styles.imageContainer}>
                    <TouchableOpacity style={[styles.fieldButton, { backgroundColor: "#262626", borderBottomColor: "white", borderBottomWidth: 2 }]} onPress={() => this.tabPressed(item)}>
                        <Text style={[styles.buttonText,]}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View key={item.id} style={styles.imageContainer}>
                <TouchableOpacity style={[styles.fieldButton, { backgroundColor: "#262626" }]} onPress={() => this.tabPressed(item)}>
                    <Text style={styles.buttonText}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return (
            <FlatList
                data={this.state.tabs}
                renderItem={this.renderTabList}
                keyExtractor={keyExtractor}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}
            />
        )
    }
}

const styles = StyleSheet.create({
    selectionBar: {
        margin: 5,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    fieldButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,

    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
})