import { StyleSheet, Dimensions} from "react-native";

const { width: screenWid, height: screenHei } = Dimensions.get("screen");

// 기존 컬러 코드
const searchButtonColor = "#C2C96D";

// 더 쨍한 버전
// const searchButtonColor = "#ACD31E";

// 기존 바탕색과 맞춤 
const listBackgroundColor = "#F2F2F2";
// const listBackgroundColoe = "#FFFFFF";

// 검색창
const searchBackgroundColor = "#FFFFFF";

export const listStyles = StyleSheet.create({
    container: {
        padding: 10,
        paddingBottom: 80,     // 리스트 하단이 잘려서 추가한 padding
        // backgroundColor: listBackgroundColor,
    },
    searchContainer: {
        backgroundColor: listBackgroundColor,
    },
    favListContainer: {
        padding: 15,
        backgroundColor: listBackgroundColor,
        height: screenHei,
        // flex: 1,
    },
    pharmacy: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    search: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        margin: 10,
        marginTop: 0,
        backgroundColor: searchBackgroundColor,
    },
    searchBtn: {
        backgroundColor: searchButtonColor,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
    },
    btnText: {
        color: "#000000",
        fontWeight: "600",
        textAlign: "center",
        fontSize: 20,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    openStat: {
        marginTop: 5,
        fontSize: 16,
        color: 'green',
    },
    closeStat: {
        marginTop: 5,
        fontSize: 16,
        color: 'red'
    }
});