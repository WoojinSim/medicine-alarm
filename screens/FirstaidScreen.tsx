import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, Button } from "react-native";

import Header from "./components/Header";

import FeatherIcons from "react-native-vector-icons/Feather";

import { generalStyles } from "./styles/generalStyle";
import { firstAidStyles } from "./styles/firstAidStyle";

/*
  시간상 싹 다 하드코딩으로 입력함
*/

const FirstaidScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean[]>(new Array(13).fill(false));

  const pressModalButton = (index: number) => {
    const array: boolean[] = new Array(13).fill(false);
    array[index] = true;
    setModalVisible(array);
  };

  useEffect(() => {
    console.log(`🔵 FirstaidScreen.tsx\t\t컴포넌트 로드됨.`);
  }, []);

  return (
    <View style={generalStyles.wrap}>
      {/* 심정지 응급처치 법 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible[0]}
        onRequestClose={() => setModalVisible(new Array(13).fill(false))} // Android의 뒤로 가기 버튼 누를 때 닫히는 동작
      >
        <View style={firstAidStyles.modalBackground}>
          <View style={firstAidStyles.modalContainer}>
            <TouchableOpacity style={firstAidStyles.modalCloseButton} onPress={() => setModalVisible(new Array(13).fill(false))}>
              <FeatherIcons name="x" size={30} color="black" />
            </TouchableOpacity>
            <Text style={firstAidStyles.modalTitle}>심정지 응급처치</Text>
            <ScrollView style={firstAidStyles.modalScrollView}>
              <Text style={firstAidStyles.modalTextBold}>1. 의식 확인</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                양어깨를 두르리며 말을 걸고 눈과 귀로 심정지 및 무호흡 유무를 확인한다. (반응과 호흡이 있으면 심정지 아님)
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                일반 구조자가 외상환자를 구조할 때에는 꼭 필요한 경우에만 환자를 이동시키도록 한다. 예) 건물에 화재가 발생한 경우
                등 현장이 안전하지 않은 상황
              </Text>
              <Text style={firstAidStyles.modalTextBold}>2. 도움 및 119신고 요청</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                주변사람에게(꼭 집어서) 119신고를 부탁하고 자동심장충격기를 요청한다.
              </Text>
              <Text style={firstAidStyles.modalTextBold}>3. 흉부압박점 찾기</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                먼저 환자의 가슴뼈의 아래쪽 1/2중앙에 한 손바닥을 올려 놓고 그 위에 다른 손을 겹친다.
              </Text>
              <Text style={firstAidStyles.modalTextBold}>4. 가슴(흉부)압박하기</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                분당 100 ~ 120회의 속도로, 성인 약 5cm 깊이로 압박, 압박과 이완의 시간은 같은 정도로 하고, 각각의 압박 후에는
                가슴이 완전히 올라오도록 해야 한다.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                * 압박 시 양팔을 쭉 편 상태에서 체중을 실어서 환자의 몸과 수직이 되게 눌러줘야 한다.
              </Text>
              <Text style={firstAidStyles.modalTextBold}>5. 인공호흡 2회 시행</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                먼저 머리를 젖혔던 손의 엄지와 검지로 환자의 코를 잡아 막는다. 코를 막고 구조자의 입을 완전히 밀착하여 정상호흡을
                약 1초 동안 2회 숨을 불어 넣는다.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>(인공호흡이 어려울 경우 가슴압박을 지속적으로 시행)</Text>
              <Text style={firstAidStyles.modalTextBold}>6. 가슴(흉부)압박과 인공호흡의 반복</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                이후에는 30회의 가슴압박과 2회의 인공호흡을 119구급대원이 현장에 도착할 때까지 반복해서 시행한다.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* 화상 응급처치 법 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible[1]}
        onRequestClose={() => setModalVisible(new Array(13).fill(false))} // Android의 뒤로 가기 버튼 누를 때 닫히는 동작
      >
        <View style={firstAidStyles.modalBackground}>
          <View style={firstAidStyles.modalContainer}>
            <TouchableOpacity style={firstAidStyles.modalCloseButton} onPress={() => setModalVisible(new Array(13).fill(false))}>
              <FeatherIcons name="x" size={30} color="black" />
            </TouchableOpacity>CPDi
            <Text style={firstAidStyles.modalTitle}>화상 응급처치</Text>
            <ScrollView style={firstAidStyles.modalScrollView}>
              <Text style={firstAidStyles.modalTextBold}>1. 환부 식히기</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                화상 부위를 찬물에 20분 이상 담가 열기를 식힌다. (흐르는 물 또는 물수건으로도 가능하다)
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>* 뜨거운 액체에 화상을 입은 경우 옷을 벗기지 않고 냉각시킨다.</Text>
              <Text style={firstAidStyles.modalTextBold}>2. 주의 사항</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                물집은 절대 터뜨리지 말고 로션, 된장, 간장, 소주 등도 절대 바르지 않는다
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                시계, 반지, 목걸이 등의 장신구는 피부가 부어오르기 전에 최대한 빨리 제거한다.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                화상 부위에 바세린이나 화상 거즈(깨끗한 거즈)로 덮어주고 붕대로 감아준다.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* 온열질환 응급처치 법 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible[2]}
        onRequestClose={() => setModalVisible(new Array(13).fill(false))} // Android의 뒤로 가기 버튼 누를 때 닫히는 동작
      >
        <View style={firstAidStyles.modalBackground}>
          <View style={firstAidStyles.modalContainer}>
            <TouchableOpacity style={firstAidStyles.modalCloseButton} onPress={() => setModalVisible(new Array(13).fill(false))}>
              <FeatherIcons name="x" size={30} color="black" />
            </TouchableOpacity>
            <Text style={firstAidStyles.modalTitle}>온열질환 응급처치</Text>
            <ScrollView style={firstAidStyles.modalScrollView}>
              <Text style={firstAidStyles.modalTextBold}>상태 파악</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                열에 장시간 노출될 경우 발생하는 질환으로 두통, 어지러움, 근육경련, 피로감, 의식저하 등의 증상이 나타납니다.
                온열질환의 종류는 열사병, 열탈진, 열경련, 열실신, 열부종 등이 있습니다.
              </Text>
              <Text style={firstAidStyles.modalTextBold}>1. 열사병</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                건조하고 뜨거운 피부(40℃ 초과)(땀이 나는 경우도 있음), 빠르고 강한 맥박, 심한 두통, 오한 등이 동반되는 질병
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>● 119에 즉시 신고하고 아래와 같이 조치합니다.</Text>
              <Text style={firstAidStyles.modalTextRegular}>● 환자를 시원한 장소로 옮깁니다.</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                ● 환자의 옷을 느슨하게 하고 환자의 몸에 시원한 물을 적셔 부채나 선풍기 등으로 몸을 식힙니다.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                ● 의식이 없는 환자에게 음료를 마시도록 하는 것은 위험하니 절대 금지합니다.
              </Text>

              <Text style={firstAidStyles.modalTextBold}>2. 열탈진</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                땀을 많이 흘림(과도한 발한), 차고 젖은 피부, 창백함, 체온은 크게 상승하지 않음(40℃ 이하), 극심한 무력감과 피로
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>● 시원한 곳 또는 에어컨이 있는 장소에서 휴식합니다.</Text>
              <Text style={firstAidStyles.modalTextRegular}>● 물을 섭취하여 수분을 보충해줍니다.</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                ※ 땀을 많이 흘렸을 경우에는 이온음료가 도움이 될 수 있으나, 과당함량이 높은 경우가 있어 주의해야 합니다.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                ● 증상이 1시간 이상 지속되거나 회복되지 않을 경우, 의료기관에 내원하여 적절한 진료를 받습니다.
              </Text>

              <Text style={firstAidStyles.modalTextBold}>3. 열경련</Text>
              <Text style={firstAidStyles.modalTextRegular}>근육경련(종아리, 허벅지, 어깨 등)</Text>
              <Text style={firstAidStyles.modalTextRegular}>● 시원한 곳에서 휴식합니다.</Text>
              <Text style={firstAidStyles.modalTextRegular}>● 물을 섭취하여 수분을 보충해줍니다.</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                ※ 땀을 많이 흘렸을 경우에는 이온음료가 도움이 될 수 있으나, 과당함량이 높은 경우가 있어 주의해야 합니다.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>● 경련이 일어난 근육을 마사지합니다.</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                ※ 경련이 멈추었다고 해서 바로 다시 일을 시작하지 말고 근육 부위를 마사지하고 충분한 휴식을 취해야 합니다.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>아래의 경우, 바로 응급실에 방문하여 진료를 받아야 합니다.</Text>
              <Text style={firstAidStyles.modalTextRegular}>- 1시간 넘게 경련이 지속</Text>
              <Text style={firstAidStyles.modalTextRegular}>- 기저질환으로 심장질환이 있는 경우</Text>
              <Text style={firstAidStyles.modalTextRegular}>- 평상시 저염분 식이요법을 한 경우</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* 호흡곤란 응급처치 법 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible[3]}
        onRequestClose={() => setModalVisible(new Array(13).fill(false))} // Android의 뒤로 가기 버튼 누를 때 닫히는 동작
      >
        <View style={firstAidStyles.modalBackground}>
          <View style={firstAidStyles.modalContainer}>
            <TouchableOpacity style={firstAidStyles.modalCloseButton} onPress={() => setModalVisible(new Array(13).fill(false))}>
              <FeatherIcons name="x" size={30} color="black" />
            </TouchableOpacity>
            <Text style={firstAidStyles.modalTitle}>호흡곤란 응급처치</Text>
            <ScrollView style={firstAidStyles.modalScrollView}>
              <Text style={firstAidStyles.modalTextBold}>상태 파악</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                호흡곤란에는 여러가지 원인이 있을 수 있기 때문에 먼저 환자의 상태부터 확인합니다.
              </Text>
              <Text style={firstAidStyles.modalTextBold}>1. 이물질에 의한 기도폐쇄</Text>
              <Text style={firstAidStyles.modalTextSemiBold}>목에 이물질이 걸린 것을 물어봄(예 : 목에 뭐가 걸렸나요?)</Text>
              <Text style={firstAidStyles.modalTextRegular}>기침을 유도하여 이물질을 뱉어내게 한다.</Text>
              <Text style={firstAidStyles.modalTextSemiBold}>말을 할 수 있는지를 물어봄 (예 : 말을 할 수 있나요?)</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                환자의 뒤에 서서 한쪽 주먹을 쥐고 엄지 부분을 환자의 배꼽과 갈비뼈 사이의 중앙에 대고 다른 손으로 주먹 쥔 손을
                감싼다.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>복부 밀침(하임라히법)을 이물질이 나올 때까지 시도한다.</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                이물질이 나오지 않는 상태로 환자가 의식을 잃고 쓰러지면 즉시 119에 신고한다.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                심폐소생술을 시행한다. 입에 이물질이 보이면 제거하고 응급의료인이 올 때까지 계속 심폐소생술을 시행한다.
              </Text>
              <Text style={firstAidStyles.modalTextBold}>2. 과호흡에 의한 호흡곤란</Text>
              <Text style={firstAidStyles.modalTextSemiBold}>
                가슴에 통증이 생기거나 팔다리가 꼬이는 느낌이 들며 숨이 매우 가파지는 증상을 나타낸다.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                일단 자리에서 똑바로 눕힌 후, 꽉 조이는 옷은 느슨하게 하는 등 심신의 안정을 취하도록 한다.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                천천히 심호흡을 하도록 유도하며, 코로 숨을 들이쉬게 하였다가 입을 오므려 천천히 내쉬게 한다.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                증상이 심하면 비닐봉지 너무 밀착되지 않는 범위에서 코, 입에 대어 그 속에서 재호흡을 하게 한다.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                비닐봉지는 환자가 거부감을 느끼지 않도록 어두운 색이 아닌 밝은 색을 사용하며, 너무 꽉 대지 말고 느슨하게 하여 밖의
                공기도 일정량 호흡이 가능하도록 한다.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                인공호흡은 환자에게 치명적일 수 있음으로, 증상을 세심히 살핀 후 응급처치를 하도록 한다.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                증상이 호전되지 않는 경우에는 바로 119나 가까운 병원으로 연락한다.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* 벌쏘임 응급처치 법 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible[4]}
        onRequestClose={() => setModalVisible(new Array(13).fill(false))} // Android의 뒤로 가기 버튼 누를 때 닫히는 동작
      >
        <View style={firstAidStyles.modalBackground}>
          <View style={firstAidStyles.modalContainer}>
            <TouchableOpacity style={firstAidStyles.modalCloseButton} onPress={() => setModalVisible(new Array(13).fill(false))}>
              <FeatherIcons name="x" size={30} color="black" />
            </TouchableOpacity>
            <Text style={firstAidStyles.modalTitle}>벌쏘임 응급처치</Text>
            <ScrollView style={firstAidStyles.modalScrollView}>
              <Text style={firstAidStyles.modalTextBold}>1. 벌침 찾기</Text>
              <Text style={firstAidStyles.modalTextRegular}>빨갛게 부어오른 부위에 검은 점처럼 보이는 벌침을 찾는다.</Text>
              <Text style={firstAidStyles.modalTextBold}>2. 벌침 제거</Text>
              <Text style={firstAidStyles.modalTextRegular}>신용카드 등을 이용해 피부를 긁어내듯 침을 제거한다.</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                집게, 핀셋 또는 손가락을 이용하여 침의 끝부분을 집어서 제거할 경우 독주머니를 짜는 행위가 되어 오히려 벌침 안에
                남아 있는 독이 더 몸 안으로 들어갈 수 있다.
              </Text>
              <Text style={firstAidStyles.modalTextBold}>3. 통증(부기) 완화</Text>
              <Text style={firstAidStyles.modalTextRegular}>상처 부위에 얼음주머니를 대 통증과 부기를 가라앉힌다.</Text>
              <Text style={firstAidStyles.modalTextBold}>전신적 과민반응 확인</Text>
              <Text style={firstAidStyles.modalTextRegular}>약 5% 정도에서 발생하는 것으로 알려져 있다.</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                증상 : 몸이 붓고 가려움증이 발생하는 것, 이외에 피부가 창백해지고 식은땀이 나는 증세, 불안감, 두통, 어지럼증,
                구토,
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                복부 통증, 호흡곤란, 경련, 의식 저하 등의 쇼크의 증상. 증상 발현 시간 : 독소에 노출되고, 수 분에서 1시간 내에
                발생.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                과민반응은 일단 시작하면 매우 빠른 경과를 밟으므로 초기에 치료를 시작하지 않으면 생명을 위협하는 경우가 많다.
                전신적
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                과민성 반응에 의한 사망 원인 중 60 ~ 80%는 공기를 폐로 전달하는 통로 역할을 하는 기도가 부어 숨을 쉴 수가 없어
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                사망하는 질식사로 보고되고 있다. 두 번째로 흔한 사망 원인으로는 혈관 확장에 따른 의한 쇼크사이다. 즉시 필요한
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                응급조치(심폐소생술 참고)를 시행하면서 신속히 의료기관으로 이송하여야 한다.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* 물림 응급처치 법 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible[5]}
        onRequestClose={() => setModalVisible(new Array(13).fill(false))} // Android의 뒤로 가기 버튼 누를 때 닫히는 동작
      >
        <View style={firstAidStyles.modalBackground}>
          <View style={firstAidStyles.modalContainer}>
            <TouchableOpacity style={firstAidStyles.modalCloseButton} onPress={() => setModalVisible(new Array(13).fill(false))}>
              <FeatherIcons name="x" size={30} color="black" />
            </TouchableOpacity>
            <Text style={firstAidStyles.modalTitle}>물림 응급처치</Text>
            <ScrollView style={firstAidStyles.modalScrollView}>
              <Text style={firstAidStyles.modalTextBold}>표피상처 (할퀸상처)</Text>
              <Text style={firstAidStyles.modalTextRegular}>상처 부위를 흐르는 물에 비누로 5~10분간 깨끗이 씻는다.</Text>
              <Text style={firstAidStyles.modalTextRegular}>말린 후 접착드레싱이나 작은 알코올드레싱으로 덮는다.</Text>
              <Text style={firstAidStyles.modalTextBold}>깊은상처</Text>
              <Text style={firstAidStyles.modalTextRegular}>직접 압박을 하거나 물린 부위를 들어올려서 지혈한다.</Text>
              <Text style={firstAidStyles.modalTextRegular}>상처를 소독된 거즈나 깨끗한 패드로 덮고 붕대를 감는다.</Text>
              <Text style={firstAidStyles.modalTextRegular}>병/의원을 방문하여 경우에 따라 다음의 처치를 받도록 한다.</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                세척, 항파상풍 주사, 봉합술 등을 시행하는데, 파상풍 예방 접종 경력과 시기에 대한 정보를 의료진에게 정확히 전달하면
                도움을 받을 수 있다.
              </Text>
              <Text style={firstAidStyles.modalTextBold}>주의사항</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                병에 걸린 동물은 침을 통해 침범하는 치명적인 바이러스성 신경계통 감염질환을 유발시킬 수 있다.
              </Text>
              <Text style={firstAidStyles.modalTextRegular}>
                물리면 광견병 예방주사를 맞아야한다. 관경병은 의학지식으로 잘 관찰해야만 진단이 가능하다.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/** 응급처치 화면 */}
      <Header title="응급처치" />
      <ScrollView showsVerticalScrollIndicator={false} style={generalStyles.scrollViewWrap}>
        <TouchableOpacity
          style={[firstAidStyles.mainContainer, { marginTop: 20 }]}
          onPress={() => {
            pressModalButton(0);
          }}
        >
          <Text style={firstAidStyles.itemTitle}>심정지</Text>
          <Text style={firstAidStyles.itemSubTitle}>심정지, 심장마비 등 심장이 제 기능을 하지 못할 때의 응급처치 요령</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={firstAidStyles.mainContainer}
          onPress={() => {
            pressModalButton(1);
          }}
        >
          <Text style={firstAidStyles.itemTitle}>화상</Text>
          <Text style={firstAidStyles.itemSubTitle}>고열에 의한 피부손상이 발생했을 때의 응급처치 요령</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={firstAidStyles.mainContainer}
          onPress={() => {
            pressModalButton(2);
          }}
        >
          <Text style={firstAidStyles.itemTitle}>온열질환</Text>
          <Text style={firstAidStyles.itemSubTitle}>열에 장시간 노출되어 생기는 질병이 발생했을 때의 응급처치 요령</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={firstAidStyles.mainContainer}
          onPress={() => {
            pressModalButton(3);
          }}
        >
          <Text style={firstAidStyles.itemTitle}>호흡곤란</Text>
          <Text style={firstAidStyles.itemSubTitle}>호흡이 힘들거나 자의에 의해 호흡이 불가능할 때의 응급처치 요령</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={firstAidStyles.mainContainer}
          onPress={() => {
            pressModalButton(4);
          }}
        >
          <Text style={firstAidStyles.itemTitle}>벌쏘임</Text>
          <Text style={firstAidStyles.itemSubTitle}>벌에 쏘였을 때의 응급처치 요령</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={firstAidStyles.mainContainer}
          onPress={() => {
            pressModalButton(5);
          }}
        >
          <Text style={firstAidStyles.itemTitle}>물림</Text>
          <Text style={firstAidStyles.itemSubTitle}>동물에게 물렸을 때의 응급처치 요령</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={firstAidStyles.mainContainer}
          onPress={() => {
            pressModalButton(6);
          }}
        >
          <Text style={firstAidStyles.itemTitle}>중독</Text>
          <Text style={firstAidStyles.itemSubTitle}>독을 가진 동물에게 쏘였이거나 물렸을 때의 응급처치 요령</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={firstAidStyles.mainContainer}
          onPress={() => {
            pressModalButton(7);
          }}
        >
          <Text style={firstAidStyles.itemTitle}>골절상</Text>
          <Text style={firstAidStyles.itemSubTitle}>뼈에 금이 가거나 부러짐이 발생했을 때의 응급처치 요령</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={firstAidStyles.mainContainer}
          onPress={() => {
            pressModalButton(8);
          }}
        >
          <Text style={firstAidStyles.itemTitle}>타박상</Text>
          <Text style={firstAidStyles.itemSubTitle}>
            외부의 둔탁한 충격에 의해 멍, 부종 등의 부상이 발생했을 때의 응급처치 요령
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={firstAidStyles.mainContainer}
          onPress={() => {
            pressModalButton(9);
          }}
        >
          <Text style={firstAidStyles.itemTitle}>찰과상</Text>
          <Text style={firstAidStyles.itemSubTitle}>마찰에 의해 피부가 쓸려 부상이 발생했을 때의 응급처치 요령</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={firstAidStyles.mainContainer}
          onPress={() => {
            pressModalButton(10);
          }}
        >
          <Text style={firstAidStyles.itemTitle}>열상</Text>
          <Text style={firstAidStyles.itemSubTitle}>피부가 찢어져 생긴 부상이 발생했을 때의 응급처치 요령</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={firstAidStyles.mainContainer}
          onPress={() => {
            pressModalButton(11);
          }}
        >
          <Text style={firstAidStyles.itemTitle}>절상, 절단상</Text>
          <Text style={firstAidStyles.itemSubTitle}>
            예리한 물체에 의해 피부가 깊게 베이거나 탈락되어 생긴 부상이 발생했을 때의 응급처치 요령
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[firstAidStyles.mainContainer, { marginBottom: 20 }]}
          onPress={() => {
            pressModalButton(12);
          }}
        >
          <Text style={firstAidStyles.itemTitle}>자상</Text>
          <Text style={firstAidStyles.itemSubTitle}>
            예리하거나 뾰족한 물체에 의해 피부가 찔려 생긴 부상이 발생했을 때의 응급처치 요령
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default FirstaidScreen;

/*
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible[0]}
        onRequestClose={() => setModalVisible(new Array(13).fill(false))} // Android의 뒤로 가기 버튼 누를 때 닫히는 동작
      >
        <View style={firstAidStyles.modalBackground}>
          <View style={firstAidStyles.modalContainer}>
            <TouchableOpacity style={firstAidStyles.modalCloseButton} onPress={() => setModalVisible(new Array(13).fill(false))}>
              <FeatherIcons name="x" size={30} color="black" />
            </TouchableOpacity>
            <Text style={firstAidStyles.modalTitle}>화상 응급처치</Text>
            <ScrollView style={firstAidStyles.modalScrollView}>
              <Text style={firstAidStyles.modalTextBold}>1. 의식 확인</Text>
              <Text style={firstAidStyles.modalTextRegular}>
                양어깨를 두르리며 말을 걸고 눈과 귀로 심정지 및 무호흡 유무를 확인한다. (반응과 호흡이 있으면 심정지 아님)
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
*/
