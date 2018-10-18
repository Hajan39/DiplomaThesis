import { StyleSheet } from "react-native";
import colors from "../../../../theme/variables/commonColor";
export const styles = StyleSheet.create({
    listItem: {
        marginLeft: 0,
        paddingBottom: 10,
    },
    errorStyle: {
        color: colors.inputErrorBorderColor,
        fontSize: 16,
    },
    successStyle: {
        color: colors.inputSuccessBorderColor,
        fontSize: 16,
    },
});
