import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from '@firebase/storage';
import {storage} from '../firebase';

const Camera = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const listRef = ref(storage, 'images/');

    listAll(listRef)
      .then(res => {
        const urls = [];
        res.items.forEach(itemRef => {
          getDownloadURL(itemRef).then(url => {
            urls.push(url);
            setImageList([...urls]);
          });
        });
      })
      .catch(error => {
        console.log('Error listing images:', error);
      });
  }, []);

  const openCameraLib = async () => {
    const result = await launchCamera({saveToPhotos: true});
    if (!result?.didCancel) {
      setImgUrl(result?.assets[0]?.uri);
    }
  };

  const openLib = async () => {
    const result = await launchImageLibrary();
    if (!result?.didCancel) {
      setImgUrl(result?.assets[0]?.uri);
    }
  };

  const uploadHandler = () => {
    if (!imgUrl) {
      console.log('Image URL is null or undefined');
      return;
    }

    const filename = imgUrl.substring(imgUrl.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `/images/${filename}`);

    fetch(imgUrl)
      .then(response => response.blob())
      .then(blob => {
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
            setProgress(progress);
          },
          error => {
            console.log('Upload error:', error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              setImageList([...imageList, downloadURL]);
            });
            setImgUrl(null);
          },
        );
      })
      .catch(error => {
        console.log('Error fetching image data:', error);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {imgUrl ? (
            <Image style={styles.img} source={{uri: imgUrl}} />
          ) : (
            <Text style={styles.placeholderText}>No image selected</Text>
          )}
          <View style={styles.imageList}>
            {imageList.map((url, index) => (
              <Image key={index} source={{uri: url}} style={styles.imageItem} />
            ))}
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.btnCam} onPress={openCameraLib}>
              <Text style={styles.btnText}>Open camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCam} onPress={openLib}>
              <Text style={styles.btnText}>Open gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCam} onPress={uploadHandler}>
              <Text style={styles.btnText}>Upload</Text>
              <Text style={styles.btnText}>{progress} %done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: '90%',
    height: 300,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 6,
  },
  btnCam: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    backgroundColor: '#383b40',
    borderRadius: 6,
    marginTop: 20,
  },
  btnText: {
    color: 'white',
  },
  placeholderText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  imageList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  imageItem: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 6,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    position: 'relative',
  },
});
