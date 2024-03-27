import { Text, View, TextInput } from "react-native";

const RowComponent = ({
  flexDirectionStyle,
  averageValue,
  averageStyle,
  handleTextChange,
  defaultValue,
  rowNumber,
}) => {
  return (
    <View style={flexDirectionStyle}>
      <View style={{ flexDirection: "row", marginLeft: 20 }}>
        <Text style={{ marginTop: 4, marginRight: 8 }}>The Country:</Text>
        <TextInput
          defaultValue={defaultValue}
          onChangeText={(text) => handleTextChange(text, rowNumber)}
        />
      </View>
      <Text style={{ marginLeft: 20 }}>
        The Average:{" "}
        {averageValue[rowNumber] === 0 ? "-" : averageValue[rowNumber]}
      </Text>
      <View
        style={
          averageValue[rowNumber] !== 0
            ? averageStyle(averageValue[rowNumber] * 2)
            : { height: 10, marginLeft: 20 }
        }
      ></View>
    </View>
  );
};

export default RowComponent;
