import React from 'react';
import { translate } from "react-i18next";
import { List, ListItem, Container, Header, Left, Button, Icon, Body, Title, Right, Content, CheckBox, View, Text, } from 'native-base';
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
const customerList = require("../../../../assets/mockdata/example.customers.json");
class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFriendId: []
        };
        for (let s = 0; s < customerList.length; s++) {
            if (customerList[s].checked) {
                this.state.selectedFriendId.push(customerList[s].section);
            }
        }
    }
    onCheckBoxPress(id) {
        let tmp = this.state.selectedFriendId;
        if (tmp.includes(id)) {
            tmp.splice(tmp.indexOf(id), 1);
        }
        else {
            tmp.push(id);
        }
        this.setState({
            selectedFriendId: tmp
        });
    }
    render() {
        const { t } = this.props;
        return (<Container>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
							<Icon name="menu"/>
						</Button>
					</Left>
					<Body>
						<Title>{this.props.t("sidebar:navigation:Customers")}</Title>
					</Body>
					<Right>
						<Button transparent>
							<Icon name="search" onPress={() => alert(t("common:NOT_AVAILABLE"))}/>
						</Button>
					</Right>
				</Header>
				<Content>
					<List>
						{customerList.map((item, i) => {
            return (<ListItem button key={i}>
									<CheckBox checked={this.state.selectedFriendId.includes(item.section) ? true : false} onPress={() => this.onCheckBoxPress(item.section)}/>
									<Body>
										<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CustomerDetail', item)}>
											<View>
												<Text style={styles.header}> {item.fullName} ({item.section}) </Text>
												<Text style={styles.address} note>{item.address}</Text>
											</View>
										</TouchableWithoutFeedback>
									</Body>
									<Right>
										<Text note>{item.lastVisit}</Text>
									</Right>
								</ListItem>);
        })}
					</List>
				</Content>
			</Container>);
    }
}
const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        textAlign: 'left'
    },
    address: {
        textAlign: 'left'
    }
});
export const CustomersScreen = translate("customers")(Customers);
