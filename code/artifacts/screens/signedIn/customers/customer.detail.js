import React from "react";
import { translate } from "react-i18next";
import { Container, Header, Left, Button, Icon, Body, Title, Right, Content, ListItem, List, Text, } from "native-base";
import Communications from 'react-native-communications';
const customerList = require("../../../../assets/mockdata/example.customerDetail.json");
const url = "https://www.google.com/maps/place/";
class CustomerDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: null
        };
        const sec = this.props.navigation.state.params.section;
        for (let i = 0; i < customerList.length; i++) {
            if (customerList[i].section == sec) {
                this.state.contact = customerList[i];
                break;
            }
        }
    }
    render() {
        var custDetail = this.props.navigation.state.params;
        return (<Container>
        <Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="arrow-back"/>
						</Button>
					</Left>
					<Body>
						<Title>{custDetail.fullName}</Title>
					</Body>
          <Right>
              <Button transparent onPress={() => this.forceUpdate()}>
							<Icon name="md-refresh"/>
              </Button>
            </Right>
				</Header>
				<Content>
          <List>
          <ListItem icon>
              <Left>
                <Icon name="md-person"/>
              </Left>
              <Body>
                <Text>{custDetail.fullName}</Text>
              </Body>
          
            </ListItem>
            <ListItem icon onPress={() => Communications.phonecall(this.state.contact.phone, true)}>
              <Left>
                <Icon name="md-call"/>
              </Left>
              <Body>
                <Text>{this.state.contact.phone}</Text>
              </Body>
          
            </ListItem>

            <ListItem icon>
              <Left>
                <Icon name="md-barcode"/>
              </Left>
              <Body>
                <Text>{custDetail.section}</Text>
              </Body>
          
            </ListItem>
            <ListItem icon onPress={() => Communications.web(url + custDetail.address)}>
              <Left>
                <Icon name="md-home"/>
              </Left>
              <Body>
                <Text>{custDetail.address}</Text>
              </Body>
              
            </ListItem>
           
            <ListItem icon onPress={() => Communications.web(url + this.state.contact.address)}>

              <Left>
                <Icon name="md-globe"/>
              </Left>
              <Body>
                <Text>{this.state.contact.address}</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="md-contacts"/>
              </Left>
              <Body>
                <Text>{custDetail.lastVisit}</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="md-book"/>
              </Left>
              <Body>
                <Text>{this.state.contact.agreementNumber} - {this.state.contact.dateOfAgreement}</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
			</Container>);
    }
}
export const CustomerDetailScreen = translate("customerDetail")(CustomerDetail);
