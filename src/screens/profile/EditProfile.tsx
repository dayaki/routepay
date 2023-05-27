/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Button,
  Header,
  Input,
  RegularText,
  TextButton,
  TitleText,
} from '@common';
import { useStyles } from './styles';
import {
  Exclamation,
  Lock,
  Mail,
  PhoneIcon,
  ProfileEditIcon,
  UserIcon,
} from '@icons';
import { useAppDispatch, useAppSelector } from '@store';
import { ms } from '@utils';

const EditProfile = ({ navigation }) => {
  const { theme } = useAppSelector(state => state.misc);
  const { user } = useAppSelector(state => state.user);
  const [name, setName] = useState(`${user?.firstName} ${user?.lastName}`);
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [editable, setEditable] = useState('');
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  useEffect(() => {
    if (editable === 'email') {
      setTimeout(() => emailInputRef.current?.focus(), 100);
    } else if (editable === 'phone') {
      setTimeout(() => phoneInputRef.current?.focus(), 100);
    }
  }, [editable]);

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

  const EditButton = ({ onPress }: { onPress: () => void }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <RegularText text="Edit" color="#FF6600" size={11} />
    </TouchableOpacity>
  );

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
        <View>
          <RegularText
            text="Kindly note that some fields are locked for editing. Please contact our customer support for assistance."
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
          <View style={styles.inputBox}>
            <Input
              ref={phoneInputRef}
              placeholder="Phone"
              editable={editable === 'phone'}
              onBlur={() => setEditable('')}
              value={phone}
              onChangeText={setPhone}
              leftIcon={<PhoneIcon />}
              rightIcon={<EditButton onPress={() => setEditable('phone')} />}
            />
            <RegularText
              text="Changing your mobile number will require verification"
              style={styles.footnote}
              size={11}
            />
          </View>
          <View style={styles.reviewInfo}>
            <Exclamation />
            <View>
              <RegularText
                text="We don’t share your details with anyone."
                size={14}
                style={styles.reviewInfoText}
              />
              <View style={styles.row}>
                <RegularText
                  text="Read our "
                  size={14}
                  style={styles.reviewInfoText}
                />
                <TextButton
                  text="Terms & Conditions "
                  textStyle={styles.termsLink}
                  textOnly
                  onPress={() => {}}
                />
                <RegularText text="here" size={14} />
              </View>
            </View>
          </View>
        </View>
        <Button text="Save" onPress={() => {}} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EditProfile;
