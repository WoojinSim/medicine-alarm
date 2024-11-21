/**
 * 약 알람 시간대 별 코드 타입
 * AFTER_WAKING_UP - 7시 기상직후
 * AFTER_BREAKFAST - 8시 조식후
 * AFTER_LUNCH - 13시 중식후
 * AFTER_DINNER - 18시 석식후
 * BEFORE_BED - 22시 취침전
 * ANYTIME - 아무때나
 */
export type TIME_TYPE = "AFTER_WAKING_UP" | "AFTER_BREAKFAST" | "AFTER_LUNCH" | "AFTER_DINNER" | "BEFORE_BED" | "ANYTIME";

/** 알약 데이터 인터페이스 */
export interface pillSearchInterface {
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

/** 알약 데이터 백엔드 POST 요청 인터페이스 */
export interface getPillDataRequestInterface {
  /** 제품 시퀀스 */
  itemSeq: string;
}

/** 알약 사진검색 백엔드 POST 요청 인터페이스 */
export interface pillImageSearchRequestInterface {
  /** 이미지 파일 */
  imageFile: File;
  /** 알약 모양 */
  pillShape: "circle" | "ellipse" | "triangle" | "diamond" | "pentagon" | "hexagon" | "octagon" | "square" | "etc";
}

/** 알약 데이터 백엔드 POST 반환 인터페이스 */
export interface getPillDataResponseInterface {
  /** 알약 데이터 */
  pillData: pillScheduleDetailInterface[];
  /** 알약 효능 GPT 태그 */
  gptPositiveTag: string;
  /** 알약 부작용 GPT 태그 */
  gptNegativeTag: string;
  /** API 반환 코드 */
  code: "200" | "400" | "401" | "403" | "404" | "500";
  /** API 반환 메시지 */
  message: string | null;
  /** API 반환 성공 여부 */
  success: boolean;
}

/** 약 알람 저장 인터페이스 */
export interface pillScheduleDetailInterface {
  /** 약 정보 */
  MEDICINE_INFO: pillSearchInterface;
  /** 약 설명 */
  MEDICINE_CLASS_NAME: string | null;
  /** 복약 주기 (일 수) */
  MEDICINE_INTERVALS: number | null;
  /** 복약 시간 */
  MEDICINE_TIME_ZONE: TIME_TYPE[];
  /** 상세 복약 시간 TODO: 추후 판단 후 삭제 예정 */
  MEDICINE_TIME: string[] | null;
  /** 복약 갯수 */
  NUMBER_OF_PILLS: number | null;
  /** 복약 시작 날짜 */
  START_DATE: Date | null;
  /** 복약 종료 날짜 */
  END_DATE: Date | null;
  /** 총 복약 일 수 (TODO: 추후 판단 후 삭제 예정) */
  TOTAL_DAYS: number | null;
}

/** 알람이 저장될 때 사용될 Json 겸 Object 인터페이스 타입 */
export type storeObjectType = Record<TIME_TYPE, pillScheduleDetailInterface[]>;
