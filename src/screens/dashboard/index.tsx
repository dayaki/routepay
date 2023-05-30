import React, { useEffect } from 'react';
import { View } from 'react-native';
import { TitleText } from '@common';
import { accountSetUp, useAppDispatch, useAppSelector } from '@store';
import { useStyles } from './styles';

const Dashboard = () => {
  const { user } = useAppSelector(state => state.user);
  const styles = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(accountSetUp(user?.userId));
  }, []);

  return (
    <View style={styles.container}>
      <TitleText text="Dashboard" />
    </View>
  );
};

export default Dashboard;
