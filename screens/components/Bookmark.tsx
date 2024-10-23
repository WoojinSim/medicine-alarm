import AsyncStorage from "@react-native-async-storage/async-storage";
import { pillSearchInterface } from "../../interfaces";

// favlist 반환
const loadData = async (): Promise<pillSearchInterface[]> => {
  try {
    let favListRaw: string | null = await AsyncStorage.getItem("favorites_pill");
    if (favListRaw) {
      const favList: pillSearchInterface[] = JSON.parse(favListRaw);
      return favList;
    } else {
      return [];
    }
  } catch (e) {
    throw e;
  }
};

// 입력받은 pillItem 저장
const storeData = async (pillItem: pillSearchInterface) => {
  try {
    let favs = await loadData();
    favs.push(pillItem);
    await AsyncStorage.setItem("favorites_pill", JSON.stringify(favs));
    console.log(
      `🔵 PillSearchScreen.tsx\t'${pillItem.itemSeq}|${pillItem.itemName}|${pillItem.entpName}' 북마크 정상적으로 추가됨.`
    );
  } catch (error) {
    console.log(error);
  }
};

// 입력받은 pillItem이 존재한다면 true, 아니라면 false 반환
const retrieveData = async (pillItem: pillSearchInterface) => {
  try {
    let favs = await loadData();
    if (favs.length > 0) {
      if (
        favs.find(function (data) {
          return data == pillItem;
        }) != undefined
      )
        return true;
      else return false;
    } else return false;
  } catch (error) {
    console.log(error);
  }
};

// 입력받은 pillItem을 저장소에서 삭제
const removeData = async (pillItem: pillSearchInterface) => {
  try {
    let favs = await loadData();
    const idx = favs.indexOf(pillItem);
    favs.splice(idx, 1);

    await AsyncStorage.setItem("favorites_pill", JSON.stringify(favs));
    console.log(
      `🔵 PillSearchScreen.tsx\t'${pillItem.itemSeq}|${pillItem.itemName}|${pillItem.entpName}' 북마크 정상적으로 제거됨.`
    );
  } catch (error) {
    console.log(error);
  }
};

export { loadData };
export { storeData };
export { retrieveData };
export { removeData };
