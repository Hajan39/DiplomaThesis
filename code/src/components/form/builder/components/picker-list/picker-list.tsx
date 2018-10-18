import React from "react";
import { List, ListItem, View, Text } from "native-base";
import { Left, Right } from "native-base";
import { translate, InjectedTranslateProps } from "react-i18next";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import { styles as StandardizedFormStyles } from "../styles";
import commonColors from "../../../../../theme/variables/commonColor";

import { IPickerOptions } from "../../../../../models";
import { Field, WrappedFieldProps, BaseFieldProps } from "redux-form";

interface Props<TValue> extends InjectedTranslateProps {
  value?: TValue;
  name: string;
  items: IPickerOptions[];
  onSelect?: (value: TValue) => void;
}

class PickerList<TValue extends any> extends React.Component<Props<TValue>, { picked?: TValue }> {
  constructor(props: Props<TValue>) {
    super(props);
    this.state = { picked: props.value ? props.value : undefined };
  }

  renderListItems(p: BaseFieldProps & WrappedFieldProps, onSelect: (value: any) => void) {
    return this.props.items.map((item, index) => {
      const picked: boolean = p.input.value === item.value;
      return (
        <ListItem
          key={index}
          onPress={() => onSelect(item.value)}
          style={picked ? styles.selected : styles.normal}>
          <Left>
            <Text>{item.label}</Text>
          </Left>
          <Right>
            {picked ? (
              <FAIcon style={StandardizedFormStyles.successStyle} name="check-circle" />
            ) : null}
          </Right>
        </ListItem>
      );
    });
  }

  render() {
    const { t } = this.props;
    return (
      <Field
        name={this.props.name}
        component={(p: BaseFieldProps & WrappedFieldProps) => (
          <View>
            {this.renderListItems(p, value => {
              p.input.onChange(value);
            })}
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: "rgba(0,50,0,0.3)",
    marginLeft: 0,
    paddingLeft: 17,
  },
  normal: {
    marginLeft: 0,
    paddingLeft: 17,
  },
});

export const PickerListComponent = translate("common")(PickerList);
