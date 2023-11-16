import React, { useState } from 'react';
import { View } from 'react-native';
import { useStyles } from './styles';
import { Button, Header, MediumText } from '@common';
import { apiService, postBvnCheck } from '@utils';
import { useAppSelector } from '@store';

const CreateWalletThree = ({ navigation, route }) => {
  const { dob, gender, bvn } = route.params;
  const { user } = useAppSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();

  const checkBvn = async () => {
    if (bvn.length === 11) {
      setIsLoading(true);
      try {
        const { url } = await apiService(postBvnCheck, 'post', {
          uniqueRef: user?.userId,
          bvn: bvn,
          isUser: true,
        });
        setIsLoading(false);
        navigation.navigate('browser', {
          params: {
            uri: url,
            type: 'bvn',
            data: { dob: dob?.toISOString().split('T')[0], gender, bvn },
          },
        });
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.contain}>
      <Header title="Account Verification" centered hideBalance />
      <View style={styles.content}>
        <View>
          <MediumText text="Kindly confirm above details to proceed." />
        </View>
        <Button text="Submit" onPress={checkBvn} isLoading={isLoading} />
      </View>
    </View>
  );
};

export default CreateWalletThree;
