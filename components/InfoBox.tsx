import { globalStyles } from "@/app/globalStyles";
import { FC } from "react";
import { View, Text } from "react-native";

interface InfoBoxProps {
  title: string | number;
  subtitle?: string;
  containerStyles?: { [key: string]: any };
  titleStyles?: { [key: string]: any };
}

const InfoBox: FC<InfoBoxProps> = ({
  title,
  subtitle = "",
  containerStyles = {},
  titleStyles = {},
}) => {
  return (
    <View style={containerStyles}>
      <Text
        style={[
          titleStyles,
          globalStyles.psemibold,
          { color: "#fff", textAlign: "center" },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          globalStyles.pregular,
          { color: "lightgrey", fontSize: 12, textAlign: "center" },
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
