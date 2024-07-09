import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { Avatar } from '@rneui/themed';
interface IProps {
  by?: string | undefined;
  descendants?: number | undefined;
  renderRight?: any;
  style?: ViewStyle;
}
const CommentCard = ({ renderRight, by, descendants, style }: IProps) => {
  return (
    <View style={[styles.footerView, style]}>
      <View style={styles.avatarContainerView}>
        <Avatar
          size={24}
          rounded
          title={by?.substring?.(0, 1).toUpperCase()}
          containerStyle={{ backgroundColor: 'blue', marginRight: 4 }}
        />
        <Text style={styles.byText} numberOfLines={1}>
          {by}
        </Text>
      </View>
      {renderRight && typeof renderRight == 'function' ? (
        renderRight()
      ) : (
        <Text style={styles.commentText} numberOfLines={1}>
          {descendants ? `${descendants} comment${descendants > 1 ? 's' : ''}` : 'No comment'}
        </Text>
      )}
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({
  byText: { color: 'grey', justifyContent: 'center' },
  commentText: { color: 'grey' },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
  },
  avatarContainerView: { flexDirection: 'row', alignItems: 'center' },
});
