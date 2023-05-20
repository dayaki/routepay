import React from 'react';
import { View } from 'react-native';
import { TitleText } from '@common';
import { useStyles } from './styles';

const Dashboard = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <TitleText text="Dashboard" />
    </View>
  );
};

export default Dashboard;
