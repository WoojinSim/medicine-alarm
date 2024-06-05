import AsyncStorage from "@react-native-async-storage/async-storage";

interface pillSearchInterface {
  /** 회사 이름 */
  entpName: string;
  /** 제품 이름 */
  itemName: string;
  /** 제품 시퀀스 */
  itemSeq: string;
  /** 효능 및 효과 */
  efcyQesitm: string;
  /** 사용 방법 */
  useMethodQesitm: string;
  /** 주의 경고 (선택 사항) */
  atpnWarnQesitm: string | null;
  /** 주의 사항 */
  atpnQesitm: string;
  /** 상호작용 (선택 사항) */
  intrcQesitm: string | null;
  /** 부작용 (선택 사항) */
  seQesitm: string | null;
  /** 보관 방법 */
  depositMethodQesitm: string;
  /** 개봉 날짜 */
  openDe: string;
  /** 업데이트 날짜 */
  updateDe: string;
  /** 제품 이미지 URL (선택 사항) */
  itemImage: string | null;
  /** 사업자 등록 번호 */
  bizrno: string;
}

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
    console.log("Bookmark Stored");
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
    console.log("Bookmark Removed");
  } catch (error) {
    console.log(error);
  }
};

export { pillSearchInterface };
export { loadData };
export { storeData };
export { retrieveData };
export { removeData };
