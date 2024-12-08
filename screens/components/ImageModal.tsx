import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, Image, Dimensions, Vibration } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { generalValues } from "../styles/generalValues";
import { pillModalStyle } from "../styles/pillModalStyle";
import { ScrollView } from "react-native-gesture-handler";
import { pillSearchInterface } from "../../interfaces";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

interface ChildProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPillShape: React.Dispatch<React.SetStateAction<string>>;
  setShowCamera: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageModal: React.FC<ChildProps> = ({ showModal, setShowModal, setPillShape, setShowCamera }) => {

  const [imgWidth, setImgWidth] = useState(150);
  const [imgHeight, setImgHeight] = useState(120);

  const handleShapeSelect = (shape: string) => {
    setPillShape(shape); 
    Vibration.vibrate(10);
    setShowCamera(true);
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            style={{alignItems: "center", justifyContent: "center", display:"flex"}}
            onRequestClose={() => {
              setShowModal(!showModal);
            }}
          >
            <View style={[pillModalStyle.background, { width: screenWidth, height: screenHeight }]}></View>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(!showModal);
            }}
          >

            <ScrollView contentContainerStyle={pillModalStyle.modal}>
              <View style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "row"}}>
                <TouchableOpacity onPress={() => handleShapeSelect("circle")}>
                  <Image
                    source={require("../../assets/shape/circle.png")} 
                    style={[pillModalStyle.itemImage, {width: imgWidth, height: imgHeight }]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleShapeSelect("ellipse")}>
                  <Image
                    source={require("../../assets/shape/ellipse.png")} 
                    style={[pillModalStyle.itemImage, {width: imgWidth, height: imgHeight }]}/>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" , display: "flex", flexDirection: "row"}}>
                <TouchableOpacity onPress={() => handleShapeSelect("triangle")}>
                  <Image
                    source={require("../../assets/shape/triangle.png")} 
                    style={[pillModalStyle.itemImage, {width: imgWidth, height: imgHeight }]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleShapeSelect("square")}>
                  <Image
                    source={require("../../assets/shape/square.png")} 
                    style={[pillModalStyle.itemImage, {width: imgWidth, height: imgHeight }]}/>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "row"}}>
                <TouchableOpacity onPress={() => handleShapeSelect("diamond")}>
                  <Image
                    source={require("../../assets/shape/diamond.png")} 
                    style={[pillModalStyle.itemImage, {width: imgWidth, height: imgHeight }]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleShapeSelect("pentagon")}>
                  <Image
                    source={require("../../assets/shape/pentagon.png")} 
                    style={[pillModalStyle.itemImage, {width: imgWidth, height: imgHeight }]}/>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "row"}}>
                <TouchableOpacity onPress={() => handleShapeSelect("hexagon")}>
                  <Image
                    source={require("../../assets/shape/hexagon.png")} 
                    style={[pillModalStyle.itemImage, {width: imgWidth, height: imgHeight }]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleShapeSelect("octagon")}>
                  <Image
                    source={require("../../assets/shape/octagon.png")} 
                    style={[pillModalStyle.itemImage, {width: imgWidth, height: imgHeight }]}/>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "row"}}>
                <TouchableOpacity onPress={() => handleShapeSelect("etc")}>
                  <Image
                    source={require("../../assets/shape/etc.png")} 
                    style={[pillModalStyle.itemImage, {width: imgWidth, height: imgHeight }]}/>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Modal>
        </View>
      ) : null}
    </>
  );
};

export default ImageModal;
