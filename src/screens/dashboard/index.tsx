import React, { useEffect } from 'react';
import { View } from 'react-native';
import { TitleText } from '@common';
import { accountSetUp, useAppDispatch } from '@store';
import { useStyles } from './styles';

const Dashboard = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(accountSetUp());
  }, []);

  return (
    <View style={styles.container}>
      <TitleText text="Dashboard" />
    </View>
  );
};

export default Dashboard;
