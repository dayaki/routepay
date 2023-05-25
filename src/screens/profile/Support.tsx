import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { ChevronForward, Close } from '@icons';
import { Button, Input, RegularText, TextArea, TitleText } from '@common';
import { useStyles } from './styles';

const Support = ({ navigation }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const styles = useStyles();

  const handleSubmit = () => {};

  return (
    <View style={styles.containerr}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Close />
        </TouchableOpacity>
      </View>
      <View style={styles.contentt}>
        <View>
          <TitleText
            text="Contact Support"
            size={20}
            style={styles.contenttTitle}
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.whatsapp}>
            <View style={styles.row}>
              <Image
                source={require('@images/whatsapp.png')}
                resizeMode="cover"
                style={styles.whatsappIcon}
              />
              <View>
                <RegularText text="Whatsapp Chat" size={14} />
                <RegularText
                  text="Talk to one of our customer support now"
                  size={11}
                  style={{ lineHeight: 20, opacity: 0.6, marginTop: 2 }}
                />
              </View>
            </View>
            <ChevronForward size={13} />
          </TouchableOpacity>
          <TitleText text="OR" size={14} style={styles.or} />
          <RegularText
            text="Complete the form below to help us address your complain immediately"
            size={14}
            style={styles.supportLabel}
          />
          <Input
            value={subject}
            onChangeText={setSubject}
            placeholder="Subject"
          />
          <TextArea
            value={message}
            onChangeText={setMessage}
            placeholder="Tell us what happened"
          />
        </View>
        <Button
          text="Submit"
          onPress={handleSubmit}
          disabled={!subject || !message}
        />
      </View>
    </View>
  );
};

export default Support;
