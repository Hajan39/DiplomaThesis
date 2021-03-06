import React, { Component } from 'react';

import { translate, InjectedTranslateProps } from "react-i18next";
import { NavigationScreenProps, StackNavigator } from "react-navigation";
import {
	List,
	ListItem,
	Container,
	Header,
	Left,
	Button,
	Icon,
	Body,
	Title,
	Right,
	Content,
	Switch,
	Card,
	Thumbnail,
	CardItem,
	View,
	Text,
} from 'native-base';
import { StyleSheet, Image } from "react-native";

const logo = require("./../../../../assets/images/settings.jpeg");

interface Props extends InjectedTranslateProps, NavigationScreenProps { }

class Settings extends React.Component<Props> {
	
	state = {
		switch1Value: false,
		switch2Value: false,
	 }
	

	 toggleSwitch1 = (value) => {
		this.setState({switch1Value: value})
	 }
	 toggleSwitch2 = (value) => {
		this.setState({switch2Value: value})
	 }

	render() {
	
		const { t } = this.props;
		return (
			<Container>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
							<Icon name="menu" />
						</Button>
					</Left>
					<Body>
						<Title>{t("sidebar:navigation:Settings")}</Title>
					</Body>
					<Right />
				</Header>
				<Content >
					<Card style={{ flex: 0 }}>
						<CardItem>
							<Left>
								<Icon name="md-settings" />
								<Body>
									<Text>{t("settings:synchro:header")}</Text>
									<Text note>{t("settings:synchro:headerNote")}</Text>
								</Body>
							</Left>
						</CardItem>
						<CardItem>
							<Body>
								<Image source={logo} style={{ height: 200, flex: 1 }} />
								<Text>
								{t("settings:synchro:description")}
                    </Text>
							</Body>
						</CardItem>
						<CardItem>
							<Icon name="md-person" />
							<Text>{t("settings:synchro:basicInfo")}</Text>
							<Right>
								<Switch onValueChange = {this.toggleSwitch1}
            value = {this.state.switch1Value}/>
							</Right>
						</CardItem>
						<CardItem>
							<Icon name="md-person-add" />
							<Text>{t("settings:synchro:detailInfo")}</Text>
							<Right>
								<Switch onValueChange = {this.toggleSwitch2}
            value = {this.state.switch2Value}/>
							</Right>
						</CardItem>
					</Card>
				</Content>
			</Container>
		);
	}
}

export const SettingsScreen = translate("settings")(Settings);
