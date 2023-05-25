import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Close } from '@icons';
import { Button, Input, TitleText } from '@common';
import { useStyles } from './styles';

const ChangePassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
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
            text="Change Password"
            size={20}
            style={styles.contenttTitle}
          />
          <Input
            value={oldPassword}
            onChangeText={setOldPassword}
            placeholder="Current password"
            isPassword
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="New password"
            isPassword
          />
          <Input
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            isPassword
          />
        </View>
        <Button
          text="Change"
          onPress={handleSubmit}
          disabled={!oldPassword || !password || !confirmPassword}
        />
      </View>
    </View>
  );
};

export default ChangePassword;
