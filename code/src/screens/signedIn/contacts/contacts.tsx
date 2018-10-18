import React, { Component } from 'react';

import { translate, InjectedTranslateProps } from "react-i18next";
import { NavigationScreenProps, StackNavigator } from "react-navigation";
import {
    Tabs,
    Container,
    Header,
    Tab,
    List, ListItem, Body, Text, Icon, Button, Left, Title, Right
} from 'native-base';

import Communications from 'react-native-communications';

import { StyleSheet, Image, TouchableOpacity } from "react-native";

const agencyContacts = require("../../../../assets/mockdata/example.agencyContacts.json");
const otherContacts = require("../../../../assets/mockdata/example.otherContacts.json");

interface Props extends InjectedTranslateProps, NavigationScreenProps { }

class Contacts extends React.Component<Props> {
<<<<<<< HEAD
    MapContact(item, key) {
        return (
            <ListItem key={item.key}>
                <Icon name={item.iconName} />
                <Body>
                    <Text>{item.fullName}</Text>
                    <Text note>{item.position}</Text>
                </Body>
                <Button primary transparent onPress={() => Communications.phonecall(item.phoneNumber, true)}>
                    <Icon name="md-call" />
                </Button>

                <Button warning transparent onPress={() => Communications.text(item.phoneNumber, "")}>
                    <Icon name="md-chatboxes" />
                </Button>
            </ListItem>
        );
    }

=======
>>>>>>> origin/JanSchool
    render() {
        const { t } = this.props;

        return (
            <Container>
<<<<<<< HEAD
                <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.props.t("TITLE")}</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="md-refresh" />
                        </Button><Button transparent>
                            <Icon name="md-funnel" />
                        </Button>
                    </Right>
                </Header>
=======
               <Header hasTabs>
					<Left>
						<Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
							<Icon name="menu" />
						</Button>
					</Left>
					<Body>
						<Title>{this.props.t("TITLE")}</Title>
					</Body>
					<Right>
						<Button transparent>
							<Icon name="md-refresh" onPress={() => this.props.navigation.navigate("Contacts")}/>
						</Button><Button transparent>
							<Icon name="md-funnel" onPress={() => alert(t("common:NOT_AVAILABLE"))} />
						</Button>
					</Right>
				</Header>
>>>>>>> origin/JanSchool
                <Tabs initialPage={0}>
                    <Tab heading={this.props.t("agency")}>
                        <List>
                            {agencyContacts.map((item, index) => {
                                return this.MapContact(item, index);
                            })}
                        </List>
                    </Tab>
                    <Tab heading={this.props.t("all")}>
                        <List>{otherContacts.map((item, index) => {
                            return this.MapContact(item, index);

                        })}
                            {agencyContacts.map((item, index) => {
                                return this.MapContact(item, index);
                            })}
                        </List>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}



export const ContactsScreen = translate("contacts")(Contacts);
