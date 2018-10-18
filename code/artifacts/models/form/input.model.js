export class ServerDefinedExpression {
    static isExpression(object) {
        return typeof object !== "string" && "regExp" in object;
    }
}
/**
 * Normalizer for input fields (like text/number)
 */
export class Normalizer {
    static isNormalizer(object) {
        return typeof object !== "string" && "regExp" in object;
    }
}
