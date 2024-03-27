import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

import axios from "axios";

import RowComponent from "./components/RowComponent/RowComponent";

const defaultData = [
  ["Pakistan", 23],
  ["Pakistan", 127],
  ["India", 3],
  ["India", 71],
  ["Australia", 31],
  ["India", 22],
  ["Pakistan", 81],
];

const averageStyle = (doubleOfAvgValue) => {
  return {
    width: doubleOfAvgValue,
    height: 10,
    backgroundColor: "blue",
    marginLeft: 20,
  };
};

const App = () => {
  const [selectedSource, setSelectedSource] = useState("Test");
  const [data, setData] = useState(defaultData);
  const [totalVal, setTotalVal] = useState(358);

  const [averageValue, setAverageValue] = useState({
    firstRow: 64.53,
    secondRow: 26.82,
  });

  const fetchData = async () => {
    let totalValue = 0;
    let resultArr = [];
    if (selectedSource === "Server") {
      const response = await axios.get(
        "https://assessments.reliscore.com/api/cric-scores/"
      );
      resultArr = response.data;
      setData(response.data);
    } else {
      resultArr = defaultData;
      setData(defaultData);
    }
    resultArr.map(([country, score]) => {
      totalValue += score;
    });
    setTotalVal(totalValue);
  };

  useEffect(() => {
    fetchData();
  }, [selectedSource]);

  const handleTextChange = (text, view) => {
    let sumOfVal = 0;
    data.map(([countryData, score]) => {
      if (text !== undefined && countryData === text.trim()) {
        sumOfVal += score;
      }
    });
    let avgVal = (sumOfVal / totalVal) * 100;
    avgVal = parseFloat(avgVal.toFixed(2));
    setAverageValue((prevVal) => ({
      ...prevVal,
      [view]: avgVal,
    }));
  };

  const [flexDirectionStyle, setFlexDirectionStyle] = useState({
    flexDirection: "column",
  });

  useEffect(() => {
    const handleScreenResize = () => {
      const { width } = Dimensions.get("window");
      if (width >= 600) {
        setFlexDirectionStyle({ flexDirection: "row", alignItems: "center" });
      } else {
        setFlexDirectionStyle({ flexDirection: "column" });
      }
    };

    Dimensions.addEventListener("change", handleScreenResize);

    return () => {
      Dimensions.removeEventListener("change", handleScreenResize);
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <RadioButtonGroup
        containerStyle={{
          marginBottom: 30,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
        selected={selectedSource}
        onSelected={(value) => setSelectedSource(value)}
        radioBackground="blue"
      >
        <RadioButtonItem value="Test" label="Test" />
        <RadioButtonItem
          value="Server"
          label="Server"
          style={{ marginLeft: 20 }}
        />
      </RadioButtonGroup>

      <RowComponent
        flexDirectionStyle={flexDirectionStyle}
        averageValue={averageValue}
        averageStyle={averageStyle}
        handleTextChange={handleTextChange}
        defaultValue={"Pakistan"}
        rowNumber={"firstRow"}
      />

      <RowComponent
        flexDirectionStyle={flexDirectionStyle}
        averageValue={averageValue}
        averageStyle={averageStyle}
        handleTextChange={handleTextChange}
        defaultValue={"India"}
        rowNumber={"secondRow"}
      />
    </View>
  );
};

export default App;
