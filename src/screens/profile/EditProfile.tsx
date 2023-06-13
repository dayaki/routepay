import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useToast } from 'react-native-toast-notifications';
import ImagePicker from 'react-native-image-crop-picker';
import { Button, Header, Input, RegularText, TitleText } from '@common';
import { useStyles } from './styles';
import { Lock, Mail, PhoneIcon, ProfileEditIcon, UserIcon } from '@icons';
import { useAppDispatch, useAppSelector } from '@store';
import { apiService, ms, postUpdateProfile } from '@utils';

const EditButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <RegularText text="Edit" color="#FF6600" size={11} />
  </TouchableOpacity>
);

const EditProfile = ({ navigation }) => {
  const { user } = useAppSelector(state => state.user);
  const [name, setName] = useState(`${user?.firstName} ${user?.lastName}`);
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [editable, setEditable] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    if (editable === 'email') {
      setTimeout(() => emailInputRef.current?.focus(), 100);
    } else if (editable === 'phone') {
      setTimeout(() => phoneInputRef.current?.focus(), 100);
    }
  }, [editable]);

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const payload = {
        userId: user?.userId,
        firstName: user?.firstName,
        lastName: user?.lastName,
        phoneNumber: user?.phoneNumber,
        email,
        status: true,
        roleId: user?.roleId,
      };
      console.log('payload', payload);
      const data = await apiService(postUpdateProfile, 'post', payload);
      console.log('handleUpdate', data);
      toast.show('Profile updated successfully!', { type: 'success' });
      navigation.goBack();
    } catch (error) {
      console.log('handleUpdate', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectPhoto = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 600,
        height: 600,
        cropping: true,
        mediaType: 'photo',
        forceJpg: true,
      });
      console.log('uploaded', image);
    } catch (error) {
      console.log('image er', error);
    }
  };

  // const onEditable = (type: string) => {
  //   setEditable(type);
  //   setTimeout(() => phoneInputRef.current?.focus(), 100);
  // };

  return (
    <View style={styles.container}>
      <Header title="Edit Profile" hideBalance centered />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        style={styles.wrapper}>
        <View style={styles.banner}>
          <View style={[styles.name, { marginTop: ms(5) }]}>
            <TitleText
              text={`${user?.firstName[0]}${user?.lastName[0]}`}
              size={25}
            />
          </View>
          <View style={[styles.row, { marginTop: ms(15) }]}>
            <RegularText text="Change profile picture" size={11} />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.imageEditBtn}
              onPress={selectPhoto}>
              <ProfileEditIcon />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <RegularText
            text="Kindly note that some fields are locked for editing."
            size={14}
            style={{ lineHeight: 25, marginBottom: 40 }}
          />
          <Input
            value={name}
            onChangeText={setName}
            editable={false}
            label="Jane Doe"
            placeholder="Jane Doe"
            leftIcon={<UserIcon />}
            rightIcon={<Lock />}
          />
          <Input
            ref={phoneInputRef}
            placeholder="Phone"
            editable={false}
            value={phone}
            onChangeText={setPhone}
            leftIcon={<PhoneIcon />}
            rightIcon={<Lock />}
          />
          <View style={styles.inputBox}>
            <Input
              ref={emailInputRef}
              value={email}
              onChangeText={setEmail}
              editable={editable === 'email'}
              placeholder="Email"
              onBlur={() => setEditable('')}
              leftIcon={<Mail />}
              rightIcon={<EditButton onPress={() => setEditable('email')} />}
            />
            <RegularText
              text="Changing your email address will require verification"
              style={styles.footnote}
              size={11}
            />
          </View>
        </View>

        <Button text="Save" isLoading={isLoading} onPress={handleUpdate} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EditProfile;
