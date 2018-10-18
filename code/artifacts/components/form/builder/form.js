import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Form, View, Text } from "native-base";
import { InputGroupComponent, TextInputComponent, PickerListComponent, TextField, } from "./components";
import { translate } from "react-i18next";
class MyForm extends Component {
    constructor(props) {
        super(props);
    }
    _focusNextField(index) {
        const { formMetadata: { fields } } = this.props;
        if (index < fields.length - 1) {
            const ref = this.refs[fields[index + 1].name];
            if (ref.getWrappedInstance) {
                ref.getWrappedInstance().focus();
            }
            else if (ref.ref &&
                ref.ref.wrappedInstance &&
                ref.ref.wrappedInstance.ref &&
                ref.ref.wrappedInstance.ref.getWrappedInstance &&
                ref.ref.wrappedInstance.ref.getWrappedInstance().focus) {
                ref.ref.wrappedInstance.ref.getWrappedInstance().focus();
            }
        }
    }
    render() {
        const { formMetadata: { fields } } = this.props;
        return (<View>
        <Form style={{ width: "100%" }}>
          {fields.map((field, index) => {
            switch (field.type) {
                case "inputGroup":
                    return (<InputGroupComponent {...this.props} key={index} ref={field.name} groupFinished={() => {
                        this._focusNextField(index);
                    }} settings={field}/>);
                case "number":
                case "text":
                case "password":
                    return (<TextField {...this.props} name={field.name} key={index} metadata={field} ref={field.name} onSubmit={() => this._focusNextField(index)} component={TextInputComponent}/>);
                case "picker-list":
                    return (<PickerListComponent {...this.props} {...field} key={index} ref={field.name} items={field.options}/>);
                default:
                    return <Text key={index}>Not implemented yet ({field.type})!</Text>;
            }
        })}
        </Form>
      </View>);
    }
}
export const FormComponent = reduxForm({ form: "Form" })(translate("common")(MyForm));
