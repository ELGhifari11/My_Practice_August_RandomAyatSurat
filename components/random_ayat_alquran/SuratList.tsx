import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function SuratList() {
  const [dataAyat, setDataAyat] = useState<any>([]);
  const [dataSurat, setDataSurat] = useState<any>([]);

  const [randomNumberAyat, setRandomNumberAyat] = useState(1);
  const [randomNumberSurat, setRandomNumberSurat] = useState(4);
  const [maxNumberAyat, setMaxNumberAyat] = useState('10');
  const [minNumberAyat, setMinNumberAyat] = useState('1');
  const [maxNumberSurat, setMaxNumberSurat] = useState('10');
  const [minNumberSurat, setMinNumberSurat] = useState('1');
  const [isRender, setIsrender] = useState(false);

  // ...

  const generateRandomNumber = () => {
    const min = parseInt(minNumberAyat);
    const max = parseInt(maxNumberAyat);
    const newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumberAyat(newRandomNumber);
    setIsrender(true);
  };

  const generateRandomSurat = async () => {
    const min = parseInt(minNumberSurat);
    const max = parseInt(maxNumberSurat);
    if (isNaN(min) || isNaN(max) || min >= max) {
      Alert.alert(
        'Invalid Range',
        'Please enter a valid range of Surat numbers.',
      );
      return;
    }

    try {
      const newRandomNumberSurat =
        Math.floor(Math.random() * (max - min + 1)) + min;
      setRandomNumberSurat(newRandomNumberSurat);
      await fetchDataAyat();
      setIsrender(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data. Koneksi Anda Bermasalah.');
    }
  };

  const reset = () => {
    setIsrender(false);
  };

  const errorRender = (title: string, message: string) => {
    Alert.alert(title, message);
  };

  useEffect(() => {
    fetchDataAyat();
    fetchDataSurat();
  }, []);

  const fetchDataSurat = async () => {
    try {
      const response = await fetch(`https://equran.id/api/v2/surat`);
      const data = await response.json();
      setDataSurat(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data. Koneksi Anda Bermasalah.');
    }
  };

  const fetchDataAyat = async () => {
    try {
      const response = await fetch(
        `https://equran.id/api/v2/surat/${randomNumberSurat}`,
      );
      const ayat = await response.json();
      setDataAyat(ayat.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data. Koneksi Anda Bermasalah.');
    }
  };

  const handleAudioPress = (audioUrl: string) => {
    Linking.openURL(audioUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {isRender ? (
          dataAyat.ayat && dataAyat.ayat[randomNumberAyat] ? (
            <>
              <Text>
                {` RANDOM AYAT KE - `}
                <Text style={{color: 'blue'}}>
                  {`${dataAyat.ayat[randomNumberAyat].nomorAyat} `}
                  <Text
                    style={{
                      color: 'purple',
                    }}>
                    <Text style={{color: 'green'}}> | </Text>
                    {`${dataAyat.nomor}. ${dataAyat.namaLatin}`}
                  </Text>
                </Text>
              </Text>
            </>
          ) : (
            <>
              <Text>ERROR tekan button acaknya ......</Text>
            </>
          )
        ) : (
          <>
            <Text>RANDOM AYAT :</Text>
          </>
        )}
      </Text>

      {/* ////////////////////////////////////////////////////////////// */}

      <View style={styles.containerA}>
        <ScrollView
          style={{
            borderWidth: 0.9,
            borderRadius: 10,
            borderColor: 'green',
            padding: 15,
            maxWidth: 380,
          }}>
          <Text style={styles.randomNumberAyat}>
            {isRender ? (
              dataAyat.ayat && dataAyat.ayat[randomNumberAyat] ? (
                `
 ${dataAyat.ayat[randomNumberAyat].teksArab} 

 ${dataAyat.ayat[randomNumberAyat].teksIndonesia} `
              ) : (
                <>
                  <ActivityIndicator size={'large'} color={'green'} />
                </>
              )
            ) : (
              <></>
            )}
          </Text>
          <Text style={styles.randomNumberAyat}>
            {!isRender ? (
              <>
                <Text style={{color: 'red', fontSize: 25}}>SET MAX & ACAK</Text>
              </>
            ) : (
              <>
                <Text
                  style={{fontSize: 15, fontWeight: '700', marginBottom: 20}}>
                  Putar Morattal :
                </Text>

                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{marginHorizontal: 10}}
                    onPress={() =>
                      handleAudioPress(
                        dataAyat.ayat[randomNumberAyat].audio['01'],
                      )
                    }>
                    <Text style={{fontWeight: '800', color: 'green'}}>
                      JUHANY
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginHorizontal: 10}}
                    onPress={() =>
                      handleAudioPress(
                        dataAyat.ayat[randomNumberAyat].audio['02'],
                      )
                    }>
                    <Text style={{fontWeight: '800', color: 'green'}}>
                      QASIM
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginHorizontal: 10}}
                    onPress={() =>
                      handleAudioPress(
                        dataAyat.ayat[randomNumberAyat].audio['03'],
                      )
                    }>
                    <Text style={{fontWeight: '800', color: 'green'}}>
                      SUDAIS
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginHorizontal: 10}}
                    onPress={() =>
                      handleAudioPress(
                        dataAyat.ayat[randomNumberAyat].audio['04'],
                      )
                    }>
                    <Text style={{fontWeight: '800', color: 'green'}}>
                      DOSSARI
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginHorizontal: 10}}
                    onPress={() =>
                      handleAudioPress(
                        dataAyat.ayat[randomNumberAyat].audio['05'],
                      )
                    }>
                    <Text style={{fontWeight: '800', color: 'green'}}>
                      MISYARI
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Text>
        </ScrollView>

        <View style={{position: 'absolute', bottom: -230, zIndex: 9999}}>
          <TouchableOpacity
            style={styles.setLimitButton}
            onPress={() => setMaxNumberAyat(dataAyat.jumlahAyat)}>
            <Text
              style={
                styles.buttonText
              }>{`Max Ayat ${dataAyat.jumlahAyat}`}</Text>
          </TouchableOpacity>

          <Text
            style={{
              color: 'black',
              alignSelf: 'center',
              fontSize: 17,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            Atur Random surat dan Ayat di bawah sini
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={styles.generateButtonSurat}
              onPress={generateRandomSurat}
              onLongPress={reset}>
              <Text style={[styles.buttonText]}>{`Acak surat`}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.generateButtonAyat}
              onPress={generateRandomNumber}
              onLongPress={reset}>
              <Text style={styles.buttonText}>{`Acak Ayat`}</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.textMxSurat}>Dari Surat ke - Sampai</Text>
            <Text style={styles.textMxAyat}>Dari Ayat ke - Sampai</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <TextInput
                style={[styles.input, styles.colorInputSurat]}
                placeholder="10"
                keyboardType="numeric"
                value={minNumberSurat.toString()} // Konversi nilai ke string
                onChangeText={setMinNumberSurat}
              />
              <Text
                style={{
                  color: 'purple',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingBottom: 10,
                }}>
                -
              </Text>
              <TextInput
                style={[styles.input, styles.colorInputSurat]}
                placeholder="10"
                keyboardType="numeric"
                value={maxNumberSurat.toString()} // Konversi nilai ke string
                onChangeText={setMaxNumberSurat}
              />
            </View>

            {/* ... */}

            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <TextInput
                style={[styles.input, styles.colorInputAyat]}
                placeholder="10"
                keyboardType="numeric"
                value={minNumberAyat.toString()}
                onChangeText={setMinNumberAyat}
              />
              <Text
                style={{
                  color: 'blue',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingBottom: 10,
                }}>
                -
              </Text>
              <TextInput
                style={[styles.input, styles.colorInputAyat]}
                placeholder="10"
                keyboardType="numeric"
                value={maxNumberAyat.toString()}
                onChangeText={setMaxNumberAyat}
              />
            </View>
          </View>
        </View>
      </View>

      {/* ///////////////////////////////////////////////////////////// */}

      <Text style={styles.headerB}>Daftar Surat Al-Quran :</Text>

      <FlatList
        style={{marginTop: 20, marginBottom: 150}}
        horizontal
        data={dataSurat}
        keyExtractor={item => item.nomor.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.suratItem}
            onPress={() => handleAudioPress(item.audioFull['03'])}>
            <Text
              style={
                styles.suratName
              }>{`${item.nomor}. ${item.namaLatin} `}</Text>
            <Text style={styles.suratArti}>{item.arti}</Text>
            <Text style={styles.jumlahAyat}>{`${item.jumlahAyat}`}</Text>
            <Text style={styles.tempatTurun}>{`${item.tempatTurun}`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerA: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  randomNumberAyat: {
    fontSize: 22,
    fontWeight: '400',
    marginBottom: 50,
    color: 'black',
  },
  generateButtonSurat: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    marginHorizontal: 25,
  },
  generateButtonAyat: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    marginHorizontal: 25,
  },
  setLimitButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  setLimitButtonRow: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 16,
    color: 'green',
  },
  headerB: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 250,
    color: 'green',
  },
  suratItem: {
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  suratName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'purple',
    textAlign: 'left',
  },
  suratArti: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'italic',
    color: 'black',
  },
  jumlahAyat: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  tempatTurun: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  input: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 7,
    marginHorizontal: 5,
  },
  colorInputSurat: {
    color: 'black',
    borderColor: 'purple',
    backgroundColor: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  textMxSurat: {
    color: 'purple',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 5,
    marginHorizontal: 18,
  },
  colorInputAyat: {
    color: 'black',
    borderColor: 'blue',
    backgroundColor: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  textMxAyat: {
    color: 'blue',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 5,
    marginHorizontal: 20,
  },
});
