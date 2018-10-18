import React, { Component } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Text, Header, Container, List, ListItem, Content, Left, Right, Icon, Body, Title, Button, } from "native-base";
import { translate } from "react-i18next";
import { Logout } from "../../../reducers/login";
import { answerAboutChanges, checkForUpdates, NEW_VERSION_AVAILABLE, } from "../../../reducers/toc";
const productTable = require("../../../../assets/mockdata/example.productTable.json");
class TableOfCharges extends Component {
    constructor(props) {
        super(props);
        this.createTable = () => {
            let table = [];
            // Outer loop to create parent
            for (let i = 0; i < 3; i++) {
                let children = [];
                //Inner loop to create children
                for (let j = 0; j < 5; j++) {
                    children.push(<td>{`Column ${j + 1}`}</td>);
                }
                //Create the parent and add the children
                table.push(<tr>{children}</tr>);
            }
            return table;
        };
        this.state = { isLoading: false, userAsked: false };
    }
    componentDidMount() {
        if (!this.props.toc) {
            this.props.checkForUpdates();
        }
    }
    componentWillReceiveProps(nextProps) {
        const { t } = this.props;
        if (nextProps.isLoading !== this.state.isLoading) {
            this.setState({ isLoading: nextProps.isLoading });
        }
        if (nextProps.tocState === NEW_VERSION_AVAILABLE) {
            if (!this.state.userAsked) {
                this.setState({ userAsked: true });
            }
        }
        else {
            this.setState({ userAsked: false });
        }
    }
    renderPost(item, i) {
        let row = [];
        row.push(<ListItem itemDivider key={i}><Text>{item.name}</Text></ListItem>);
        for (let count = 0; count < item.fields.length; count++) {
            let f = item.fields[count];
            row.push(<ListItem icon key={f.key}>
        <Left>
          <Icon name={f.iconName}/>
        </Left>
        <Body>
          <Text>{f.name}</Text>
        </Body>
        <Right />
      </ListItem>);
        }
        return row;
        ;
    }
    render() {
        const { t, toc } = this.props;
        return (<Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu"/>
            </Button>
          </Left>
          <Body>
            <Title>{t("sidebar:navigation:TableOfCharges")}</Title>
          </Body>
          <Right />
        </Header>
        <ScrollView refreshControl={<RefreshControl refreshing={this.state.isLoading} onRefresh={() => {
            this.setState({ isLoading: true });
            this.props.checkForUpdates();
        }}/>}>
          <Content padder>
            <List>
              {productTable.map((item, i) => {
            return (this.renderPost(item, i));
        })}
            </List>
          </Content>
        </ScrollView>
      </Container>);
    }
}
const mapStateToProps = (state) => ({
    toc: state.tableOfCharges.data,
    isLoading: state.tableOfCharges.isLoading,
});
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(Logout()),
    checkForUpdates: () => dispatch(checkForUpdates()),
    userResponse: (accepted) => dispatch(answerAboutChanges(accepted)),
});
export const ToCScreen = translate("common")(connect(mapStateToProps, mapDispatchToProps)(TableOfCharges));
