module.exports = {
    isNotEmpty(str) {
        return (typeof str === "string" && str.trim() !== "")
    }
}
