import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Header, RegularText, TitleText } from '@common';
import { useLeadershipStyles } from './styles';
import { MyWinnings, OverallView } from './utils';
import { useAppSelector } from '@store';

const Leadership = () => {
  const { winnings, monthly, overall } = useAppSelector(state => state.loyalty);
  const { user } = useAppSelector(state => state.user);
  const [activeTab, setActiveTab] = useState(2);
  const styles = useLeadershipStyles();
  return (
    <View style={styles.container}>
      <Header title="Leadership" centered hideBalance />
      <View style={styles.tabWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveTab(1)}
          style={[styles.tab, activeTab === 1 && styles.activeTab]}>
          {activeTab === 1 ? (
            <TitleText text="Monthly" style={styles.activeTabText} />
          ) : (
            <RegularText text="Monthly" style={styles.tabText} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveTab(2)}
          style={[styles.tab, activeTab === 2 && styles.activeTab]}>
          {activeTab === 2 ? (
            <TitleText text="Overall" style={styles.activeTabText} />
          ) : (
            <RegularText text="Overall" style={styles.tabText} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.tab, activeTab === 3 && styles.activeTab]}
          onPress={() => setActiveTab(3)}>
          {activeTab === 3 ? (
            <TitleText text="My Winnings" style={styles.activeTabText} />
          ) : (
            <RegularText text="My Winnings" style={styles.tabText} />
          )}
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollV}>
        {activeTab === 1 && (
          <OverallView data={monthly || []} userphone={user?.phoneNumber} />
        )}
        {activeTab === 2 && (
          <OverallView data={overall || []} userphone={user?.phoneNumber} />
        )}
        {activeTab === 3 && <MyWinnings data={winnings} />}
      </ScrollView>
    </View>
  );
};

export default Leadership;
