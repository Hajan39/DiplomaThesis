import React, { Component } from "react";
import { translate } from "react-i18next";
import { View, ListItem, Text } from "native-base";
import { ServerDefinedExpression, } from "../../../../models";
import { styles } from "./styles";
import { TextInputComponent, TextField } from "./text-input";
import { PickerListComponent } from "./picker-list";
import * as validators from "../validators";
import * as normalizers from "../normalizers";
class InputGroupComp extends Component {
    constructor(props) {
        super(props);
    }
    renderGroupHeader() {
        const { t, formName, settings: { name, label } } = this.props;
        // initialize title from metadata, or tries to translate it by key, with fallback to group name
        const title = label || t(`forms:${formName}:group:${name}`) || name;
        return (<ListItem itemDivider itemHeader style={styles.listItem}>
        <Text>{title}</Text>
      </ListItem>);
    }
    /**
     * Focus the first field in the input group
     */
    focus() {
        this._focusNextField(-1);
    }
    _focusNextField(index) {
        const { settings: { fields } } = this.props;
        if (index < fields.length - 1) {
            this.refs[fields[index + 1].name].ref.wrappedInstance.ref
                .getWrappedInstance()
                .focus();
        }
        else {
            if (this.props.groupFinished) {
                this.props.groupFinished();
            }
        }
    }
    getValidators(field) {
        if (field.validators && field.validators.length) {
            const fieldValidators = field.validators.map(x => {
                if (ServerDefinedExpression.isExpression(x)) {
                    return validators.regexp(x);
                }
                else {
                    return validators[x];
                }
            });
            return fieldValidators.filter(x => !!x);
        }
        return null;
    }
    getNormalizer(field) {
        if (!!field.normalizer) {
            if (!!field.normalizer.parameters)
                return normalizers[field.normalizer.name](field.normalizer.parameters);
            return normalizers[field.normalizer.name];
        }
        return null;
    }
    renderChildren() {
        const { settings: { fields } } = this.props;
        return (<View style={styles.listItem}>
        {fields.map((field, index) => {
            switch (field.type) {
                case "number":
                case "text":
                case "password":
                    return (<TextField {...this.props} name={field.name} groupName={this.props.settings.name} key={index} metadata={Object.assign({}, field, { returnKey: index < fields.length - 1 ? "next" : "done" })} withRef ref={field.name} onSubmit={() => this._focusNextField(index)} validate={this.getValidators(field)} normalize={this.getNormalizer(field)} component={TextInputComponent}/>);
                case "picker-list":
                    return (<PickerListComponent {...this.props} {...field} key={index} items={field.options}/>);
                default:
                    return null;
            }
        })}
      </View>);
    }
    render() {
        return (<View>
        {this.renderGroupHeader()}
        {this.renderChildren()}
      </View>);
    }
}
export const InputGroupComponent = translate("common", { withRef: true })(InputGroupComp);
