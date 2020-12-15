import React, { useEffect, useState, setLoading } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");

  function loadBusStopData() {
    setLoading(true);

    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((responseData) => {
        //console.log(responseData)
        const myBus = responseData.services.filter(
          (item) => item.no === "155"
        )[0];
        //console.log(myBus);
        setArrival(myBus.next.duration_ms);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadBusStopData();
    const interval = setInterval(loadBusStopData, 15000);
    loadBusStopData();
    //return the function to run when unmounting
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time</Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" color="#cc8" /> : arrival}
      </Text>
      <TouchableOpacity onPress={null} style={styles.button}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  arrivalTime: {
    fontSize: 36,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "green",
    padding: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
