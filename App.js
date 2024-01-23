import React, { useEffect, useState,useCallback } from 'react';
import { View, TextInput, Button, StyleSheet,Text } from 'react-native';
import * as Speech from 'expo-speech';
import axios from "axios"

export default function App() {
  const [textToSpeak, setTextToSpeak] = useState('');
  const [quote, setQuote]=useState(null);

  const [quotes, setQuotes]=useState([])
  const [playingIndex, setPlayingIndex]=useState(0);  

  const fetchQuote=async()=>{
    let daily=await axios.get("https://zenquotes.io/api/today");
    let response=await axios.get("https://zenquotes.io/api/quotes");
    console.log(response.data)
    setQuotes([daily.data?.[0],...response.data])
    setQuote(daily.data[0])

  }
  const playSound=useCallback(async()=>{
    const isPlaying=await Speech.isSpeakingAsync()
    if(quote&&!isPlaying)
    await Speech.speak(quote?.a+" who is friend with Delice said "+quote?.q+"")
  }, [quote])
  const nextQuote=useCallback(()=>{setPlayingIndex(p=>{
    let targetIndex=p+1
    if(!quotes.length==targetIndex){
      targetIndex=0
    }
    setQuote(quotes[targetIndex])
    return targetIndex
  })},[quotes])
    
  
  
 
  useEffect(()=>{
    fetchQuote()

  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todays motivation</Text>
      <Text style={styles.quote}>"{quote?.q}" {quote?.a}</Text>
      

    <View style={styles.buttonContainer}>
      <Button title="Speak current quote" onPress={playSound} />
    <View style={styles.box}></View>
      <Button title="Go to next quote" onPress={nextQuote} />
      
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  
    padding: 10,
    color:"black"
  },
  title:{
    fontSize:20,
    fontWeight:"500"
  },
  quote:{
    fontStyle:"italic",
    fontSize: 24,
    textAlign:"center",
    paddingVertical: 10,
  },
  buttonContainer:{
    display:"flex",
    flexDirection:"row"
  },
  box:{
    marginLeft:20
  }

});
