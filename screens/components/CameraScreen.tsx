import { CameraView, useCameraPermissions } from "expo-camera";
import { Camera} from "expo-camera/legacy";
import React, { useState, useEffect, useRef } from "react";
import { Alert, Dimensions, Linking, Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import { pillModalStyle } from "../styles/pillModalStyle";
import { generalValues } from "../styles/generalValues";
import Icon from "react-native-vector-icons/Feather";

interface ChildProps {
    setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
    showCamera: boolean;
    setShowCamera: React.Dispatch<React.SetStateAction<boolean>>;
}

const CameraScreen: React.FC<ChildProps> = ({ setImage, showCamera, setShowCamera }) => {
    const cameraRef = useRef(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [zoomLevel, setZoomLevel] = useState(0);
    const screenWidth = Dimensions.get("screen").width;
    const screenHeight = Dimensions.get("screen").height;

    const checkPermissions = async () => {
        if (!permission) return;

        if (permission.status !== "granted") {
            if (!permission.canAskAgain) {
                Alert.alert(
                    "권한 필요",
                    "앱 설정에서 카메라 권한을 변경해주세요.",
                    [
                        { text: "취소", style: "cancel" },
                        {
                            text: "설정 열기",
                            onPress: () => {
                                Linking.openSettings();
                            },
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                requestPermission();
            }
        }
    };

    const base64ToFile = async (base_data: string, filename: string): Promise<File | undefined> => {
        const arr = base_data.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/actet-stream';
        const bstr = atob(arr[arr.length - 1]);
        const n = bstr.length;
        const u8arr = new Uint8Array(n);

        for (let i = 0; i < n; i++) {
            u8arr[i] = bstr.charCodeAt(i);
        }

        return new File([u8arr], filename, { type: mime });
    };

    const takePicture = async (): Promise<string | undefined> => {
        if (!cameraRef.current) return "";

        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        const name = hours + minutes + seconds + "jpg";

        try {
            const uri = await cameraRef.current?.takePictureAsync({ base64: true, quality: 1 });
            // const file = base64ToFile(uri.base64, name);
            return uri.uri;
        } catch (e) {
            console.error(e);
        }
    }


    useEffect(() => {
        checkPermissions();
    }, [permission]);

    return (
        <>
            {showCamera ? (
                <>
                    <View style={{ alignItems: "center", justifyContent: "center", display: "flex", width: screenWidth, height: screenHeight, }}>
                        <Camera
                            style={{ alignItems: "center", justifyContent: "center", display: "flex", width: screenWidth, height: screenHeight, }}
                            ref={cameraRef}
                            zoom={zoomLevel}>
                            <View>
                                <TouchableOpacity onPress={async () => {
                                    const image = await takePicture();
                                    setImage(image);
                                    setShowCamera(!showCamera);
                                    console.log("사진 uri 저장됨 : " + image);
                                }}>
                                    <Icon name="camera" size={50} color={generalValues.highlightColor} />
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    </View></>

            ) : null}
        </>
    );
};

export default CameraScreen;
