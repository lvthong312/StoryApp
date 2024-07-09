import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { formatTimeAgo } from '../utils';
interface IProps {
  time?: number;
  score?: number;
  style?: ViewStyle;
  showVote?: boolean;
}
const TimeCard = ({ time, score, showVote = true, style }: IProps) => {
  const timeAgo = formatTimeAgo(time);
  return (
    <View style={[styles.containerView, style]}>
      {showVote && (
        <Text style={styles.voteText} numberOfLines={3}>
          {score ? `${score} vote${score > 1 ? 's' : ''}` : '0 vote'}
        </Text>
      )}
      <Text style={styles.timeAgoText} numberOfLines={3}>
        {timeAgo}
      </Text>
    </View>
  );
};

export default TimeCard;

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  timeAgoText: {
    color: 'grey',
  },
  voteText: {
    color: 'grey',
  },
});
