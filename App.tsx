import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SuratList from './components/random_ayat_alquran/SuratList';

const App = () => {
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <SuratList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
