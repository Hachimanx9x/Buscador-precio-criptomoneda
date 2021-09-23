import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

/**
 * @param object coin
 * @returns card Item
 */
const CoinItem = ({ coin }) => {
  return (
    <View style={styles.conteinerItem}>
      <View style={styles.coinName}>
        <Image style={styles.image} source={{ uri: coin.image }} />
        <View style={styles.containerNames}>
          <Text style={styles.text}>{coin.name}</Text>
          <Text style={styles.textSymbol}>{coin.symbol}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.textPrice}>${coin.current_price}</Text>
        <Text
          style={[
            styles.pricePercentage,
            coin.price_change_percentage_24h > 0
              ? styles.priceUp
              : styles.priceDown,
          ]}
        >
          {coin.price_change_percentage_24h}
        </Text>
      </View>
    </View>
  );
};

export default CoinItem;

const styles = StyleSheet.create({
  conteinerItem: {
    backgroundColor: "#121212",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coinName: { flexDirection: "row" },
  text: {
    color: "#ffffff",
  },
  image: {
    height: 30,
    width: 30,
  },
  containerNames: {
    marginLeft: 10,
  },
  textSymbol: {
    color: "#434343",
    textTransform: "uppercase",
  },
  textPrice: {
    color: "#ffffff",
    textAlign: "right",
  },
  pricePercentage: {
    color: "#fff",
    textAlign: "right",
  },
  priceUp: {
    color: "#00B5B9",
  },
  priceDown: {
    color: "#fc4422",
  },
});
