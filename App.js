import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
//component
import CoinItem from "./components/CoinItem";
const App = () => {
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  const loadData = async () => {
    await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((response) => {
        if (!response.ok) {
          console.log(response.status);
        }
        return response.json();
      })
      .then((indoApi) => {
        setData(indoApi);
        setRefreshing(false);
        // console.log(data.length);
      });
  };
  React.useEffect(() => {
    //   console.log("hola");
    loadData();
  }, [refreshing]);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />

      <View style={styles.header}>
        <Text style={styles.title}>Tienda de monedas</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Busca tu moneda"
          placeholderTextColor="#858585"
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={() => {
          // console.log("refrescar");
          setRefreshing(true);
        }}
        style={styles.list}
        data={data.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        )}
        renderItem={({ item }) => <CoinItem coin={item} />}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    width: "90%",
  },
  header: {
    marginTop: 23,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  searchInput: {
    color: "#fff",
    borderBottomColor: "#4657CE",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "center",
    fontSize: 20,
  },
});
