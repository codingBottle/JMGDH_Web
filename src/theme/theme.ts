const theme = {
  color: {
    PrimaryColor: {
      PrimaryWhite: "#FAFAFA", /* 기본 배경색 */
    },
  
    SecondaryColor: {
      /*기본 검정색상*/
      BasicFont: "#191919",
      /*Border와 Text 색상 둘다 사용*/
      ButtonBorder: "#DBDBDB",
      Border: "#EDEDED",
    },
    AccentColor: {
      TodayFill:"#9AC5F4",
      DayFill_Click:"#DDEDFF",
      TodoColor: "#b5f5ec",
      TodoColorHover: "#89E8DE",
      TodayColor: "#9AC5F4",
      TodayColorHover: "6BA7E9",
      PointColor: "#FFEC87",
      PointColorHover: "#FBE56D",
      /*특정 요일 폰트 색상*/
      SundayColor: "#DA4A4A",
      SaturdayColor: "#4A8CDA",
      /*투두와 일정에 뜨는 오늘 날짜 폰트 색상*/
      TodayFont: "#8BC0D6",
    },
    dailyColor: {
      daily1: "#F7A3A7",
      daily2: "#FFD286",
      daily3: "#FFE6AE",
      daily4: "#CAF7DC",
      daily5: "#CFF2C5",
      daily6: "#BCE1FE",
      daily7: "#99D6F1",
      daily8: "#86B1E5",
      daily9: "#98D1DD",
      daily10: "#D2BBF8",
      coloradd3: "#EBF4E0",
      coloradd3Hover:"#E4EED8",
    },
    GrayScale: {/*경계선 및 Border 색상 & 설명 폰트 등의 다양한 곳에 사용함*/
      Gray500: "#474747",
      Gray400: "#757575",
      Gray300: "#A3A3A3",
    },
    ErrorColor: {/*Error Color 기본 폰트 색 및 hover시 색상*/
      ErrorColor: "#1A73E8",
      ErrorColorHover: "#174EA6",
    },
    HoverEventColor: {/*hover시 색상*/
    EventfillHover:"#F3F3F3",}
    ,
  },
  fontWeight: {
    light: 300,
    Regular: 400,
    Medium: 500,
    bold: 700,
  },
} as const;

export default theme;
